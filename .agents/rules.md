# Project Guide

React + Vite + Tailwind project using the Keystone design system.

## Starting the project & Setup (run immediately on first interaction)

When the user first messages you (e.g. "start", "hello", "build me X", "run this application"), you MUST run these steps before doing anything else. Do not skip these steps. Do not just describe them — actually execute them:

1. **Check Node.js**: run `node --version`
   - If the command fails or the version is below 20.0.0:
     - Try `fnm install` (reads `.node-version` automatically)
     - If fnm is not found, try `nvm install`
     - If neither exists, install fnm: `curl -fsSL https://fnm.vercel.app/install | bash`, restart shell, then `fnm install`
2. **Check dependencies**: if `node_modules/` does not exist, run `npm install`
3. **Start dev server**: run `npm run dev` in the background (auto-opens browser)

Only after these steps are complete should you proceed with the user's request.

## Structure

- `src/pages/` — Page components (one per route)
- `src/layouts/` — Layout wrappers (use `<Outlet />` from react-router-dom)
- `src/components/` — Shared components
- `src/data/` — Data and type definitions
- `src/main.tsx` — App entry point and route definitions

## Adding a Page

1. Create a component in `src/pages/YourPage.tsx`
2. Add a `<Route>` in `src/main.tsx` inside the `<Routes>` block

## Design System Reference

This project uses the Keystone design system. Load the
`keystone-vibe-coding` skill at `.claude/skills/keystone-vibe-coding/`
for component, icon, chart, and Tailwind token reference. Start at its
`SKILL.md`; load files under `references/` on demand.

## Quick Reference

- Components: `import { KsButton, KsTag, KsDivider, ... } from '@byted-keystone/react'`
- Icons: `import { KsIconSearch, KsIconEdit, ... } from '@fe-infra/keystone-icons-react'`
- Charts: `import { KsLineChart, KsBarChart, ... } from '@fe-infra/chart-react'`
- Path alias: `@/` maps to `src/` (e.g., `import { tasks } from '@/data'`)

## After Writing Code

After creating or editing any file, verify your work before responding:

1. Run `npx eslint --fix .` to auto-fix lint issues
2. Run `npx tsc --noEmit` to check for type errors
3. If errors remain, fix them and repeat until clean
4. Never present code with lint or type errors to the user

## Important

- Tailwind default colors are **replaced** by the Keystone preset. Use token classes like `text-neutral-highOnSurface`, `bg-primary-fill`, `border-neutral-fillLow` — NOT `text-gray-500` or `bg-blue-600`.
- Always check `.claude/skills/keystone-vibe-coding/references/tailwind.md` before styling to see available tokens.
