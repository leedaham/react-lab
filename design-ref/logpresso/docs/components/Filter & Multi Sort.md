# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/supporting/filter-and-multi-sort.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 / root page 204:330, filterAddSet active 8644:40727, sortPanelSet ruleCount=2 12256:30752`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Filter & Multi Sort.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

Filter & Multi Sort

## 목적

- `Filter & Multi Sort`는 `Action Bar` 위에 얹혀 쓰이는 local filter/sort system의 current visible truth를 잠그는 local usage 문서다.
- 이 문서는 `filter/sort` trigger set, add/reset action set, applied item set, sort panel set, 그리고 `filterAppliedItemSet`에 붙는 attached opened proof의 구조와 연결 관계를 implementation/reconstruction-grade 기준으로 기록한다.
- 이 문서는 source에서 직접 확인된 UI current truth와 attached/open relation만 소유한다.
- broader UX flow, data semantics, keyboard contract, query logic, orchestration rule은 이 문서의 current truth로 승격하지 않는다.

## Figma evidence

- Figma file: `UI-5.1`
- root page: `204:330`
- confirmed nodes:
  - `filterTriggerSet`: `8644:40682`
  - `sortTriggerSet`: `12252:28707`
  - `filterAddSet`: `8644:40717`, active specimen `8644:40727`
  - `sortAddSet`: `12256:28745`
  - `filterAppliedItemSet`: `8646:43190`, normal applied specimen `9357:5327`
  - `sortAppliedItemSet`: `12256:29027`, active specimen `12256:29040`
  - `sortPanelSet`: `12256:30751`, `ruleCount=2` specimen `12256:30752`
  - `filterSummaryRow / local composition`: `8801:7414`
- confirmed variant/state 범위:
  - compact trigger/action default, hover, active, disabled visual grammar
  - `filterAddSet active` attached dropdownCheckboxList proof
  - `filterAppliedItemSet` normal/tag/calendar applied and active attached proof
  - `sortAppliedItemSet` applied, multiApplied, active relation
  - `sortPanelSet` `ruleCount=1 | 2`
- not confirmed:
  - query/filter operator semantics
  - keyboard/focus choreography
  - collision-aware overlay placement
  - `Action Bar` sample 전체 ownership

## 구현 기준

- exact page: `../../../site/component/supporting/filter-and-multi-sort.html`
- catalog route: `../../../site/index.html#components`
- source helper: `../../../site/app.js`의 `filterMultiSortHtmlExample()`, `filterPreview()`
- generated page owner: `../../../site/generate-component-pages.mjs`
- root selector / data contract: `[data-filter-multi-sort][data-node-id="204:330"]`
- base CSS selector from `sonar5.css`: `.btn`, `.btn-default`, `.btn-icon`, `.btn-icon-only`, `.input`, `.input-search`, `.dropdown-list`, `.dropdown-option`, `.checkbox`, `.label`
- gap CSS selector from `component-css/component.css`: `[data-filter-multi-sort]`, `[data-filter-trigger]`, `[data-filter-add-panel]`, `[data-filter-applied-item]`, `[data-sort-panel]`
- HTML handoff:
  - 전체 HTML snippet은 이 문서에 복사하지 않는다.
  - 실제 DOM, class, data attribute 기준은 exact page와 `filterMultiSortHtmlExample()`를 따른다.
  - preview와 code tab HTML은 같은 component body grammar를 사용한다.

## screen usage boundary

- `[data-filter-multi-sort]`는 exact/specimen layout root다.
- `[data-filter-multi-sort-applied-row]`도 exact/specimen row root다.
- 위 두 selector는 제품 화면의 inline applied summary wrapper로 사용하지 않는다.
- 제품 화면에서 compact applied filter/sort summary가 필요하면 screen-owned wrapper를 새로 두고, child control인 `[data-filter-applied-item]`, `[data-sort-applied-item]` 같은 selector만 필요한 범위에서 재사용한다.
- `[data-filter-multi-sort]` root를 Action Bar 아래 inline summary로 재사용하면 exact page용 `width 544`, `min-height 412`와 applied row `min-height 164`가 제품 화면에 새어 들어가 Action Bar와 Table 사이에 큰 빈 공간이 생긴다.
- 이 실패는 screen HTML을 임시 보정하지 않고 component usage contract 또는 screen validator에서 막는다.

## QA status

- QA issue: `../../../site/issue-20260518-1135-filter-multi-sort-sync/REVIEW.md`
- cleanup QA issue: `../../../site/issue-20260518-1148-demo-selector-audit/REVIEW.md`
- exact page checked: `../../../site/component/supporting/filter-and-multi-sort.html`
- catalog route checked: `../../../site/index.html#components`
- Figma-to-HTML mismatch count: `0`
- CSS lock:
  - `sonar5.css` 수정 없음
  - `component-css/component.css`의 확인된 gap selector만 사용
  - `.demo-filter-*`, `.ui-filter*`, `.lp-filter*` body selector 0건
- documentation gate: QA mismatch `0` 이후 공식 component Markdown 갱신 가능 상태

## Current QA refresh

- QA issue: `../../../site/issue-20260519-1421-composition-current-qa-refresh`
- Figma evidence: root page `204:330`, `filterAddSet active` `8644:40727`, `sortPanelSet ruleCount=2` `12256:30752`
- exact page result: light/dark theme 모두 `[data-filter-multi-sort][data-node-id="204:330"]` root 확인
- filter add panel result: `[data-filter-add-panel]` `200 x 208`, option count `6`, required icons `filter_alt`, `search`, `arrow_drop_down` 확인
- sort panel result: `[data-sort-panel]` `296 x 136`, sort rule count `2`, panel action count `2`, required icons `drag_indicator`, `highlight_off`, `add`, `delete`, `arrow_drop_up` 확인
- catalog route result: `Filter & Multi Sort` link resolves to `component/supporting/filter-and-multi-sort.html`
- mismatch count: `0`
- documentation gate: `allowed`
- `sonar5.css`는 읽기 전용 reference로만 사용했고 수정하지 않았다.

## family boundary

- current set 범위
  - `filterTriggerSet`
  - `sortTriggerSet`
  - `filterAddSet`
  - `sortAddSet`
  - `filterResetSet`
  - `filterAppliedItemSet`
  - `sortAppliedItemSet`
  - `sortPanelSet`
- local composition 범위
  - `filterSummaryRow / local composition`
- current spec에서 제외하는 범위
  - `Sample / actionBar / ...`
  - `Shared proof / ...`

## current truth

- `filterTriggerSet`은 compact filter trigger set이다.
- `sortTriggerSet`은 compact sort trigger set이다.
- `filterAddSet`, `sortAddSet`은 add action set이다.
- `filterResetSet`은 small text-like reset action set이다.
- `filterAppliedItemSet`은 display tag가 아니라 interactive applied chip set이다.
- `sortAppliedItemSet`은 interactive applied item set이다.
- `sortPanelSet`은 `sortAppliedItemSet`이 여는 interactive sort editor panel set이다.
- `filterAppliedItemSet` active는 `itemType`에 따라 다른 attached opened proof를 직접 가진다.
- 모든 trigger/action/item control은 current source 기준 `24px` compact height grammar를 공유한다.

## exact visual spec

### compact trigger / action common grammar

- `filterTriggerSet`, `sortTriggerSet`, `filterAddSet`, `sortAddSet`, `filterResetSet`, `filterAppliedItemSet`, `sortAppliedItemSet`은 outer height `24`를 유지한다.
- compact control radius는 항상 `8`이다.
- compact control 기본 typography는 `Pretendard Medium / 12 / 18`이다.
- compact dropdown indicator/icon optical step은 `18px`다.
- fallback hex/rgba 값은 source reference이며, light theme 구현에서는 semantic token value를 우선한다.

### filterTriggerSet / sortTriggerSet

- outer size는 항상 `24 x 24`다.
- inner inset은 항상 `3`이다.
- inner gap은 항상 `2`다.
- default surface는 `semantic.color.surface.container.default / #070b13`다.
- default border는 `1px solid semantic.color.border.interactive.default / rgba(126,140,222,0.16)`다.
- hover surface는 `semantic.color.interactive.neutral.surface.hover / #0e1322`다.
- hover shadow는 `shadow/base`다.
- active는 border가 `semantic.color.interactive.brand.accent / #ff692a`로 바뀌고, inner emphasis surface `semantic.color.interactive.neutral.surface.emphasis / #151c33`와 `shadow/inner`를 가진다.
- disabled는 `semantic.color.interactive.neutral.surface.disabled / #0e1322` surface와 disabled border/fill treatment를 가진다.
- `filterTriggerSet`, `sortTriggerSet`의 visual recipe는 [iconButton.md](iconButton.md) compact grammar를 상속한다.

### filterAddSet / sortAddSet

- current visible width proof는 `63`이다.
- default surface는 `semantic.color.background.transparent / rgba(0,0,0,0)`다.
- border는 `1px solid semantic.color.utility.border-alpha / rgba(255,255,255,0.1)`다.
- inset은 항상 `px 9 / py 3`이다.
- inner gap은 항상 `4`다.
- hover는 `semantic.color.interactive.neutral.surface.hover / #0e1322`와 `shadow/base`를 추가한다.
- active는 `semantic.color.interactive.neutral.surface.emphasis / #151c33` overlay와 `shadow/inner`를 가지며, foreground는 `semantic.color.interactive.brand.accent / #ff692a`로 바뀐다.
- `filterAddSet active` supporting opened proof는 `dropdownCheckboxList` grammar를 따른다.
- `filterAddSet active` supporting opened proof의 current visible width proof는 `200`, height proof는 `208`이다.
- `filterAddSet active` supporting opened proof는 `padding 4`, `gap 4`, `radius 8`, `shadow/base`를 가진다.
- `filterAddSet active` supporting opened proof의 search row는 full-width `SearchInput` grammar를 재사용하고, trailing helper text를 포함한다.
- `filterAddSet active` supporting opened proof의 visible checkbox row proof는 `6`개다.
- `filterAddSet active` supporting opened proof의 scroll affordance proof는 `right 3 / top 31 / width 4 / height 69`다.

### filterResetSet

- current visible width proof는 `50`이다.
- compact text-like button grammar를 유지한다.
- default는 transparent surface + utility alpha border를 유지한다.
- hover는 `#0e1322` hover surface와 `shadow/base`를 가진다.
- active는 emphasis surface `#151c33`, `shadow/inner`, accent foreground `#ff692a`를 가진다.

### filterAppliedItemSet

- base chip grammar는 `pl 9 / pr 3 / py 3`, gap `4`, radius `8`, height `24`다.
- default/hover/active base width proof는 `79`다.
- applied width proof는 아래와 같다.
  - `itemType=normal`: `129`
  - `itemType=tag`: `143`
  - `itemType=calendar`: `247`
- default surface는 `#070b13`, default border는 `rgba(126,140,222,0.16)`다.
- hover surface는 `#0e1322`, hover shadow는 `shadow/base`다.
- applied foreground는 `semantic.color.interactive.brand.accent / #ff692a`다.
- active는 brand accent border `#ff692a`, emphasis surface `#151c33`, `shadow/inner`, 그리고 upward dropdown indicator를 가진다.
- `itemType=normal | tag | calendar`는 모두 같은 chip shell을 공유하지만, active 시 붙는 attached opened proof는 서로 다르다.

### sortAppliedItemSet

- base chip grammar는 `filterAppliedItemSet`과 같은 compact chip grammar를 공유한다.
- current visible width proof는 아래와 같다.
  - `default | hover | active | applied`: `89`
  - `multiApplied`: `77`
- applied / multiApplied foreground는 `#ff692a` accent로 읽는다.
- active state는 emphasis surface `#151c33`, brand accent border `#ff692a`, `shadow/inner`, upward indicator를 가진다.

### filterAppliedItemSet attached opened proof

- `filterAppliedItemSet` active chip 아래 `top=28`에 붙는 supporting opened proof다.
- 별도 independent set owner가 아니라 `filterAppliedItemSet`의 active/opened reading 안에 포함된다.
- `itemType=normal`, `itemType=tag` proof는 `border 1`, `radius 8`, `padding 8`, `gap 8`, `shadow/base` grammar를 공유한다.
- `itemType=normal` proof background는 `semantic.color.background.canvas / #0b0f15`다.
- `itemType=tag` proof background는 `semantic.color.surface.container.default / #070b13`다.
- `itemType=normal` proof는 title row + close icon + input field stack을 가진다.
- `itemType=normal` proof의 close icon size proof는 `16`이다.
- `itemType=normal` proof의 input field width proof는 `169`다.
- `itemType=tag` proof는 title row + close icon + input field + repeated `checkbox + Tag` row stack을 가진다.
- `itemType=tag` proof의 inner row gap은 `4`다.
- `itemType=tag` proof의 repeated row는 `padding 4`, `radius 4`, `gap 4` grammar를 가진다.
- `itemType=tag` proof의 checkbox는 `16` glyph를 쓰고, inner tag pill은 `min-height 20`, `rounded-full`, `px 8 / py 1` grammar를 가진다.
- `itemType=tag` proof의 visible tag color proof는 neutral strong, error, warning, info, success, system accent 계열까지 직접 확인된다.
- `itemType=calendar` proof는 same attached position을 가지지만, `normal/tag`와 동일한 giant recipe로 합치지 않는다.
- `itemType=calendar` proof background는 `#070b13`, border는 `semantic.color.border.default / rgba(126,140,222,0.16)`, padding/gap은 `8`이다.
- `itemType=calendar` proof는 quick preset button row, calendar grid, time input group, accent helper action을 함께 가진다.
- `itemType=calendar` quick preset button은 compact button grammar를 재사용한다.
- `itemType=calendar` proof의 header row height proof는 `20`이다.
- `itemType=calendar` proof의 preset action row gap proof는 `8`이다.
- `itemType=calendar` preset button grammar는 `px 7 / py 1`, `radius 6`이다.
- `itemType=calendar` proof의 year-month navigation wrapper width proof는 `232`, height proof는 `24`다.
- `itemType=calendar` proof는 `2`개의 calendar column을 `gap 8`로 배치한다.
- calendar grid cell size proof는 `24 x 24`다.
- `itemType=calendar` proof의 calendar day/date grid width proof는 `216`이다.
- time input은 `Field Specialization Matrix` compact input grammar를 참조하며, visible field width proof는 `40`이다.
- time field labels는 아래쪽에 `시 / 분 / 초`를 두고, colon separator width proof는 `4`다.
- `itemType=calendar` proof의 helper action은 accent underlined text다.
- `itemType=calendar` proof footer action row는 `justify-end`, `gap 8`이고, compact cancel/confirm button grammar를 재사용한다.

### sortPanelSet

- panel background는 `semantic.color.surface.container.default / #070b13`다.
- border는 `1px solid semantic.color.border.interactive.default / rgba(126,140,222,0.16)`다.
- radius는 `8`, padding은 `8`, gap은 `8`, shadow는 `shadow/base`다.
- current visible width proof는 `296`이다.
- title row content width proof는 `280`이다.
- `ruleCount=1` current visible height proof는 `104`다.
- `ruleCount=2` current visible height proof는 `136`이다.
- each sort rule row는 `drag_indicator 18`, field selector button, direction selector button, close icon `18`을 가진다.
- title row는 `px 8` inset을 가진다.
- title row의 inner control cluster gap proof는 `16`이다.
- selector buttons는 compact dropdown button grammar를 재사용한다.
- panel 하단 action row는 transparent surface + utility alpha border를 가진 compact button grammar를 재사용한다.
- `정렬 추가`, `정렬 제거` action row의 leading icon size proof는 `16`이다.
- `정렬 추가`, `정렬 제거` action row는 current source canonical truth다.

## 구조 / anatomy

### filterTriggerSet

- compact trigger control row만 소유한다.
- badge/count를 소유하지 않는다.
- filter가 적용돼 있는 current source state는 `pressed` 읽힘으로 본다.
- active/pressed state는 attached opened panel relation까지 포함해 읽는다.

### sortTriggerSet

- compact trigger control row만 소유한다.
- active/pressed state는 sort opened state relation까지 포함해 읽는다.

### filterAddSet / sortAddSet

- compact add action control이다.
- active state에서는 attached panel relation이 직접 확인된다.

### filterResetSet

- small text-like reset action control이다.
- reset wording은 local copy일 수 있지만, reset action 역할은 current truth다.

### filterAppliedItemSet

- applied filter 요약을 보여주는 interactive chip set이다.
- `itemType=normal | tag | calendar` axis를 가진다.
- active state는 chip 자체의 pressed reading만이 아니라 attached panel relation까지 포함한다.
- attached opened proof subtype은 `itemType`에 따라 달라진다.
- `itemType=normal`은 normal filter value proof로 읽는다.
- `itemType=tag`는 tag value proof로 읽는다.
- `itemType=calendar`는 date/calendar value proof로 읽는다.
- 세 subtype은 연결 관계는 같지만 내부 recipe는 동일한 giant panel grammar로 합치지 않는다.

### sortAppliedItemSet

- applied sort rule을 요약하는 interactive item set이다.
- `state=default | hover | active | applied | multiApplied` current visible axis가 직접 확인된다.
- active state는 `sortPanelSet` 연결 relation까지 포함한다.

### sortPanelSet

- 단순 dropdown surface가 아니라 interactive sort editor panel set이다.
- `ruleCount=1 | 2` current visible axis가 직접 확인된다.
- panel 내부 row reorder / add / remove는 current source에서 직접 확인되는 canonical truth다.

### filterSummaryRow / local composition

- supporting local composition이다.
- 정식 set이 아니며, current spec owner가 아니다.

## set별 role / visual 규칙

### compact trigger / action grammar

- `filterTriggerSet`, `sortTriggerSet`, `filterAddSet`, `sortAddSet`, `filterResetSet`은 모두 `24px` compact height를 유지한다.
- compact trigger/action set은 dense inline utility reading을 유지한다.
- trigger/action set에 sample-only badge/count, summary text, extra helper text를 역주입하면 안 된다.

### applied item grammar

- `filterAppliedItemSet`, `sortAppliedItemSet`은 display-only badge가 아니라 interaction 가능한 applied item grammar를 가진다.
- active state는 attached panel relation을 여는 상태로 읽는다.
- `filterAppliedItemSet`을 `Tag` family 그대로로 치환하면 안 된다.

### panel grammar

- `sortPanelSet`은 opened panel set이다.
- `filterAppliedItemSet` active에 붙는 opened proof는 chip과 분리된 attached surface를 가진다.
- panel 내부 row는 하나의 giant primitive로 다시 만들지 않고 supporting child recipe 재사용을 우선한다.

## attached / opened relation

- `filterTriggerSet` active/pressed는 attached opened filter relation을 가진다.
- `sortTriggerSet` active/pressed는 sort opened relation을 가진다.
- `filterAddSet` active는 add panel relation을 가질 수 있다.
- `sortAddSet` active는 sort add panel relation을 가질 수 있다.
- `filterAppliedItemSet` active는 반드시 `itemType`에 맞는 attached opened proof를 연다.
- `sortAppliedItemSet` active는 반드시 `sortPanelSet`을 연다.
- attached/open relation을 current truth로 기록하되, placement algorithm, collision handling, keyboard navigation, focus choreography는 이 문서에서 닫지 않는다.

## supporting child / reuse boundary

- `filterResetSet`의 primitive visual truth는 [Button.md](Button.md) 계열을 재사용한다.
- `filterAddSet`, `sortAddSet`도 [Button.md](Button.md) 계열 재사용으로 읽는다.
- `filterTriggerSet`, `sortTriggerSet`의 compact trigger visual grammar는 [iconButton.md](iconButton.md) / utility trigger 계열 재사용으로 읽는다.
- opened panel 안 selection row grammar는 [dropdownCheckboxList.md](dropdownCheckboxList.md)의 row recipe 재사용을 우선한다.
- tag subtype panel 안에서 보이는 visual tag는 [Tag.md](Tag.md)를 참조할 수 있다.
- 다만 `filterAppliedItemSet` 자체를 [Tag.md](Tag.md) family로 환원하면 안 된다.
- panel 안 search row가 직접 확인될 때만 [Search.md](Search.md)의 `SearchInput` truth를 참조한다.
- tag subtype panel 안 checkbox row는 [Checkbox.md](Checkbox.md)의 primitive truth를 참조한다.
- calendar subtype panel 안 time field는 `Field Specialization Matrix` current truth를 참조한다.

## 구현 / HTML 기준

- verified exact page는 `site/component/supporting/filter-and-multi-sort.html`이다.
- 구현 source는 `site/app.js`의 `filterMultiSortHtmlExample()`이며, preview와 HTML code tab이 같은 component body grammar를 사용한다.
- component root는 `data-filter-multi-sort`를 사용하고, Figma source node `204:330`을 `data-node-id`로 남긴다.
- trigger/action 영역은 `.btn`, `.btn-default`, `.btn-icon`, `.btn-icon-only`를 먼저 사용한다.
- filter add opened proof는 `.dropdown-list`, `.dropdown-option`, `.checkbox`, `.label`, `.input.input-search`를 재사용한다.
- sort opened proof는 `data-sort-panel` 내부에서 2개 rule row와 `정렬 추가`, `정렬 제거` action row를 표현한다.
- `filterTriggerSet`, `sortTriggerSet`, `filterAddSet`, `filterAppliedItemSet`, `sortAppliedItemSet`, `sortPanelSet`의 compact size gap은 `site/component-css/component.css`의 `data-filter-*`와 `data-sort-*` 의미 속성 selector가 보정한다.
- `sonar5.css`는 읽기 전용 product CSS reference이며 이번 구현에서 수정하지 않는다.
- QA 기준 mismatch count는 `0`이며, 확인 evidence는 `site/issue-20260518-1135-filter-multi-sort-sync/REVIEW.md`에 기록한다.

## current spec에서 제외하는 것

- `Action Bar` sample 조합 전체를 current set truth로 승격하는 해석
- sample copy, business wording, count matrix를 public contract로 승격하는 해석
- query builder semantics, filter operator semantics, multi-sort business logic를 current UI spec로 승격하는 해석
- keyboard shortcut, roving focus, screen-reader contract를 current truth로 승격하는 해석
- `filterSummaryRow / local composition`을 formal set으로 승격하는 해석
- `filterAppliedItemSet`을 plain `Tag` family로 치환하는 해석
- `filterAppliedItemSet` active에 붙는 세 subtype proof를 하나의 giant identical panel recipe로 평탄화하는 해석
- `filterAppliedItemSet` active에 붙는 normal/tag/calendar proof를 같은 크기/같은 배경/같은 내부 recipe로 구현하는 해석

## implementation / reconstruction 시 반드시 지켜야 하는 규칙

- `filterTriggerSet`, `sortTriggerSet`은 compact trigger로 유지한다.
- trigger set에 badge/count를 추가하면 안 된다.
- `filterAddSet`, `sortAddSet`, `filterResetSet`을 ordinary large button grammar로 확장하면 안 된다.
- `filterAppliedItemSet`은 interactive applied chip으로 유지하고, plain `Tag`로 대체하면 안 된다.
- `filterAppliedItemSet active`와 itemType별 attached opened proof의 연결을 끊으면 안 된다.
- `sortAppliedItemSet active`와 `sortPanelSet`의 연결을 끊으면 안 된다.
- `sortPanelSet`에서 row reorder / add / remove truth를 삭제하면 안 된다.
- `filterAppliedItemSet` active에 붙는 `normal | tag | calendar` subtype proof를 하나의 동일한 opened recipe로 합치면 안 된다.
- `filterAppliedItemSet`의 applied width 차이를 무시하고 하나의 동일 width chip으로 평탄화하면 안 된다.
- `sortAppliedItemSet`의 `applied | multiApplied` 차이를 지우면 안 된다.
- sample/action bar usage를 formal current set anatomy로 끌어올리면 안 된다.
- `filterSummaryRow / local composition`을 formal component set처럼 구현하면 안 된다.

## pending / later decision log

- exact keyboard/focus/accessibility contract
- attached panel placement/orchestration contract
- filter operator/data semantics와 UI set의 ownership boundary
- 이 local system을 global canonical family로 승격할지 여부
