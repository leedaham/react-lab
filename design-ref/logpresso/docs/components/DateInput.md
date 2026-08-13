# Date Input

## AI Contract

- component: `Date Input`
- family: `Inputs`
- current Figma source: `11 Components - Inputs`, component set `Date Input`, node `740:559`
- status: current Figma design-system contract
- source class: generated-source-contract aligned to current Figma
- preview priority: dark first

This document replaces older DateInput notes that used `xs/sm`, semantic color variables, component-level `focus-visible`, `FocusRing`, or supporting-message shells as active truth.

## Current Truth

- Date Input is an input-like trigger for one date value.
- Opening behavior maps to Calendar. The Calendar is a separate component/panel owner.
- Component-level `focus-visible` variants are not allowed. Focus-visible is a later system-level rule.
- Semantic color variables are deferred until final semantic integration. Current Figma work uses primitive Tailwind variables.
- Text and foreground icons use `color/neutral/*`.
- Calendar indicator slot/wrapper is always `16 x 16`.
- Root width is `HUG` or `FILL`.
- Root height is fixed by control height variable.
- Padding, gap, and radius must bind to `spacing/*` and `radius/*` variables.
- Validation message is plain text by default and is composed outside the Date Input trigger.

## Anatomy

| Part | Required | Ownership |
| --- | --- | --- |
| `Date Input` root | yes | trigger surface, border, fixed height, padding |
| `DateValue` | yes | placeholder or selected date |
| `CalendarIcon` | yes | 16 x 16 passive indicator |

The `CalendarIcon` is not an `Icon Button`; it is a passive trigger affordance unless a separate action is explicitly designed.

## Variants

| Axis | Values |
| --- | --- |
| `Size` | `Small`, `Medium` |
| `State` | `Default`, `Hover`, `Focused`, `Disabled`, `Error`, `Read Only` |
| `Value` | `Placeholder`, `Filled` |

Invalid active variants:

- `focus-visible`
- `FocusRing`
- `xs` / `sm` size naming as active design-system axis
- semantic-token-only color variants

## Size Contract

| Size | Root height | Variable |
| --- | --- | --- |
| `Small` | `24px` | `control/height/small` |
| `Medium` | `30px` | `control/height/medium` |

## State Contract

| State | Visual intent |
| --- | --- |
| `Default` | resting date trigger |
| `Hover` | stronger interactive surface/border |
| `Focused` | active direct focus state |
| `Disabled` | disabled surface and muted neutral foreground |
| `Error` | error border plus external validation text |
| `Read Only` | readable non-editable date |

## Calendar Ownership

Opened examples must use the Calendar component/panel. Do not create a Date Input-specific calendar that conflicts with the Data Display Calendar.

## QA Checklist

- Component set is one `Date Input` set.
- No component variant or child named `focus-visible`.
- No `FocusRing` child artifact.
- Root height is fixed to `control/height/small` or `control/height/medium`.
- `CalendarIcon` slot/wrapper is `16 x 16`.
- Text and foreground icon fills use `color/neutral/*`.
- Padding/gap/radius use Figma variables, not raw numbers.
- Opened Calendar ownership is separate from the trigger.
