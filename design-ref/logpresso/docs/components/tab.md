# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/navigation-shell/tab.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 / tab 8753:9773`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/tab.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

tab

## Figma evidence

- Figma file: `UI-5.1`
- Figma node: `tab` `8753:9773`
- Figma URL: `https://www.figma.com/design/dodpG7QVPyrxWI1uFjKYrC/UI-5.1?node-id=8753-9773`
- screenshot evidence: `985 x 362`
- confirmed scope: top-tab family, repeated `tabItem`, `items=1..6` proof

## 구현 기준

- exact page: `site/component/navigation-shell/tab.html`
- catalog route: `site/index.html#components`
- source owner: `site/app.js`
- source helper: `tabMarkup()`, `tabHtmlExample()`, `tabPreview()`, `tabItem()`
- implemented HTML owner: `app.js` helper output and `generate-component-pages.mjs` generated exact page
- root selector contract: `.tabs`
- base CSS selector from `sonar5.css`: `.tab`, `.tab.active`, `.tab-label`, `.tab-badge`
- gap CSS file: `component-css/component.css`, 기존 `.tabs .tab*` 보정 사용, 이번 문서 계약 보강에서는 신규 보정 없음
- `sonar5.css`는 read-only reference이며 수정하지 않는다.

## QA status

- exact page와 catalog route가 존재한다.
- exact page는 `sonar5.css`와 `component-css/component.css`를 외부 stylesheet로 로드한다.
- QA mismatch count: `0`

## 목적

- `tab`은 상단 panel/view switching에 쓰이는 top-tab family다.
- 이 family는 `tabNav`, `pillTabs`와 분리해서 읽는다.
- `tab`은 item 자체가 shell을 직접 소유하는 것이 핵심이다.

## family boundary

- family canonical 범위
  - `tabItem`
  - `tab`
- `tab`은 `tabItem`을 가로로 반복 배치하는 row container다.
- `tabNav`의 underline strip grammar를 `tab`에 가져오면 안 된다.
- `pillTabs`의 segmented rail grammar를 `tab`에 가져오면 안 된다.
- `tabAdd`는 현재 이 문서의 core truth가 아니다.
- `tabAdd`는 별도 shared overflow controls pattern으로만 읽고, `tab` family anatomy에는 포함하지 않는다.

## current truth

- `tabItem`
  - `state=default | hover | active`
- `tab`
  - `items=1..6` count matrix가 존재한다.
  - 이 matrix는 repeated row current source로는 유효하지만, 모든 count variant를 public API처럼 일반화하면 안 된다.
- `for Card?`는 삭제되었으므로 current truth에서 제외한다.

## 구조 / anatomy

- `tabItem` 기본 흐름
  - `LeadingIcon? -> Label -> CountBadge? -> TrailingClose? -> TrailingDropdown?`
- 위 slot은 `tab` family 전체의 optional slot vocabulary다.
- optional slot이 존재할 수 있다는 뜻이지, 모든 조합이 source-confirmed라는 뜻은 아니다.
- `tab` container는 repeated `tabItem` row만 current truth로 잠근다.

## visual shell 규칙

- `tabItem` 높이는 항상 `36px`로 읽는다.
- 기본 density는 항상 `px 16 / py 8`이다.
- item 내부 주 gap은 항상 `8px`이고, label cluster 내부 gap은 `4px`다.
- leading icon은 항상 `16px`다.
- label typography는 항상 `Pretendard 14/20` 계열이다.
- count badge typography는 항상 `12/18` 계열이다.
- `tabItem`은 item-owned shell을 가진다.
- shell은 상단 rounded, 좌/우/상 border가 보이는 top-tab grammar로 읽는다.
- top radius는 항상 `8px`다.
- top-left / top-right radius는 `tabItem` shell 하나가 직접 소유한다.
- 상단 radius를 separate border line 3개로 흉내 내면 안 된다.
- 상/좌/우 border는 같은 shell의 border reading으로 유지해야 한다.
- 하단 stroke는 모든 state에서 없다.
- border color는 항상 `semantic.color.border.interactive.default / rgba(126,140,222,0.16)`다.
- active에서는 item 자체가 선택된 surface를 직접 형성한다.
- 아래 패널과 이어지는 reading은 active에서 새로 bottom border를 제거해서 만드는 것이 아니라, 애초에 하단 stroke가 없는 top-tab shell grammar에서 읽는다.

## state 규칙

- `default`
  - background는 항상 `semantic.color.background.transparent / rgba(0,0,0,0)`다.
  - label은 항상 `semantic.color.text.helper / #808080`다.
  - count badge fill은 `semantic.color.surface.badge.neutral.strong / #616ebb`다.
- `hover`
  - surface는 항상 `semantic.color.interactive.neutral.surface.emphasis / #151c33`다.
  - label은 항상 `semantic.color.text.primary / #ebebeb`로 올라간다.
  - hover는 active처럼 filled selected shell로 읽으면 안 된다.
- `active`
  - surface는 항상 `semantic.color.surface.container.default / #070b13`다.
  - border는 유지하되 bottom border는 제거한다.
  - label foreground는 항상 `semantic.color.interactive.brand.accent / #ff692a`다.
  - label weight는 `Bold 700`으로 읽는다.
  - count badge fill도 `semantic.color.interactive.brand.accent / #ff692a`로 전환된다.
  - count badge text는 항상 `semantic.color.content.on-brand / #ebebeb`다.
- `hover`, `active`를 `tabNav`의 underline-only 방식으로 단순화하면 안 된다.

## container 규칙

- `tab`은 repeated `tabItem`을 한 줄로 배치하는 row container다.
- `items=1..6`은 current source matrix지만, count matrix를 그대로 public prop contract로 잠그면 안 된다.
- current truth는 repeated row grammar까지다.
- 정확한 overflow, truncate, wrap 정책은 현재 문서에서 잠그지 않는다.

## optional slot boundary

- optional slot은 아래 vocabulary로만 기록한다.
  - `leadingIcon`
  - `countBadge`
  - `trailingClose`
  - `trailingDropdown`
- `stateIndicator`는 현재 `tab` family optional slot current truth가 아니다.
- optional slot을 core required slot로 승격하면 안 된다.
- sample에 보인 조합을 full supported matrix로 일반화하면 안 된다.
- optional slot은 문서만 보고 자동으로 붙이면 안 된다.
- 구현 또는 재구성 요청에서 해당 slot이 명시적으로 설명된 경우에만 붙인다.

## current spec에서 제외하는 것

- `tab` family 안으로 흡수된 `tabAdd` 해석
- 삭제된 `for Card?`
- example-only 조합에서만 보이는 add/action pairing
- count matrix의 exact width progression
- shell radius를 separate top/left/right border 막대로 대체하는 해석
- `tabItem`에 bottom stroke를 추가하는 해석

## implementation / reconstruction 시 반드시 지켜야 하는 규칙

- `tab`, `tabNav`, `pillTabs`를 하나의 family로 합치지 않는다.
- `tabItem`의 item-owned shell을 유지한다.
- `tabItem`은 top-left / top-right radius를 가진 단일 shell로 구현한다.
- `BorderTop`, `BorderLeft`, `BorderRight`만 따로 그려서 shell을 흉내 내면 안 된다.
- `tabItem` 모든 state에 bottom stroke를 추가하면 안 된다.
- `tabNav`처럼 rail-owned underline만으로 구현하면 안 된다.
- `pillTabs`처럼 outer rail 안 selected pill grammar로 구현하면 안 된다.
- `tabAdd`를 `tab`의 trailing add slot이나 overflow slot current truth로 역주입하면 안 된다.
- optional slot은 있어도 되고 없어도 되지만, 존재 시에는 `tab` family vocabulary 안에서만 배치한다.
- `stateIndicator`, `trailingDelete`를 `tab` family optional slot로 역주입하면 안 된다.

## pending / later decision log

- `items=1..6`을 public API 범위로 문서화할지 여부
- exact spacing/gap 수치를 더 강하게 잠글지 여부

## implementation snapshot

- HTML 구현은 `site/app.js`의 `tabMarkup`, `tabItem`, `tabPreview`가 소유한다.
- component body는 `sonar5.css`의 `.tabs`, `.tab`, `.tab-label`, `.tab-badge` 제품 selector를 먼저 사용한다.
- Figma와 `sonar5.css`의 차이는 `site/component-css/component.css`에서 `.tabs .tab`, `.tabs .tab.active`, `.tabs .tab-badge` selector로만 보정한다.
- `sonar5.css`는 읽기 전용 reference이며 이번 구현에서 수정하지 않는다.
- 코드 탭 HTML은 docs shell, preview wrapper, `.demo-*` 없이 `.tabs` body markup만 보여준다.
