# AGENTS.md

Guidance for agents working in this repository. `CLAUDE.md` is a symlink to this file, so edit `AGENTS.md` only.

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
  images/            logo, community-hero.webp
  og/                generated Open Graph images (do not edit by hand)
scripts/
  generate-og-images.js   builds public/og/*.png with sharp; runs before `astro build`
src/
  components/
    EventCard.astro
    Footer.astro
    Header.astro
  layouts/
    Layout.astro     HTML shell, SEO meta, JSON-LD
  lib/
    events.ts
    navigation.ts
    site.ts          site metadata, publicRoutes, JSON-LD, contentLastModified
  pages/
    events.astro
    index.astro
    llms.txt.ts
    robots.txt.ts
    sitemap.xml.ts
  styles/
    global.css
```

- `src/lib/site.ts` owns site metadata and `publicRoutes`, which drive `sitemap.xml`, `llms.txt`, and `robots.txt`. Bump `contentLastModified` whenever page content or event data changes.
- The `@/` import alias maps to `src/`.

## Current App State

- `src/pages/index.astro` renders the homepage sections: hero, community momentum, about, what to expect, event preview, ways to participate, and final CTA.
- `src/pages/events.astro` renders the event page: page intro, next event feature, past events archive, and a simple Meetup group CTA.
- `src/components/EventCard.astro` is the reusable event card used by home and events pages. It supports optional images and keeps event metadata/CTA aligned at the bottom.
- `src/lib/meetup-feed.ts` fetches the public Meetup iCal feed (`/events/ical/`) at build time. The feed lists upcoming events only. The banner image is read from each event page's `og:image`. On any failure it logs a warning and returns no events (or no image), so the build never breaks.
- `src/data/meetup-events.json` stores every event the feed has returned, so past meetups stay after Meetup drops them from the feed. It is updated by `scripts/sync-meetup-events.ts` (run with `bun`), which the `Sync Meetup events` GitHub Action runs every Monday at 07:00 WIB and commits straight to `main` when the file changes. Entries are updated but never removed.
- `src/lib/events.ts` merges hand-curated events with feed events (local data wins for the same id), derives `phase` and `statusLabel` from the end time at build time, and exports:
  - `events` (newest first)
  - `nextEvents` (soonest first)
  - `pastEvents`
  - `featuredEvent`
  - `archivedEvents`
  - `hasUpcomingEvent`
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

Upcoming events appear automatically from the Meetup feed on the next build. Feed events show the Meetup description as written; do not parse venue, speakers, or other fields out of that free text. To add structured details (venue, address, speakers, map), add it manually to `localEvents` in `src/lib/events.ts` with the same Meetup `id`. Do not store volatile availability such as spots left.

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

- The soonest upcoming event is shown as the featured event through `featuredEvent`, falling back to the most recent past event.
- Past events render from `archivedEvents`.
- `phase` is not stored: an event is `next` until its `endDate` passes at build time.
- Between rebuilds, the inline script in `src/layouts/Layout.astro` hides elements marked `data-until` and reveals elements marked `data-after` (both ISO dates) once that time passes, and keeps at most `data-limit` visible children in a list. The pages use it to swap the next event to its ended state without a rebuild.
- The Meetup page should stay the source of truth for RSVP, availability, and late venue changes.

## Conventions

- Prefer Astro components for static pages and sections.
- Add React islands only when interactivity is actually needed.
- Keep styling in Tailwind token classes backed by tokens in `src/styles/global.css`.
- Keep new features small and owned. Add content collections, API routes, analytics, or third-party services only when their workflow is clear.
- Keep copy concise, practical, and community-oriented.
- Avoid adding live-looking claims unless the app is actually syncing the source.
- Do not commit or push unless explicitly asked.

---

# Working Rules

These rules favor restraint over thoroughness. On trivial tasks, use judgment.

## How to communicate

### Response length

- Default to 3 sentences or fewer. A simple question gets a one-line answer.
- Long answers need a reason. If one is genuinely warranted, say so in the first line so the user can opt out.
- Never pad an answer to look complete. Uncertain? Say "I'm not sure" in one line instead of hedging for a paragraph.

### Structure

- Lead with the answer. The first sentence answers the question; reasoning comes after, only if it changes what the user does.
- Plain prose by default. No headers, bullet lists, or tables unless asked for structure or there are more than 4 parallel items.
- No preamble ("Great question", "Sure, here's...") and no closing summary ("In summary...", "Let me know if...").
- Do not restate the question back.

### Recommendations

- Give one recommendation, not a menu. Only compare options when explicitly asked to compare.
- Skip tradeoff sections ("what you're giving up", "on the other hand") unless asked.
- When troubleshooting, give one next step and wait for the result. Never stack fallbacks ("if that fails, try X, then Y").

### Code answers

- Show only the changed lines plus minimal surrounding context, not whole files.
- No line-by-line explanation of code. One sentence on what it does, only if non-obvious.
- Don't narrate intermediate steps ("Let me check...", "Now I'll verify..."). Execute, then report what changed.

### Conversation

- Ask for a piece of information at most once. If it isn't given, work with what you have.
- Don't repeat instructions or explanations already given in the session.
- Explain background only when asked why.
- If a message is ambiguous, ask one short clarifying question instead of answering every interpretation.

### Verbosity dial

- "v0" = one word or one line. "v1" = default (rules above). "v2" = full detail, structure allowed.
- When a message contains v0/v1/v2, apply that level for that answer only.

## How to work

### Think before coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them; don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

For anything beyond a one-line change, show the plan before writing code. A plan that can be rejected in five seconds is cheaper than a diff that has to be read.

### Simplicity first

**Minimum code that solves the problem. Nothing speculative.**

Only make changes that are directly requested or clearly necessary.

- **Scope:** no features, refactors, or "improvements" beyond what was asked. A bug fix doesn't need the surrounding code cleaned up. A simple feature doesn't need extra configurability.
- **Abstractions:** no helpers, utilities, or abstractions for one-time operations. Don't design for hypothetical future requirements.
- **Defensive coding:** no error handling, fallbacks, or validation for scenarios that can't happen. Trust internal code and framework guarantees. Validate only at system boundaries (user input, external APIs).
- **Documentation:** no docstrings, comments, or type annotations on code you didn't change. Comment only where the logic isn't self-evident.

If you write 200 lines and it could be 50, rewrite it. Ask: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### Surgical changes

**Touch only what you must. Clean up only your own mess.**

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it; don't delete it.
- Remove imports, variables, and functions that *your* changes made unused. Don't remove pre-existing dead code unless asked.

The test: every changed line should trace directly to the request. Scope decays over long sessions; if several turns in, restate what you were allowed to touch and confirm you stayed inside it.

### Goal-driven execution

**Define success criteria. Loop until verified.**

This repo has no test suite, so the baseline check is `ASTRO_TELEMETRY_DISABLED=1 bun run build`, plus viewing the affected page in `bun dev` for layout changes. For multi-step tasks, state a brief plan:

```
1. [Step] -> verify: [check]
2. [Step] -> verify: [check]
```

## Reviewing and stopping

### Reviews

Review the exact thing asked about, nothing adjacent. If asked to review one function, review that function, not the file around it.

### Stopping

**"This is fine, nothing to change" is a complete and valid answer.** Say it plainly when it's true. Do not manufacture findings to seem useful.

Sort findings into two buckets:

- **Blocking:** correctness bugs, security holes, data loss, broken behavior.
- **Non-blocking:** style, naming, structure, "you could also".

Report blocking items. Mention non-blocking ones once, in a single short list, then never again. If there are no blocking items, reply exactly "No blocking issues" and stop.

One pass only. Do not re-review code already reviewed, and do not review a fix to your own comment unless asked.

### Limits

Say "I don't know" or "I can't verify this from here" instead of guessing. You cannot see production behavior, history, or why a past decision was made. When something looks wrong but might be intentional, ask one question instead of filing it as a defect.

Do not soften a real problem to be pleasant, and do not invent a problem to sound thorough. Both are failures.
