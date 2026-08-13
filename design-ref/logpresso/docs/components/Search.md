# Search

## AI Contract

- component: `Search`
- family: `Inputs`
- current Figma source: `11 Components - Inputs`, component set `Search`, node `835:4312`
- status: current Figma design-system contract
- source class: generated-source-contract aligned to current Figma
- preview priority: dark first

This document replaces older `SearchInput` notes. The active component name is `Search`.

## Current Truth

- Search is an input-family control for search text entry and optional search result behavior.
- The collapsed trigger/input field and opened results panel have separate ownership.
- The collapsed root and the active `SearchFieldLayer` both follow the single-line fixed height rule.
- Component-level `focus-visible` variants are not allowed. Focus-visible is a later system-level rule.
- Semantic color variables are deferred until final semantic integration. Current Figma work uses primitive Tailwind variables.
- Text and foreground icons use `color/neutral/*`.
- Search, clear, loading, and other control icon slots/wrappers are always `16 x 16`.
- Padding, gap, and radius must bind to `spacing/*` and `radius/*` variables.
- Deprecated names such as `Search Input` and `SearchInput` must not be revived as active component names.

## Anatomy

| Part | Required | Ownership |
| --- | --- | --- |
| `Search` root | yes | collapsed control surface or active wrapper |
| `SearchFieldLayer` | yes in active states | input-like field surface inside active search composition |
| `SearchIcon` | yes | 16 x 16 foreground icon slot |
| `FieldText` | yes | placeholder or entered query |
| `ClearIcon` / loading affordance | optional | 16 x 16 control icon slot |
| `ResultsPanel` | optional opened example | panel content, separate from trigger contract |

Opened result content should move to Overlay Panel Foundation / Results Panel ownership when that family is active. Search must not hide panel ownership inside the field anatomy.

## Variants

| Axis | Values |
| --- | --- |
| `Size` | `Small`, `Medium` |
| `State` | `Default`, `Hover`, `Focused`, `Disabled`, `Active` |
| `Results` | `None`, `Suggestions`, `Recent`, `Searching`, `No Result` where applicable |

Invalid active variants:

- `focus-visible`
- `FocusRing`
- semantic-token-only color variants
- `Search Input` as the component name

## Size Contract

| Size | Collapsed root height | Active `SearchFieldLayer` height | Variable |
| --- | --- | --- | --- |
| `Small` | `24px` | `24px` | `control/height/small` |
| `Medium` | `30px` | `30px` | `control/height/medium` |

Opened results may have their own content height. The field portion still keeps the fixed control height.

## State Contract

| State | Visual intent |
| --- | --- |
| `Default` | resting search field |
| `Hover` | stronger interactive surface/border |
| `Focused` | active direct focus state |
| `Disabled` | disabled surface and muted neutral foreground |
| `Active` | query entry with opened or contextual results |

Active result examples are usage examples, not a reason to merge overlay panel source into the base Search field.

## QA Checklist

- Component set is named `Search`.
- No active component named `Search Input` or `SearchInput`.
- No component variant or child named `focus-visible`.
- No `FocusRing` child artifact.
- Root and `SearchFieldLayer` fixed heights match `control/height/small|medium`.
- Every control icon slot/wrapper is `16 x 16`.
- Text and foreground icon fills use `color/neutral/*`.
- Padding/gap/radius use Figma variables, not raw numbers.
- Opened result ownership is recorded as panel/composition ownership, not field ownership.
