---
type: reference
---

# @fe-infra/chart-react — Chart Component Reference

**Package**: `@fe-infra/chart-react` v0.4.20
**Underlying engine**: `@fe-infra/chart` v1.0.12 (Stencil web components) + `@visactor/vchart` ^1.13.2
**Theme**: `@fe-infra/chart-theme` v0.4.4

## Peer Dependencies

```json
{
  "react": "^17.0.2 || ^18.0.0",
  "react-dom": "^17.0.2 || ^18.0.0",
  "@visactor/vchart": "^1.13.2"
}
```

## Installation

```bash
npm install @fe-infra/chart-react @visactor/vchart
```

## Import Pattern

```jsx
import { KsLineChart, KsBarChart, KsDonutChart } from '@fe-infra/chart-react';
```

All components are default exports re-exported as named exports from the package index.

---

## Architecture Overview

These are React wrappers (auto-generated via Stencil React Output Target) around Stencil web components. Each chart component:

1. Accepts a **`spec`** prop — a VChart spec object with the `type` field omitted (the component supplies it)
2. Applies **Keystone design tokens** for theming (colors, fonts, spacing)
3. Renders via **VChart** under the hood
4. Supports **custom tooltips**, **RTL layouts**, and **legend customization**

The `spec` prop follows VChart's spec format. Refer to VChart documentation for the full spec schema of each chart type.

---

## Components (9 total)

### 1. KsLineChart

Line chart with crosshair, point hover states, and Keystone-themed legends.

```jsx
import { KsLineChart } from '@fe-infra/chart-react';
```

#### Props

| Prop                      | Type                                     | Default      | Required | Description                                                                                  |
| ------------------------- | ---------------------------------------- | ------------ | -------- | -------------------------------------------------------------------------------------------- |
| `spec`                    | `KsLineSpec`                             | —            | **Yes**  | VChart `ILineChartSpec` with `type` omitted. Must include `type: 'line'` in the spec object. |
| `options`                 | `IInitOption`                            | `{}`         | No       | VChart initialization options                                                                |
| `legendSize`              | `'md' \| 'lg'`                           | —            | No       | Legend dot size (`md` = 6px, `lg` = 8px)                                                     |
| `legendRow`               | `number`                                 | `2`          | No       | Number of legend rows before pagination                                                      |
| `isRtl`                   | `boolean`                                | `false`      | No       | Enable right-to-left layout                                                                  |
| `tooltipDirection`        | `'horizontal' \| 'vertical'`             | `'vertical'` | No       | Tooltip content layout direction                                                             |
| `tooltipParent`           | `HTMLElement`                            | —            | No       | Custom parent element for tooltip positioning                                                |
| `useKeystoneChartToolTip` | `boolean`                                | `true`       | No       | Use Keystone custom tooltip handler instead of VChart default                                |
| `renderToolTipContent`    | `RenderContentFn \| RenderTooltipConfig` | —            | No       | Custom tooltip content renderer                                                              |
| `sortToolTipDatum`        | `SortToolTipDatumFn`                     | —            | No       | Custom sort function for tooltip data                                                        |

#### Type: `KsLineSpec`

```typescript
type KsLineSpec = Omit<ILineChartSpec, 'type'> & { type: 'line' };
```

#### Example

```jsx
<KsLineChart
  spec={{
    type: 'line',
    data: [
      {
        values: [
          { date: 'Jan', value: 100, category: 'A' },
          { date: 'Feb', value: 200, category: 'A' },
          { date: 'Jan', value: 150, category: 'B' },
          { date: 'Feb', value: 180, category: 'B' },
        ],
      },
    ],
    xField: 'date',
    yField: 'value',
    seriesField: 'category',
  }}
  legendSize="md"
/>
```

#### Behavior

- Crosshair on x-axis with dashed line style
- Points hidden by default (size 0), appear on hover (size 8) with white inner border
- Uses Keystone data colors: `--ks-color-data-data1-fill` through `--ks-color-data-data6-fill`
- Line width: 1.5px

---

### 2. KsAreaChart

Area chart with fill opacity, stacked area support, and crosshair.

```jsx
import { KsAreaChart } from '@fe-infra/chart-react';
```

#### Props

| Prop                      | Type                                     | Default      | Required | Description                                 |
| ------------------------- | ---------------------------------------- | ------------ | -------- | ------------------------------------------- |
| `spec`                    | `KsAreaSpec`                             | —            | **Yes**  | VChart `IAreaChartSpec` with `type` omitted |
| `options`                 | `IInitOption`                            | `{}`         | No       | VChart initialization options               |
| `legendSize`              | `LegendSize`                             | —            | No       | Legend dot size                             |
| `isRtl`                   | `boolean`                                | —            | No       | Enable RTL layout                           |
| `tooltipDirection`        | `'horizontal' \| 'vertical'`             | `'vertical'` | No       | Tooltip layout direction                    |
| `tooltipParent`           | `HTMLElement`                            | —            | No       | Custom tooltip parent                       |
| `useKeystoneChartToolTip` | `boolean`                                | `true`       | No       | Use Keystone tooltip handler                |
| `renderToolTipContent`    | `RenderContentFn \| RenderTooltipConfig` | —            | No       | Custom tooltip renderer                     |
| `sortToolTipDatum`        | `SortToolTipDatumFn`                     | —            | No       | Sort tooltip data                           |

#### Type: `KsAreaSpec`

```typescript
type KsAreaSpec = Omit<IAreaChartSpec, 'type'>;
```

#### Behavior

- Non-stacked: area fill opacity 0.2
- Stacked (`spec.stack = true`): area fill opacity 0.8 with mapped lighter colors
- Stacked area color mapping:
  - `#8987F6` → `#CDCFFF`
  - `#00577D` → `#98CCF0`
  - `#B87BB4` → `#E3CBE1`
  - `#A45626` → `#F8DBCC`
  - `#3D9FD4` → `#CAE6FC`
  - `#5548BD` → `#C2D5FB`
- Crosshair: solid line on x-axis
- Points: hidden by default, show on hover with white inner border

---

### 3. KsBarChart

Bar chart with configurable bar width, corner radius, and grouped/stacked support.

```jsx
import { KsBarChart } from '@fe-infra/chart-react';
```

#### Props

| Prop                   | Type                                     | Default      | Required | Description                                |
| ---------------------- | ---------------------------------------- | ------------ | -------- | ------------------------------------------ |
| `spec`                 | `KsBarSpec`                              | —            | **Yes**  | VChart `IBarChartSpec` with `type` omitted |
| `barSize`              | `BarSize`                                | `'md'`       | No       | Bar width preset                           |
| `options`              | `IInitOption`                            | `{}`         | No       | VChart initialization options              |
| `legendSize`           | `LegendSize`                             | `'md'`       | No       | Legend dot size                            |
| `isRtl`                | `boolean`                                | `false`      | No       | Enable RTL layout                          |
| `tooltipDirection`     | `'horizontal' \| 'vertical'`             | `'vertical'` | No       | Tooltip layout direction                   |
| `tooltipParent`        | `HTMLElement`                            | —            | No       | Custom tooltip parent                      |
| `renderToolTipContent` | `RenderContentFn \| RenderTooltipConfig` | —            | No       | Custom tooltip renderer                    |

#### Type: `KsBarSpec`

```typescript
type KsBarSpec = Omit<IBarChartSpec, 'type'>;
```

#### Type: `BarSize`

```typescript
type BarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

| Size | Bar Width (px) | Corner Radius (vertical) | Corner Radius (horizontal) |
| ---- | -------------- | ------------------------ | -------------------------- |
| `xs` | 8              | `[2, 2, 0, 0]`           | `[0, 2, 2, 0]`             |
| `sm` | 16             | `[4, 4, 0, 0]`           | `[0, 4, 4, 0]`             |
| `md` | 24             | `[4, 4, 0, 0]`           | `[0, 4, 4, 0]`             |
| `lg` | 32             | `[4, 4, 0, 0]`           | `[0, 4, 4, 0]`             |
| `xl` | 40             | `[4, 4, 0, 0]`           | `[0, 4, 4, 0]`             |

#### Behavior

- Supports `spec.direction`: `'vertical'` (default) or `'horizontal'`
- Supports `spec.stack`: grouped or stacked bars
- Supports `spec.percent`: percentage mode (uses indigo color palette: indigo-400, 550, 650, 900)
- Crosshair: rectangle highlight on hovered bar group
- Hover dims non-hovered bars with disabled color mapping
- Bar gap in group: 2px
- Stacked bars have corner radius only on the top of the stack

---

### 4. KsDonutChart

Donut/ring chart with multiple legend display modes and percentage labels.

```jsx
import { KsDonutChart } from '@fe-infra/chart-react';
```

#### Props

| Prop                   | Type                                               | Default      | Required | Description                                                  |
| ---------------------- | -------------------------------------------------- | ------------ | -------- | ------------------------------------------------------------ |
| `spec`                 | `KsPieSpec`                                        | —            | **Yes**  | VChart `IPieChartSpec` with `type` omitted                   |
| `pieSize`              | `DonutSize`                                        | `'sm'`       | No       | Donut size preset                                            |
| `option`               | `IInitOption`                                      | `{}`         | No       | VChart initialization options (note: `option` not `options`) |
| `legendSize`           | `LegendSize`                                       | —            | No       | Legend dot size                                              |
| `legendType`           | `'highlightedPercentage' \| 'showOther' \| 'dots'` | `'dots'`     | No       | Legend display style                                         |
| `isRtl`                | `boolean`                                          | `false`      | No       | Enable RTL layout                                            |
| `useOther`             | `boolean`                                          | `true`       | No       | Group excess items (>8) into "Other"                         |
| `tooltipDirection`     | `'horizontal' \| 'vertical'`                       | `'vertical'` | No       | Tooltip layout direction                                     |
| `tooltipParent`        | `HTMLElement`                                      | —            | No       | Custom tooltip parent                                        |
| `renderToolTipContent` | `RenderContentFn \| RenderTooltipConfig`           | —            | No       | Custom tooltip renderer                                      |

**Note**: This component uses `option` (singular) not `options` (plural), unlike most other chart components.

#### Type: `KsPieSpec`

```typescript
type KsPieSpec = Omit<IPieChartSpec, 'type'>;
```

#### Type: `DonutSize`

```typescript
type DonutSize = 'sm' | 'md' | 'lg';
```

| Size | Layout Radius (px) |
| ---- | ------------------ |
| `sm` | 40                 |
| `md` | 60                 |
| `lg` | 90                 |

#### Legend Types

- **`'dots'`** (default): Standard dot legends
- **`'showOther'`**: Shows legends with "Other" grouping for excess categories
- **`'highlightedPercentage'`**: Shows percentage value highlighted in legends

#### Behavior

- Inner radius: 0.66, outer radius: 1.0 (donut shape)
- Pad angle between segments: 0.01 radians
- Percentage labels shown outside each segment
- Hover state: outer radius expands to 1.03, inner shrinks to 0.63
- Non-hovered segments dim with disabled color palette
- When `useOther` is true and data has >8 items, excess items are grouped into "Other"
- Data must include `categoryField` and `valueField` in the spec

---

### 5. KsGaugeChart

Gauge/meter chart with half-circle or full-circle modes, status coloring, and metric display.

```jsx
import { KsGaugeChart } from '@fe-infra/chart-react';
```

#### Props

| Prop                   | Type                                     | Default      | Required | Description                                                       |
| ---------------------- | ---------------------------------------- | ------------ | -------- | ----------------------------------------------------------------- |
| `spec`                 | `KsPieSpec`                              | —            | **Yes**  | VChart `IPieChartSpec` with `type` omitted (reuses pie spec type) |
| `gaugeSize`            | `DonutSize`                              | `'sm'`       | No       | Gauge ring size                                                   |
| `type`                 | `'half' \| 'circular'`                   | `'half'`     | No       | Half-circle or full-circle gauge                                  |
| `hasLabel`             | `boolean`                                | —            | **Yes**  | Show 0/100 labels at ends (half-circle only)                      |
| `metric`               | `string`                                 | —            | **Yes**  | Large center metric text                                          |
| `tag`                  | `string`                                 | —            | **Yes**  | Status tag text below metric                                      |
| `status`               | `'success' \| 'warning' \| 'error'`      | —            | No       | Status color theme                                                |
| `option`               | `IInitOption`                            | `{}`         | No       | VChart init options (note: `option` not `options`)                |
| `isRtl`                | `boolean`                                | `false`      | No       | RTL layout                                                        |
| `tooltipDirection`     | `'horizontal' \| 'vertical'`             | `'vertical'` | No       | Tooltip layout direction                                          |
| `tooltipParent`        | `HTMLElement`                            | —            | No       | Custom tooltip parent                                             |
| `renderToolTipContent` | `RenderContentFn \| RenderTooltipConfig` | —            | No       | Custom tooltip renderer                                           |

**Note**: Uses `option` (singular) like KsDonutChart.

#### Size Maps

| Size | Donut Weight (px) | Title Font Size | Title Line Height |
| ---- | ----------------- | --------------- | ----------------- |
| `sm` | 14                | 20              | 28                |
| `md` | 18                | 24              | 32                |
| `lg` | 22                | 32              | 40                |

#### Behavior

- Half-circle: starts at 180°, ends at 360° (bottom half hidden)
- Circular: starts at -90°, ends at 270° (full ring)
- Half-circle always uses `'lg'` render size regardless of `gaugeSize`
- Progress bar color from design tokens: `--ks-color-data-{status}-fill`
- Track background: `--ks-color-neutral-surface3`
- Tag styled with status-specific colors: `--ks-color-{status}-onSurface` text on `--ks-color-{status}-surface3` background
- No pointer/pin elements (hidden)
- Data uses `radiusField: 'type'`, `categoryField: 'type'`, `valueField: 'value'`

---

### 6. KsScatterChart

Scatter/bubble chart with configurable point sizes and opacity effects.

```jsx
import { KsScatterChart } from '@fe-infra/chart-react';
```

#### Props

| Prop                   | Type                                     | Default      | Required | Description                                    |
| ---------------------- | ---------------------------------------- | ------------ | -------- | ---------------------------------------------- |
| `spec`                 | `KsScatterSpec`                          | —            | **Yes**  | VChart `IScatterChartSpec` with `type` omitted |
| `pointSize`            | `PointSize`                              | `'sm'`       | No       | Point size preset                              |
| `options`              | `IInitOption`                            | `{}`         | No       | VChart initialization options                  |
| `legendSize`           | `LegendSize`                             | —            | No       | Legend dot size                                |
| `isRtl`                | `boolean`                                | `false`      | No       | Enable RTL layout                              |
| `tooltipDirection`     | `'horizontal' \| 'vertical'`             | `'vertical'` | No       | Tooltip layout direction                       |
| `tooltipParent`        | `HTMLElement`                            | —            | No       | Custom tooltip parent                          |
| `renderToolTipContent` | `RenderContentFn \| RenderTooltipConfig` | —            | No       | Custom tooltip renderer                        |

#### Type: `KsScatterSpec`

```typescript
type KsScatterSpec = Omit<IScatterChartSpec, 'type'>;
```

#### Type: `PointSize`

```typescript
type PointSize = 'sm' | 'md' | 'lg';
```

| Size | Point Diameter (px) |
| ---- | ------------------- |
| `sm` | 8                   |
| `md` | 20                  |
| `lg` | 32                  |

#### Behavior

- Default opacity: 0.8 fill, 0.6 fillOpacity, 1.0 strokeOpacity
- Hover: opacity increases to 1.0, fillOpacity to 0.8
- Selected: adds outer border ring (4px, 2px distance, 0.2 opacity)
- Stroke color derived from series color
- Line width: 1px

---

### 7. KsWordCloudChart

Word cloud visualization with font size ranges and Keystone typography.

```jsx
import { KsWordCloudChart } from '@fe-infra/chart-react';
```

#### Props

| Prop                   | Type                                     | Default      | Required | Description                                      |
| ---------------------- | ---------------------------------------- | ------------ | -------- | ------------------------------------------------ |
| `spec`                 | `KsWordCloudSpec`                        | —            | **Yes**  | VChart `IWordCloudChartSpec` with `type` omitted |
| `options`              | `IInitOption`                            | `{}`         | No       | VChart initialization options                    |
| `legendSize`           | `LegendSize`                             | —            | No       | Legend dot size                                  |
| `tooltipDirection`     | `'horizontal' \| 'vertical'`             | `'vertical'` | No       | Tooltip layout direction                         |
| `tooltipParent`        | `HTMLElement`                            | —            | No       | Custom tooltip parent                            |
| `renderToolTipContent` | `RenderContentFn \| RenderTooltipConfig` | —            | No       | Custom tooltip renderer                          |

**Note**: No `isRtl` support on this component.

#### Type: `KsWordCloudSpec`

```typescript
type KsWordCloudSpec = Omit<IWordCloudChartSpec, 'type'>;
```

#### Behavior

- Font size range: 12px to 32px
- Font weight: 500 (medium)
- Font family: `'TikTok Sans Display'`
- Spec must include `nameField` and `valueField`
- Tooltip shows series/name field as key, value field as value

---

### 8. KsCommonChart

Flexible multi-series chart supporting mixed chart types (bar + line, bar + area, double donut, etc).

```jsx
import { KsCommonChart } from '@fe-infra/chart-react';
```

#### Props

| Prop                      | Type                                     | Default      | Required | Description                           |
| ------------------------- | ---------------------------------------- | ------------ | -------- | ------------------------------------- |
| `spec`                    | `KsCommonSpec`                           | —            | **Yes**  | Common chart spec with mixed series   |
| `barSize`                 | `BarSize`                                | `'md'`       | No       | Bar width preset (for bar series)     |
| `options`                 | `IInitOption`                            | `{}`         | No       | VChart initialization options         |
| `legendSize`              | `LegendSize`                             | `'md'`       | No       | Legend dot size                       |
| `legendType`              | `'showOther' \| 'dots'`                  | `'dots'`     | No       | Legend display style                  |
| `isRtl`                   | `boolean`                                | `false`      | No       | Enable RTL layout                     |
| `useOther`                | `boolean`                                | `true`       | No       | Group excess donut items into "Other" |
| `useKeystoneChartToolTip` | `boolean`                                | `true`       | No       | Use Keystone tooltip handler          |
| `tooltipDirection`        | `'horizontal' \| 'vertical'`             | `'vertical'` | No       | Tooltip layout direction              |
| `tooltipParent`           | `HTMLElement`                            | —            | No       | Custom tooltip parent                 |
| `renderToolTipContent`    | `RenderContentFn \| RenderTooltipConfig` | —            | No       | Custom tooltip renderer               |
| `sortToolTipDatum`        | `SortToolTipDatumFn`                     | —            | No       | Sort tooltip data                     |

#### Type: `KsCommonSpec`

```typescript
type IKsPieSeriesSpec = IPieSeriesSpec & { position: 'inside' | 'outside' };

type CommonSpec = Omit<ICommonChartSpec, 'series'> & {
  series: (IAreaSeriesSpec | ILineSeriesSpec | IBarSeriesSpec | IKsPieSeriesSpec)[];
};

type KsCommonSpec = Omit<CommonSpec, 'type' | 'outerRadius' | 'innerRadius'>;
```

#### Behavior

- Supports mixing bar, line, area, and pie series in one chart
- For dual-axis charts: combine bar + line or bar + area
- For double donut charts: multiple pie series with `position: 'inside' | 'outside'`
- Handles color coordination across mixed series types
- Legend click interaction toggles series visibility

---

### 9. KsLegends

Standalone legend component that connects to any VChart instance. Use when you need custom legend placement separate from the chart.

```jsx
import { KsLegends } from '@fe-infra/chart-react';
```

#### Props

| Prop           | Type                      | Default | Required | Description                                     |
| -------------- | ------------------------- | ------- | -------- | ----------------------------------------------- |
| `vchart`       | `IVChart`                 | —       | **Yes**  | VChart instance to connect legends to           |
| `legendRow`    | `number`                  | `2`     | No       | Number of visible legend rows before pagination |
| `formatMethod` | `(str: string) => string` | —       | **Yes**  | Format function for legend label text           |

#### Behavior

- Renders interactive legends with click-to-toggle series visibility
- Pagination when legends overflow (uses `ks-pagination` internally)
- Uses ResizeObserver to track container size changes
- Tooltips on truncated legend text (uses `ks-tooltip` internally)
- Tracks selected/deselected state per legend item

---

## Shared Types

### LegendSize

```typescript
type LegendSize = 'md' | 'lg';
```

| Size | Dot Diameter (px) |
| ---- | ----------------- |
| `md` | 6                 |
| `lg` | 8                 |

### RenderContentFn

Custom function to render tooltip content as a DOM element.

```typescript
type RenderContentFn = (datum: any[], series: ISeries[], activeType: 'mark' | 'dimension' | 'group') => HTMLElement | Element | HTMLDivElement;
```

### RenderTooltipConfig

Object-based tooltip configuration as an alternative to `RenderContentFn`.

```typescript
interface RenderTooltipConfig {
  renderToolTipContentFn?: RenderContentFn;
  renderToolTipTitleFn?: RenderContentFn;
  markTooltipDelayHideTime?: number;
}
```

### SortToolTipDatumFn

Function to sort tooltip data before rendering.

```typescript
type SortToolTipDatumFn = (datum: any[], series: ISeries[]) => { datum: any[]; series: ISeries[] };
```

### IInitOption

VChart initialization options (from `@visactor/vchart`). Common options include:

```typescript
interface IInitOption {
  dom?: string | HTMLElement;
  renderCanvas?: string | HTMLCanvasElement;
  mode?: 'desktop-browser' | 'mobile-browser' | 'node' | 'worker' | 'miniApp' | 'lynx';
  // ... other VChart init options
}
```

---

## Theming

All charts use Keystone design tokens via CSS variables. The default color scheme uses 9 data colors:

```
--ks-color-data-data1-fill  (primary data color)
--ks-color-data-data2-fill
--ks-color-data-data3-fill
--ks-color-data-data4-fill
--ks-color-data-data5-fill
--ks-color-data-data6-fill
--ks-color-data-data7-fill
--ks-color-data-data8-fill
--ks-color-data-data9-fill
```

### Status Colors (Gauge Chart)

```
--ks-color-data-success-fill    (green progress)
--ks-color-data-warning-fill    (yellow progress)
--ks-color-data-error-fill      (red progress)
--ks-color-{status}-onSurface   (tag text color)
--ks-color-{status}-surface3    (tag background)
```

### Axis & Grid Styling

```
Axis labels:     --ks-ref-color-neutral-500, 12px, TikTok Sans Text
Axis domain:     --ks-ref-color-neutral-650, 0.5px
Axis ticks:      --ks-ref-color-neutral-650, 0.5px
Grid lines:      --ks-ref-color-neutral-900, 0.5px
Crosshair line:  --ks-ref-color-neutral-350, 1px, dashed [2,2]
```

### Tooltip Styling

```
Background:      --ks-ref-color-neutral-200 (dark)
Border radius:   4px
Title:           --ks-ref-color-white, 12px, weight 400
Key labels:      --ks-ref-color-neutral-500, 12px, weight 400
Value labels:    --ks-ref-color-white, 12px, weight 500
```

---

## Common Patterns

### Basic Line Chart

```jsx
import { KsLineChart } from '@fe-infra/chart-react';

function MyChart() {
  const spec = {
    type: 'line',
    data: [
      {
        values: [
          { month: 'Jan', value: 3500, type: 'Impressions' },
          { month: 'Feb', value: 4200, type: 'Impressions' },
          { month: 'Mar', value: 3800, type: 'Impressions' },
          { month: 'Jan', value: 1200, type: 'Clicks' },
          { month: 'Feb', value: 1800, type: 'Clicks' },
          { month: 'Mar', value: 1500, type: 'Clicks' },
        ],
      },
    ],
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
  };

  return <KsLineChart spec={spec} legendSize="md" />;
}
```

### Bar Chart with Custom Size

```jsx
import { KsBarChart } from '@fe-infra/chart-react';

function MyBarChart() {
  const spec = {
    data: [
      {
        values: [
          { category: 'CPC', value: 2.5 },
          { category: 'CPM', value: 8.3 },
          { category: 'CPA', value: 15.1 },
        ],
      },
    ],
    xField: 'category',
    yField: 'value',
  };

  return <KsBarChart spec={spec} barSize="lg" />;
}
```

### Stacked Bar Chart

```jsx
<KsBarChart
  spec={{
    data: [{ values: myData }],
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    stack: true,
  }}
  barSize="md"
/>
```

### Horizontal Bar Chart

```jsx
<KsBarChart
  spec={{
    data: [{ values: myData }],
    xField: 'value',
    yField: 'category',
    direction: 'horizontal',
  }}
  barSize="sm"
/>
```

### Percentage Bar Chart

```jsx
<KsBarChart
  spec={{
    data: [{ values: myData }],
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    stack: true,
    percent: true,
  }}
  barSize="md"
/>
```

### Donut Chart

```jsx
import { KsDonutChart } from '@fe-infra/chart-react';

function MyDonut() {
  const spec = {
    data: [
      {
        values: [
          { category: 'Search', value: 45 },
          { category: 'Display', value: 30 },
          { category: 'Video', value: 25 },
        ],
      },
    ],
    categoryField: 'category',
    valueField: 'value',
  };

  return <KsDonutChart spec={spec} pieSize="md" legendType="dots" />;
}
```

### Gauge Chart (Half Circle)

```jsx
import { KsGaugeChart } from '@fe-infra/chart-react';

function MyGauge() {
  const spec = {
    data: [
      {
        values: [{ type: 'Score', value: 75 }],
      },
    ],
    categoryField: 'type',
    valueField: 'value',
  };

  return <KsGaugeChart spec={spec} type="half" metric="75%" tag="Good" status="success" hasLabel={true} gaugeSize="lg" />;
}
```

### Gauge Chart (Full Circle)

```jsx
<KsGaugeChart spec={spec} type="circular" metric="42" tag="Average" status="warning" hasLabel={false} gaugeSize="md" />
```

### Area Chart (Stacked)

```jsx
import { KsAreaChart } from '@fe-infra/chart-react';

<KsAreaChart
  spec={{
    data: [{ values: myData }],
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    stack: true,
  }}
  legendSize="md"
/>;
```

### Scatter Chart

```jsx
import { KsScatterChart } from '@fe-infra/chart-react';

<KsScatterChart
  spec={{
    data: [{ values: myData }],
    xField: 'x',
    yField: 'y',
    seriesField: 'category',
  }}
  pointSize="md"
/>;
```

### Word Cloud

```jsx
import { KsWordCloudChart } from '@fe-infra/chart-react';

<KsWordCloudChart
  spec={{
    data: [
      {
        values: [
          { keyword: 'React', count: 100 },
          { keyword: 'Vue', count: 80 },
          { keyword: 'Angular', count: 60 },
        ],
      },
    ],
    nameField: 'keyword',
    valueField: 'count',
  }}
/>;
```

### Custom Tooltip

```jsx
<KsLineChart
  spec={spec}
  renderToolTipContent={(datum, series, activeType) => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${datum[0]?.month}</strong>: ${datum[0]?.value}`;
    return div;
  }}
/>
```

### RTL Layout

```jsx
<KsBarChart spec={spec} isRtl={true} />
```

---

## Important Notes

1. **VChart dependency**: `@visactor/vchart` must be installed as a peer dependency. The chart components register specific VChart chart types at import time.

2. **Spec `type` field**: Most chart components omit the `type` from their spec type (they inject it internally). Exception: `KsLineSpec` requires `type: 'line'` in the spec.

3. **`option` vs `options`**: KsDonutChart and KsGaugeChart use `option` (singular). All other components use `options` (plural). This is an inconsistency in the API.

4. **Shadow DOM**: Components render inside Stencil's Shadow DOM. Custom CSS applied outside the component will not penetrate the shadow boundary.

5. **Data format**: Always wrap data values in the VChart `data` array format: `data: [{ values: [...] }]`.

6. **Design tokens**: Charts automatically use Keystone design token CSS variables for colors. These must be available in the DOM (loaded via `@fe-infra/keystone-design-tokens`).

7. **Responsive**: Charts resize with their container. The VChart engine handles canvas resizing.

8. **"Other" grouping**: DonutChart and CommonChart can automatically group data with >8 categories into an "Other" slice when `useOther` is true.

9. **Font**: Axis labels use `'TikTok Sans Text'`, word cloud uses `'TikTok Sans Display'`. Ensure these fonts are loaded.

10. **Tooltip positioning**: Tooltips are positioned relative to the mouse cursor (20px offset). They auto-adjust to stay within the viewport.
