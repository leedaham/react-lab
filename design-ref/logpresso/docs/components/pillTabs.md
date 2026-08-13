# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/navigation-shell/pilltabs.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 / - pillTabs / direction=horizontal 14147:7760`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/pillTabs.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

pillTabs

## Figma evidence

- Figma file: `UI-5.1`
- Figma nodes:
  - `pillTabs / direction=horizontal` `14147:7760`
  - `pillTabs / direction=vertical` `14147:7806`
- Figma URL:
  - `https://www.figma.com/design/dodpG7QVPyrxWI1uFjKYrC/UI-5.1?node-id=14147-7760`
  - `https://www.figma.com/design/dodpG7QVPyrxWI1uFjKYrC/UI-5.1?node-id=14147-7806`
- screenshot evidence: horizontal `960 x 356`, vertical `937 x 298`
- confirmed scope: compact segmented tab family, `direction=horizontal|vertical`, `pillTabItem`, horizontal `tabAdd` accessory boundary

## 구현 기준

- exact page: `site/component/navigation-shell/pilltabs.html`
- catalog route: `site/index.html#components`
- source owner: `site/app.js`
- source helper: `pillTabsMarkup()`, `pillTabsHtmlExample()`, `pillTabsPreview()`, `pillTabItem()`
- implemented HTML owner: `app.js` helper output and `generate-component-pages.mjs` generated exact page
- root selector contract: `[data-pill-tabs][data-orientation]`
- base CSS selector from `sonar5.css`: `.tab-container`, `.tab-item`, `.tab-item-active`, `.tab-item-inactive`, `.tab-text`, `.tab-badge`, `.tab-nav-add`
- gap CSS file: `component-css/component.css`, 기존 `[data-variant="pill-tabs"]` 보정 사용, 이번 문서 계약 보강에서는 신규 보정 없음
- `sonar5.css`는 read-only reference이며 수정하지 않는다.

## QA status

- exact page와 catalog route가 존재한다.
- exact page는 `sonar5.css`와 `component-css/component.css`를 외부 stylesheet로 로드한다.
- QA mismatch count: `0`

## 목적

- `pillTabs`는 modal, right-side drawer, content sub-area 안에서 쓰이는 compact segmented tab family다.
- `tabNav`보다 하위 선택군으로 놓일 수 있다.
- `tab`과 `tabNav`와는 분리된 sibling family로 읽는다.

## family boundary

- family canonical 범위
  - `pillTabItem`
  - `pillTabs / direction=horizontal`
  - `pillTabs / direction=vertical`
- shared pattern
  - horizontal trailing accessory는 `tabAdd` shared add accessory로 읽는다.
  - `tabAdd`는 `pillTabs / direction=horizontal`과 `tabNav`에서 함께 쓰이는 shared accessory다.
  - `pillTabs / direction=vertical`에는 `tabAdd` 사용이 확인되지 않았다.
- `horizontal`, `vertical`은 다른 family가 아니라 같은 family 내부 direction variant다.

## current truth

- `pillTabItem`
  - `state=default | hover | active`
- `pillTabs`
  - `direction=horizontal | vertical`
  - `direction=horizontal`에는 `items=2..7` count matrix가 존재한다.
  - `direction=vertical`에는 `items=2..8` count matrix가 존재한다.
  - count matrix 전체를 public API로 일반화하면 안 된다.

## 구조 / anatomy

- `pillTabItem` 기본 흐름
  - `LeadingIcon? -> Label -> CountBadge? -> TrailingDropdown? -> TrailingClose?`
- `pillTabs`는 outer rail을 직접 소유한다.
- rail 안에 repeated `pillTabItem`이 들어가고, active item은 selected pill fill을 가진다.
- `direction=horizontal`, `direction=vertical`은 레이아웃 맥락 차이일 뿐 role 차이가 아니다.

## visual shell 규칙

- `pillTabItem` 높이는 항상 `28px`로 읽는다.
- `pillTabItem`의 leading icon은 항상 `20px`다.
- label typography는 항상 `Pretendard 14/20` 계열이다.
- item 내부 density는 항상 `px 12 / py 4`다.
- item 내부 주 gap은 항상 `8px`이고, label cluster 내부 gap은 `4px`다.
- item radius는 항상 `6px`다.
- rail은 border를 가진 segmented shell이다.
- rail border color는 항상 `semantic.color.border.interactive.default / rgba(126,140,222,0.16)`다.
- rail inset은 항상 `3px`이다.
- item 간 inner gap은 항상 `4px`다.
- active signal은 underline이 아니라 selected pill fill이다.
- hover도 filled background variation으로 읽는다.

## state 규칙

- `default`
  - item background는 항상 `semantic.color.background.transparent / rgba(0,0,0,0)`다.
  - label foreground는 항상 `semantic.color.text.secondary / #b5b5b5`다.
  - count badge fill은 `semantic.color.surface.badge.neutral / #303a6a`다.
- `hover`
  - pill fill은 항상 `semantic.color.interactive.brand.surface.hover / rgba(255,105,42,0.3)`다.
  - label foreground는 항상 `semantic.color.text.primary / #ebebeb`다.
- `active`
  - selected pill fill은 항상 `semantic.color.interactive.brand.surface.emphasis / rgba(255,105,42,0.15)`다.
  - `tabNav`처럼 underline-only selected state로 바꾸면 안 된다.
  - active text accent는 항상 `semantic.color.interactive.brand.accent / #ff692a`다.
  - label weight는 `Bold 700`으로 읽는다.
  - active text accent와 pill fill은 함께 읽는다.

## direction variant 규칙

- `direction=horizontal`
  - 가로 rail 안에 item이 좌에서 우로 배치된다.
  - rail width sample은 `920px`지만 public API width로 잠그지 않는다.
  - 구현/재구성이나 family board에서는 horizontal strip breadth reading이 유지될 정도의 가로 폭을 보존해야 한다.
  - text-fit 위주로 과도하게 축소해서 segmented rail reading이 무너지면 안 된다.
- `direction=vertical`
  - 세로 누적 레이아웃에 맞춰 item이 아래로 쌓인다.
  - vertical rail도 동일하게 `border + inset 3 + gap 4`를 유지한다.
  - vertical rail width는 label payload가 답답하게 눌리지 않을 정도의 폭을 유지해야 한다.
- 두 variant 모두 같은 `pillTabItem` family를 반복 사용한다.
- 방향 차이를 semantic role 차이로 승격하면 안 된다.

## add action / local usage

- horizontal trailing accessory는 `tabAdd` shared add accessory다.
- 이 accessory는 `pillTabs / direction=horizontal`과 `tabNav`에서 함께 쓰인다.
- `tabAdd`는 `pillTabItem` anatomy가 아니다.
- `tabAdd`를 `pillTabs` core shell 필수 요소로 잠그면 안 된다.
- 이 연결은 현재 `direction=horizontal` 맥락에만 직접 적용한다.
- `direction=vertical`에서는 `tabAdd` 사용이 확인되지 않았으므로 적용하지 않는다.
- `tabAdd`는 horizontal rail 안 item처럼 들어가는 것이 아니라, rail 바깥 trailing side에 분리된 accessory로 읽는다.
- `pillTabs / direction=horizontal` rail과 `tabAdd`는 서로 다른 경계로 유지해야 한다.

## optional slot boundary

- optional slot은 아래 vocabulary로만 기록한다.
  - `leadingIcon`
  - `countBadge`
  - `trailingClose`
  - `trailingDropdown`
- `stateIndicator`는 현재 `pillTabs` family optional slot current truth가 아니다.
- optional slot은 모두 선택 사항이다.
- 모든 optional 조합이 current source에서 검증됐다고 일반화하면 안 된다.
- optional slot은 문서만 보고 자동으로 붙이면 안 된다.
- 구현 또는 재구성 요청에서 해당 slot이 명시적으로 설명된 경우에만 붙인다.

## current spec에서 제외하는 것

- plus action을 제외한 trailing accessory local composition
- vertical variant의 exact overflow / wrap 정책
- hidden tab을 한 번에 몇 개씩 이동시키는지 같은 exact scroll step 정책
- count matrix 전체를 public API처럼 쓰는 해석
- `tabAdd`를 horizontal rail 내부 child로 흡수하는 해석

## implementation / reconstruction 시 반드시 지켜야 하는 규칙

- `pillTabs`를 `tab`처럼 top-tab shell로 구현하면 안 된다.
- `pillTabs`를 `tabNav`처럼 underline strip으로 구현하면 안 된다.
- active signal은 반드시 selected pill fill로 유지한다.
- direction variant를 family split으로 잘못 해석하면 안 된다.
- `tabAdd`는 있어도 되고 없어도 되지만, 존재 시 `pillTabItem` anatomy 안으로 흡수하면 안 된다.
- `tabAdd`를 vertical variant에 역주입하면 안 된다.
- `tabAdd`를 `pillTabs / direction=horizontal` rail 내부 child로 넣으면 안 된다.
- `tabAdd`는 rail 바깥 trailing accessory로 유지한다.
- `stateIndicator`, `trailingDelete`를 `pillTabs` optional slot로 역주입하면 안 된다.

## HTML 구현 기준

- 기준 구현은 `site/app.js`의 `pillTabsPreview`, `pillTabsMarkup`, `pillTabItem`이다.
- component body root는 semantic attribute `data-pill-tabs`와 `data-orientation`을 가진다.
- item rail은 `sonar5.css`의 `.tab-container` 제품 selector를 사용하고 `data-variant="pill-tabs"`, `role="tablist"`, `aria-orientation`을 가진다.
- item은 `sonar5.css`의 `.tab-item`, `.tab-item-active`, `.tab-item-inactive`, `.tab-text` 제품 selector를 사용하며 `role="tab"`, `aria-selected`, `data-pill-tab`을 가진다.
- 선택된 item은 `.tab-item-active`와 `aria-selected="true"`를 동시에 가진다.
- preview interaction은 클릭 시 같은 rail 안에서 active item을 하나만 유지한다.
- HTML code tab은 docs shell, preview-stage, route UI, `.demo-*` wrapper 없이 `data-pill-tabs` body markup만 보여준다.

## CSS 구현 기준

- `pillTabs` 본체 보정 CSS는 `site/component-css/component.css`에 격리한다.
- 기존 `styles.css`와 `sonar5.css`에는 신규 component body selector를 추가하지 않는다.
- `component-css/component.css`는 `sonar5.css`의 `.tab-container`, `.tab-item`, `.tab-text`, `.tab-badge`, `.tab-nav-add` 제품 selector grammar와 semantic attribute만 사용한다.
- `sonar5.css`는 읽기 전용 reference이며 이번 구현에서 수정하지 않는다.
- `.demo-tabs.pillTabs`는 구현 기준으로 사용하지 않는다.

## pending / later decision log

- vertical variant의 overflow / wrap 정책을 별도 current truth로 잠글지 여부
