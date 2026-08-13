# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/navigation-shell/tabnav.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 / tabNav 8983:8714`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/tabNav.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

tabNav

## Figma evidence

- Figma file: `UI-5.1`
- Figma node: `tabNav` `8983:8714`
- Figma URL: `https://www.figma.com/design/dodpG7QVPyrxWI1uFjKYrC/UI-5.1?node-id=8983-8714`
- screenshot evidence: `435 x 380`
- confirmed scope: underline navigation strip, `tabNavItem`, `tabAdd` add-only accessory

## 구현 기준

- exact page: `site/component/navigation-shell/tabnav.html`
- catalog route: `site/index.html#components`
- source owner: `site/app.js`
- source helper: `tabNavMarkup()`, `tabNavHtmlExample()`, `tabNavPreview()`, `tabNavItem()`, `tabNavAdd()`
- implemented HTML owner: `app.js` helper output and `generate-component-pages.mjs` generated exact page
- root selector contract: `.tab-nav`
- base CSS selector from `sonar5.css`: `.tab-nav`, `.tab-nav-container`, `.tab-nav-item`, `.tab-nav-add`
- gap CSS file: `component-css/component.css`, 기존 `.tab-nav*` 보정 사용, 이번 문서 계약 보강에서는 신규 보정 없음
- `sonar5.css`는 read-only reference이며 수정하지 않는다.

## QA status

- exact page와 catalog route가 존재한다.
- exact page는 `sonar5.css`와 `component-css/component.css`를 외부 stylesheet로 로드한다.
- QA mismatch count: `0`

## 목적

- `tabNav`는 content area, modal, right-side drawer 상단에 쓰이는 strip navigation family다.
- `tab`의 lightweight variant가 아니라 별도 family로 읽는다.
- `pillTabs`보다 hierarchy가 높은 navigation strip 역할을 가질 수 있다.

## family boundary

- family canonical 범위
  - `tabNavItem`
  - `tabNav`
- shared pattern
  - `tabAdd`
- sample/local usage
  - `Sample / tabNav 1`
  - `Sample / tabNav 2`
- `tabAdd`는 shared overflow controls pattern으로 읽되, `tabNavItem` anatomy에 포함하지 않는다.

## current truth

- `tabNavItem`
  - `state=default | hover | selected`
- `tabNav`
  - `items=1..6` count matrix가 존재한다.
  - repeated nav strip current source로는 유효하지만, count matrix 전체를 public API로 일반화하면 안 된다.
  - `tabAdd` property가 존재하며, current Figma node에서는 `showFrame=false`로 add iconButton만 sibling accessory로 붙는다.
- `Sample / tabNav` 프레임은 current spec 본문 근거가 아니다.

## 구조 / anatomy

- `tabNavItem` 기본 흐름
  - `LeadingIcon? -> Label -> CountBadge? -> StateIndicator? -> TrailingDelete?`
- `tabNav`는 item box shell이 아니라 rail shell을 소유한다.
- rail 위에 repeated `tabNavItem`이 놓이고, selected item만 underline을 가진다.
- trailing action group은 `tabNavItem` core anatomy가 아니다.
- `tabAdd`는 `tabNavItem` 내부 slot이 아니라 `tabNav` rail의 sibling accessory다.

## visual shell 규칙

- `tabNav` rail 높이는 항상 `40px`로 읽는다.
- rail은 항상 bottom divider를 가진다.
- rail border는 bottom divider only다.
- top/left/right stroke를 추가하면 안 된다.
- rail bottom divider color는 항상 `semantic.color.border.interactive.default / rgba(126,140,222,0.16)`다.
- rail inset은 항상 `pt 4 / px 8`이다.
- rail 내부 item 간 gap은 `4px`다.
- `tabNavItem` 자체는 filled box shell이 아니다.
- selected signal은 item fill이 아니라 `2px accent underline`이다.
- selected underline color는 항상 `semantic.color.interactive.brand.accent / #ff692a`다.
- selected underline은 item box 내부가 아니라 rail 위 marker로 읽는다.
- selected underline 두께는 `2px`다.
- selected underline은 `left 8 / right 8 / top 34.5` 위치로 읽는다.
- item 내부 density는 항상 `px 16 / py 8`이다.
- item 내부 주 gap은 항상 `16px`이고, label cluster 내부 gap은 `4px`다.
- label typography는 항상 `Pretendard 14/20` 계열이다.
- count badge typography는 항상 `12/18` 계열로 읽는다.
- leading icon은 `16px` 계열로 읽는다.

## state 규칙

- `default`
  - background 변화 없이 `semantic.color.text.helper / #808080` foreground tier로 읽는다.
  - count badge fill은 `semantic.color.surface.badge.neutral.strong / #616ebb`다.
- `hover`
  - item fill보다 text hierarchy 변화가 먼저 읽힌다.
  - label foreground는 `semantic.color.text.primary / #ebebeb`로 올라간다.
  - hover를 filled surface처럼 문서화하면 안 된다.
- `selected`
  - accent text + underline이 핵심이다.
  - underline은 rail 위에 놓인 selected marker로 읽는다.
  - label foreground는 항상 `semantic.color.interactive.brand.accent / #ff692a`다.
  - label weight는 `Bold 700`으로 읽는다.
  - count badge fill도 `semantic.color.interactive.brand.accent / #ff692a`로 전환된다.
  - count badge text는 항상 `semantic.color.content.on-brand / #ebebeb`다.
- `selected`를 `tab`의 filled active shell처럼 해석하면 안 된다.

## container 규칙

- `tabNav`는 repeated `tabNavItem` strip이다.
- item들은 가로로 바로 붙고, 폭은 content-fit 성격이 강하다.
- current source의 `items=1..6` matrix는 strip growth proof다.
- family board나 구현/재구성에서는 strip breadth reading이 유지될 정도의 가로 폭을 보존해야 한다.
- text-fit 위주로 과도하게 축소해서 trailing accessory와 strip hierarchy가 무너지면 안 된다.
- sample frame의 trailing iconButton group을 `tabNavItem` core API로 승격하면 안 된다.

## add action / local usage

- `tabAdd` standalone은 `좌로 이동`, `우로 이동`, `탭 추가`를 함께 가진 shared overflow controls pattern이다.
- `tabAdd`는 `tabNavItem` variant가 아니라 trailing accessory pattern이다.
- `tabAdd`는 `pillTabs / direction=horizontal`과 공통 행동을 가진다.
- `tabNav` current Figma node 안에서는 `showFrame=false`로 붙어 add iconButton만 보인다.
- `showFrame=true`인 standalone `tabAdd`의 좌/우 이동 control cluster를 `tabNavItem` anatomy로 흡수하면 안 된다.
- 이 문서에서 overflow는 `tabNav` strip이 길어져, 해당 컴포넌트 frame이 좌우의 다른 frame이나 주변 요소 때문에 잘려 보이는 상태를 뜻한다.
- `tabNav`의 `tabAdd` 노출 여부는 component property로 다루며, 이것이 `tabNavItem` anatomy를 바꾸지는 않는다.

## optional slot boundary

- optional slot은 아래 vocabulary로만 기록한다.
  - `leadingIcon`
  - `countBadge`
  - `stateIndicator`
  - `trailingDelete`
- `stateIndicator`는 상태 인디케이터 표시 여부를 뜻한다.
- optional slot은 모두 선택 사항이다.
- 모든 optional 조합이 current source에서 검증됐다고 일반화하면 안 된다.
- optional slot은 문서만 보고 자동으로 붙이면 안 된다.
- 구현 또는 재구성 요청에서 해당 slot이 명시적으로 설명된 경우에만 붙인다.
- `trailingDropdown`, `trailingClose`는 현재 `tabNav` family optional slot current truth가 아니다.

## current spec에서 제외하는 것

- `Sample / tabNav 1`, `Sample / tabNav 2`
- sample 안의 trailing `iconButton` 3개 action group
- hidden tab을 한 번에 몇 개씩 이동시키는지 같은 exact scroll step 정책
- top/left/right stroke를 가진 outlined rail 해석

## implementation / reconstruction 시 반드시 지켜야 하는 규칙

- `tabNav`를 `tab`처럼 item-owned filled shell로 구현하면 안 된다.
- `tabNav`를 `pillTabs`처럼 segmented rail로 구현하면 안 된다.
- `tabNav` rail에 bottom divider 외의 top/left/right stroke를 추가하면 안 된다.
- selected underline은 반드시 rail-owned active signal로 유지한다.
- trailing action group은 sample에 보이더라도 core strip anatomy로 승격하지 않는다.
- `tabAdd`는 shared overflow controls pattern으로 읽고, `tabNavItem` anatomy에 섞지 않는다.
- `tabAdd`를 `tabNavItem` 내부 slot로 문서화하거나 구현하면 안 된다.
- `tabNav` 안에서 `showFrame=false`인 add-only accessory를 standalone `tabAdd` 전체 구조로 오해하면 안 된다.
- `ChevronLeftButton`, `ChevronRightButton`은 hidden tab을 좌우로 다시 보이게 하는 overflow navigation control이다.
- `trailingDropdown`, `trailingClose`를 `tabNavItem` optional slot로 역주입하면 안 된다.

## implementation snapshot

- HTML 구현은 `tab-nav`, `tab-nav-item`, `tab-nav-add` 제품 class를 우선 사용한다.
- Figma와 충돌하는 hover underline 제거, rail child wrapper, count/state indicator, add-only accessory 보정은 `component-css/component.css`에 격리한다.
- `sonar5.css`는 수정하지 않는다.
- `component-css/component.css`는 `.tab-nav`, `.tab-nav-item`, `.tab-nav-add`, `.tab-badge` 같은 제품 selector grammar와 semantic attribute만 사용한다.
- 코드 탭 HTML은 docs shell이나 preview wrapper가 아니라 tabNav body markup만 보여준다.

## pending / later decision log

- `tabNav` trailing action group을 local usage 문서로 분리할지 여부
