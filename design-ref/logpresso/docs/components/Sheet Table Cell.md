# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/supporting/sheet-table-cell.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Sheet Table Cell.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

Sheet Table Cell

## Figma 기준

- Figma file: `UI-5.1`
- Root node: `51:1459`
- 구현 기준 node:
  - `13541:9624` `sheetsGrid-headerCell / core-candidate`
  - `17478:347` `sheetsGrid-bodyCell / core-candidate`
  - `17472:4390` `sheetsGrid-bodyCell / mode-samples`

## 구현 기준

- exact page: `../../../site/component/supporting/sheet-table-cell.html`
- catalog route: `../../../site/index.html#components`
- source helper: `../../../site/app.js`의 `sheetTableCellPreview()`, `sheetTableCellBasicPreview()`, `sheetTableCellHtmlExample()`, `sheetGridHeaderCell()`, `sheetGridBodyCell()`, `sheetGridModeCell()`
- generated owner: `../../../site/generate-component-pages.mjs`
- root selector / data attribute: `.table-cell`, `data-grid="sheet"`, `data-cell-type`, `data-state`, `data-mode`
- base CSS selector from `sonar5.css`: `.table-cell`, `.checkbox`
- gap CSS selector from `component-css/component.css`: `.table-cell[data-grid="sheet"]`, `.table-cell[data-cell-type]`, `.table-cell[data-state]`, `.table-cell[data-mode]`
- HTML handoff policy: 긴 HTML snippet은 이 문서에 복사하지 않는다. 실제 DOM, class, data attribute는 exact page에서 확인한다.

## QA status

- QA issue: `../../../site/issue-20260515-1607-table-cell-split-sync/REVIEW.md`, `../../../site/issue-20260515-1701-table-cell-basic-scope/REVIEW.md`, `../../../site/issue-20260515-1708-table-cell-figma-resync/REVIEW.md`
- exact page checked: `../../../site/component/supporting/sheet-table-cell.html`
- catalog route checked: `../../../site/index.html#components`
- Figma-to-HTML mismatch count: `0`
- CSS grammar mismatch count: `0`
- CSS lock: `sonar5.css`는 수정하지 않았고 `.table-cell`과 child selector를 읽기 전용 base로 재사용한다.
- remaining uncertainty: sheet mode sample은 visual specimen이며 full sheet grid navigation, editing transaction, drag behavior는 후속 Sheet Table 작업이 소유한다.

## 범위

- 이 문서는 `sheetsGrid` 계열 compact cell을 소유한다.
- `tableGrid` 계열은 [Table Cell.md](Table%20Cell.md)가 소유한다.
- `dataGrid` 계열은 [Data Table Cell.md](Data%20Table%20Cell.md)가 소유한다.

## 구현된 HTML 구조

```html
<div class="table-cell" data-grid="sheet" data-cell-type="body" data-state="default">
  <input class="checkbox checkbox-xs" type="checkbox" aria-label="sheet cell 선택" />
  <span class="material-icon" data-cell-icon aria-hidden="true">numbers</span>
  <span data-cell-text>Text</span>
  <span class="material-icon" data-cell-icon aria-hidden="true">numbers</span>
</div>
```

## Variant와 state

- `data-cell-type="header"`: `default`, `hover`
- `data-cell-type="body"`: `default`
- `data-cell-type="mode"`: `drag`, `none-data-pending`, `add-data`, `validation-error`

## CSS 사용

- 기존 `sonar5.css` 재사용 selector:
  - `.table-cell`, `.checkbox`
- Figma gap 보정:
  - `site/component-css/component.css`
  - `.table-cell[data-grid="sheet"]`, `.table-cell[data-cell-type]`, `.table-cell[data-state]`, `.table-cell[data-mode]`
- Theme 처리:
  - Figma evidence는 dark 기준이므로 dark theme에서는 Figma fallback surface, divider, hover, brand alpha, error border 값을 유지한다.
  - light theme에서는 기존 제품 token을 사용해 light surface/text/border로 대응하며, 별도 light Figma 값을 추정하지 않는다.
- `sonar5.css`의 `.lp-sheets-cell`은 absolute-positioned sheet widget cell이므로 이번 standalone specimen의 직접 base로 사용하지 않는다.
- `sonar5.css`는 읽기 전용 reference이며 이 작업에서 수정하지 않는다.

## 접근성 계약

- standalone specimen은 parent sheet table의 grid navigation, selection range, editing transaction을 소유하지 않는다.
- validation-error는 Figma visual proof만 소유한다.
- drag state는 visual specimen이며 pointer drag behavior는 상위 Sheet Table 작업이 소유한다.

## 금지 사항

- `lp-sheets-*` selector를 `component.css`에 새로 만들지 않는다.
- sheet mode sample을 `Table Cell` 또는 `Data Table Cell`의 universal state로 일반화하지 않는다.
- `sonar5.css`에 sheet table cell 보정 rule을 추가하지 않는다.

## QA

- exact page: `site/component/supporting/sheet-table-cell.html`
- catalog route: `site/index.html#components`
- mismatch count: `0`
