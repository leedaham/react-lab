# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/supporting/table-cell.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Table Cell.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

Table Cell

## Figma 기준

- Figma file: `UI-5.1`
- Root node: `51:1459`
- 구현 기준 node:
  - `17478:301` `tableGrid-headerCell / core-candidate`
  - `17472:1914` `tableGrid-headerCell / pending-dropdown`
  - `17478:252` `tableGrid-bodyCell / core-candidate`
  - `712:892` `tableGrid-bodyCell / preset-rich-content`
  - `17472:1388` `tableGrid-inputCell / specialized-candidate`
  - `17472:1651` `tableGrid-licenseCell / domain-sample`

## 구현 기준

- exact page: `../../../site/component/supporting/table-cell.html`
- catalog route: `../../../site/index.html#components`
- source helper: `../../../site/app.js`의 `tableCellPreview()`, `tableCellBasicPreview()`, `tableCellHtmlExample()`, `tableGridHeaderCell()`, `tableGridBodyCell()`, `tableGridInputCell()`, `tableGridLicenseCell()`
- generated owner: `../../../site/generate-component-pages.mjs`
- root selector / data attribute: `.table-cell`, `data-grid="table"`, `data-cell-type`, `data-state`, `data-mode`
- base CSS selector from `sonar5.css`: `.table-cell`, `.checkbox`, `.btn`, `.btn-default`, `.btn-icon`, `.btn-icon-only`, `.input`, `.input-xs`, `.select-trigger`, `.select-trigger-xs`, `.badge`, `.badge-xs`, `.toggle`, `.toggle-xs`
- gap CSS selector from `component-css/component.css`: `.table-cell[data-grid="table"]`, `.table-cell[data-cell-type]`, `.table-cell[data-state]`, `.table-cell[data-mode]`, `.table-cell[data-column]`, `.table-cell[data-cell-role]`, `.table-cell[data-cell-width]`
- HTML handoff policy: 긴 HTML snippet은 이 문서에 복사하지 않는다. 실제 DOM, class, data attribute는 exact page에서 확인한다.

## QA status

- QA issue: `../../../site/issue-20260515-1607-table-cell-split-sync/REVIEW.md`, `../../../site/issue-20260515-1701-table-cell-basic-scope/REVIEW.md`, `../../../site/issue-20260515-1708-table-cell-figma-resync/REVIEW.md`
- exact page checked: `../../../site/component/supporting/table-cell.html`
- catalog route checked: `../../../site/index.html#components`
- Figma-to-HTML mismatch count: `0`
- CSS grammar mismatch count: `0`
- CSS lock: `sonar5.css`는 수정하지 않았고 `.table-cell`과 child selector를 읽기 전용 base로 재사용한다.
- remaining uncertainty: `pending-dropdown`, `preset-rich-content`, `inputCell`, `licenseCell`은 Figma에 있는 specimen 범위로만 문서화한다.

## 범위

- 이 문서는 `tableGrid` 계열 cell만 소유한다.
- `dataGrid` 계열은 [Data Table Cell.md](Data%20Table%20Cell.md)가 소유한다.
- `sheetsGrid` 계열은 [Sheet Table Cell.md](Sheet%20Table%20Cell.md)가 소유한다.
- 상위 table composition은 [Table.md](Table.md)가 소유한다.

## 구현된 HTML 구조

```html
<div class="table-cell" data-grid="table" data-cell-type="body" data-state="default">
  <input class="checkbox checkbox-md" type="checkbox" aria-label="table cell 선택" />
  <span data-cell-text>Text</span>
  <span class="material-icon" data-cell-icon aria-hidden="true">numbers</span>
</div>
```

Table 수준의 header/body row composition proof는 [Table.md](Table.md)가 소유한다.

## Variant와 state

- `data-cell-type="header"`: `default`, `dropdown-pending`
- `data-cell-type="body"`: `default`, `hover`, `active`
- `data-cell-type="body-rich"`: `default`, `hover`, `active`
- `data-cell-type="input"`: `data-mode="input|select"`와 `default`, `hover`, `active`
- `data-cell-type="license"`: `default`, `expired`, `out-of-service`, `invalid`

## CSS 사용

- 기존 `sonar5.css` 재사용 selector:
  - `.table-cell`, `.checkbox`, `.btn`, `.btn-default`, `.btn-icon`, `.btn-icon-only`, `.input`, `.input-xs`, `.select-trigger`, `.select-trigger-xs`, `.badge`, `.badge-xs`, `.toggle`, `.toggle-xs`
- Figma gap 보정:
  - `site/component-css/component.css`
  - `.table-cell[data-grid="table"]`, `.table-cell[data-cell-type]`, `.table-cell[data-state]`, `.table-cell[data-mode]`
  - `.table-cell[data-column="selection"]`, `.table-cell[data-cell-role]`, `.table-cell[data-cell-width]`
- Theme 처리:
  - Figma evidence는 dark 기준이므로 `html[data-theme="dark"]`에서는 Figma fallback 값 `#070b13`, `rgba(126,140,222,0.16)`, `#ff692a` 등을 유지한다.
  - `html[data-theme="light"]`에서는 Figma 값을 임의 반전하지 않고 `--spec-*`, `--color-*` 제품 token을 통해 light surface/text/border로 대응한다.
- `sonar5.css`는 읽기 전용 reference이며 이 작업에서 수정하지 않는다.

## 접근성 계약

- cell specimen은 standalone visual specimen이므로 parent table의 `role="table"`, row, column ownership을 갖지 않는다.
- selection slot은 native checkbox를 사용한다.
- dropdown/input/license sample은 Figma에 표시된 cell 내부 slot 구조만 보여주며 dropdown menu, form submission, license business rule은 소유하지 않는다.

## 금지 사항

- `Table Cell` 문서에서 `dataGrid`, `sheetsGrid` cell을 함께 문서화하지 않는다.
- `pending-dropdown`, `preset-rich-content`, `inputCell`, `licenseCell`을 core body shell과 섞어 하나의 universal slot grammar로 일반화하지 않는다.
- `sonar5.css`에 table cell 보정 rule을 추가하지 않는다.

## QA

- exact page: `site/component/supporting/table-cell.html`
- catalog route: `site/index.html#components`
- mismatch count: `0`
