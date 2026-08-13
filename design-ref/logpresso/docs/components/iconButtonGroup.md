# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/actions/iconbuttongroup.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/iconButtonGroup.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

iconButtonGroup

## 목적

- `iconButtonGroup`은 여러 `iconButton` child를 하나의 connected group으로 조합하는 composition family다.
- `iconButtonGroup`은 seam, edge radius, overlap을 소유한다.
- child `iconButton` 내부 truth는 [iconButton.md](iconButton.md)가 소유한다.

## Figma evidence

- Figma file: `UI-5.1`
- scope anchor: `4:657`
- component node: `8557:9808`
- confirmed counts: `2`, `3`, `4`, `5`
- confirmed anatomy: repeated single-icon `iconButton` children
- confirmed geometry: count `3` specimen `70 x 24`, child `24 x 24`, icon `18 x 18`, seam overlap, edge-only radius
- not confirmed: active, selected, pressed 같은 group-owned state

## 구현 기준

- exact page: `../../../site/component/actions/iconbuttongroup.html`
- catalog route: `../../../site/index.html#components`
- source helper: `../../../site/app.js`의 `iconButtonGroupDemo()`, `iconButtonGroupDocExamples`, `renderIconButtonGroupDocumentationPage()`
- generated owner: `../../../site/generate-component-pages.mjs`
- root selector / data attribute: `.btn-group`
- base CSS selector from `sonar5.css`: `.btn-group`, `.btn-group > .btn`, `.btn.btn-icon-only`
- gap CSS selector from `component-css/component.css`: `.btn-group`, `.btn-group[aria-label="Icon Button Group"] > .btn`, `.btn-group[aria-label="Icon Button Group"] > .btn > .material-icon`
- HTML handoff policy: 긴 HTML snippet은 이 문서에 복사하지 않는다. 실제 DOM, class, data attribute는 exact page에서 확인한다.

## QA status

- QA issue: `../../../site/issue-20260515-1002-button-iconbutton-sonar5-sync/REVIEW.md`
- exact page checked: `../../../site/component/actions/iconbuttongroup.html`
- catalog route checked: `../../../site/index.html#components`
- Figma-to-HTML mismatch count: `0`
- CSS lock: `sonar5.css`는 수정하지 않았고 `.btn-group`과 `.btn-icon-only` 계열 selector를 읽기 전용 base로 재사용한다.
- remaining uncertainty: 전체 public validation의 기존 missing stylesheet resource mismatch는 iconButtonGroup 본체 mismatch가 아니다.

## 구조 / anatomy

- `Root`
- left-to-right repeated `iconButton`

## variant/property naming rule

- `count`: `2 | 3 | 4 | 5`
- current grouped sample의 count는 `2 | 3 | 4 | 5`로만 관찰된다.

## 실제 UI recipe

- `Root`
  - 항상 `flex items-center pr-px`
- grouped sample child order
  - child는 항상 left-to-right 순서로 반복된다.
  - group은 child 사이 `gap`을 두지 않는다.
- child seam rule
  - 각 child는 항상 `mr-[-1px]` seam overlap을 가진다.
  - group seam은 항상 `1px border` overlap으로 읽는다.
- grouped sample child form
  - current grouped sample의 child는 항상 `single Icon only` grouped `iconButton`이다.
  - current grouped sample의 child outer size는 항상 `24 x 24`다.
  - current grouped sample의 child inset은 항상 `p 3`이다.
  - current grouped sample의 child `Icon`은 항상 `18 x 18`이다.
  - current grouped sample의 child는 `DropdownIndicator`를 노출하지 않는다.
- edge radius rule
  - 첫 child만 left radius를 가진다.
  - middle child는 outer edge radius가 없다.
  - 마지막 child만 right radius를 가진다.

## forbidden rule

- child를 `iconButton`이 아닌 다른 family로 섞는 것은 금지한다.
- middle child에 edge radius를 주는 것은 금지한다.
- seam overlap을 제거하는 것은 금지한다.
- child 사이를 `gap`, `space-x`, `divide`, 별도 divider로 벌리는 것은 금지한다.
- `overflow-hidden` clipping으로 seam을 대체하는 것은 금지한다.
- group이 child icon family, icon size, inset, outer size, slot rule을 다시 쓰는 것은 금지한다.
- current grouped sample child `single Icon only / 24 x 24` sample을 `iconButton` family canonical truth로 승격하는 것은 금지한다.

## usage boundary

- `iconButtonGroup`은 group seam/radius만 소유한다.
- `iconButtonGroup`은 `count`, `left-to-right order`, `mr-[-1px]` seam overlap, edge-only radius만 소유한다.
- child `iconButton`의 variant, state, icon, indicator truth는 [iconButton.md](iconButton.md)가 소유한다.
- current grouped sample child `single Icon only / 24 x 24` form은 grouped usage sample일 뿐이고, `iconButton` family canonical truth를 덮지 않는다.
- group usage가 `iconButton` family canonical truth를 덮어쓰는 것은 금지한다.

## implementation / reconstruction proof rule

- count가 `2 | 3 | 4 | 5` 중 하나인지 확인한다.
- `Root`가 `pr-px` seam compensation을 유지하는지 확인한다.
- 각 child가 `mr-[-1px]` seam overlap을 유지하는지 확인한다.
- 첫 child만 left radius, 마지막 child만 right radius, middle child는 radius가 없는지 확인한다.
- child가 current grouped sample 기준 `single Icon only / 24 x 24 / p 3 / Icon 18 / no DropdownIndicator`를 유지하는지 확인한다.
- child가 `iconButton` family canonical truth와 grouped usage sample boundary를 넘어서 재정의되지 않았는지 확인한다.
