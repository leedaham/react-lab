# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/navigation-shell/snb.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 / 12236:8684`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/SNB.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

SNB

## 목적

- `SNB`는 current source 기준 left-side navigation rail이다.
- 이번 문서는 broad taxonomy를 다시 여는 문서가 아니라, 이미 확정된 SNB 해석과 source policy를 current source에 맞게 잠그는 문서다.
- `SNB`는 `GNB`의 child control인 `SNBToggle`과 분리해서 읽는다.

## current source 읽는 법

- `SNB`는 `shell + appNav area + navList body` 조합으로 읽는다.
- current source structure는 유지한다.
- `appNav area`와 `AppNavButton`은 별도 family가 아니라 `SNB` 문서 안 subsection으로 기록한다.
- `appNav area`는 generic top row가 아니라 app-switching drawer를 여는 trigger area다.
- `appNav area`의 visible state와 `navList body` 전환 state는 분리해서 읽고, 전환 의미는 [../../../ux/official/app-context-switching.md](../../../ux/official/app-context-switching.md)를 따른다.
- default state에서는 `AppNavButton`이 `앱` 아이콘과 `앱` label을 표시한다.
- selected app state에서는 `AppNavButton`이 선택된 앱 아이콘과 앱 이름을 표시한다.
- `navList` row family와 `SNB shell` boundary를 섞지 않는다.
- `SNBToggle`은 `GNB` 내부의 usage-level control이며, `SNB` anatomy나 `navList` state matrix에 포함하지 않는다.
- `navListTitle`, `app card`, `z-index modal`은 `SNB` 핵심 anatomy로 승격하지 않는다.
- `navList` generic matrix sample과 assembled SNB shell display는 같은 층위가 아니다.
- example-screen contract를 읽을 때는 generic matrix보다 assembled semantic display와 surrounding top-level continuity를 우선한다.
- inventory와 example-screen 조립은 full IA 복제가 아니라 source-confirmed representative assembly를 유지하는 범위에서만 사용한다.

## 구조 / anatomy

- `SNB shell`
- `appNav area`
- `AppNavButton`
- `navList body`

## variant/property naming rule

- hierarchy 축의 canonical 이름은 `depth`다.
- current source-facing 값은 이번 라운드에서 그대로 유지한다.
  - `level-none`
  - `2nd-level`
  - `3rd-level`
- `Property`는 문서 표준에서 사용하지 않는다.

## state naming rule

- `default`
  - 기본 메뉴 상태
- `hover`
  - interaction preview state
- `pressed`
  - temporary interaction state
  - runtime interaction state로만 기록한다.
  - 의미는 `current`와 다르다.
  - 현재 source에서는 `current`와 같은 visual bucket을 사용한다.
- `emphasized`
  - highlighted row state
  - assembled product-menu display contract에서는 펼쳐진 부모 아래에서 강조되는 child row 상태로 사용한다.
  - visible foreground는 흰색으로 읽는다.
- `expanded`
  - parent structural/open state
  - 부모 row가 펼쳐져 child들이 실제로 노출된 상태다.
  - visible foreground는 주황색으로 읽는다.
- `current`
  - current location/current menu item state
  - assembled example-screen display contract에서는 current leaf/current destination item 상태로만 기록한다.
- state target example
  - `보안 정보 = expanded`
  - `보안 정보` 아래 child rows = `emphasized`
  - `홈 = current`
- `expanded`, `emphasized`, `current`는 대상이 서로 다르다.
  - `expanded`: 부모
  - `emphasized`: 펼쳐진 부모 아래 child
  - `current`: 현재 위치한 row
- `emphasized`는 `current`, `pressed`, generic `selected`와 같은 뜻으로 쓰지 않는다.
- `pressed`는 `current`와 같은 상태로 취급하지 않는다.
- assembled example-screen display contract에서 expandable parent는 `current`가 될 수 없다.

## SNB shell

### UI recipe

- current representative shell width
  - `200`
- current visible artboard/sample height
  - `1032`
- current shell ownership
  - left-side rail layout
  - right border
  - child spacing and placement
- vertical inset symmetry
  - `appNav area` 아래 첫 navigation row가 시작되는 top inset과 마지막 visible/current row 아래 bottom inset은 같은 값으로 보장한다.
  - 현재 assembled representative preview에서는 start/end inset을 `12px`로 읽는다.
  - 마지막 item이 `current`인 경우에도 current row가 rail의 물리적 하단 edge에 붙으면 실패다.
  - 긴 메뉴에서 scroll container가 생기더라도 content end padding은 start padding과 같은 리듬을 유지한다.
- current shell does not own
  - canonical background color
  - canonical background token
  - background image
  - gradient/tint/glass/blur/shadow treatment

### shell visual rule

- right border
  - `1px`
  - `semantic.color.border.default`
- `SNB shell/rail`은 background color를 소유하지 않는다.
- `SNB shell/rail`과 `SNB app area`의 computed `background`, `background-color`, `background-image`는 모두 paintless 상태여야 한다.
- `SNB shell/rail` 또는 `SNB app area` 뒤에 body, canvas, product background asset, gradient, tint가 비쳐서 독립된 rail/app surface처럼 보이는 것도 invalid output이다.
- 검증 기준은 CSS raw background만이 아니라 실제 screenshot에서 SNB 영역과 SNB app area가 배경색이 깔린 panel처럼 보이지 않는지까지 포함한다.
- raw computed value가 `transparent`인 것만으로 pass 처리하지 않는다.
- `html`, `body`, `[data-screen-shell]`, `[data-screen-shell-body]`의 fallback fill이나 product canvas가 SNB 200px rail 또는 SNB app area 뒤에 보여 SNB가 별도 left panel surface처럼 읽히면 invalid output이다.
- Product screen background는 workspace/canvas 영역에서 시작해야 하며 SNB rail, SNB app area, 또는 SNB 투과 영역까지 확장되면 안 된다.
- screenshot 또는 pixel/composited evidence에서 SNB는 content rows, app divider, right divider만 보여야 한다. solid rail, blurred rail, tinted panel, gradient panel은 모두 실패다.
- `SNB shell/rail`과 `SNB app area`에 background color, background image, gradient, tint, glass, blur, shadow를 추가하면 invalid output이다.
- Product screen background asset이나 proposal을 `SNB` 뒤, 내부, 또는 투과 영역에 적용하지 않는다.
- shell의 시각 분리는 right border와 appNav bottom border가 소유한다.

## appNav area

- `appNav area`는 `SNB` 상단의 app-switching entry area다.
- 이번 라운드에서는 `appNav`를 구조적으로 분리하지 않는다.
- `AppNavButton`에서 열리는 `app launcher panel`은 `SNB` 내부 확장이나 `navList body`의 child가 아니다.
- `app launcher panel`의 UX flow, z-index, menu switching 의미는 [../../../ux/official/app-context-switching.md](../../../ux/official/app-context-switching.md)를 따른다.
- default visible sample label은 기능 설명이 아니라 `앱`으로 기록한다.
- selected app state에서는 default sample label `앱`이 선택된 앱 이름으로 바뀌며, leading icon도 선택된 앱 아이콘으로 바뀐다.
- `appNav area`는 generic container가 아니라 app-switching boundary다.
- `appNav area` border grammar를 `Divider` primitive나 shell border grammar로 치환하는 것은 금지한다.

### UI recipe

- current row size
  - `200 x 40`
- border grammar
  - bottom border만 사용한다.
  - top border는 금지한다.
  - left border는 금지한다.
  - right border는 금지한다.
  - divider primitive로 대체하는 것은 금지한다.
  - generic container border grammar를 상속하는 것은 금지한다.
- bottom border
  - `1px`
  - `semantic.color.border.interactive.default`
  - fallback color: `rgba(126,140,222,0.16)`

## AppNavButton

- `AppNavButton`은 `appNav area` 내부의 실제 조작 row다.
- 이번 라운드에서는 separate family로 승격하지 않는다.
- `AppNavButton`은 nav list row가 아니라 app-switching drawer trigger/control이다.
- `AppNavButton`의 scenario/state naming은 app-switching 문맥 안에서 읽고, navList의 `expanded`, `emphasized`, `current`, `pressed` 계약과 직접 섞지 않는다.
- `AppNavButton`은 `CategoryIcon(20 x 20 fixed) -> Label` grammar를 직접 소유한다.
- `AppNavButton` outer row size는 항상 `184 x 32`다.
- `AppNavButton`은 `items-center / gap 8 / px 8 / py 6 / radius 8` row recipe를 따른다.
- `AppNavButton` icon은 intrinsic SVG 크기로 축소하지 않고 fixed `20 x 20` slot으로 읽는다.
- `AppNavButton` icon source asset은 `../../assets/icons/snb/category/*.svg` multicolor app/category family를 따른다.
- default state의 `AppNavButton` exact visible icon identity는 `navIcon / Property=앱`이다.
- selected app state의 `AppNavButton` leading icon은 선택된 앱 아이콘으로 바뀐다.
- `AppNavButton` icon source asset frame이 `24`로 보여도 row slot은 항상 fixed `20 x 20`으로 읽는다.
- `AppNavButton` icon은 GNB utility `24 x 24` boxed control grammar를 따르지 않는다.
- `AppNavButton` icon과 label은 top-level product-menu icon-bearing row와 같은 leading-column rhythm 안에서 읽는다.
- `app-menu` row grammar와 `AppNavButton` grammar는 같은 것으로 취급하지 않는다.
- `AppNavButton` label typography는 항상 `Pretendard Bold / 14 / 20 / letter-spacing 0`이다.
- state가 바뀌어도 `AppNavButton` typography tier는 바뀌지 않는다.
- state change는 foreground, opacity, surface만 바꾸고 icon slot size와 typography를 바꾸지 않는다.
- default foreground는 항상 `semantic.color.text.secondary`다.
- default foreground fallback은 항상 `#b5b5b5`다.
- default leading icon opacity sample은 항상 `0.65`로 읽는다.
- default visible sample label
  - `앱`
- selected app visible label
  - 선택된 앱 이름
- 기능 설명을 위해 `앱 전환`이라고 풀어쓸 수는 있지만, visible label sample로 승격하지 않는다.
- 기본 visible sample에서는 우측 caret/chevron을 기본 슬롯으로 두지 않는다.
- `AppNavButton`에 `TrailingChevron`, `DropdownIndicator`, utility/common boxed grammar를 추가하는 것은 금지한다.

## navList body

- `navList body`는 현재 SNB context의 menu area다.
- default app context와 selected app context의 메뉴 전환 의미는 [../../../ux/official/app-context-switching.md](../../../ux/official/app-context-switching.md)를 따른다.
- row primitive는 `navList` family가 직접 소유한다.
- 공통으로 잠그는 것은 구조 contract이고, 실제 label/count/group은 product별 콘텐츠로 남긴다.
- `product-menu`와 `app-menu`는 같은 row recipe로 묶지 않는다.
- `product-menu`는 우리 제품 메뉴 컨텍스트다.
- `app-menu`는 app switching 문맥이다.
- Figma source correction: `SNB List Item` `795:3958` is the single component set for SNB list rows. Do not maintain separate leaf, expanded-parent, or child representative sets. The component set owns `Role=Top level leaf | Top level parent | Child` and valid `State` variants together. Top-level `LeadingIcon` must use the existing user-created `SNBIcon` component set `779:5922` as an instance-swap source, not a locally redrawn SVG/frame. The row exposes `Label` as a TEXT component property with default value `Label`; do not hardcode product menu labels inside the source component. `Active` is not used as a state name; the current location state is named `Current`. Current Figma state is missing the three `Pressed` variants and must not be reported as final SNB approval until those are restored.
- Figma assembly correction: `SNB` `256:2` keeps `appNav area` as the app context header, but `navList body` menu rows must be direct `SNB List Item` instances. The current representative order is `Home`, `Security Info`, `Security News`, `Exploit`, `CVE`, `Dashboard`, `Collection`, `Analytics`, `Response`, `Policy`, `Account`, `System`. `Current` and `Expanded` selected rows use the current SNB screenshot recipe: dark selected surface `color/slate/900`, label `color/neutral/50`, existing `SNBIcon` orange icon identity, and no locally redrawn row frames.

### structure contract

- `navList body`는 `topLevelItems[]` 중심 구조로 읽는다.
- 각 top-level item은 필요 시 `children[]`를 가진다.
- top-level row 뒤에 sibling child frame이 이어지는 current source 조립 패턴이 보인다.
- current screen/example-screen에서는 full IA 전체를 그대로 구현할 필요는 없지만, current branch만 남긴 branch-only assembly로 과소축소하지 않는다.
- source-confirmed surrounding top-level context를 함께 유지하는 representative assembly를 우선한다.
- surrounding top-level rows는 decorative filler가 아니라 same shell 안의 sibling continuity를 보여 주는 representative assembly contract다.
- `variant=product-menu`
  - `level-none`은 top-level icon-bearing row다.
  - `2nd-level`, `3rd-level`은 icon-less text-first row다.
- `variant=app-menu`
  - 기본적으로 icon-less reading이다.
  - `level-none`, `2nd-level` 모두 leading icon 기본 슬롯이 없다.
- `section title`은 optional group header다.
- `3rd-level`은 optional supported depth다.
- `3rd-level`은 root-level 구조가 아니다.

### navList variant matrix

- axis
  - `state`
    - `default | hover | pressed | expanded | emphasized | current`
  - `depth`
    - `level-none | 2nd-level | 3rd-level`
  - `variant`
    - `product-menu | app-menu`
- current visible matrix
  - `product-menu / level-none`
    - `default | hover | pressed | expanded | current`
  - `product-menu / 2nd-level`
    - `default | emphasized | hover | pressed | expanded | current`
  - `product-menu / 3rd-level`
    - `default | emphasized | hover | pressed | current`
  - `app-menu / level-none`
    - `default | emphasized | hover | pressed | expanded | current`
  - `app-menu / 2nd-level`
    - `default | emphasized | hover | pressed | current`

### example-screen representative inventory

- 이번 inventory는 example-screen implementation/reconstruction에서 사용할 수 있는 source-confirmed representative set만 기록한다.
- full product IA, app-menu drawer inventory, actual 3rd-level inventory를 여기서 고정하지 않는다.
- current source 기준 visible top-level inventory
  - `홈`
  - `보안 정보`
  - `대시보드`
  - `수집`
  - `분석`
  - `대응`
  - `정책`
  - `계정`
  - `시스템`
- current source 기준 top-level `navIcon` property inventory
  - `앱`
  - `홈`
  - `보안 정보`
  - `대시보드`
  - `수집`
  - `분석`
  - `대응`
  - `정책`
  - `계정`
  - `시스템`
  - `확장프로그램`
- top-level `product-menu / level-none`의 `LeadingIcon`은 항상 row label에 맞는 `navIcon / Property=<same label>` identity를 사용한다.
- `수집` screen implementation/reconstruction에서는 top-level parent `LeadingIcon`을 항상 `navIcon / Property=수집`으로 맞춘다.
- top-level parent `LeadingIcon`을 generic common UI glyph나 다른 product icon으로 치환하는 것은 금지한다.
- `앱`은 top-level menu inventory가 아니라 `appNav area`의 app switching entry로 읽는다.
- source-confirmed child inventory
  - `보안 정보`
    - `보안 뉴스`
    - `익스플로잇`
    - `보안 권고문`
    - `CVE`
    - `CWE`
    - `CAPEC`
  - `대시보드`
    - `대시보드`
    - `위젯`
    - `사용자 정의 변수`
  - `수집`
    - `수집기`
    - `파서`
    - `로그 스키마`
    - `수집 모델`
  - `분석`
    - `마이트어택`
    - `APT 그룹`
    - `AI 어시스턴트`
    - `탐지 현황`
    - `이벤트`
    - `로그`
    - `룩업`
    - `피벗`
    - `테이터셋`
    - `쿼리`
    - `예약된 쿼리`
    - `프로시저`
    - `보고서`
    - `용어사전`
  - `대응`
    - `티켓`
    - `티켓 분류`
    - `티켓 태그`
    - `소명`
    - `소명 분류`
    - `차단 내역`
    - `자동 대응 내역`
    - `승인 요청`
    - `승인 내역`
  - `정책`
    - `실시간 탐지`
    - `배치 탐지`
    - `시나리오 분류`
    - `리스크 스코어`
    - `머신러닝 모델`
    - `위협 인텔리전스`
    - `행위 프로파일`
    - `학습 데이터셋`
    - `사이트`
    - `자산 IP`
    - `주소 그룹`
    - `내트워크 대역`
    - `포트 그룹`
    - `사용자 정의 필터`
    - `패턴 그룹`
    - `알람 그룹`
    - `플레이북`
    - `침해 지표`
    - `시그니처`
  - `계정`
    - `계정`
    - `계정 그룹`
    - `임직원`
  - `시스템`
    - `앱 관리`
    - `클러스터`
    - `센트리`
    - `성능 모니터`
    - `테이블`
    - `라이선스`
    - `SSO`
    - `메일 서버`
    - `소명 템플릿`
    - `쿼리 모니터`
    - `감사 로그`
    - `시스템 로그`
    - `접속 프로파일`
    - `차단 연동`
    - `인증서`
    - `패키지`
    - `AI 프롬포트`

### menu display contract

- `홈`
  - top-level current leaf pattern으로 읽는다.
  - child block이 없다.
- `보안 정보`, `대시보드`, `수집`, `분석`, `대응`, `정책`, `계정`, `시스템`
  - expandable top-level parent pattern으로 읽는다.
  - current child 화면을 표시할 때는 해당 top-level parent를 expanded 상태로 연다.
- parent 판독 기준
  - visible chevron이 있다.
  - current source에 expanded sample이 존재한다.
- `대시보드`, `계정`
  - top-level parent와 child leaf가 같은 라벨을 공유한다.
  - later screen generation에서는 `depth` 또는 `parentChain`으로 구분한다.

### UI recipe

- current row width
  - `184`
- current row height
  - `32`
- section title
  - `184 x 22`
- row radius
  - `8`
- depth inset
  - `level-none`: `8`
  - `2nd-level`: `36`
  - `3rd-level`: `56`
- `184`는 shell `200` 안에서 wrapper padding을 제외한 assembled row width다.
- depth inset은 row width 축소가 아니라 row 내부 offset으로 적용한다.
- vertical start/end inset
  - appNav boundary 이후 navList body의 첫 row top inset과 마지막 row bottom inset은 대칭이다.
  - representative preview 기준 값은 `12px`다.
  - 종료 지점이 current leaf이면 bottom inset을 생략하지 않는다.
- top-level row의 exact horizontal recipe는 항상 `w 184 / h 32 / px 8 / py 6 / gap 8 / radius 8`이다.
- `2nd-level` child row의 exact horizontal recipe는 항상 `w 184 / h 32 / pl 36 / pr 8 / py 6 / radius 8`이다.
- `3rd-level` child row의 exact horizontal recipe는 항상 `w 184 / h 32 / pl 56 / pr 8 / py 6 / radius 8`이다.
- left/right inset ownership은 shell padding이 아니라 row 자체가 소유한다.
- left inset 누락은 실패다.
- right inset 누락은 실패다.
- app-menu depth inset
  - `level-none`: `8`
  - `2nd-level`: `12`
- `navIcon` source asset frame은 `24`로 보일 수 있지만, `AppNavButton`과 `product-menu / level-none` leading slot은 항상 fixed `20`이다.

### row slot order

- `AppNavButton`
  - `CategoryIcon(20 x 20 fixed) -> Label`
  - 우측 caret은 기본 슬롯이 아니다.
  - `app-menu / level-none` row grammar와 같은 것으로 읽지 않는다.
  - GNB utility `24 x 24` boxed control grammar를 가져오지 않는다.
- `product-menu / level-none`
  - parent row sample은 `LeadingIcon(20 x 20 fixed) -> Label -> TrailingChevron`
  - top-level icon-bearing row로 읽는다.
  - top-level parent menu icon은 fixed `20 x 20` leading slot으로 읽고 `24 x 24`로 확장하지 않는다.
  - `LeadingIcon`은 항상 `../../assets/icons/snb/category/*.svg` source family를 따른다.
  - `TrailingChevron`은 항상 `materialiconsoutlined SVG` family의 navigation affordance다.
  - `expanded`는 항상 `expand_less`, 그 외 chevron이 있는 sample은 항상 `expand_more`다.
  - assembled top-level leaf sample은 `LeadingIcon -> Label`로 끝날 수 있다.
  - generic matrix의 `level-none/current` sample을 top-level current leaf final recipe로 자동 승격하지 않는다.
- `product-menu / 2nd-level`
  - `IndentedLabel -> TrailingChevron`
  - 기본적으로 icon 없음
  - outer row size는 항상 `184 x 32`다.
  - padding은 항상 `pl 36 / pr 8 / py 6`이다.
- `product-menu / 3rd-level`
  - `DeeperIndentedLabel`
  - 기본적으로 icon 없음
  - 기본적으로 chevron 없음
  - outer row size는 항상 `184 x 32`다.
  - padding은 항상 `pl 56 / pr 8 / py 6`이다.
- `app-menu / level-none`
  - `Label -> TrailingChevron`
  - 기본적으로 icon 없음
  - `TrailingChevron`은 항상 `materialiconsoutlined SVG` family의 `expand_more | expand_less` navigation chevron이다.
  - outer row size는 항상 `184 x 32`다.
  - padding은 항상 `pl 8 / pr 8 / py 6`이다.
- `app-menu / 2nd-level`
  - `IndentedLabel`
  - 기본적으로 icon 없음
  - 기본적으로 chevron 없음
  - outer row size는 항상 `184 x 32`다.
  - padding은 항상 `pl 12 / pr 8 / py 6`이다.
- `CategoryIcon`, `TrailingChevron`, `IndentedLabel`, `DeeperIndentedLabel`은 navigation usage-level slot 이름이다.
- `Button`/`iconButton`의 `LeadingIcon`, `DropdownIndicator`와 같은 synonym으로 취급하지 않는다.

### navList visual state matrix

- 공통 row geometry
  - `w 184 / h 32 / radius 8`
- matrix truth vs assembled semantic display
  - generic matrix node는 row primitive sample이다.
  - assembled screen/example-screen에서는 leaf/parent semantic에 따라 chevron, icon emphasis, context density가 함께 읽힌다.
  - top-level parent row sample의 default foreground는 secondary text + dimmed leading icon + `expand_more`다.
  - top-level parent row sample의 expanded foreground는 accent text + full-opacity leading icon + `expand_less`다.
  - top-level current matrix sample은 accent surface + accent text를 보여 주지만, 이를 assembled top-level current leaf final recipe로 자동 승격하지 않는다.
  - generic matrix의 `level-none/current`를 top-level current leaf final recipe로 자동 승격하지 않는다.
- foreground/background/border/shadow
  - `default`
    - foreground: `semantic.color.text.secondary`
    - fallback: `#b5b5b5`
    - background: 없음
    - border: 없음
    - shadow: 없음
  - `hover`
    - foreground: `semantic.color.text.secondary`
    - background: `semantic.color.interactive.brand.surface.emphasis`
    - foreground fallback: `#b5b5b5`
    - background fallback: `rgba(255,105,42,0.15)`
    - border: 없음
    - shadow: 없음
  - `expanded`
    - foreground: `semantic.color.interactive.brand.accent`
    - fallback: `#ff692a`
    - background: 없음
    - border: 없음
    - shadow: 없음
  - `emphasized`
    - foreground: `semantic.color.text.primary`
    - fallback: `#ebebeb`
    - background: 없음
    - border: 없음
    - shadow: 없음
  - `current`
    - foreground: `semantic.color.interactive.brand.accent`
    - background: `semantic.color.interactive.brand.surface.emphasis`
    - foreground fallback: `#ff692a`
    - background fallback: `rgba(255,105,42,0.15)`
    - border: 없음
    - shadow: 없음
  - `pressed`
    - foreground: `semantic.color.interactive.brand.accent`
    - background: `semantic.color.interactive.brand.surface.emphasis`
    - foreground fallback: `#ff692a`
    - background fallback: `rgba(255,105,42,0.15)`
    - border: 없음
    - shadow: 없음
- chevron direction
  - `expanded`: `expand_less`
  - 그 외 chevron이 있는 sample: `expand_more`
- product-menu top-level visual weight
  - `default`: leading category icon `opacity 0.65` sample이 보인다.
  - `expanded`: accent text, chevron up, full-opacity icon sample이 보인다.
  - `current` generic matrix sample은 emphasis surface를 가지지만, assembled top-level current leaf는 leaf semantics를 함께 확인해 읽는다.

### depth validity

- `level-none`
  - top-level row
- `2nd-level`
  - expanded parent 아래 child row
- `3rd-level`
  - deeper child support
  - never root-level
  - assembled sample에서 always-on canonical depth로 승격하지 않는다.

## typography rule

- nav label
  - `Pretendard 14 / 20 / Bold`
  - letter spacing은 항상 `0`
- child row도 항상 같은 typography tier를 유지한다.
- `Medium` child row label은 금지한다.
- `Regular` child row label은 금지한다.
- section title
  - `Pretendard 12 / 18 / Medium`
  - letter spacing은 항상 `0`
- `depth`가 달라져도 typography tier는 바꾸지 않는다.

## color / token rule

- fallback hex/rgba 값은 source reference이며, light theme 구현에서는 semantic token value를 우선한다.
- root right border
  - `semantic.color.border.default`
- app header bottom border
  - `semantic.color.border.interactive.default`
- section title
  - `semantic.color.text.helper`
- default label
  - `semantic.color.text.secondary`
- `expanded`
  - expanded parent text foreground
  - visible sample 기준 주황색
  - exact token: `semantic.color.interactive.brand.accent`
  - fallback: `#ff692a`
- `emphasized`
  - emphasized child text foreground
  - visible sample 기준 흰색
  - exact token: `semantic.color.text.primary`
  - fallback: `#ebebeb`
  - gray/helper text로 재해석하는 것은 금지한다.
- `current`
  - current location/menu item state
  - current source sample에서는 foreground와 emphasis surface가 함께 보인다.
  - `expanded`나 `emphasized`의 foreground 규칙과 합치지 않는다.
  - exact foreground token: `semantic.color.interactive.brand.accent`
  - exact foreground fallback: `#ff692a`
  - exact background token: `semantic.color.interactive.brand.surface.emphasis`
  - exact background fallback: `rgba(255,105,42,0.15)`
- `pressed`
  - runtime interaction state
  - 현재 source에서는 `current`와 같은 visual bucket을 사용한다.
  - 의미는 `current`와 다르다.
- shell background token은 정의하지 않는다. Undefined는 임의 배경을 추가해도 된다는 뜻이 아니라 no-background paint lock이다.

## menu state display rule

- top-level current leaf
  - `홈`처럼 top-level leaf가 직접 `current`가 될 수 있다.
  - assembled example-screen에서는 child block이 없는 leaf current로 읽는 것이 안전하다.
  - generic matrix의 `level-none/current` sample slot을 top-level current leaf final slot contract로 그대로 복사하지 않는다.
- expanded parent
  - `보안 정보`, `대시보드`, `수집`, `분석`, `대응`, `정책`, `계정`, `시스템`처럼 child를 가진 top-level row가 `expanded`가 된다.
- emphasized child
  - expanded parent 아래 visible child rows는 기본적으로 `emphasized`로 읽는다.
- current child + sibling emphasized
  - child leaf가 `current`가 되면, 같은 expanded parent 아래의 sibling child rows는 계속 `emphasized`를 유지한다.
  - 예: `분석 > 쿼리`가 `current`이면, 같은 block 안의 `이벤트`, `로그`, `예약된 쿼리` 같은 sibling child rows는 `emphasized`로 남는다.
- current child placement
  - `current`는 child depth에도 적용될 수 있다.
  - `current` row와 `emphasized` row를 같은 row에 중첩해서 읽지 않는다.
  - 같은 expanded branch 안에서는 `current child 1개 + emphasized sibling children` 조합을 허용한다.
- current target restriction
  - expandable parent는 `current`가 될 수 없다.
  - `current`는 leaf-only로 기록한다.

## example-screen context density rule

- example-screen implementation/reconstruction은 current branch만 남긴 minimized branch sample로 끝내지 않는다.
- current branch가 child depth에 있으면 아래 맥락을 함께 유지한다.
  - expanded parent 1개
  - current child 1개
  - 같은 branch 안의 emphasized sibling children
  - surrounding top-level sibling menu rows
- source-confirmed assembled sample처럼 top-level continuity가 끊기지 않도록 branch 앞뒤의 surrounding top-level rows를 함께 남긴다.
- current branch만 남기고 top-level row 몇 개만 상징적으로 두는 방식은 source-consistent representative assembly가 아니다.
- unrelated branch를 임의로 expanded하지는 않는다.
- row height 확대, 과한 vertical gap 추가, depth flattening, expanded block 카드화는 허용하지 않는다.

## icon source policy

- category/menu icon source of truth
  - `../../assets/icons/snb/category/*.svg`
- category icon file identity
  - 한국어 파일명을 그대로 유지한다.
- category icon policy
  - app/category identification context에서만 기본적으로 사용한다.
- `appNav area`와 app-switching drawer 문맥의 식별 아이콘으로 읽는다.
- 최신 source truth 기준 `product-menu / level-none` top-level row에도 사용된다.
- child row의 기본 슬롯으로 승격하지 않는다.
- mono semantic icon으로 대체하지 않는다.
- web에서 새로 가져오지 않는다.
- `AppNavButton`과 `product-menu / level-none` row는 같은 source family를 공유해도 slot semantics는 다르게 읽는다.
- `AppNavButton`과 `product-menu / level-none` row의 `LeadingIcon`은 항상 fixed `20 x 20`이다.
- common UI icon source of truth
  - `../../../../../material-design-icons/src/**/materialiconsoutlined/*.svg`
- common UI icon policy
  - SVG만 사용한다.
  - `outlined`만 허용한다.
  - webfont icon을 사용하지 않는다.
  - non-outlined style을 사용하지 않는다.
  - chevron, dropdown indicator, utility/common affordance icon에만 기본적으로 사용한다.
  - multicolor app/category icon family와 같은 후처리 경로로 읽지 않는다.
  - `product-menu / level-none`의 `TrailingChevron`은 항상 이 family를 따른다.
  - `DropdownIndicator` 삼각 glyph나 app/category icon family로 대체하는 것은 금지한다.
- HTML reference mockup에서 임시로 icon font나 ligature text를 사용해야 하는 경우에도 완료 전 실제 glyph 렌더링을 브라우저에서 검증한다.
- ligature 이름이 폰트에 없어 텍스트로 노출되면 실패로 본다.
- icon fallback text가 label column을 밀어내지 않도록 leading icon slot은 항상 fixed `20 x 20`을 유지한다.
- 검증되지 않은 icon name을 의미가 비슷하다는 이유로 사용하지 않는다.

## border / separator ownership rule

- `appNav area` bottom border는 `appNav area`가 직접 소유한다.
- `appNav area` bottom border를 `Divider` primitive로 대체하는 것은 금지한다.
- `Divider` primitive grammar를 `appNav area` border grammar로 일반화하는 것은 금지한다.
- `SNB shell` right border와 `appNav area` bottom border는 서로 다른 계약이다.

## Tailwind mapping baseline

- shell
  - `w-[200px] flex flex-col items-start border-r`
- appNav area
  - `w-full border-b px-2 py-1`
- AppNavButton
  - `flex items-center gap-2 rounded-lg px-2 py-1.5`
  - leading icon slot은 `size-5 shrink-0`
  - 기본 contract에 trailing caret slot을 포함하지 않는다.
- navList body
  - `flex flex-1 flex-col items-start gap-1 px-2 pt-3 pb-3 w-full`
  - first row top inset과 last row bottom inset은 같은 `12px` rhythm으로 유지한다.
- product-menu level-none row
  - `relative flex items-center rounded-lg px-2 py-1.5 min-h-8 w-full`
  - leading category icon slot은 fixed `20 x 20`로 읽는다.
- product-menu 2nd-level row
  - `relative flex items-center rounded-lg pl-9 pr-2 py-1.5 min-h-8 w-full`
- product-menu 3rd-level row
  - `relative flex items-center rounded-lg pl-14 pr-2 py-1.5 min-h-8 w-full`
- app-menu level-none row
  - `relative flex items-center rounded-lg px-2 py-1.5 min-h-8 w-full`
  - 기본적으로 icon-less reading
- app-menu 2nd-level row
  - `relative flex items-center rounded-lg pl-3 pr-2 py-1.5 min-h-8 w-full`
  - 기본적으로 icon 없음
  - 기본적으로 chevron 없음
- app/category identification icon
  - `size-5`
  - `AppNavButton`과 `product-menu / level-none` leading slot에서 fixed `20 x 20`으로 읽는다.
  - child row나 GNB utility/common icon grammar로 확장하지 않는다.
- chevron affordance
  - `size-5`
  - `hasChildren`가 있을 때만 optional로 읽는다.
  - common UI icon family의 navigation affordance로 읽는다.
- shell에는 canonical `bg-*` 규칙을 적지 않는다.

## later screen generation input contract

- minimum input
  - `menuContext`
  - `topLevelLabel`
  - `currentLeafLabel?`
  - `expandedParents?`
- input meaning
  - `menuContext`
    - `product-menu` 또는 `app-menu`
  - `topLevelLabel`
    - current screen이 속한 top-level menu label
  - `currentLeafLabel?`
    - child leaf 화면이면 current destination label
    - 값이 있으면 breadcrumb는 기본적으로 `topLevelLabel > currentLeafLabel`로 표시한다.
    - top-level leaf 화면이면 생략 가능
  - `expandedParents?`
    - expanded로 표시해야 하는 top-level parent 집합
    - SNB open/display용 입력이며 breadcrumb depth를 직접 늘리지 않는다.
- current safe usage
  - `홈` 화면은 `topLevelLabel=홈`, `currentLeafLabel` 생략으로 처리할 수 있다.
  - `쿼리` 화면은 `topLevelLabel=분석`, `currentLeafLabel=쿼리`, `expandedParents=[분석]`처럼 처리한다.
  - `로그 스키마` 화면은 `topLevelLabel=수집`, `currentLeafLabel=로그 스키마`, `expandedParents=[수집]`처럼 처리한다.
- breadcrumb generation note
  - top-level leaf 화면이면 breadcrumb는 `topLevelLabel` 단일 current item으로 표시할 수 있다.
  - child 화면이면 breadcrumb는 `topLevelLabel > currentLeafLabel`로 표시한다.
  - same expanded branch 안의 emphasized sibling children은 breadcrumb에 포함하지 않는다.
- overlap caution
  - `대시보드`, `계정`은 top-level과 child가 같은 라벨을 공유할 수 있으므로 `depth` 또는 `parentChain`을 함께 넘기는 편이 안전하다.
- out of scope
- app-menu drawer 내부 inventory
- actual 3rd-level menu inventory
- source에 직접 보이지 않는 deeper IA

### copied app menu collision rule

- 기존 앱을 복사해 신규 앱 메뉴를 설계하는 경우, SNB는 menu merge engine이 아니다.
- 같은 label, path, depth, parentChain, guid, app_code가 겹쳐도 `navList body`가 자동으로 병합, 중복 제거, 덮어쓰기를 하지 않는다.
- copied app package의 tab `app_code=null`은 SNB 메뉴 소유권 미확정 상태다. 이를 selected app menu나 default product menu에 임의로 귀속하지 않는다.
- dashboard guid 또는 tab guid가 복사 원본과 동일하면 menu ownership collision 후보로 기록한다.
- 충돌이 있으면 `menuOwnershipResolution=unresolved`로 두고, 사용자 또는 제품 사양이 승인한 해결 정책이 있기 전까지 최종 SNB 메뉴로 렌더링하지 않는다.
- unresolved collision은 단순 실패 종료가 아니라 사용자 확인 대기 상태다. 필요한 정보는 app context switching 문서의 copied app collision feedback packet을 따른다.
- 승인 가능한 해결 정책은 `override`, `rename`, `keep-both`, `remove-from-copy`, `merge-by-id/path`다.
- 이 규칙은 menu inventory data에만 적용한다. `SNB shell`, `appNav area`, `AppNavButton`, row height, row radius, icon rhythm, divider, no-background-paint contract는 변경하지 않는다.

## current project scope에서의 계약

- `SNB`는 현재 `shell + appNav area + AppNavButton + navList body` 범위까지만 잠근다.
- broad structure는 다시 열지 않는다.
- `emphasized`, `expanded`, `current`, `pressed` 의미는 이번 문서 계약에 따라 분리해서 기록한다.
- visible foreground mapping은 `default = secondary gray`, `expanded parent = accent orange`, `emphasized child = primary white`, `current child = accent orange + emphasis surface`로 기록한다.
- `pressed`는 runtime interaction state로 유지하고, 현재 source에서는 `current`와 같은 visual bucket을 사용한다고 기록한다.
- representative sample은 `product-menu / top-level current leaf` 또는 `expanded parent + emphasized child block`이 읽히는 구성을 우선한다.
- example-screen 구현/재구성에서는 current branch와 surrounding top-level context가 함께 읽히는 구성을 우선한다.
- `section title`과 `3rd-level`은 supported optional 구조로 기록하고, always-on canonical assembly로 승격하지 않는다.
- `navList body`의 실제 메뉴 라벨/개수/그룹 수는 global SNB rule로 고정하지 않는다.
- `category icon`과 `common UI icon`은 서로 다른 source policy를 가진다.
- `product-menu / level-none`은 top-level icon-bearing row로, `product-menu / 2nd-level`, `3rd-level`은 icon-less text-first row로 기록한다.
- `app-menu`는 기본적으로 icon-less reading으로 기록한다.

## 예외 처리 규칙

- `GNB`의 background 해석을 `SNB`로 복사하지 않는다.
- `appNav`를 이번 라운드에서 새 family로 분리하지 않는다.

## 라이트 테마 추가 해석

- 본 섹션은 2026-05-04에 확인한 제품 light theme screenshot 기준 보강이다.
- light theme에서도 `SNB shell 200`, `appNav area 40`, `AppNavButton 184 x 32`, row height `32`, radius `8`, inset contract는 그대로 유지한다.
- 차이는 foreground/state surface 읽힘이다. `SNB shell` 전체를 밝은 rail background surface로 칠하지 않고, right border와 appNav bottom border는 semantic border token의 light value로 처리한다.
- `default` top-level row와 child row는 light theme에서 dark neutral text로 읽는다. current 문서의 dark fallback `#b5b5b5`, `#ebebeb`를 literal color truth로 복제하지 않는다.
- `expanded` parent는 light theme에서도 accent orange foreground를 유지한다.
- `emphasized` child는 state 의미를 유지하되, light theme에서는 `semantic.color.text.primary`의 light value를 사용한 high-contrast dark text로 읽는다. dark theme fallback white를 그대로 쓰지 않는다.
- `current` child는 accent foreground + brand emphasis surface 조합을 유지한다. light theme screenshot 기준 surface는 pale orange tint이며, `32h` rounded row 안에서만 보인다.
- `product-menu / level-none`의 multicolor category icon은 그대로 유지하고, light theme라고 해서 mono utility icon으로 치환하지 않는다.

## Figma evidence

- Figma file: `UI-5.1`
- Figma node: `12236:8684`
- Figma screenshot evidence: `issue-20260519-1529-shell-current-spec-refresh/DESIGN.md`
- current-spec gate: pass

## 구현 기준

- exact page: `component/navigation-shell/snb.html`
- catalog route: `index.html#components`
- source owner: `app.js`의 `previewRenderers.SNB`, `snbMenuItems`, `snbShellMenuRow()`
- implemented HTML owner: generated exact page는 `app.js` runtime source를 로드한다.
- SNB 본체 CSS owner: `component-css/component.css`

## QA status

- QA mismatch count: `0` for current-spec static gate.
- static QA: `issue-20260519-1529-shell-current-spec-refresh/audit-shell-current-spec.mjs` `27/27 pass`
- rendered QA: Chrome `file://` exact page에서 `앱`, `홈`, `보안 정보`, `대시보드`, `수집`, `분석`, `대응`, `정책`, `계정`, `시스템` row specimen 확인.
- catalog route QA: `index.html#components` registry에서 `SNB` link 확인.

## CSS source

- `sonar5.css`: 읽기 전용 reference. 수정하지 않는다.
- `component-css/component.css`: `.snb-shell`, `.snb-shell__app`, `.snb-shell__app-button`, `.snb-shell__nav-list`, `.snb-shell__row`, `.snb-shell__icon`, `.snb-shell__chevron` owner.

## boundary

- SNB는 shell, appNav area, navList body boundary를 소유한다.
- 실제 제품 메뉴 inventory, 권한 정책, deeper IA는 이 문서가 추정하지 않는다.
- 복사 앱과 신규 앱의 메뉴 충돌 해결 정책도 실제 제품 메뉴 inventory 영역이다. 이 문서는 자동 병합을 허용하지 않고, 충돌 evidence와 승인된 resolution만 소비한다.
- `index.html#components`는 registry route이며, 상세 구현 truth는 exact page `component/navigation-shell/snb.html`에서 확인한다.
