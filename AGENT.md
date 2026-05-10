# AGENT.md

Guidance for agents working in this repository.

## Project

This is the **AWS User Group Bandung** website. It is a small Astro landing site for the local AWS community, with two public routes:

- `/` for the homepage
- `/events` for the next Meetup event and past event archive

The content is intentionally local and static for now. Meetup remains the source of truth for RSVP status, availability, venue updates, and future schedule changes.

## Stack

- Astro 6
- Tailwind CSS 4 through `@tailwindcss/vite`
- TypeScript strict mode
- Bun as the package manager

Astro 6 requires Node.js 22 or newer.

## Structure

```txt
public/
  images/
    community-hero.webp
src/
  components/
    EventCard.astro
    Footer.astro
    Header.astro
  layouts/
    Layout.astro
  lib/
    events.ts
    navigation.ts
  pages/
    events.astro
    index.astro
  styles/
    global.css
```

## Current App State

- `src/pages/index.astro` renders the homepage sections: hero, community momentum, about, what to expect, event preview, ways to participate, and final CTA.
- `src/pages/events.astro` renders the event page: page intro, next event feature, past events archive, and a simple Meetup group CTA.
- `src/components/EventCard.astro` is the reusable event card used by home and events pages. It supports optional images and keeps event metadata/CTA aligned at the bottom.
- `src/lib/events.ts` owns event data and exports:
  - `events`
  - `nextEvents`
  - `currentEvents`
  - `pastEvents`
  - `featuredEvent`
  - `meetupGroupUrl`
- `src/lib/navigation.ts` owns navigation and external community URLs, including Meetup and Instagram.
- `src/styles/global.css` defines the AWS-inspired design tokens, Amazon Ember font faces, base typography, layout helpers, cards, and button styles.

## Commands

```sh
bun install
bun dev
ASTRO_TELEMETRY_DISABLED=1 bun run build
bun preview
```

Use `ASTRO_TELEMETRY_DISABLED=1 bun run build` for verification before handing off layout or data changes.

## Adding Events

Events are currently added manually from Meetup into `src/lib/events.ts`. Do not store volatile availability such as spots left unless the app starts syncing from an API.

### Where To Get Event Information

Use the public Meetup event page, for example:

```txt
https://www.meetup.com/aws-user-group-bandung/events/<event-id>/
```

If the page content is hard to inspect visually, fetch the HTML and read the embedded event data:

```sh
curl -s 'https://www.meetup.com/aws-user-group-bandung/events/<event-id>/?eventOrigin=group_featured_event'
curl -s 'https://www.meetup.com/aws-user-group-bandung/events/<event-id>/?eventOrigin=group_past_events'
```

Meetup pages usually include useful fields in page metadata, JSON-LD, and `__NEXT_DATA__`.

### What To Gather

For each event, gather:

- `id`: Meetup event id from the URL
- `title`
- `phase`: `next`, `current`, or `past`
- `statusLabel`: user-facing label such as `Next event` or `Past event`
- `dateLabel`
- `timeLabel`
- `location`
- `address`
- `city`
- `priceLabel`
- `host`
- `hostDisplayName`
- `imageUrl`: prefer the high resolution Meetup event image when available
- `meetupUrl`: canonical public event URL, keeping useful `eventOrigin` when relevant
- `mapUrl`: Google Maps search URL, preferably from venue coordinates
- `coordinates`: latitude and longitude when available
- `speakers`: name, role, and topic
- `topics`: Meetup topic names
- `description`: short polished summary for cards and previews
- `details`: short notes summarizing what the session covers
- `attendeeCount`: okay for past events as historical context; avoid presenting it as live for future events

### Event Page Behavior

- The next event is shown as the featured event through `featuredEvent`.
- Past events render from `pastEvents`.
- Current events are supported in data but not currently rendered as a separate section.
- The Meetup page should stay the source of truth for RSVP, availability, and late venue changes.

## Conventions

- Prefer Astro components for static pages and sections.
- Add React islands only when interactivity is actually needed.
- Keep styling in Tailwind token classes backed by tokens in `src/styles/global.css`.
- Keep new features small and owned. Add content collections, API routes, analytics, or third-party services only when their workflow is clear.
- Keep copy concise, practical, and community-oriented.
- Avoid adding live-looking claims unless the app is actually syncing the source.
- Do not commit or push unless explicitly asked.
