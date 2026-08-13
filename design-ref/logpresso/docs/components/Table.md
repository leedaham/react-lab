# Table

## AI Contract

- status: `ready`
- exactHtml: `site/component/supporting/table.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Table.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

## 목적

- `Table`은 column schema, header row, body row stack, optional footer region을 조합하는 data display parent composition이다.
- `Table`은 `Table Cell`의 width owner다.
- `Table`은 cell 내부 primitive, checkbox recipe, status marker, pagination control의 exact visual truth를 다시 소유하지 않는다.
- 다른 AI 에이전트가 화면을 재구성할 때 `Table` 문서를 먼저 읽고, 각 cell shell은 [Table Cell.md](Table%20Cell.md)를 추가로 읽는다.

## 문서화 대상 범위

- table root surface
- column schema와 grid track alignment
- header row / body row stack
- optional selection column
- optional footer slot
- loading / empty / dense layout boundary

## Figma 기준

- Figma file: `UI-5.1`
- current Table 전체 composition을 잠그는 Figma node는 없다.
- Figma `UI-5.1` node `51:1459`는 `Table Cell`, `Data Table Cell`, `Sheet Table Cell` family의 기준이다.
- 따라서 `Table` 전체는 Figma 전체 node를 복사하는 대상이 아니라 `Table Cell` family를 조합하는 parent composition이다.
- `../../../site/component/supporting/table.html` exact page는 current canonical composition reference다. 화면 생성 시 이 예시를 통째로 복사하지 않고, 화면별 column schema와 row data에 맞게 재조립한다.
- cell shell, state surface, padding, divider, header/body hierarchy의 visual source of truth는 [Table Cell.md](Table%20Cell.md), [Data Table Cell.md](Data%20Table%20Cell.md), [Sheet Table Cell.md](Sheet%20Table%20Cell.md)와 Figma `51:1459`다.
- 이전 table-level example node나 임시 specimen은 current Table 전체 기준으로 사용하지 않는다.

## 구현 기준

- exact page: `../../../site/component/supporting/table.html` canonical composition reference
- catalog route: `../../../site/index.html#components`
- source helper: `../../../site/app.js`의 `tableExampleMarkup()`, `tableExampleHeaderRow()`, `tableExampleBodyRow()`, `tableExampleStructureMarkup()`, `tableOwnershipBoundaryMarkup()`, `tableCompositionPreview()`
- do not use as source: `sonarTableMarkup()`, `[data-demo-table]`, stale generated native `<table>` examples that do not use `.table-cell[data-grid="table"]`
- generated owner: `../../../site/generate-component-pages.mjs`
- root selector / data attribute: `[data-table-example]`, `[data-table-example-structure]`, `[data-table-ownership-boundary]` reference-only composition selectors
- child cell selector contract: `.table-cell[data-grid="table"]`
- base CSS selector from `sonar5.css`: Table root는 `sonar5.css`의 독립 `.table` product component를 직접 확장하지 않는다. child controls는 각 child component 문서의 product selector를 따른다.
- gap CSS selector from `component-css/component.css`: `[data-table-example]`, `[data-cell-row]`, `[data-cell-section]`, `[data-cell-section-title]`, `[data-cell-specimens]`, `.table-cell[data-grid="table"][data-cell-width]`, `.table-cell[data-grid="table"][data-cell-role]`
- HTML handoff policy: 긴 HTML snippet은 이 문서에 복사하지 않는다. 실제 DOM, class, data attribute는 exact page에서 확인한다.

## 화면 생성 CSS ownership rule

- 제품 화면에서 `Table`은 wrapper, scroll region, column width, native table layout reset만 소유한다.
- 제품 화면에서 `TableRoot`, table section, scroll wrapper, native `table`은 visible background surface를 소유하지 않는다.
- background surface는 parent `Section Container` 또는 workspace가 소유한다.
- Generated List product screen에서 shared `Table Cell` default surface가 흰색/solid panel처럼 보이면 안 된다. 이 규칙은 generated List screen usage contract이며 Table exact component/specimen truth를 변경하지 않는다.
- 화면 전용 CSS는 direct `background` override가 아니라 list section context와 그 하위 `.table-cell[data-grid="table"]`에 custom property `--table-cell-surface: transparent`를 설정해 default table cell surface를 투명하게 만든다. 이 custom property는 `Table Cell` CSS가 `--table-cell-surface`를 소비하는 경우에만 사용한다.
- 이 custom property 보정은 shared component visual을 새로 그리는 것이 아니라 제품 화면에서 Table surface ownership을 Section Container로 돌려놓는 usage contract다.
- 화면 전용 CSS는 `table`, `col`, scroll wrapper의 `width`, `min-width`, `table-layout`, `border-collapse`, `overflow`, `vertical-align`, `text-align`, `th/td padding: 0` 같은 layout-only 속성만 다룬다.
- 화면 전용 CSS가 `TableRoot`, table section, scroll wrapper, native `table`에 `background`, `background-color`, `box-shadow` 같은 surface visual을 지정하면 실패다.
- 화면 전용 CSS가 `.table-cell`의 `background`, `border`, `height`, `padding`, `color`를 재정의하면 실패다.
- 화면 전용 CSS가 `th`, `td`, `tr`에 `background`, `border-bottom`, `height`, `color` 같은 visual owner 속성을 직접 지정하면 실패다.
- row hover, active, selected 표현은 `td/tr background`가 아니라 `.table-cell[data-grid="table"]`의 `data-state` 또는 [Table Cell.md](Table%20Cell.md) contract로 표현한다.
- 화면별 데이터에 맞춰 native `<table>`을 조립할 수 있지만, visible header/body cell shell은 반드시 `.table-cell[data-grid="table"]`와 `data-cell-type` grammar를 사용한다.

## QA status

- QA issue: `../../../site/issue-20260515-1716-table-example-resync/REVIEW.md`, `../../../site/issue-20260515-1727-table-doc-examples-split/REVIEW.md`, `../../../site/issue-20260515-1733-table-boundary-code-hidden/REVIEW.md`
- exact page checked: `../../../site/component/supporting/table.html`
- catalog route checked: `../../../site/index.html#components`
- Figma-to-HTML mismatch count: `0`
- CSS lock: `sonar5.css`는 수정하지 않았다.
- remaining uncertainty: sorting, filtering, column resize, sticky header, editable grid behavior는 current spec에서 제외한다.

## core anatomy

- `TableRoot`
- `ColumnSchema`
- `TableHeader`
- repeated `TableHeaderCell`
- `TableBody`
- repeated `TableRow`
- repeated `TableBodyCell`
- optional `SelectionColumn`
- optional `TableFooter`
- optional `EmptyStateSlot`
- optional `LoadingStateSlot`

## composition 규칙

- `TableRoot`는 parent section 또는 container의 available width를 따라 확장된다.
- `ColumnSchema`는 header와 body row 모두에 동일하게 적용한다.
- header와 body의 column track이 1px 이상 어긋나면 안 된다.
- 모든 row는 같은 column count를 유지한다.
- selection column을 쓰는 경우 header와 body 모두 같은 첫 번째 track을 가진다.
- row height, cell padding, divider, header/body hierarchy는 [Table Cell.md](Table%20Cell.md)가 소유한다.
- `Table`은 `Table Cell`을 grid track에 배치하고 width만 결정한다.
- horizontal overflow가 필요한 경우 `TableRoot` 내부 scroll region이 소유한다.
- vertical pagination은 `TableFooter` 또는 외부 [Pagination.md](Pagination.md) 조합이 소유한다.

## 현재 구현 예시

- Table 페이지의 기본 preview와 HTML code tab은 `../../../site/component/supporting/table.html` exact page와 `tableExampleMarkup()` helper를 canonical composition reference로 보여준다.
- Table 전체 shape는 현재 Figma 전체 node가 없으므로 화면별 column schema, header/body row stack, footer slot 조립 규칙을 이 문서가 소유한다.
- Cell shape와 row visual은 Figma `UI-5.1` node `51:1459`를 반영한 [Table Cell.md](Table%20Cell.md) 기준을 따른다.
- 제품 화면 생성 시 `data-table-example` reference block을 그대로 복사하지 않는다. 필요한 column과 row를 정의한 뒤 `.table-cell[data-grid="table"]` grammar로 header/body cell을 조립한다.
- Header Row column은 selection, `앱`, `활성화`, `상태`, `중요도`, `분류`, `제목`, `진행률 (%)` 순서를 따른다.
- Body Row는 같은 track 안에서 checkbox, app icon slot, switch, status dot, priority indicator, tag, text, progress bar를 배치한다.
- 각 cell 내부 primitive의 exact visual rule은 해당 child component 문서를 따른다.
- `기본` 예시는 Figma table example 전체를 보여준다.
- `구조 예시`는 같은 example을 Header Row와 Body Row로 분리해 column track alignment를 확인한다.
- `소유 경계`는 같은 visual을 반복하지 않고 Table, Table Cell, child component의 ownership matrix를 보여준다.

## variant / property naming rule

- `density`
  - `default`
  - `compact`
- `selection`
  - `none`
  - `checkbox`
- `footer`
  - `none`
  - `pagination`
  - `summary`
- `state`
  - `default`
  - `loading`
  - `empty`

## geometry / spacing

- `TableRoot`는 `radius 8`, `border 1`, `overflow clip`을 기본 shell로 사용한다.
- `TableRoot`의 width는 parent layout이 소유하고, current system preview에서는 `min(100%, available)`로 읽는다.
- header row와 body row의 height는 [Table Cell.md](Table%20Cell.md)의 `36px` shell을 따른다.
- column gap은 별도 gap이 아니라 cell 내부 padding과 grid track으로 해결한다.
- footer가 있으면 table surface 아래에 붙거나 같은 container 안에서 `8px` 이상의 block gap으로 분리한다.
- footer child control의 exact size는 [Pagination.md](Pagination.md)가 소유한다.

## color / theme

- 제품 화면의 `TableRoot`는 semantic surface token을 배경으로 직접 칠하지 않는다.
- Table의 visible background는 투명하게 두고, parent `Section Container` 또는 workspace surface 위에 row/cell을 조립한다.
- Generated List product screen에서 default `.table-cell[data-grid="table"]`이 white block으로 보이면 Table usage contract 위반이다. 이는 Table exact component/specimen surface 자체를 바꾸라는 의미가 아니다.
- Generated List product screen에서는 화면 전용 CSS가 list section context와 그 하위 `.table-cell[data-grid="table"]`에 `--table-cell-surface: transparent`를 제공해야 한다. 직접 `.table-cell { background: ... }`를 쓰는 것은 금지한다.
- border와 row divider는 `TableRoot`가 아니라 [Table Cell.md](Table%20Cell.md)의 cell divider/state contract를 우선한다.
- light theme에서는 white/light surface, subtle divider, dark text hierarchy로 읽는다.
- dark fallback hex를 light theme에 강제하면 안 된다.
- header accent line이 필요한 `tableGrid` 문맥은 [Table Cell.md](Table%20Cell.md)의 header accent rule을 따른다.

## state 규칙

- `default`
  - header row와 body row가 `ColumnSchema`에 맞춰 정렬된다.
- `loading`
  - column schema와 table shell은 유지한다.
  - skeleton이나 spinner의 exact recipe는 이 문서가 소유하지 않는다.
- `empty`
  - `TableRoot`와 header row는 유지할 수 있다.
  - 빈 상태 copy와 action은 [Blankslate.md](Blankslate.md)를 참조하되, Table의 required child로 승격하지 않는다.

## Dashboard compact list usage

- Dashboard의 recent event list는 compact table-like list로 `Table`과 `Table Cell` grammar를 사용할 수 있다.
- Dashboard widget 내부에서는 parent `Widget Container`가 surface를 소유하고, `Table`은 column schema, scroll wrapper, native table layout reset만 소유한다.
- 화면 전용 CSS는 `table`, `col`, `th`, `td`의 layout-only 속성만 다룬다.
- event schema, owner, timestamp, row action, pagination은 product spec이 없으면 smoke placeholder 또는 deferred로 기록한다.
- Dashboard smoke completion에서는 `[data-dashboard-recent-event-list]`와 `data-dashboard-table`이 함께 있어야 compact event list로 인정한다.

## 사용해야 하는 경우

- 데이터 목록을 column 기반으로 비교해야 하는 화면
- row selection, severity/status, owner, timestamp처럼 반복 속성을 정렬해야 하는 화면
- pagination, filter, sort와 함께 쓰는 운영형 목록 화면

## 사용하지 말아야 하는 경우

- 단일 card 목록을 표현해야 할 때
- key/value detail section을 표현해야 할 때
- dashboard metric widget을 표현해야 할 때
- Tree 구조처럼 parent/child indentation이 핵심인 경우

## child family reference

- cell shell, row height, divider, body hover/active surface는 [Table Cell.md](Table%20Cell.md)가 소유한다.
- pagination footer control은 [Pagination.md](Pagination.md)가 소유한다.
- empty state content composition은 [Blankslate.md](Blankslate.md)를 참조한다.
- checkbox primitive는 [Checkbox.md](Checkbox.md)가 소유한다.
- status marker는 [StatusDot.md](StatusDot.md) 또는 [PriorityIndicator.md](PriorityIndicator.md)가 소유한다.

## current spec에서 제외하는 것

- `Table`을 full data-grid engine으로 해석하는 것
- sorting, filtering, column resize, drag, virtual scroll implementation policy
- server/client data fetching state model
- column type formatter의 business semantics
- row click navigation ownership
- sticky header / sticky column behavior
- editable grid behavior

## implementation / reconstruction 시 반드시 지켜야 하는 규칙

- 먼저 `Table`로 root, column schema, header/body row stack을 복원한다.
- 그 다음 [Table Cell.md](Table%20Cell.md)로 header/body cell shell을 복원한다.
- header와 body의 column track을 동일하게 유지한다.
- body row 사이에 독립 border를 추가하지 말고 cell divider rule을 따른다.
- `Table` root border/radius를 row마다 반복하면 안 된다.
- pagination을 table body 안의 row처럼 넣으면 안 된다.
- empty/loading 상태에서도 column schema가 사라졌는지 여부를 명시적으로 결정한다.

## pending / later decision log

- sticky header / sticky column을 별도 variant로 승격할지 여부
- column resize / reorder interaction을 Table이 소유할지 별도 data-grid pattern이 소유할지 여부
- editable table을 `Table` variant로 둘지 별도 `Editable Table` composition으로 분리할지 여부

## 라이트 테마 추가 해석

- light theme에서는 제품 screenshot 기준 parent surface 위에 투명한 Table layout이 놓이고, cell divider/state로 구분된다.
- header는 dark strip이 아니라 밝은 header row 위의 text hierarchy와 accent line으로 읽는다.
- body row hover/active는 dark fill이 아니라 semantic alpha surface로 처리한다.
- selection checkbox와 status marker는 각각 child family token을 유지한다.
