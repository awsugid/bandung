# AWS User Group Bandung

Clean Astro starter for the AWS User Group Bandung website.

This branch intentionally removes the copied Jakarta-era pages, content, statistics, subscriptions, and sponsorship modules. The project now starts from a small foundation that can be shaped around Bandung-specific needs.

## Stack

- Astro 6
- Tailwind CSS 4
- TypeScript
- Bun

## Project Structure

```txt
src/
  components/
    Header.astro
    Footer.astro
  layouts/
    Layout.astro
  lib/
    navigation.ts
  pages/
    index.astro
  styles/
    global.css
```

## Commands

Use Bun from the project root:

```sh
bun install
bun dev
bun run build
bun preview
```

Astro 6 requires Node.js 22 or newer.

## Adding Features

Add one feature at a time:

1. Events: introduce an `events` content collection and `/events` routes.
2. Blog: introduce a `blog` content collection and `/blog` routes.
3. Community integrations: add APIs only when the target service and owner are clear.
