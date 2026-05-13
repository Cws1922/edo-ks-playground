---
name: keystone-vibe-coding
description: Reference for the Keystone design system. Use when building or editing any React UI in a Keystone project — TSX/JSX, pages, layouts, forms, modals, buttons, tables, charts, icons — and when styling with Tailwind, picking colors or tokens, or choosing spacing.
---

# Keystone Vibe Coding

Use this skill when writing React UI in a project that uses the Keystone
design system.

## Workflow

1. **Before using any component**, load `references/components.md` to find the
   right component and confirm its prop names. The file is grouped by use case
   (Forms, Selection, Dialogs, Tables, …).
2. **Before styling**, load `references/tailwind.md` — Keystone's preset
   **replaces** Tailwind's default colors and most font weights. Default
   classes like `text-gray-500` / `bg-blue-600` / `font-bold` will not work.
3. **For icons**, load `references/icons.md` and pick from
   `@fe-infra/keystone-icons-react`.
4. **For charts**, load `references/charts.md` (uses `@fe-infra/chart-react`).

## Reference index

- `references/components.md` — every supported v1 component, grouped by use case, with React-side prop names and shared types
- `references/_unsupported.md` — legacy v0 / non-v1 component names to avoid
- `references/tailwind.md` — Keystone Tailwind preset (color tokens, typography, radius, shadow, spacing)
- `references/icons.md` — `@fe-infra/keystone-icons-react` catalog & common-use map
- `references/charts.md` — `@fe-infra/chart-react` spec API

## Quick rules

- Components: `import { KsButton, KsTag, ... } from '@byted-keystone/react'`
- Icons: `import { KsIconSearch, ... } from '@fe-infra/keystone-icons-react'`
- Charts: `import { KsLineChart, ... } from '@fe-infra/chart-react'`
- **Never** import from `@fe-infra/keystone-react` — that's the legacy v0 library.
- Tailwind default colors are **replaced** by the Keystone preset. Use token
  classes (`text-neutral-highOnSurface`, `bg-primary-fill`,
  `border-neutral-fillLow`) — not `text-gray-500` / `bg-blue-600`.
- Only `font-normal` (400) and `font-medium` (500) are available. For headings
  and labels, use `.tiktok-*` typography classes which set their own weight.
