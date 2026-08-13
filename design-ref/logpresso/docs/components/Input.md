# Input

## AI Contract

- component: `Input`
- family: `Inputs`
- current Figma source: `11 Components - Inputs`, component set `Input`, node `216:314`
- status: current Figma design-system contract
- source class: generated-source-contract aligned to current Figma
- preview priority: dark first

This document replaces older Input notes that treated semantic color variables, component-level `focus-visible`, `FocusRing`, 20px control icons, or validation background panels as active truth.

## Current Truth

- This is a single-line text field trigger/control, not a full form-field wrapper.
- Field label, helper text, and validation message are composed outside the Input component.
- Validation message is plain text by default. It does not own a background panel or shadow.
- Component-level `focus-visible` variants are not allowed. Focus-visible is a later system-level rule.
- Semantic color variables are deferred until final semantic integration. Current Figma work uses primitive Tailwind variables.
- Text and foreground icons use `color/neutral/*`.
- Control icon slot/wrapper size is always `16 x 16`.
- Root width is `HUG` or `FILL`.
- Root height is fixed by control height variable.
- Padding, gap, and radius must bind to `spacing/*` and `radius/*` variables.
- Inputs-specific 3px and 5px spacing are normalized to Tailwind `spacing/1` (`4px`) unless the user explicitly approves an exception.

## Anatomy

| Part | Required | Ownership |
| --- | --- | --- |
| `Input` root | yes | surface, border, radius, fixed height, horizontal padding |
| `LeadingIcon` | optional boolean | 16 x 16 foreground icon slot |
| `FieldText` | yes | placeholder or filled value |
| `TrailingIcon` | optional boolean | 16 x 16 foreground icon slot |

Do not create an inner `Field` shell with another layer of padding. The root owns field padding once.

## Variants

| Axis | Values |
| --- | --- |
| `Size` | `Small`, `Medium` |
| `State` | `Default`, `Hover`, `Focused`, `Disabled`, `Error`, `Read Only` |
| `Value` | `Placeholder`, `Filled` |
| `LeadingIcon` | `true`, `false` |
| `TrailingIcon` | `true`, `false` |

Invalid active variants:

- `focus-visible`
- `FocusRing`
- semantic-token-only color variants

## Size Contract

| Size | Root height | Variable |
| --- | --- | --- |
| `Small` | `24px` | `control/height/small` |
| `Medium` | `30px` | `control/height/medium` |

Text and icons remain vertically centered inside the fixed root height. Root width may fill the parent or hug content depending on the composition.

## State Contract

| State | Visual intent |
| --- | --- |
| `Default` | resting field surface with neutral text or placeholder |
| `Hover` | slightly stronger interactive surface/border |
| `Focused` | active direct focus state, not keyboard focus-visible artifact |
| `Disabled` | disabled surface and muted neutral foreground |
| `Error` | error border plus external validation text |
| `Read Only` | non-editable readable value state |

`Error` does not add a supporting shell inside the component. A field stack may place validation text below the Input instance.

## Field Stack Usage

Recommended composition order:

1. Field label
2. `Input` component instance
3. Helper text or validation text

Helper text and validation text are separate text components/patterns. Validation text uses the primitive error foreground selected for the Inputs field-stack slice and no background panel unless a later source contract explicitly adds one. IF-2 must record the exact primitive token before any Figma mutation that creates or changes validation text.

## QA Checklist

- Component set is one `Input` set, not split by size/state.
- No component variant or child named `focus-visible`.
- No `FocusRing` child artifact.
- No semantic color binding is required or described as current truth.
- Root height is fixed to `control/height/small` or `control/height/medium`.
- Icon slot/wrapper count mismatches are `0`; every control icon slot is `16 x 16`.
- Text and foreground icon fills use `color/neutral/*`.
- Padding/gap/radius use Figma variables, not raw numbers.
- Validation message is not rendered as a filled/shadowed shell by default.
