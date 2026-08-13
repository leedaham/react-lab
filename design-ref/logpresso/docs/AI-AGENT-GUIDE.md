# AI Agent Guide

## Purpose

This guide is the public entrypoint for AI agents that need to read the Logpresso Design System and create reference designs, mockups, or screen specifications.

The design system is documentation-first. Markdown files own the canonical design rules. The JSON manifest is an index for discovery, validation, and safe reading order.

## Repository Path Contract

- Markdown reference paths in this guide use relative paths from this directory.
- Runtime catalog files live under `../../site`.
- Canonical design documents live under `.`.
- Design-system issue records live under `../issues`.
- A reference mockup or standalone site may live outside the catalog runtime, but it must still follow the component contracts from this docs tree.
- `standalone` means file/runtime independence only. It never means independence from design-system component rules.

## Required Reading Order

1. Read `../../site/design-system.manifest.json`.
2. Read `components/components.md` to understand component ownership and status labels.
3. Choose the target screen pattern in `patterns/patterns.md`.
4. Read the pattern document for screen-level composition and required states.
5. Read `composition/README.md` when the pattern requires component assembly rules.
6. Expand the pattern and composition `source order` into the actual document list for the task.
7. Read every parent composition document named by the pattern before child components.
8. Read child family components for exact slot, state, size, spacing, typography, token, and anatomy rules.
9. Read only the foundation documents required by the selected component, composition, or pattern.
10. If product copy, data semantics, or domain logic is missing, mark it as product-specific and do not invent it.

## Machine-Readable Entrypoint

- Manifest: `../../site/design-system.manifest.json`
- Manifest schema: `../../site/design-system.schema.json`
- Token registry: `tokens/design-tokens.json`
- Composition index: `composition/README.md`
- Accessibility matrix: `accessibility/component-accessibility-matrix.json`
- Accessibility coverage: `accessibility/component-accessibility-coverage.json`
- Reference screen examples: `patterns/reference-screen-examples.json`
- Output template: `ai/reference-design-output-template.md`
- Readiness report: `ai/public-readiness-report.md`
- Publication policy: `ai/publication-policy.md`
- Generator: `../../site/generate-design-system-manifest.mjs`
- Token extractor: `../../site/extract-design-tokens.mjs`
- Accessibility coverage generator: `../../site/generate-accessibility-coverage.mjs`
- Public readiness validator: `../../site/validate-public-design-system.mjs`
- Check command: `node .\design\site\generate-design-system-manifest.mjs --check`

## Status Labels

- `family canonical`: primitive or family source-of-truth. Use this for exact component reconstruction.
- `reusable composition pattern`: parent composition, group, stack, shell, or screen section pattern. Read child components for exact primitives.
- `supporting boundary`: narrow shared boundary referenced by multiple families. Do not treat it as a full component owner.
- `local usage`: valid only inside a specific parent or context. Do not generalize it into a global family.
- `draft`: exploration only. Do not use as current implementation truth.
- `deprecated/history`: historical reference only. Find the replacement active document first.
- `example-only`: sample or template. Do not promote sample names or values to canonical truth.

## Ownership Rules

- Parent composition owns structure, placement, cluster, order, region relation, and open-state orchestration.
- Child family owns anatomy, slot order, size, spacing, padding, gap, radius, border, icon, typography, token, and component state.
- Foundation owns shared principles, boundaries, and validation rules.
- Pattern owns screen intent, source order, required composition, state coverage, and forbidden composition.
- Composition owns component assembly, region order, section grouping, field stack, and action placement.
- Product spec owns real data semantics, business logic, copy, permissions, API states, and legal text.
- Pattern `source order` is binding for mockup generation. If `Dashboard` names `Page Layout`, `GNB`, `SNB`, `Widget Container`, `Table`, or `Blankslate`, those component documents must be listed and applied in the screen specification.
- `Page Layout` may place `GNB`, `SNB`, and `Action Bar`, but the visual truth of those children remains in their own component documents.

## Guardrails

- Do not let a parent document override child component recipe.
- Do not let a foundation document invent exact component recipe.
- Do not promote example-only or local usage names to canonical property names.
- Do not invent token values when semantic tokens are missing.
- Do not use color alone to communicate status, severity, selected state, or error state.
- Do not remove keyboard focus visibility.
- Do not create a mockup with only the populated state. Include loading, empty, error, and permission states when relevant.
- Do not use actual customer-like personal, account, IP, security event, or credential data in examples.
- Do not interpret `standalone` as permission to invent a new app shell when the selected pattern or `Page Layout` requires `GNB` or `SNB`.
- Do not replace a component with visually similar ad-hoc markup unless the output explicitly records it as an unresolved implementation gap.
- Do not ship unverified icon ligatures. If an icon name renders as text, the mockup fails component-contract validation.

## Design Output Requirements

When creating a reference design or screen specification:

- List the pattern document used.
- List every component document from the selected pattern `source order`, including parent and child shell components.
- List required foundation documents.
- Identify all product-specific assumptions.
- Include state coverage: default, loading, empty, error, disabled, permission, and selected/current states when applicable.
- Explain any unresolved item as deferred instead of guessing.
- Include a component usage ledger before implementation.

```md
## 컴포넌트 사용 근거
| 영역 | 사용 컴포넌트 문서 | 적용 variant/state | 독자 구현 여부 | 비고 |
| --- | --- | --- | --- | --- |
| global header | GNB.md, CI.md, SNBToggle.md | default/open | 아니오 | GNB child placement 준수 |
| side navigation | SNB.md | current/expanded/emphasized | 아니오 | appNav area + navList body 준수 |
| content shell | Page Layout.md | shell=gnb-snb | 아니오 | GNB/SNB slot 사용 |
```

## Mockup Contract Validation

- Verify that every document in the selected pattern `source order` appears in the design issue `참조 문서` list.
- Verify that `Page Layout` screens with a global header use `GNB` and its child placement contract.
- Verify that `Page Layout` screens with side navigation use `SNB` and its `appNav area`, `AppNavButton`, and `navList body` contract.
- Verify that any standalone mockup preserves component slot, state, size, icon, typography, and token rules.
- Verify that icon names or SVG assets render as icons, not fallback text.
- Record this validation in `DEVLOG.md` before claiming the mockup is complete.

## Validation Commands

Run these checks before publishing design-system changes:

```powershell
node .\design\site\generate-design-system-manifest.mjs --check
node .\design\site\extract-design-tokens.mjs --check
node .\design\site\generate-accessibility-coverage.mjs --check
node .\design\site\validate-public-design-system.mjs
node .\design\site\sync-component-index.mjs --check
node --check .\design\site\app.js
```

## Public Readiness Levels

- Internal/limited public use is allowed when manifest, guide, component index, pattern index, token registry, and accessibility matrix checks pass.
- External beta use is allowed when `validate-public-design-system.mjs` passes and baseline accessibility limitations are explicitly disclosed.
- Fully canonical public use requires component-level accessibility audit expansion and visual pattern previews.

## Public Links

- Web catalog: `../../site/index.html`
- Component index: `components/components.md`
- Pattern index: `patterns/patterns.md`
- Composition index: `composition/README.md`
- Reference screen examples: `patterns/reference-screen-examples.json`
- Foundation directory: `foundation`
- Rules directory: `rules`
- Token registry: `tokens/design-tokens.json`
- Accessibility matrix: `accessibility/component-accessibility-matrix.json`
- Accessibility coverage: `accessibility/component-accessibility-coverage.json`
- Publication policy: `ai/publication-policy.md`
