# Textarea

## AI Contract

- component: `Textarea`
- family: `Inputs`
- current Figma source: `11 Components - Inputs`, component set `Textarea`, node `702:260`
- status: current Figma design-system contract
- source class: generated-source-contract aligned to current Figma
- preview priority: dark first

This document replaces older Textarea notes that treated semantic color variables, component-level `focus-visible`, `FocusRing`, or supporting-message shells as active truth.

## Current Truth

- Textarea is a multiline text field.
- It follows the Input visual language but does not use the single-line fixed-height control rule.
- Textarea uses a min-height policy.
- Field label, helper text, and validation message are composed outside the Textarea component.
- Validation message is plain text by default. It does not own a background panel or shadow.
- Component-level `focus-visible` variants are not allowed. Focus-visible is a later system-level rule.
- Semantic color variables are deferred until final semantic integration. Current Figma work uses primitive Tailwind variables.
- Text and foreground icons use `color/neutral/*`.
- Padding, gap, and radius must bind to `spacing/*` and `radius/*` variables.

## Anatomy

| Part | Required | Ownership |
| --- | --- | --- |
| `Textarea` root | yes | surface, border, radius, min height, padding |
| `FieldText` | yes | placeholder or multiline value |
| `ResizeAffordance` | optional | visual affordance only if source-approved |

Do not create an inner field shell with duplicate padding.

## Variants

| Axis | Values |
| --- | --- |
| `Size` | `Small`, `Medium` |
| `State` | `Default`, `Hover`, `Focused`, `Disabled`, `Error`, `Read Only` |
| `Value` | `Placeholder`, `Filled` |

Invalid active variants:

- `focus-visible`
- `FocusRing`
- single-line fixed-height control variants
- semantic-token-only color variants

## Size Contract

| Size | Height policy |
| --- | --- |
| `Small` | min-height policy, compact multiline rhythm |
| `Medium` | min-height policy, standard multiline rhythm |

Textarea may grow with content or composition rules. It must not be forced into the `24px` or `30px` single-line control height.

## State Contract

| State | Visual intent |
| --- | --- |
| `Default` | resting multiline field |
| `Hover` | stronger interactive surface/border |
| `Focused` | active direct focus state |
| `Disabled` | disabled surface and muted neutral foreground |
| `Error` | error border plus external validation text |
| `Read Only` | non-editable readable value state |

## Field Stack Usage

Recommended composition order:

1. Field label
2. `Textarea` component instance
3. Helper text or validation text

Validation text is rendered as text only unless a later source contract explicitly adds a surface.

## QA Checklist

- Component set is one `Textarea` set, not split by size/state.
- No component variant or child named `focus-visible`.
- No `FocusRing` child artifact.
- No single-line fixed height token is applied to the Textarea root.
- Min-height policy is preserved.
- Text foreground uses `color/neutral/*`.
- Padding/gap/radius use Figma variables, not raw numbers.
- Validation message is not rendered as a filled/shadowed shell by default.
