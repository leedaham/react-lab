# Select

## AI Contract

- component: `Select`
- family: `Inputs`
- current Figma source: `11 Components - Inputs`, component set `Select`, node `231:178`
- status: current Figma design-system contract
- source class: generated-source-contract aligned to current Figma
- preview priority: dark first

This document replaces older Select notes that treated semantic color variables, component-level `focus-visible`, `FocusRing`, 20px control icons, or supporting-message shells as active truth.

## Current Truth

- Select is a known-option trigger. It is not editable text entry.
- Combobox is separate: text entry plus suggestion/result behavior.
- The opened options panel is separate from the Select trigger and should be owned by Overlay Panel Foundation / Selection Listbox.
- Component-level `focus-visible` variants are not allowed. Focus-visible is a later system-level rule.
- Semantic color variables are deferred until final semantic integration. Current Figma work uses primitive Tailwind variables.
- Text and foreground icons use `color/neutral/*`.
- Leading icon and disclosure chevron slots/wrappers are always `16 x 16`.
- Root width is `HUG` or `FILL`.
- Root height is fixed by control height variable.
- Padding, gap, and radius must bind to `spacing/*` and `radius/*` variables.

## Anatomy

| Part | Required | Ownership |
| --- | --- | --- |
| `Select` root | yes | trigger surface, border, fixed height, horizontal padding |
| `LeadingIcon` | optional boolean | 16 x 16 foreground icon slot |
| `FieldText` | yes | placeholder or selected option label |
| `DisclosureChevron` | yes | 16 x 16 passive dropdown indicator |

The disclosure chevron is not an `Icon Button`. It is a passive indicator inside the Select trigger.

## Variants

| Axis | Values |
| --- | --- |
| `Size` | `Small`, `Medium` |
| `State` | `Default`, `Hover`, `Focused`, `Open`, `Disabled`, `Error` |
| `Value` | `Placeholder`, `Selected` |
| `LeadingIcon` | `true`, `false` |

Invalid active variants:

- `focus-visible`
- `FocusRing`
- editable Combobox behavior
- semantic-token-only color variants

## Size Contract

| Size | Root height | Variable |
| --- | --- | --- |
| `Small` | `24px` | `control/height/small` |
| `Medium` | `30px` | `control/height/medium` |

## State Contract

| State | Visual intent |
| --- | --- |
| `Default` | resting trigger |
| `Hover` | stronger interactive surface/border |
| `Focused` | direct focus state |
| `Open` | trigger connected to an opened options panel |
| `Disabled` | disabled trigger and muted neutral foreground |
| `Error` | error border plus external validation text |

`Error` does not create a filled supporting-message panel inside the Select. A field stack may place validation text below the Select instance.

## Opened Panel Ownership

Select UX examples may show an options panel under the trigger, but the panel must use separate listbox/panel components once those are available. The Select trigger should not own option row spacing, active option state, or listbox keyboard behavior.

## QA Checklist

- Component set is one `Select` set, not split by size/state.
- Select remains known-option selection and does not become Combobox.
- State naming uses `Focused`, not a separate `Focus` spelling, unless a current Figma variant audit explicitly records a migration exception.
- No component variant or child named `focus-visible`.
- No `FocusRing` child artifact.
- Root height is fixed to `control/height/small` or `control/height/medium`.
- `DisclosureChevron` slot/wrapper is `16 x 16`.
- Text and foreground icon fills use `color/neutral/*`.
- Padding/gap/radius use Figma variables, not raw numbers.
- Opened panel content is not treated as Select trigger anatomy.
