// Saves events from the Meetup feed into src/data/meetup-events.json so they stay
// on the site after Meetup drops them from the feed. Runs weekly in GitHub Actions.
// Existing entries are updated with fresh feed data but never removed.
import { readFile, writeFile } from "node:fs/promises";
import { type FeedEvent, feedEvents } from "../src/lib/meetup-feed.ts";

const dataPath = new URL("../src/data/meetup-events.json", import.meta.url);

const stored: FeedEvent[] = JSON.parse(await readFile(dataPath, "utf8"));

if (feedEvents.length === 0) {
	console.log("No events from the feed; leaving the data file unchanged.");
	process.exit(0);
}

const byId = new Map(stored.map((event) => [event.id, event]));
for (const event of feedEvents) {
	// Skip undefined fields so a failed image lookup never erases a stored banner.
	const fresh = Object.fromEntries(Object.entries(event).filter(([, value]) => value !== undefined));
	byId.set(event.id, { ...byId.get(event.id), ...fresh } as FeedEvent);
}

const events = [...byId.values()].sort(
	(a, b) => Date.parse(b.startDate) - Date.parse(a.startDate),
);

await writeFile(dataPath, `${JSON.stringify(events, null, "\t")}\n`);
console.log(`Synced ${feedEvents.length} feed event(s); ${events.length} stored.`);
