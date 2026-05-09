import type { APIRoute } from "astro";
import { absoluteUrl, publicRoutes, site } from "@/lib/site";

export const GET: APIRoute = () => {
	const pages = publicRoutes
		.map((route) => `- [${route.title}](${absoluteUrl(route.path)}): ${route.description}`)
		.join("\n");

	return new Response(
		`# ${site.name}

> Community-led AWS Cloud meetups for builders, developers, architects, students, operators, founders, and cloud practitioners in Bandung, Indonesia.

${site.name} helps people in Bandung learn AWS Cloud through technical talks, hands-on sessions, practical discussions, and local networking. Meetup is the source of truth for RSVP status, venue changes, and future schedule updates.

## Core Pages

${pages}

## Community Links

- [Meetup group](https://www.meetup.com/aws-user-group-bandung/): Official RSVP, event status, venue updates, and upcoming event details.
- [Instagram](https://www.instagram.com/awsugbandung/): Community updates and event posts.

## Entity Notes

- Name: AWS User Group Bandung
- Short name: AWS UG Bandung
- Location: Bandung, West Java, Indonesia
- Topics: AWS Cloud, Amazon Web Services, cloud computing, AI/ML, developer community, local meetups
- Audience: Developers, architects, students, operators, founders, and cloud practitioners
- Independence: Community-led group. AWS is a trademark of Amazon Web Services, Inc.

## Crawler Policy

Public pages may be crawled, indexed, summarized, cited, and used by search and answer engines when attribution links point to the canonical page. Do not treat volatile Meetup data such as RSVP availability or venue changes as canonical unless confirmed on Meetup.
`,
		{
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
			},
		},
	);
};
