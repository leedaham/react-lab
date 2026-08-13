# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/supporting/pagination.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `17506:14569 Pagination`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Pagination.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

Pagination

## 목적

- `Pagination`은 page navigation과 items-per-page selection을 조합하는 parent composition이다.
- 이 문서는 `Pagination` parent composition과 direct child production control 사용 규칙을 implementation/reconstruction-grade 기준으로 잠근다.
- `Pagination Direction`, `Pagination Page Button`, `Pagination Page Input`, `Pagination Page Size Select` 같은 pagination 전용 helper component set을 만들거나 유지하지 않는다.
- `Pagination`은 기존 production `Select`, `Button`, `Icon Button` instances를 직접 조합한다.

## family boundary

- parent composition canonical 범위
  - `Pagination / variant=default`
  - `Pagination / variant=widget-only`
- direct production child 범위
  - `Select`
  - `Button`
  - `Icon Button`
- local usage / variant-specific content
  - `건씩 보기` label
  - `190,933개 중 1-200` 같은 summary text
  - widget-only 안의 repeated `pageNumberButton` count matrix

## screen usage boundary

- exact component page와 catalog specimen은 `variant=default`와 `variant=widget-only`를 함께 보여줄 수 있다.
- product screen usage에서는 하나의 pagination region에 `Pagination` variant 하나만 선택한다.
- `List`, `Detail`, 일반 table footer, full table workspace footer는 `variant=default`를 사용한다.
- `variant=widget-only`는 dashboard widget, compact card, small panel 내부처럼 좁은 widget context에서만 사용한다.
- `data-list-pagination` 내부에는 `nav[data-pagination]`이 정확히 1개만 있어야 한다.
- `data-list-pagination` 내부의 기본 variant는 `data-pagination-variant="default"`다.
- `default`와 `widget-only`를 같은 screen pagination region에 동시에 렌더링하면 screen usage 실패로 본다.
- screen generator는 exact/specimen HTML 전체를 그대로 붙이지 않고, family/context에 맞는 single variant만 추출해 사용한다.

## current truth

- `Pagination`은 하나의 giant primitive가 아니라 parent composition이다.
- current source 기준 parent variant는 `default | widget-only` 두 개다.
- direct production controls는 각 source component의 state/visual recipe를 그대로 사용한다.
- `Pagination`은 direction, page number, page size를 위한 별도 helper source를 소유하지 않는다.
- direction controls는 direct `Icon Button` instances에 `IconSlot`을 설정해 표현한다.
- page number controls는 direct `Button` instances로 표현한다.
- page size control은 direct `Select` instance로 표현한다.
- page number direct-entry input은 current Figma Pagination composition에서 제거한다.

## 구조 / anatomy

### Pagination / variant=default

- `LeftCluster`
  - direct `Select`
  - `ItemsPerPageLabel`
- `RightCluster`
  - `SummaryText`
  - direct `Icon Button` / first
  - direct `Icon Button` / previous
  - direct `Icon Button` / next
  - direct `Icon Button` / last

### Pagination / variant=widget-only

- direct `Icon Button` / first
- direct `Icon Button` / previous
- repeated direct `Button` page numbers
- direct `Icon Button` / next
- direct `Icon Button` / last

## parent composition 규칙

- `Pagination / variant=default`는 항상 `justify-between` 읽힘을 가진다.
- `LeftCluster`, `RightCluster`는 각각 horizontal row다.
- cluster 간 주 gap은 항상 `8`이다.
- `Pagination / variant=default` overall width current source proof는 `782`다.
- `Pagination / variant=widget-only`는 child cluster를 center-aligned row로 읽는다.
- `Pagination / variant=widget-only` overall width current source proof도 `782`다.
- current source proof의 fixed width `782`는 family board proof다.
- 다만 public API width contract처럼 일반화하면 안 된다.

## direct child visual 규칙

- `Icon Button` direction controls는 [iconButton.md](iconButton.md) source recipe를 그대로 사용한다.
- `Button` page number controls는 [Button.md](Button.md) source recipe를 그대로 사용한다.
- `Select` page-size control은 [Select.md](Select.md) source recipe를 그대로 사용한다.
- `Pagination` parent는 child production control의 fill, stroke, radius, typography, icon recipe를 다시 그리지 않는다.
- `Pagination` parent는 child order, cluster alignment, summary text, and context labels만 소유한다.

## state 규칙

### direct child state ownership

- `Pagination`은 child state recipe를 별도로 정의하지 않는다.
- direction icon state는 direct `Icon Button` state를 사용한다.
- page number state는 direct `Button` state를 사용한다.
- page size state는 direct `Select` state를 사용한다.
- active page number는 current Figma proof에서 direct `Button` pressed state로 표현한다.

## variant별 current truth

### variant=default

- `LeftCluster`와 `RightCluster`를 동시에 가진다.
- `LeftCluster`에는 direct `Select`와 `ItemsPerPageLabel`이 함께 온다.
- `ItemsPerPageLabel` typography는 `Pretendard Bold / 12 / 18`이다.
- `RightCluster`에는 summary text와 direct `Icon Button` direction controls가 함께 온다.
- `SummaryText` typography는 `Pretendard Bold / 12 / 18`이다.
- `PageCountSeparator`, `TotalPageText` foreground는 항상 `semantic.color.text.helper / #808080`다.

### variant=widget-only

- direct `Select`, `ItemsPerPageLabel`, `SummaryText`를 포함하지 않는다.
- centered row 안에 direct `Icon Button` direction controls와 repeated direct `Button`만 직접 확인된다.
- current visible proof에서는 repeated direct `Button`이 `1, 2, 3`으로 보인다.
- repeated count를 public API처럼 고정하면 안 된다.

## child family reference

- Direction controls의 visual state rule은 [iconButton.md](iconButton.md)가 소유한다.
- Page number controls의 visual state rule은 [Button.md](Button.md)가 소유한다.
- Page size control의 visual state rule은 [Select.md](Select.md)가 소유한다.
- `Pagination`은 direct production instances의 parent 배치만 소유한다.

## current spec에서 제외하는 것

- `Pagination` 전체를 giant primitive 하나로 읽는 해석
- `Pagination Direction`, `Pagination Page Button`, `Pagination Page Input`, `Pagination Page Size Select`를 별도 source/helper family로 승격하는 해석
- `pageNumberInput`을 current Pagination composition에 유지하는 해석
- `782` width proof를 모든 구현의 public fixed width로 승격하는 해석
- `widget-only` repeated `pageNumberButton` count를 public contract로 승격하는 해석
- `SummaryText`의 exact 숫자 포맷과 exact wording을 universal truth로 승격하는 해석
- `itemsPerPageSelect`를 total count display control로 읽는 해석

## implementation / reconstruction 시 반드시 지켜야 하는 규칙

- `Pagination`은 parent composition으로 구현하거나 재구성한다.
- `Pagination Direction`, `Pagination Page Button`, `Pagination Page Input`, `Pagination Page Size Select` helper component set을 만들지 않는다.
- `Pagination` 내부 controls는 direct `Select`, `Button`, `Icon Button` instances로 조합한다.
- `Pagination / variant=default`는 `LeftCluster`와 `RightCluster`의 two-cluster reading을 유지한다.
- `Pagination / variant=widget-only`는 centered navigation strip reading을 유지한다.
- page-size `Select`의 trailing indicator를 제거하면 안 된다.
- direct production `Button`, `Icon Button`, `Select`의 visual recipe를 Pagination parent가 재정의하면 안 된다.
- direction `Icon Button`에 label, dropdown indicator, extra padding을 추가하면 안 된다.

## pending / later decision log

- `Select` source root의 fixed `300px` width를 compact pagination context에서도 사용할 수 있게 width policy를 정리할지 여부
- `widget-only` variant의 usage naming을 더 설명적으로 바꿀지 여부

## 라이트 테마 추가 해석

- 본 섹션은 2026-05-04에 확인한 제품 light theme screenshot 기준 보강이다.
- light theme에서도 `Pagination`의 two-cluster composition과 direct production child `24px` compact grammar는 그대로 유지한다.
- page size는 direct `Select`, page numbers는 direct `Button`, direction controls는 direct `Icon Button`으로 읽는다.
- `SummaryText`, `ItemsPerPageLabel`은 strong text로 읽고, `PageCountSeparator`, `TotalPageText`는 helper tone으로 유지한다.
- hover / active 차이는 child production component의 state recipe를 따른다.

## UI-5.1 sync 기록

- sync date: 2026-05-15
- Figma node: `17506:14569` `Pagination`
- Figma variants: `variant=default`, `variant=widget-only`
- implemented HTML source: `site/app.js`
- exact page: `site/component/supporting/pagination.html`
- catalog route: `site/index.html#components`
- CSS owner: `sonar5.css` 기존 pagination/button/input selector grammar 재사용 + `component-css/component.css` Figma gap 보정.
- `sonar5.css` 수정 여부: 수정하지 않음.
- `styles.css` 수정 여부: 수정하지 않음.

## 구현 selector

- `.pagination`
- `.paginator`
- `.paginator-container`
- `.paginator-page-size`
- `.paginator-action`
- `.paginator-range`
- `.paginator-action-btn`
- `.btn`
- `.btn-xs`
- `.btn-icon`
- `.btn-icon-only`
- `.input`

## 별도 CSS 보정

- `.pagination[data-pagination]`: parent composition, two-cluster/widget strip layout, summary text alignment만 보정한다.
- Pagination-specific helper selectors를 새로 만들거나 유지하지 않는다.
- direct `Select`, `Button`, `Icon Button`의 fill, stroke, radius, typography, icon sizing은 각 child component source가 소유한다.
- Pagination parent가 direct child visual recipe를 재정의하면 Figma source ownership mismatch로 본다.
- page number direct-entry input은 current Figma Pagination composition에서 제거되었으므로 CSS/API 계약으로 유지하지 않는다.
- light/dark theme 값은 child production component token path를 따른다.

## QA 기록

- exact component page: `site/component/supporting/pagination.html`
- catalog route: `site/index.html#components`
- exact page에서 default variant와 widget-only variant가 렌더링됨을 확인했다.
- 확인 치수: parent `782 x 24`, direct `Icon Button`/`Button` controls `24 x 24`.
- current direct `Select` instance는 production `Select` source의 fixed `300px` width를 따른다. compact page-size width는 별도 `Select` source width policy correction 없이는 Pagination parent에서 임의로 보정하지 않는다.
- active page button은 direct `Button` pressed state로 확인했다.
- catalog route에서 `Pagination` 카드와 `./component/supporting/pagination.html` 링크를 확인했다.
- mismatch count: 0

## QA refresh - smoke contract feedback

- QA date: `2026-05-29`
- trigger issue: `../../../screen-test-outputs/issues/issue-20260528-1333-list-detail-smoke`
- selector ownership: `component-css/component.css`의 `.pagination[data-pagination]` gap selector가 light/dark theme foreground와 control surface를 소유한다.
- light theme result: pagination root, meta text, helper text, and direct child production controls must resolve through their own source component tokens.
- dark theme result: direct child production controls must resolve through their own source component tokens.
- compact grammar: direct `Icon Button` and page-number `Button` controls are `24px`; direct `Select` currently keeps production source width until Select width policy is corrected.
- `sonar5.css` 수정 없음.
- smoke HTML/CSS 산출물 수정 없음.
