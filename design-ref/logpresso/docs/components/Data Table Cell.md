# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/supporting/data-table-cell.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Data Table Cell.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

Data Table Cell

## Figma 기준

- Figma file: `UI-5.1`
- Root node: `51:1459`
- 구현 기준 node:
  - `2515:106239` `dataGrid-headerCell / core-candidate`
  - `17478:319` `dataGrid-bodyCell / core-candidate`
  - `17478:319` `dataGrid-bodyCell` editable affordance specimen
  - `17472:4323` `dataGrid-bodyCell / mode-samples`

## 구현 기준

- exact page: `../../../site/component/supporting/data-table-cell.html`
- catalog route: `../../../site/index.html#components`
- source helper: `../../../site/app.js`의 `dataTableCellPreview()`, `dataTableCellBasicPreview()`, `dataTableCellHtmlExample()`, `dataGridHeaderCell()`, `dataGridBodyCell()`, `dataGridModeCell()`
- generated owner: `../../../site/generate-component-pages.mjs`
- root selector / data attribute: `.table-cell`, `data-grid="data"`, `data-cell-type`, `data-state`, `data-mode`
- base CSS selector from `sonar5.css`: `.table-cell`, `.checkbox`, `.select-trigger`, `.badge`, `.btn`
- gap CSS selector from `component-css/component.css`: `.table-cell[data-grid="data"]`, `.table-cell[data-cell-type]`, `.table-cell[data-state]`, `.table-cell[data-mode]`
- HTML handoff policy: 긴 HTML snippet은 이 문서에 복사하지 않는다. 실제 DOM, class, data attribute는 exact page에서 확인한다.

## QA status

- QA issue: `../../../site/issue-20260515-1607-table-cell-split-sync/REVIEW.md`, `../../../site/issue-20260515-1701-table-cell-basic-scope/REVIEW.md`, `../../../site/issue-20260515-1708-table-cell-figma-resync/REVIEW.md`
- exact page checked: `../../../site/component/supporting/data-table-cell.html`
- catalog route checked: `../../../site/index.html#components`
- Figma-to-HTML mismatch count: `0`
- CSS grammar mismatch count: `0`
- CSS lock: `sonar5.css`는 수정하지 않았고 `.table-cell`과 child selector를 읽기 전용 base로 재사용한다.
- remaining uncertainty: editable affordance와 mode sample은 Figma visual proof이며 전체 data-grid editing behavior가 아니다.

## 범위

- 이 문서는 `dataGrid` 계열 compact cell을 소유한다.
- `tableGrid` 계열은 [Table Cell.md](Table%20Cell.md)가 소유한다.
- `sheetsGrid` 계열은 [Sheet Table Cell.md](Sheet%20Table%20Cell.md)가 소유한다.

## 구현된 HTML 구조

```html
<div class="table-cell" data-grid="data" data-cell-type="body" data-state="default">
  <input class="checkbox checkbox-xs" type="checkbox" aria-label="data cell 선택" />
  <span class="material-icon" data-cell-icon aria-hidden="true">numbers</span>
  <span data-cell-text>Text</span>
  <span class="material-icon" data-cell-icon aria-hidden="true">numbers</span>
</div>
```

## Variant와 state

- `data-cell-type="header"`: `default`, `hover`
- `data-cell-type="body"`: `default`, `hover`, `active`
- `data-mode="editable"`: editable affordance proof
- `data-cell-type="mode"`: `none-data-pending`, `add-data`

## CSS 사용

- 기존 `sonar5.css` 재사용 selector:
  - `.table-cell`, `.checkbox`, `.select-trigger`, `.badge`, `.btn`
- Figma gap 보정:
  - `site/component-css/component.css`
  - `.table-cell[data-grid="data"]`, `.table-cell[data-cell-type]`, `.table-cell[data-state]`, `.table-cell[data-mode]`
- Theme 처리:
  - Figma evidence는 dark 기준이므로 dark theme에서는 Figma fallback surface, divider, accent, hover/active alpha 값을 유지한다.
  - light theme에서는 기존 제품 token을 사용해 light surface/text/border로 대응하며, 별도 light Figma 값을 추정하지 않는다.
- `sonar5.css`는 읽기 전용 reference이며 이 작업에서 수정하지 않는다.

## 접근성 계약

- standalone specimen은 parent data table의 row/column semantics를 소유하지 않는다.
- checkbox는 native input을 사용한다.
- hover trailing affordance는 Figma visual state proof이며 menu behavior는 이 문서의 소유가 아니다.

## 금지 사항

- `dataGrid` mode sample을 `Table Cell` 또는 `Sheet Table Cell`의 universal mode로 일반화하지 않는다.
- editable affordance를 전체 input editing behavior로 확장하지 않는다.
- `sonar5.css`에 data table cell 보정 rule을 추가하지 않는다.

## QA

- exact page: `site/component/supporting/data-table-cell.html`
- catalog route: `site/index.html#components`
- mismatch count: `0`
