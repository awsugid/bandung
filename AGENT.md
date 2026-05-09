# AGENT.md

Guidance for agents working in this repository.

## Project

This is a clean starter for the **AWS User Group Bandung** website. The previous Jakarta-derived feature set has been removed so new pages and integrations can be added deliberately.

## Stack

- Astro 6
- Tailwind CSS 4 through `@tailwindcss/vite`
- TypeScript strict mode
- Bun as the package manager

Astro 6 requires Node.js 22 or newer.

## Structure

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

```sh
bun install
bun dev
bun run build
bun preview
```

## Conventions

- Prefer Astro components for static pages and sections.
- Add React islands only when interactivity is actually needed.
- Keep styling in Tailwind token classes from `src/styles/global.css`.
- Keep new features small and owned. Add content collections, API routes, analytics, or third-party services only when their workflow is clear.
- Do not commit or push unless explicitly asked.
