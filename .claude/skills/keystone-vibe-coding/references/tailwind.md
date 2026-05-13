---
type: reference
---

# Tailwind & Tokens

The project uses `@fe-infra/tailwindcss-keystone-preset`, which **replaces** Tailwind's default theme with Keystone tokens. Default Tailwind colors (`red-500`, `gray-100`, etc.) and most font weights are removed — use the tokens below.

## Quick rules

- All color tokens work with any Tailwind color utility: `bg-`, `text-`, `border-`, `ring-`, `outline-`, `fill-`, `stroke-`, `divide-`, `placeholder-`, `accent-`, `caret-`, `decoration-`.
- Only `font-normal` (400) and `font-medium` (500) are configured. **Do not** use `font-bold`, `font-light`, `font-semibold`, etc.
- Typography classes are `.tiktok-{name}` — each sets fontSize, lineHeight, fontWeight, and fontFamily together. Don't combine with `font-*` weight modifiers.
- Tailwind's default spacing scale is intact; Keystone adds `*-18` (4.5rem) and `*-22` (5.5rem).

## Colors

### Primary (25 tokens)

| Token                             | Use for                                          |
| --------------------------------- | ------------------------------------------------ |
| `primary-fill`                    | filled background                                |
| `primary-fillHover`               | hover state of fill                              |
| `primary-fillActive`              | active/pressed fill                              |
| `primary-fillDisabled`            | disabled fill                                    |
| `primary-onFill`                  | content (text/icon) on a fill                    |
| `primary-fillLow`                 | low-emphasis filled background                   |
| `primary-onFillLow`               | content on a fillLow                             |
| `primary-onFillDisabled`          | disabled content on a fill                       |
| `primary-surface`                 | base surface                                     |
| `primary-surface1`                | surface layer 1 (lowest elevation)               |
| `primary-surface1Hover`           | hover of surface1                                |
| `primary-surface1Active`          | active of surface1                               |
| `primary-surface2`                | surface layer 2                                  |
| `primary-surface2Hover`           | hover of surface2                                |
| `primary-surface2Active`          | active of surface2                               |
| `primary-surface2Disabled`        | disabled surface2                                |
| `primary-surface3`                | surface layer 3 (highest elevation)              |
| `primary-onSurface`               | content on a surface                             |
| `primary-onSurfaceHover`          | hover of onSurface                               |
| `primary-onSurfaceActive`         | active of onSurface                              |
| `primary-onSurfaceDisabled`       | disabled onSurface                               |
| `primary-transparentFill`         | transparent fill (no bg, used for hover targets) |
| `primary-transparentFillHover`    | hover of transparentFill                         |
| `primary-transparentFillActive`   | active of transparentFill                        |
| `primary-transparentFillDisabled` | disabled transparentFill                         |

### Support (18 tokens)

| Token                       | Use for                             |
| --------------------------- | ----------------------------------- |
| `support-fill`              | filled background                   |
| `support-fillLow`           | low-emphasis filled background      |
| `support-fillHover`         | hover state of fill                 |
| `support-fillActive`        | active/pressed fill                 |
| `support-fillDisabled`      | disabled fill                       |
| `support-onFill`            | content (text/icon) on a fill       |
| `support-onFillLow`         | content on a fillLow                |
| `support-onFillDisabled`    | disabled content on a fill          |
| `support-surface`           | base surface                        |
| `support-surface1`          | surface layer 1 (lowest elevation)  |
| `support-surface2`          | surface layer 2                     |
| `support-surface2Hover`     | hover of surface2                   |
| `support-surface2Active`    | active of surface2                  |
| `support-surface3`          | surface layer 3 (highest elevation) |
| `support-onSurface`         | content on a surface                |
| `support-onSurfaceHover`    | hover of onSurface                  |
| `support-onSurfaceActive`   | active of onSurface                 |
| `support-onSurfaceDisabled` | disabled onSurface                  |

### Neutral (57 tokens)

| Token                             | Use for                                            |
| --------------------------------- | -------------------------------------------------- |
| `neutral-fill`                    | filled background                                  |
| `neutral-fillHover`               | hover state of fill                                |
| `neutral-fillActive`              | active/pressed fill                                |
| `neutral-fillDisabled`            | disabled fill                                      |
| `neutral-onFill`                  | content (text/icon) on a fill                      |
| `neutral-onFillDisabled`          | disabled content on a fill                         |
| `neutral-fillHigh`                | high-emphasis fill                                 |
| `neutral-fillHighHover`           | hover of fillHigh                                  |
| `neutral-fillHighActive`          | active of fillHigh                                 |
| `neutral-fillHighDisabled`        | disabled fillHigh                                  |
| `neutral-fillMedHigh`             | medium-high emphasis fill                          |
| `neutral-fillMedHighHover`        | hover of fillMedHigh                               |
| `neutral-fillMedHighActive`       | active of fillMedHigh                              |
| `neutral-fillMedHighDisabled`     | disabled fillMedHigh                               |
| `neutral-fillLow`                 | low-emphasis filled background                     |
| `neutral-fillLowHover`            | hover state of fillLow                             |
| `neutral-fillLowActive`           | active state of fillLow                            |
| `neutral-fillLowDisabled`         | disabled fillLow                                   |
| `neutral-fillLowInverse`          | inverse low fill (light on dark contexts)          |
| `neutral-fillLowInverseHover`     | hover of fillLowInverse                            |
| `neutral-fillLowInverseActive`    | active of fillLowInverse                           |
| `neutral-onFillLow`               | content on a fillLow                               |
| `neutral-surface`                 | base surface                                       |
| `neutral-surfaceHover`            | hover state of surface                             |
| `neutral-surfaceActive`           | active state of surface                            |
| `neutral-surface1`                | surface layer 1 (lowest elevation)                 |
| `neutral-surface1Hover`           | hover of surface1                                  |
| `neutral-surface1Active`          | active of surface1                                 |
| `neutral-surface2`                | surface layer 2                                    |
| `neutral-surface2Hover`           | hover of surface2                                  |
| `neutral-surface2Active`          | active of surface2                                 |
| `neutral-surface2Disabled`        | disabled surface2                                  |
| `neutral-surface3`                | surface layer 3 (highest elevation)                |
| `neutral-surface3Hover`           | hover of surface3                                  |
| `neutral-surface3Active`          | active of surface3                                 |
| `neutral-surface3Disabled`        | disabled surface3                                  |
| `neutral-onSurface`               | content on a surface                               |
| `neutral-onSurfaceHover`          | hover of onSurface                                 |
| `neutral-onSurfaceActive`         | active of onSurface                                |
| `neutral-onSurfaceDisabled`       | disabled onSurface                                 |
| `neutral-highOnSurface`           | high-contrast content on a surface (primary text)  |
| `neutral-highOnSurfaceHover`      | hover of highOnSurface                             |
| `neutral-highOnSurfaceActive`     | active of highOnSurface                            |
| `neutral-highOnSurfaceDisabled`   | disabled highOnSurface                             |
| `neutral-lowOnSurface`            | low-contrast content on a surface (secondary text) |
| `neutral-lowOnSurfaceHover`       | hover of lowOnSurface                              |
| `neutral-lowOnSurfaceActive`      | active of lowOnSurface                             |
| `neutral-lowOnSurfaceDisabled`    | disabled lowOnSurface                              |
| `neutral-overlay`                 | overlay (modal scrim, etc.)                        |
| `neutral-overlayHigh`             | higher-opacity overlay                             |
| `neutral-overlayHighDisabled`     | disabled overlayHigh                               |
| `neutral-overlayLow`              | low-opacity overlay                                |
| `neutral-overlayLowDisabled`      | disabled overlayLow                                |
| `neutral-transparentFill`         | transparent fill (no bg, used for hover targets)   |
| `neutral-transparentFillHover`    | hover of transparentFill                           |
| `neutral-transparentFillActive`   | active of transparentFill                          |
| `neutral-transparentFillDisabled` | disabled transparentFill                           |

### Error (19 tokens)

| Token                     | Use for                             |
| ------------------------- | ----------------------------------- |
| `error-fill`              | filled background                   |
| `error-fillHover`         | hover state of fill                 |
| `error-fillActive`        | active/pressed fill                 |
| `error-fillDisabled`      | disabled fill                       |
| `error-fillMedHigh`       | medium-high emphasis fill           |
| `error-fillMedHighHover`  | hover of fillMedHigh                |
| `error-fillMedHighActive` | active of fillMedHigh               |
| `error-onFill`            | content (text/icon) on a fill       |
| `error-fillLow`           | low-emphasis filled background      |
| `error-onFillLow`         | content on a fillLow                |
| `error-surface`           | base surface                        |
| `error-surface1`          | surface layer 1 (lowest elevation)  |
| `error-surface2`          | surface layer 2                     |
| `error-surface2Hover`     | hover of surface2                   |
| `error-surface2Active`    | active of surface2                  |
| `error-surface3`          | surface layer 3 (highest elevation) |
| `error-onSurface`         | content on a surface                |
| `error-onSurfaceHover`    | hover of onSurface                  |
| `error-onSurfaceActive`   | active of onSurface                 |

### Warning (16 tokens)

| Token                     | Use for                             |
| ------------------------- | ----------------------------------- |
| `warning-fill`            | filled background                   |
| `warning-fillHover`       | hover state of fill                 |
| `warning-fillActive`      | active/pressed fill                 |
| `warning-fillDisabled`    | disabled fill                       |
| `warning-onFill`          | content (text/icon) on a fill       |
| `warning-fillLow`         | low-emphasis filled background      |
| `warning-onFillLow`       | content on a fillLow                |
| `warning-surface`         | base surface                        |
| `warning-surface1`        | surface layer 1 (lowest elevation)  |
| `warning-surface2`        | surface layer 2                     |
| `warning-surface2Hover`   | hover of surface2                   |
| `warning-surface2Active`  | active of surface2                  |
| `warning-surface3`        | surface layer 3 (highest elevation) |
| `warning-onSurface`       | content on a surface                |
| `warning-onSurfaceHover`  | hover of onSurface                  |
| `warning-onSurfaceActive` | active of onSurface                 |

### Success (16 tokens)

| Token                     | Use for                             |
| ------------------------- | ----------------------------------- |
| `success-fill`            | filled background                   |
| `success-onFill`          | content (text/icon) on a fill       |
| `success-fillHover`       | hover state of fill                 |
| `success-fillActive`      | active/pressed fill                 |
| `success-fillDisabled`    | disabled fill                       |
| `success-fillLow`         | low-emphasis filled background      |
| `success-onFillLow`       | content on a fillLow                |
| `success-surface`         | base surface                        |
| `success-surface1`        | surface layer 1 (lowest elevation)  |
| `success-surface2`        | surface layer 2                     |
| `success-surface2Hover`   | hover of surface2                   |
| `success-surface2Active`  | active of surface2                  |
| `success-surface3`        | surface layer 3 (highest elevation) |
| `success-onSurface`       | content on a surface                |
| `success-onSurfaceHover`  | hover of onSurface                  |
| `success-onSurfaceActive` | active of onSurface                 |

### Data (13 tokens)

| Token          | Use for                       |
| -------------- | ----------------------------- |
| `data-data1`   | chart series 1                |
| `data-data2`   | chart series 2                |
| `data-data3`   | chart series 3                |
| `data-data4`   | chart series 4                |
| `data-data5`   | chart series 5                |
| `data-data6`   | chart series 6                |
| `data-data7`   | chart series 7                |
| `data-data8`   | chart series 8                |
| `data-data9`   | chart series 9                |
| `data-success` | success state (chart context) |
| `data-warning` | warning state (chart context) |
| `data-error`   | error state (chart context)   |
| `data-neutral` | neutral state (chart context) |

### Ai (1 tokens)

| Token     | Use for           |
| --------- | ----------------- |
| `ai-fill` | filled background |

## Typography

Single-class typography presets. Each sets `fontSize`, `lineHeight`, `fontWeight`, and `fontFamily` together — do not combine with `font-*` weight modifiers.

| Class               |
| ------------------- |
| `tiktok-headlineLg` |
| `tiktok-headlineMd` |
| `tiktok-headlineSm` |
| `tiktok-titleLg`    |
| `tiktok-titleMd`    |
| `tiktok-titleSm`    |
| `tiktok-bodyLg`     |
| `tiktok-bodyMd`     |
| `tiktok-bodySm`     |
| `tiktok-labelLg`    |
| `tiktok-labelMd`    |
| `tiktok-labelSm`    |

## Border radius

| Class                    | Token                                          |
| ------------------------ | ---------------------------------------------- |
| `rounded-none`           | 0                                              |
| `rounded-sm`             | small                                          |
| `rounded` / `rounded-md` | default md                                     |
| `rounded-inner-md`       | inner-md (use inside a `rounded-md` container) |
| `rounded-lg`             | large                                          |
| `rounded-xl`             | extra large                                    |
| `rounded-full`           | full / pill                                    |

## Shadow (elevation)

| Class      | Use for                              |
| ---------- | ------------------------------------ |
| `shadow-1` | level 1 (cards, low elevation)       |
| `shadow-2` | level 2                              |
| `shadow-3` | level 3                              |
| `shadow-4` | level 4 (highest — modals, popovers) |

## Font family & weight

- `font-sans` — TikTok Sans Text (body)
- `font-display` — TikTok Sans Display (titles)
- `font-normal` (400)
- `font-medium` (500)

**Other weight classes are NOT available.** For headings and labels, use the `.tiktok-*` typography classes which set their own weight.

## Spacing additions

Keystone adds two custom spacing values to Tailwind's default scale:

- `*-18` → `4.5rem`
- `*-22` → `5.5rem`

Works with any spacing utility: `w-18`, `h-22`, `p-18`, `m-22`, `gap-18`, etc.

## Part variant (shadow DOM)

Keystone components are web components. If needed, Style internal shadow parts with the `part-` variant:

```html
<KsButton class="part-[base]:bg-primary-fillLow part-[icon]:text-error-fill"> Save </KsButton>
```

Valid part names are component-specific — check the component's reference doc for which parts it exposes.

## What's removed from default Tailwind

- The entire default color palette (gray, red, blue, etc.) — use Keystone color tokens.
- All font weights except `font-normal` and `font-medium`.

---

_Generated 2026-05-11T18:09:32.374Z from `@fe-infra/keystone-design-tokens@2.0.21`._
