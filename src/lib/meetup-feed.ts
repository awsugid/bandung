// Reads the public Meetup iCal feed at build time. It lists upcoming events only
// and carries no image, venue, or map fields, so events.ts fills those gaps.
const feedUrl = "https://www.meetup.com/aws-user-group-bandung/events/ical/";

export type FeedEvent = {
	id: string;
	title: string;
	startDate: string;
	endDate: string;
	url: string;
	description: string;
	lastModified?: string;
	imageUrl?: string;
};

const unescapeText = (value: string) =>
	value.replace(/\\([nN,;\\])/g, (_, char) => (char.toLowerCase() === "n" ? "\n" : char));

// "20260926T090000Z" is UTC; anything else is local Bandung time (WIB, +07:00).
const toIsoDate = (value: string) => {
	const match = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z?)$/);
	if (!match) return undefined;
	const [, year, month, day, hour, minute, second, utc] = match;
	return `${year}-${month}-${day}T${hour}:${minute}:${second}${utc ? "Z" : "+07:00"}`;
};

const parseEvent = (block: string): FeedEvent | undefined => {
	const fields = new Map<string, string>();
	for (const line of block.split(/\r?\n/)) {
		const colon = line.indexOf(":");
		if (colon === -1) continue;
		const name = line.slice(0, colon).split(";")[0];
		fields.set(name, line.slice(colon + 1));
	}

	const id = fields.get("UID")?.match(/^event_(\d+)@/)?.[1];
	const startDate = toIsoDate(fields.get("DTSTART") ?? "");
	const endDate = toIsoDate(fields.get("DTEND") ?? "") ?? startDate;
	const title = fields.get("SUMMARY");
	if (!id || !startDate || !endDate || !title) return undefined;

	return {
		id,
		title: unescapeText(title),
		startDate,
		endDate,
		url: fields.get("URL") ?? `https://www.meetup.com/aws-user-group-bandung/events/${id}/`,
		description: unescapeText(fields.get("DESCRIPTION") ?? ""),
		lastModified: toIsoDate(fields.get("LAST-MODIFIED") ?? ""),
	};
};

// The feed has no image, so read the banner from the event page's og:image and
// request Meetup's high resolution variant of the same photo.
const loadImageUrl = async (eventUrl: string) => {
	try {
		const response = await fetch(eventUrl, { signal: AbortSignal.timeout(10_000) });
		if (!response.ok) return undefined;
		const html = await response.text();
		const image = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/)?.[1];
		return image?.replace(/\/\d+_(\d+\.\w+)$/, "/highres_$1");
	} catch {
		return undefined;
	}
};

const loadFeed = async (): Promise<FeedEvent[]> => {
	try {
		const response = await fetch(feedUrl, { signal: AbortSignal.timeout(10_000) });
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		const ics = await response.text();
		// Long lines are folded onto continuation lines that start with a space or tab.
		const events = ics
			.replace(/\r?\n[ \t]/g, "")
			.split("BEGIN:VEVENT")
			.slice(1)
			.map((block) => parseEvent(block.split("END:VEVENT")[0]))
			.filter((event): event is FeedEvent => event !== undefined);
		return Promise.all(
			events.map(async (event) => ({ ...event, imageUrl: await loadImageUrl(event.url) })),
		);
	} catch (error) {
		console.warn(`[meetup-feed] Using local events only: ${(error as Error).message}`);
		return [];
	}
};

export const feedEvents = await loadFeed();

export const feedLastModified = feedEvents
	.map((event) => event.lastModified?.slice(0, 10))
	.filter((date): date is string => Boolean(date))
	.sort()
	.at(-1);
