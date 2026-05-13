---
type: reference
---

# Keystone React Component API Reference

> Package: `@byted-keystone/react` v1.1.x
> All components import from: `import { ComponentName } from '@byted-keystone/react'`
> Icons: `import { KsIconName } from '@fe-infra/keystone-icons-react'` — see `icons.md`
> Charts: `import { KsLineChart, ... } from '@fe-infra/chart-react'` — see `charts.md`

---

## Table of Contents
- [Button Components](#button-components)
- [Text & Typography](#text--typography)
- [Navigation & Layout](#navigation--layout)
- [Form Controls](#form-controls)
- [Selection & Dropdowns](#selection--dropdowns)
- [Date/Time](#datetime)
- [Alerts & Messages](#alerts--messages)
- [Dialogs & Overlays](#dialogs--overlays)
- [Tables & Data](#tables--data)
- [Media](#media)
- [Status & Indicators](#status--indicators)
- [Skeletons & Loading](#skeletons--loading)
- [Other Components](#other-components)
- [Shared Types](#shared-types)

---

## Button Components

### KsButton
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'tertiary' \| 'text' \| 'inverse'` | `'default'` | Visual style |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disable interactions |
| `loading` | `boolean` | `false` | Show loading spinner |
| `htmlType` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `forceActive` | `boolean` | `false` | Force active visual state |

**Slots:** `loading` — custom content during loading state

### KsIconButton
Same props as `KsButton`. Use for icon-only buttons (compact padding).

### KsButtonGroup
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValue` | `string[]` | — | Default selected values |
| `value` | `string[]` | — | Controlled selected values |
| `multiple` | `boolean` | `false` | Allow multiple selections |
| `disabled` | `boolean` | — | Disable all items |
| `htmlName` | `string` | auto-generated | HTML name attribute |

### KsButtonGroupItem
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Item value |
| `disabled` | `boolean` | — | Disable this item |
| `hideCheckmark` | `boolean` | — | Hide selection checkmark |

---

## Text & Typography

### KsText
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'headlineLg' \| 'headlineMd' \| 'headlineSm' \| 'titleLg' \| 'titleMd' \| 'titleSm' \| 'bodyLg' \| 'bodyMd' \| 'bodySm' \| 'labelLg' \| 'labelMd' \| 'labelSm'` | `'bodyMd'` | Typography style |
| `color` | `'inherit' \| 'primary' \| 'support' \| 'error' \| 'warning' \| 'success' \| 'info' \| 'neutral' \| 'neutralHigh' \| 'neutralLow'` | `'inherit'` | Text color |
| `ellipsis` | `boolean \| { tooltip: boolean, maxLines?: number }` | `false` | Truncate with ellipsis |
| `richTextString` | `string` | `''` | Parse `<a>` and `<b>` tags |
| `definition` | `string` | — | Definition tooltip |

**Typography sizes:**
| Variant | Font Size | Line Height | Weight | Font Family |
|---------|-----------|-------------|--------|-------------|
| headlineLg | 32px | 40px | 500 | TikTok Sans Display |
| headlineMd | 24px | 32px | 500 | TikTok Sans Display |
| headlineSm | 20px | 28px | 500 | TikTok Sans Display |
| titleLg | 18px | 26px | 500 | TikTok Sans Text |
| titleMd | 16px | 24px | 500 | TikTok Sans Text |
| titleSm | 14px | 20px | 500 | TikTok Sans Text |
| bodyLg | 18px | 26px | 400 | TikTok Sans Text |
| bodyMd | 16px | 24px | 400 | TikTok Sans Text |
| bodySm | 14px | 20px | 400 | TikTok Sans Text |
| labelLg | 14px | 20px | 500 | TikTok Sans Text |
| labelMd | 12px | 16px | 500 | TikTok Sans Text |
| labelSm | 12px | 16px | 400 | TikTok Sans Text |

### KsLink
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `'primary' \| 'support' \| 'neutral' \| 'neutralHigh' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | Link color |
| `size` | `'sm' \| 'md' \| 'inherit'` | `'inherit'` | Font size |
| `variant` | `'solid' \| 'dotted'` | `'solid'` | Underline style |
| `disabled` | `boolean` | `false` | Disable link |
| `href` | `string` | — | URL |
| `target` | `'_self' \| '_blank' \| '_parent' \| '_top'` | `'_self'` | Link target |
| `download` | `string \| boolean` | — | Download attribute |
| `rel` | `string` | — | Relationship |

---

## Navigation & Layout

### KsTabs
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `activeTabId` | `string` | — | Controlled active tab |
| `defaultActiveTabId` | `string` | `''` | Initial active tab |
| `size` | `'md' \| 'lg'` | `'md'` | Tab size |
| `type` | `'default' \| 'lite' \| 'sub-tab'` | `'default'` | Tab visual type |
| `tabPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Tab bar position |
| `disabled` | `boolean` | `false` | Disable all tabs |

**Events:** `onActiveTabIdChange`

### KsTabItem
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabId` | `string` | — | Unique tab identifier |
| `disabled` | `boolean` | `false` | Disable this tab |

**Slots:** `label` — Custom tab header content

### KsSideNavigation
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'floating'` | `'default'` | Floating vs default panel |

**Slots:** `title`, `banner`, `footer`

Compose with `KsNavItem`, `KsNavItemGroup`, `KsSubNavigation` as children.

### KsNavItem
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Item value (required for selection) |
| `active` | `boolean` | — | Active state |
| `disabled` | `boolean` | `false` | Disable |
| `collapsed` | `boolean` | `false` | Collapsed (icon-only) state |
| `level` | `number` | `0` | Nesting depth |
| `size` | `'sm' \| 'md'` | `'sm'` | Size |

**Slots:** `prefix`, `suffix`

### KsNavItemGroup
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `level` | `number` | `0` | Nesting depth |

**Slots:** `title`

### KsSubNavigation
Wrap a `KsNavItem` to give it an expandable child group.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `expanded` | `boolean` | — | Controlled expanded |
| `defaultExpand` | `boolean` | — | Initial expanded |
| `collapsed` | `boolean` | `false` | Horizontally collapsed |
| `disabled` | `boolean` | — | Disable |
| `level` | `number` | `0` | Nesting depth |
| `size` | `'sm' \| 'md'` | `'sm'` | Size |

**Slots:** `prefix`, `title`, `suffix`
**Events:** `onExpand`

### KsBreadcrumb
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | `[]` | Breadcrumb items |
| `size` | `'md' \| 'lg'` | `'md'` | Size |
| `showBackArrow` | `boolean` | `true` | Show back arrow for single item |

### KsPagination
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `total` | `number` | — | Total records (required) |
| `page` | `number` | — | Controlled current page |
| `defaultPage` | `number` | `1` | Initial page |
| `pageSize` | `number` | — | Items per page |
| `defaultPageSize` | `number` | `10` | Initial page size |
| `pageSizeOptions` | `number[]` | `[10]` | Available page sizes |
| `showPageSizeChanger` | `boolean` | `false` | Show size changer |
| `showQuickJumper` | `boolean` | `false` | Show page jumper |
| `showTotal` | `boolean \| function` | `false` | Show total count |
| `siblingCount` | `number` | `2` | Visible sibling pages |
| `size` | `'sm' \| 'md'` | `'md'` | Size |
| `disabled` | `boolean` | `false` | Disable |
| `hideOnSinglePage` | `boolean` | `false` | Hide when single page |

### KsStepper
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `StepperItem[]` | `[]` | Step items |
| `current` | `number` | — | Active step (0-indexed) |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout |
| `disabled` | `boolean` | `false` | Disable |

### KsScrollbar
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `thin` | `boolean` | `false` | Thin scrollbar style |

### KsDivider
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction |
| `dashed` | `boolean` | `false` | Dashed line |
| `textAlign` | `'left' \| 'center' \| 'right'` | — | Text alignment |
| `variant` | `'primary' \| 'support' \| 'neutral' \| 'success' \| 'warning' \| 'error'` | `'neutral'` | Color |

### KsSpace
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'vertical' \| 'horizontal'` | `'horizontal'` | Layout direction |
| `gap` | `string \| number` | — | Gap between items |
| `compact` | `boolean` | — | Remove gap |

---

## Form Controls

### KsForm
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `layout` | `'vertical' \| 'horizontal'` | `'vertical'` | Form layout |
| `disabled` | `boolean` | `false` | Disable entire form |
| `initialValues` | `FormValue` | `{}` | Initial values keyed by field name |
| `requiredMarkAlign` | `'left' \| 'right'` | — | Required mark position |
| `validateTrigger` | `'blur' \| 'change' \| Trigger[]` | `'change'` | Validation trigger |

**Events:** `onValueChange`, `onFinish`, `onFinishFailed`

Use `React.useRef<HTMLKsFormElement>(null)` plus `form.current?.setFieldValue(...)`
for imperative control. Use the `useWatch(name)` hook to subscribe to a field.

### KsFormItem
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `NamePath` | — | Field name (supports nested paths) |
| `label` | `string` | — | Field label |
| `required` | `boolean` | `false` | Required field |
| `rules` | `RuleItemExpand[]` | `[]` | Validation rules |
| `initialValue` | `FormItemValue` | — | Initial value |
| `errorDisplay` | `'popup'` | `'popup'` | Error display mode |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size |
| `showOption` | `boolean` | `true` | Show "(Optional)" hint when not required |

**Slots:** `label`

### KsFormList
Renders a dynamic list of `KsFormItem`s. Use for repeated field groups.
Pairs with `useFormListContext` hook.

### KsInput
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Controlled value |
| `defaultValue` | `string` | — | Initial value |
| `placeholder` | `string` | — | Placeholder text |
| `disabled` | `boolean` | — | Disable input |
| `clearable` | `boolean` | `false` | Show clear button |
| `maxLength` | `number` | — | Max character length |
| `showCount` | `boolean \| function` | — | Show character count |
| `size` | `'sm' \| 'md'` | `'md'` | Input size |
| `status` | `'default' \| 'warning' \| 'error'` | — | Validation status |
| `type` | `string` | `'text'` | HTML input type (e.g. `'password'`) |

**Slots:** `prefix`, `suffix`

### KsInputNumber
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| null` | — | Controlled value |
| `defaultValue` | `string \| null` | — | Initial value |
| `min` | `number` | `-Infinity` | Minimum value |
| `max` | `number` | `Infinity` | Maximum value |
| `precision` | `number` | — | Decimal places |
| `controls` | `boolean \| { step }` | — | Show +/- buttons |
| `size` | `'sm' \| 'md'` | `'md'` | Size |
| `status` | `'default' \| 'warning' \| 'error'` | — | Status |

### KsTextField
Textarea / multi-line input.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Controlled value |
| `defaultValue` | `string` | — | Initial value |
| `placeholder` | `string` | — | Placeholder |
| `disabled` | `boolean` | — | Disable |
| `maxLength` | `number` | — | Max characters |
| `showCount` | `boolean \| function` | — | Show count |
| `resize` | `'vertical' \| 'horizontal' \| 'both' \| 'none'` | `'none'` | Resize behavior |
| `height` | `string \| number \| config` | — | Height config |
| `status` | `Status` | — | Validation status |

### KsCheckbox
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Controlled checked |
| `defaultChecked` | `boolean` | — | Initial checked |
| `disabled` | `boolean` | — | Disable |
| `indeterminate` | `boolean` | — | Partially checked |
| `size` | `'md' \| 'sm'` | `'md'` | Size |
| `value` | `string \| number` | — | Associated value |
| `status` | `Status` | — | Validation status |

### KsCheckboxGroup
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `CheckboxGroupValue` | — | Selected values |
| `defaultValue` | `CheckboxGroupValue` | — | Initial values |
| `disabled` | `boolean` | — | Disable all |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout |
| `gap` | `string \| number` | — | Gap between items |

### KsRadio
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Controlled checked |
| `defaultChecked` | `boolean` | — | Initial checked |
| `disabled` | `boolean` | — | Disable |
| `value` | `RadioValue` | — | Associated value |

### KsRadioGroup
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `RadioValue` | — | Selected value |
| `defaultValue` | `RadioValue` | — | Initial value |
| `disabled` | `boolean` | — | Disable all |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout |
| `gap` | `string \| number` | — | Gap |

### KsSwitch
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Controlled state |
| `defaultChecked` | `boolean` | — | Initial state |
| `disabled` | `boolean` | — | Disable |
| `loading` | `boolean` | — | Loading state |
| `size` | `'sm' \| 'md'` | `'md'` | Size |
| `labelPosition` | `'start' \| 'end'` | `'end'` | Label position |

**Events:** `onChange`

### KsChip
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `boolean` | — | Controlled selected |
| `defaultSelected` | `boolean` | — | Initial selected |
| `disabled` | `boolean` | `false` | Disable |

**Slots:** `prefix`, `label`
**Events:** `onChange`

### KsSlider
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| number[]` | — | Controlled value (array for range) |
| `defaultValue` | `number \| number[]` | `0` | Initial value |
| `min` | `number` | `0` | Min value |
| `max` | `number` | `100` | Max value |
| `step` | `number` | `1` | Step interval |
| `marks` | `SliderMark[] \| boolean` | `false` | Range marks |
| `tooltipOpen` | `boolean` | `true` | Show tooltip on hover |
| `tooltipContent` | `string[]` | `[]` | Custom tooltip strings |
| `status` | `'default' \| 'error'` | `'default'` | Status |
| `disabled` | `boolean` | `false` | Disable |

**Events:** `onChange`, `onChangeComplete`

---

## Selection & Dropdowns

### KsSelect
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `DropdownItem[]` | — | Available options |
| `value` | `Value \| Value[]` | — | Selected value(s) |
| `defaultValue` | `Value \| Value[]` | — | Initial value(s) |
| `multiple` | `boolean \| 'grouped'` | `false` | Multi-select |
| `search` | `boolean \| SelectSearchConfig` | — | Enable search |
| `placeholder` | `string` | — | Placeholder |
| `clearable` | `boolean` | — | Allow clearing |
| `disabled` | `boolean` | — | Disable |
| `size` | `'md' \| 'sm'` | — | Size |
| `status` | `Status` | — | Validation status |
| `open` | `boolean` | — | Controlled open |
| `placement` | `Placement` | `'bottom-start'` | Popup placement |
| `tagsEllipsis` | `boolean` | `true` | Collapse overflow tags |
| `virtual` | `boolean \| { estimatedItemHeight }` | — | Virtual scrolling |

### KsDropdownButton
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `DropdownItem[]` | — | Menu options |
| `value` | `(string \| number)[]` | — | Selected values |
| `defaultValue` | `(string \| number)[]` | — | Initial values |
| `variant` | `BtnVariant` | `'default'` | Button variant |
| `size` | `BtnSize` | `'md'` | Button size |
| `multiple` | `boolean` | — | Multi-select menu |
| `selectable` | `boolean` | `false` | Items selectable |
| `disabled` | `boolean` | `false` | Disable |
| `loading` | `boolean` | `false` | Loading state |
| `open` | `boolean` | — | Controlled open |
| `placement` | `Placement` | `'bottom-start'` | Popup placement |
| `search` | `DropdownSearchConfig` | — | Enable search |

### KsDropdownMenu
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `DropdownItem[]` | — | Menu options |
| `value` | `Value[]` | — | Selected values |
| `defaultValue` | `Value[]` | — | Initial values |
| `multiple` | `boolean` | — | Multi-select |
| `selectable` | `boolean` | `true` | Items selectable |
| `disabled` | `boolean` | — | Disable |
| `open` | `boolean` | — | Controlled open |
| `placement` | `Placement` | `'bottom-start'` | Popup placement |
| `search` | `boolean \| DropdownSearchConfig` | — | Enable search |

### KsCascader
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `CascaderDataNode[]` | `[]` | Cascader options |
| `value` | `SingleValueType \| SingleValueType[]` | — | Selected value(s) |
| `multiple` | `boolean` | `false` | Multi-select |
| `search` | `SearchConfig \| boolean` | — | Enable search |
| `placeholder` | `string` | — | Placeholder |
| `clearable` | `boolean` | `false` | Allow clearing |
| `disabled` | `boolean` | — | Disable |

### KsCascaderPanel
Inline cascader panel — same selection UI as `KsCascader` without the input/dropdown wrapper. Use when embedding the panel directly into a page or another popover.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `CascaderDataNode[]` | `[]` | Cascader options |
| `value` | `SingleValueType \| SingleValueType[]` | — | Selected value(s) |
| `defaultValue` | `SingleValueType \| SingleValueType[]` | — | Initial value(s) |
| `multiple` | `boolean` | `false` | Multi-select |
| `changeOnSelect` | `boolean` | — | Emit change on every level select |
| `showCheckedStrategy` | `'parent' \| 'child' \| 'all'` | `'parent'` | Which checked nodes to surface |
| `loadData` | `(opts: CascaderDataNode[]) => Promise<void> \| void` | — | Async option loader |
| `loadedKeys` | `Value[][]` | — | Pre-loaded option keys |
| `searchValue` | `string` | `''` | Controlled search input |
| `searchOptions` | `CascaderSearchNode[]` | `[]` | Pre-computed search results |
| `open` | `boolean` | — | Controlled open state |
| `disabled` | `boolean` | — | Disable |

### KsCombobox
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Value[]` | — | Selected values |
| `defaultValue` | `Value[]` | — | Initial values |
| `inputValue` | `string` | — | Current input text |
| `placeholder` | `string` | — | Placeholder |
| `clearable` | `boolean` | `true` | Show clear button |
| `disabled` | `boolean` | — | Disable |
| `status` | `Status` | — | Validation status |
| `tagsEllipsis` | `boolean` | `true` | Collapse tags |

### KsTreeSelect
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `TreeDataNode[]` | `[]` | Tree options |
| `multiple` | `boolean` | `false` | Multi-select |
| `search` | `SearchConfig \| boolean` | — | Enable search |
| `placeholder` | `string` | — | Placeholder |
| `clearable` | `boolean` | `false` | Allow clearing |
| `disabled` | `boolean` | — | Disable |
| `virtual` | `boolean \| config` | `true` | Virtual scrolling |

### KsTreeView
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `TreeDataNode[]` | `[]` | Tree data |
| `multiple` | `boolean` | `false` | Multi-select |
| `disabled` | `boolean` | — | Disable |
| `defaultExpandAll` | `boolean` | `false` | Expand all initially |
| `virtual` | `boolean \| config` | `true` | Virtual scrolling |
| `loading` | `boolean` | `false` | Loading state |

---

## Date/Time

### KsDatePicker
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `DateValue \| null` | — | Selected date |
| `defaultValue` | `DateValue \| null` | — | Initial date |
| `format` | `string` | `'YYYY-MM-DD'` | Date format |
| `placeholder` | `string` | — | Placeholder |
| `clearable` | `boolean` | `true` | Allow clearing |
| `disabled` | `boolean` | — | Disable |
| `disabledDate` | `function` | — | Disable specific dates |
| `placement` | `Placement` | `'bottom-start'` | Popup placement |
| `status` | `Status` | — | Validation status |
| `presets` | `boolean \| { options }` | `false` | Preset options |
| `needConfirm` | `boolean` | `false` | Require confirm |

### KsDateRangePicker
Same as `KsDatePicker` plus:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `[DateValue \| null, DateValue \| null]` | — | Date range |
| `comparison` | `DatePickerComparisonProps` | — | Comparison mode |
| `presets` | `boolean \| { options }` | `true` | Preset options |

`KsDatePickerQuarter` / `KsDateRangePickerQuarter` are quarter-granularity variants with the same API shape.

---

## Alerts & Messages

### KsGlobalAlert
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'warning' \| 'info' \| 'error'` | `'info'` | Alert style |
| `open` | `boolean` | — | Controlled visibility |
| `defaultOpen` | `boolean` | `true` | Initial visibility |
| `closeable` | `boolean` | `true` | Show close button |
| `showIcon` | `boolean` | `true` | Show variant icon |
| `animation` | `boolean` | `true` | Enable animations |
| `afterClose` | `() => void` | — | After close callback |

**Slots:** `title`, `content`, `actions`, `icon`, `closeIcon`

### KsMultipleGlobalAlert
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `GlobalAlertItem[]` | — | Alert items (required) |
| `open` | `boolean` | — | Controlled visibility |
| `defaultOpen` | `boolean` | `true` | Initial visibility |
| `closeable` | `boolean` | `true` | Show close buttons |
| `showIcon` | `boolean` | `true` | Show icons |
| `animation` | `boolean` | `true` | Enable animations |
| `afterClose` | `() => void` | — | After all-close callback |

**Events:** `onKsItemClose` — `(e) => { const [item, index] = e.detail; }`
Built-in pagination arrows to navigate between alerts.

### KsInlineAlert
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'info' \| 'warning' \| 'error' \| 'success' \| 'suggestion'` | `'info'` | Style |
| `title` | `string` | `''` | Title |
| `content` | `string` | — | Body text |
| `items` | `ItemType[]` | `[]` | Multi-item mode (overrides `content` + actions) |
| `orientation` | `'horizontal' \| 'vertical'` | `'vertical'` | Layout |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `open` | `boolean` | — | Visibility |
| `closeable` | `boolean` | `true` | Show close button |
| `collapsible` | `boolean` | `false` | "View more/less" — vertical only |
| `collapsed` | `boolean` | — | Controlled collapse state |
| `inverse` | `boolean` | `false` | Dark-container variant |
| `showIcon` | `boolean` | `true` | Show variant icon |
| `animation` | `boolean` | `true` | Enable animations |
| `afterClose` | `() => void` | — | After close callback |

**Slots:** `title`, `content`, `actions`, `icon`, `closeIcon`
**Events:** `onClose`, `onCollapseChange`

### KsStatusMessage
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'neutral' \| 'success' \| 'warning' \| 'error'` | `'neutral'` | Message style |
| `richTextString` | `string` | `''` | Rich text content |
| `cta` | `{ label, onClick }` | — | Call-to-action button |

### KsToast
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'success' \| 'warning' \| 'error' \| 'info' \| 'loading'` | `'info'` | Toast style |
| `title` | `string` | `''` | Toast title |
| `message` | `string` | — | Toast message |
| `duration` | `number` | `3000` | Auto-close ms |
| `closeable` | `boolean` | `false` | Show close button |
| `showIcon` | `boolean` | `false` | Show icon |
| `size` | `'sm' \| 'md'` | `'sm'` | Size |

Programmatic API: `import { toast } from '@byted-keystone/react'; toast({ title: '...', variant: 'success' })`.

---

## Dialogs & Overlays

### KsModal
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controlled open |
| `defaultOpen` | `boolean` | — | Initial open |
| `title` | `string` | `''` | Modal title |
| `description` | `string` | — | Description below title |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Modal size |
| `closeable` | `boolean \| { backdrop?, icon?, keyboard? }` | `true` | Allow closing & by which path |
| `showFooter` | `boolean` | `true` | Show footer |
| `showDivider` | `boolean` | `false` | Show divider above/below content |
| `confirmText` | `string` | — | Confirm button text |
| `cancelText` | `string` | — | Cancel button text |
| `confirmable` | `boolean` | `true` | Render confirm button |
| `cancelable` | `boolean` | `true` | Render cancel button |
| `onConfirm` | `() => Promise<boolean> \| boolean \| Promise<void> \| void` | — | Confirm handler — return `false` to keep modal open |
| `onCancel` | `(reason: ModalCancelReason) => Promise<boolean> \| boolean \| Promise<void> \| void` | — | Cancel handler |
| `afterOpen` | `() => void` | — | After open lifecycle |
| `afterClose` | `() => void` | — | After close lifecycle |

**Slots:** `title`, `description`, `body`, `footer`, `footer-other`, `confirm-btn`, `cancel-btn`, `close-btn`

Programmatic API: `import { modal } from '@byted-keystone/react'; modal({ title: '...', onConfirm: ... })`.

### KsDrawer
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controlled open |
| `defaultOpen` | `boolean` | — | Initial open |
| `title` | `string` | `''` | Drawer title |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Drawer size |
| `closeable` | `boolean \| config` | `true` | Allow closing |
| `width` | `string \| number` | — | Custom width |
| `backdrop` | `boolean \| { transparent }` | `true` | Show backdrop |

### KsPopover
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | — | Popover text (fallback if `content` slot not provided) |
| `placement` | `Placement` | `'top'` | Position |
| `trigger` | `'click' \| 'hover' \| 'focus' \| 'manual'` | `'click'` | Trigger type |
| `open` | `boolean` | — | Controlled open |
| `defaultOpen` | `boolean` | `false` | Initial open |
| `arrow` | `boolean` | `true` | Show arrow |
| `size` | `'auto' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `disabled` | `boolean` | `false` | Disable |

**Slots:** `content`

### KsTooltip
Same API as `KsPopover`. Default `trigger` is `'hover'`, default `size` is `'auto'`.

### KsNuxPopover
"New User Experience" / onboarding popover, anchored to an external element.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dataSource` | `NuxPopoverData` | — | Title / text / image / buttons (required) |
| `anchorEl` | `HTMLElement \| (() => HTMLElement)` | — | External anchor element |
| `open` | `boolean` | — | Controlled open |
| `defaultOpen` | `boolean` | `false` | Initial open |
| `placement` | `Placement` | `'top'` | Position |
| `orientation` | `'horizontal' \| 'vertical'` | `'vertical'` | Image + text layout |
| `size` | `'auto' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `trigger` | `'click' \| 'hover' \| 'focus' \| 'manual'` | `'click'` | Trigger |
| `arrow` | `boolean` | `true` | Show arrow |
| `inverse` | `boolean` | `false` | Highlighted appearance |
| `disabled` | `boolean` | `false` | Disable |
| `closeOnClickOutside` | `boolean \| { ignoreEls }` | `true` | Outside-click behavior |
| `delay` | `{ open?, close? }` | — | Open/close delay in ms |

**Slots:** `content`
**Events:** `onOpenChange`

---

## Tables & Data

### KsTable
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `(TableColumn \| TableColumnGroup)[]` | `[]` | Column definitions |
| `dataSource` | `RowData[]` | `[]` | Table data |
| `size` | `'sm' \| 'md'` | `'md'` | Table size |
| `bordered` | `boolean` | `false` | Show borders |
| `loading` | `boolean` | `false` | Loading state |
| `pagination` | `TablePaginationConfig \| false` | — | Pagination config |
| `rowSelection` | `TableRowSelectionConfig` | — | Row selection |
| `sorting` | `TableSortingConfig` | `[]` | Sorting config |
| `resizable` | `boolean \| config` | `false` | Column resize |
| `draggable` | `boolean` | `false` | Column drag |

### KsVirtualTable
Same API as `KsTable` with virtualized rows. Use when row count exceeds ~200.

---

## Media

### KsCarousel
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultCurrent` | `number` | `0` | Initial slide index |
| `slidesToShow` | `number` | `1` | Slides visible at once |
| `slidesToScroll` | `number` | `1` | Slides per scroll |
| `autoplay` | `boolean` | `false` | Auto-advance |
| `autoplaySpeed` | `number` | `3000` | Autoplay interval (ms) |
| `arrows` | `boolean \| 'overlay'` | `false` | Show nav arrows |
| `pagination` | `boolean \| 'dots' \| 'numeric'` | `false` | Show pagination (dots auto-switch to numeric > 6 slides) |
| `infinite` | `boolean` | `true` | Loop (only when `slidesToShow` & `slidesToScroll` are 1) |

**Events:** `onCurrentChange` — `(index, { trigger, direction }) => void`

Children must be `KsCarouselItem` elements.

### KsCarouselItem
No props — wrapper for a single slide.

### KsThumbnail
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | Image URL |
| `items` | `(string \| { src, alt? })[]` | — | Multi-image stack (overrides `src`) |
| `alt` | `string` | — | Alt text |
| `ratio` | `'1:1' \| '2:3' \| '3:2'` | `'1:1'` | Aspect ratio |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size |
| `objectFit` | `'cover' \| 'contain'` | `'cover'` | Image fit |
| `playable` | `boolean` | `false` | Show play button overlay |
| `playing` | `boolean` | `false` | Show pause button (swap with `playable`) |
| `stacked` | `boolean` | `false` | Stacking-shadow visual (md/lg/xl only) |
| `blocked` | `boolean \| { reason }` | `false` | Blocked overlay (hides `actions`, icon, play) |
| `disabled` | `boolean` | `false` | Disabled visual |
| `actions` | `ThumbnailAction[]` | `[]` | Action toolbar (collapses into "more" if >1) |

**Slots:** `icon`
**Events:** `onPlayingChange`

### KsImagePreview
Lightbox / full-screen image preview. Open programmatically:

```ts
import { imagePreview } from '@byted-keystone/react';
imagePreview({ images: [{ src: '...' }] });
```

---

## Status & Indicators

### KsBadge
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | — | Badge count |
| `overflowCount` | `number` | `99` | Max before `+` |
| `dot` | `boolean` | `false` | Show as dot |
| `new` | `boolean` | `false` | Show "New" label |
| `showZero` | `boolean` | `false` | Show when 0 |
| `variant` | `'error' \| 'info' \| 'neutral' \| 'success' \| 'support'` | `'error'` | Color variant |
| `placement` | `'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end'` | `'top-end'` | Position |
| `disabled` | `boolean` | `false` | Disable |

### KsAvatar
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | `''` | Display name |
| `description` | `string` | `''` | Description text |
| `alt` | `string` | — | Tooltip text |
| `shape` | `'circle' \| 'square'` | `'circle'` | Shape |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size |

### KsTag
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'info' \| 'new' \| 'neutral' \| 'success' \| 'error' \| 'warning'` | `'neutral'` | Color variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `closeable` | `boolean` | — | Show close button |
| `disabled` | `boolean` | — | Disable |
| `interactive` | `boolean` | — | Hover/active styles |

### KsProgress
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `percent` | `number` | `0` | Progress 0-100 |
| `variant` | `'bar' \| 'ring'` | `'bar'` | Visual type |
| `size` | `'md' \| 'sm' \| 'xs'` | `'md'` | Size |
| `status` | `'default' \| 'success' \| 'error' \| 'warning'` | `'default'` | Status |
| `showPercentAndStatus` | `boolean` | `true` | Show label |

### KsStatusDot
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'md' \| 'sm'` | `'md'` | Size |
| `variant` | `StatusDotVariant` | `'inProgress'` | Status type |

### KsStatusIcon
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'md' \| 'sm'` | `'md'` | Size |
| `variant` | `'info' \| 'neutral' \| 'success' \| 'warning' \| 'error' \| 'suggestion' \| 'inProgress' \| 'disapproval' \| 'limitedApproval'` | `'info'` | Status type |

---

## Skeletons & Loading

### KsSpinner
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Spinner size |
| `layout` | `'inline' \| 'block' \| 'fullscreen'` | `'inline'` | Layout mode |
| `color` | `'default' \| 'inverse' \| 'brand'` | — | Color |
| `backdrop` | `boolean` | `false` | Show backdrop |
| `description` | `string` | — | Loading text |

### KsSkeletonText
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `KsTextVariant` | `'bodySm'` | Typography variant to match |

### KsSkeletonButton
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Button size to match |

### KsSkeletonCard
No props. Generic card skeleton.

### KsSkeletonAvatar
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `shape` | `'circle' \| 'square'` | `'circle'` | Shape |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size |

### KsSkeletonTile
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rows` | `number` | `2` | Number of text lines |
| `titleWidth` | `string` | `'80px'` | Title width |

---

## Other Components

### KsUpload
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accept` | `string` | — | Accepted file types |
| `action` | `string` | — | Upload URL |
| `multiple` | `boolean` | `false` | Multi-file |
| `disabled` | `boolean` | `false` | Disable |
| `maxCount` | `config` | — | Max file count |
| `size` | `'sm' \| 'md'` | `'md'` | Size |

### KsUploadDrop
Same as `KsUpload` with drag-and-drop support. Additional prop: `iconType: 'upload' | 'plus'`.

### KsEmptyState
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `''` | Title text |
| `description` | `string` | — | Description text |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `showIllustration` | `boolean` | `true` | Show illustration |

---

## Shared Types

### DropdownItem
```typescript
{
  value?: string | number;
  label?: string;
  disabled?: boolean;
  children?: DropdownItem[];
  group?: boolean;
  groupLabel?: string;
  extra?: any;
}
```

### ValueField
```typescript
{ value: string | number; label: string; disabled?: boolean }
```

### TableColumn
```typescript
{
  id?: string;
  header?: string | ((info) => ReactNode);
  accessorKey?: string;
  accessorFn?: (row) => any;
  cell?: (info) => ReactNode;
  footer?: string | ((info) => ReactNode);
  size?: number;
  minSize?: number;
  maxSize?: number;
  enableResizing?: boolean;
  enableSorting?: boolean;
}
```

### Placement (from @floating-ui)
`'top' | 'bottom' | 'left' | 'right'` with optional `-start` / `-end` modifiers
(e.g. `'bottom-start'`).

### GlobalAlertItem
```typescript
{ key?: string; variant: 'warning' | 'info' | 'error'; title: string; content: string }
```

### Hooks
```typescript
import { useWatch, useFormItemContext, useFormListContext } from '@byted-keystone/react';
```
- `useWatch(name)` — subscribe to a single form field's value, only re-rendering on change.
- `useFormItemContext()` — access the surrounding `KsFormItem` context.
- `useFormListContext()` — access the surrounding `KsFormList` context.
