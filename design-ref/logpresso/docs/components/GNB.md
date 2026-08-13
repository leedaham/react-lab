# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/navigation-shell/gnb.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 / 9001:7167`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/GNB.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

GNB

## 목적

- `GNB`는 global top shared component다.
- 현재 문서는 boundary-only 정리가 아니라, current source 기준 구현/재구성 가능한 UI recipe를 기록한다.
- 현재 source는 `shared shell + concrete recipe`가 섞여 있지만, 지금 프로젝트 범위에서는 shell/cluster/child placement와 CI-in-GNB 규칙까지를 구현 기준으로 잠근다.

## current source 읽는 법

- `GNB`는 child family를 담는 top-level shell로 읽는다.
- current singleton representation은 `variant=default`다.
- 현재 문서에서는 primary navigation을 source에 없는 형태로 억지 해석하지 않는다.
- child family의 내부 behavior는 각 child family 문서가 소유하고, GNB는 placement와 shell recipe를 소유한다.

## shell UI recipe

- current visible source sample
  - `variant=default` sample frame은 `1920 x 48`이다.
  - 이 값은 current visible source sample observation이고, implementation baseline과 같은 뜻으로 쓰지 않는다.
- implementation baseline
  - `w-full`
  - `h-12`
- shell spacing
  - `px-[16px]`
  - `py-[12px]`
- shell content height
  - 전체 헤더 높이 `48`에서 상하 패딩 `12 + 12`를 제외한 내부 콘텐츠 최대 높이는 `24`다.
- header child control baseline
  - GNB 내부 `Button`, `UserConsole`, trailing `iconButton`, compact utility control은 `24px` 높이를 기본값으로 읽는다.
- shell visual
  - bottom border만 사용한다.
  - `border-bottom: 1px`
  - border token: `semantic.color.border.default`
  - fallback color: `rgba(126,140,222,0.16)`
  - top border는 금지한다.
  - left border는 금지한다.
  - right border는 금지한다.
- shell background interpretation
  - `GNB` shell은 background color를 소유하지 않는다.
  - `GNB` shell의 computed `background`, `background-color`, `background-image`는 모두 paintless 상태여야 한다.
  - `GNB` shell 뒤에 body, canvas, product background asset, gradient, tint가 비쳐서 독립된 header surface처럼 보이는 것도 invalid output이다.
  - 검증 기준은 CSS raw background만이 아니라 실제 screenshot에서 GNB 영역이 배경색이 깔린 bar처럼 보이지 않는지까지 포함한다.
  - raw computed value가 `transparent`인 것만으로 pass 처리하지 않는다.
  - `html`, `body`, `[data-screen-shell]`, `[data-screen-shell-body]`의 fallback fill이나 product canvas가 GNB 48px row 뒤에 보여 GNB가 별도 header surface처럼 읽히면 invalid output이다.
  - Product screen background는 workspace/canvas 영역에서 시작해야 하며 GNB 뒤, 내부, 또는 투과 영역까지 확장되면 안 된다.
  - screenshot 또는 pixel/composited evidence에서 GNB row는 content, bottom divider, child controls만 보여야 한다. solid header bar, blurred header bar, tinted strip, gradient strip은 모두 실패다.
  - `GNB` shell에 background color, background image, gradient, tint, glass, blur, shadow를 추가하면 invalid output이다.
  - Product screen background asset이나 proposal을 `GNB` 뒤, 내부, 또는 투과 영역에 적용하지 않는다.
  - 현재 문서에서 강하게 잠그는 것은 shell layout, placement, bottom border, and no-background paint다.
- shell layout
  - `flex`
  - `items-center`
  - `justify-between`
- shell direct child rule
  - `GNB shell`의 direct child는 `LeftCluster`, `UtilityCluster` 두 개뿐이다.
  - 두 cluster는 content-hug group이 아니라 shell-owned structural wrapper다.
  - cluster 폭은 child intrinsic width가 아니라 shell의 available width를 나눠 갖는다.
  - child append 이후에도 shell과 cluster 폭을 children 합산 기준으로 다시 줄여 읽지 않는다.
  - child family는 shell에 직접 붙지 않고 반드시 cluster 안에 배치한다.
  - `LeftCluster`, `UtilityCluster`는 둘 다 `flex-1` structural wrapper를 사용한다.
  - `UtilityCluster`의 direct child는 항상 content-hug / `shrink-0` fixed-width control이다.
  - `UtilityCluster`의 inner child는 fill behavior를 절대 상속하지 않는다.
  - inner utility child를 fill control로 재조립하는 것은 금지한다.
- shell 자체에는 별도 radius나 shadow를 잠그지 않는다.

## cluster UI recipe

- `LeftCluster`
  - `flex`
  - `flex-1`
  - `items-center`
  - `gap-[10px]`
  - `overflow-hidden`
- `UtilityCluster`
  - `flex`
  - `flex-1`
  - `items-center`
  - `justify-end`
  - `gap-[8px]`
- `LeftCluster`와 `UtilityCluster`는 GNB-owned wrapper boundary이며, child family를 배치하는 shell cluster다.
- 두 cluster는 child 수에 따라 shell 폭을 다시 계산하는 wrapper가 아니라, shell 안에서 available width를 나눠 갖는 구조 wrapper다.
- `UtilityCluster`의 right alignment는 wrapper 정렬 규칙이고, inner child sizing 규칙이 아니다.
- `UtilityCluster` 안의 direct child는 항상 자기 고유 width를 유지하며 `flex-1`, `grow`, fill grammar를 사용하지 않는다.
- `UtilityCluster`의 direct child는 `GlobalSearch`, `TenantButton`, `UserConsole`, `TrailingUtilityAction`이며, 모두 `shrink-0` fixed-width control로 유지한다.

## child placement recipe

- `LeftCluster`
  - `CI`
  - `SNBToggle`
  - `Divider`
  - `Breadcrumb`
- `UtilityCluster`
  - `GlobalSearch`
  - `Divider`
  - `TenantButton`
  - `Divider`
  - `UserConsole`
  - `TrailingUtilityAction`
- current visible recipe에서는 위 순서를 placement baseline으로 읽는다.
- child control은 shell에 직접 붙지 않고 위 순서대로 각 cluster 안에만 배치한다.
- right-side utility/common affordance shared contract는 [header-utility-contract.md](../rules/header-utility-contract.md)를 따른다.

## child placement UI note

- `CI`
  - `shrink-0`
  - current rendered size `139 x 24`
  - `LeftCluster`의 leftmost anchor child
- `SNBToggle`
  - `shrink-0`
  - GNB 안에서 `24 x 24` visible icon-only toggle footprint를 유지한다.
  - current spec은 [SNBToggle.md](SNBToggle.md)를 기준으로 읽는다.
  - `CI`와 `Divider` 사이의 rhythm을 유지하는 compact icon-only toggle이다.
  - current source는 flattened-asset-like sample로 보이며, literal border/radius/inset primitive를 여기서 다시 정의하지 않는다.
- `Divider`
  - current recipe는 항상 `2 x 12`다.
  - radius는 금지한다.
  - rounded line 해석은 금지한다.
  - divider token: `semantic.color.divider.default`
  - exact primitive는 항상 [Divider.md](Divider.md)를 따른다.
- `Breadcrumb`
  - `shrink-0`
  - current visible source sample에는 `count=1` compact case가 보인다.
  - top-level leaf/current-only screen은 항상 `count=1` compact trail을 사용한다.
  - child screen은 `count=2`, `parent > current child`를 current contract로 사용한다.
  - compact trail로 유지하며 wrapper는 content-hug를 유지한다.
  - `py-[2px]` wrapper를 유지하고, bg/border/chip처럼 재조립하지 않는다.
  - `GNB`는 breadcrumb item 의미를 새로 정의하지 않고 screen context에 맞는 `count`와 item text만 선택한다.
- `GlobalSearch`
  - utility cluster 첫 child
  - current visible recipe는 closed trigger 상태
  - 항상 visible `24 x 24` boxed control을 유지한다.
  - `24 x 24`는 invisible footprint가 아니라 실제로 보이는 control box를 뜻한다.
  - bare glyph trigger로 축소하지 않는다.
  - exact closed trigger recipe는 항상 [Search.md](Search.md)를 따른다.
  - GNB source 기준 closed trigger의 inner composition은 항상 `SearchGlyph` 하나뿐이다.
  - exact icon identity는 항상 `search`다.
  - `SearchGlyph`는 항상 `18 x 18`이고 `materialiconsoutlined SVG` family다.
  - outer control surface는 항상 `semantic.color.surface.container.default`다.
  - outer control surface fallback은 항상 `#070b13`이다.
  - outer control border는 항상 `semantic.color.border.interactive.default`다.
  - outer control border fallback은 항상 `rgba(126,140,222,0.16)`이다.
  - inner glyph foreground는 항상 `semantic.color.text.primary`다.
  - inner glyph foreground fallback은 항상 `#ebebeb`이다.
  - `DropdownIndicator`를 붙이는 것은 금지한다.
  - closed trigger를 input-like field로 재해석하는 것은 금지한다.
- `TenantButton`
  - current visible sample은 `label=Tenant`인 dropdown-attached button usage다.
  - compact dropdown usage contract는 [header-utility-contract.md](../rules/header-utility-contract.md)를 따른다.
  - GNB usage에서는 generic dropdown canonical slot을 자동 확장하지 않고 current visible sample의 no-leading-icon compact recipe를 우선한다.
- `UserConsole`
  - current visible sample은 compact user-entry trigger
  - exact usage contract는 [header-utility-contract.md](../rules/header-utility-contract.md)를 따른다.
- `TrailingUtilityAction`
  - utility cluster의 trailing shortcut/action entry다.
  - exact usage contract는 [header-utility-contract.md](../rules/header-utility-contract.md)를 따른다.
  - exact business meaning은 GNB가 소유하지 않고, compact utility action fidelity만 소유한다.

## SNBToggle in GNB

- `SNBToggle`은 `GNB` 내부의 usage-level control이며, `SNB` anatomy나 `navList` state matrix에 포함하지 않는다.
- `SNBToggle`은 `SNB shell`의 open/close visibility만 제어하고, `expanded | emphasized | current` 같은 `navList` row state와 섞지 않는다.
- `SNBToggle`은 GNB 안에서 유일한 icon-only exception이다.
- GNB 안에서 `SNBToggle`은 항상 `24 x 24` icon-only toggle footprint를 유지한다.
- current source는 flattened-asset-like control sample로 보이며, `border`, `radius`, `inset`을 분리된 primitive anatomy로 직접 노출하지 않는다.
- `open | close`는 glyph sample만 바뀌고 `24 x 24` footprint는 유지한다.
- 조립 시에는 bare glyph보다 먼저 `24 x 24` footprint를 유지한 뒤 open/close glyph 방향을 맞춘다.
- `SNBToggle`에 right-side utility boxed-control grammar를 적용하는 것은 금지한다.
- `SNBToggle`의 icon-only grammar가 right-side utility control로 새어 나가는 것은 금지한다.
- `SNBToggle`은 right-side utility/common control의 dark surface token을 상속하지 않는다.
- `SNBToggle`은 right-side utility/common control의 border token을 상속하지 않는다.
- `SNBToggle`은 right-side utility/common control의 dark boxed chrome을 상속하지 않는다.

## GNB utility usage fidelity

- GNB 안 right-side utility control의 boxed-control shared contract는 [header-utility-contract.md](../rules/header-utility-contract.md)를 따른다.
- `SNBToggle`은 같은 header line rhythm 안에 놓이지만, right-side utility boxed-control set에 포함하지 않는다.
- `SNBToggle`은 utility/common affordance family와 혼동하지 않고 icon-only toggle exception으로 별도 읽는다.
- `Breadcrumb`는 utility control은 아니지만, same header line 안에서 compactness를 유지해야 하므로 `24h` line rhythm을 함께 맞춘다.

## Breadcrumb in GNB

- `Breadcrumb`는 GNB current visible source sample 하나만 복제하는 child가 아니라, screen context에 따라 `count`를 선택하는 child family다.
- top-level leaf/current-only screen에서는 `count=1` compact trail을 사용한다.
- child screen에서는 `count=2`, `parent > current child`를 사용한다.
- 구현/재구성에서는 child screen breadcrumb를 current page 단일 텍스트로 축약하지 않는다.
- exact item composition은 [breadcrumb.md](breadcrumb.md)를 기준으로 따른다.

## token / icon handling rule

- GNB shell/divider에는 semantic token을 우선 적용한다.
- child control token은 GNB가 새로 정의하지 않고, 각 child family token을 그대로 재사용한다.
- GNB shell bottom border token은 항상 `semantic.color.border.default`다.
- GNB shell bottom border fallback은 항상 `rgba(126,140,222,0.16)`이다.
- fallback hex/rgba 값은 source reference이며, light theme 구현에서는 semantic token value를 우선한다.
- GNB right-side utility/common affordance shared contract는 [header-utility-contract.md](../rules/header-utility-contract.md)를 따른다.
- GNB utility/common icon family는 multicolor app/category icon family와 같은 것으로 취급하지 않는다.
- 관련 icon direction은 child control 기준으로 `Angular Material / Material Icons`를 유지한다.

- child family reference는 GNB-owned primitive anatomy가 아니라 child family composition으로 기록한다.

## implementation / reconstruction proof rule

- 구현/재구성 완료를 주장하기 전에는 반드시 [implementation-checklist.md](../rules/implementation-checklist.md)를 통과해야 한다.
- GNB는 header shell/current-spec 작업이므로 [current-spec-checklist.md](../rules/current-spec-checklist.md)를 항상 final gate로 적용한다.
- current-spec checklist를 실행하지 않았으면 GNB 구현/재구성은 완료로 닫을 수 없다.
- 시각적 유사성만으로 완료를 주장하는 것은 금지한다.
- 다음 항목 중 하나라도 빠지면 GNB implementation/reconstruction은 실패로 본다.
  - `CI` source-of-truth asset/mode 확인
  - shell bottom border only 확인
  - `Divider` exact `2 x 12` flat primitive 확인
  - `GlobalSearch` exact closed trigger composition 확인
  - right-side utility boxed control의 `24 x 24 outer / 18 x 18 inner` 확인
  - right-side utility boxed control의 exact surface/border/glyph color 확인
  - `TenantButton` usage override와 family truth 분리 확인
  - `SNBToggle` icon-only exception 확인
  - `GlobalSearch`에 `DropdownIndicator`가 붙지 않았는지 확인

## CI-in-GNB rule

- GNB 안에서 `CI`는 fixed-size brand asset로 배치한다.
- `CI`는 GNB current visible recipe의 mandatory child다.
- GNB는 `CI`의 비율이나 도형을 다시 정의하지 않는다.
- `CI`는 `LeftCluster`에서 vertical center align 된다.
- `CI`와 다음 child 사이 간격은 cluster gap으로 확보한다.
- GNB는 `CI`에 semantic recolor를 강제하지 않는다.
- `GNB`에서 `CI`를 조립할 때 asset source와 mode rule은 반드시 [CI.md](CI.md)까지 따라간다.
- `GNB`는 `CI`의 placement와 rhythm을 소유하고, `CI` asset 자체의 source-of-truth와 mode 선택은 `CI.md`가 소유한다.
- source-of-truth SVG가 열려 있으면 wordmark fallback이나 임의 placeholder로 대체하지 않는다.

## Tailwind mapping baseline

- shell
  - `w-full h-12 px-4 py-3 border-b border-[rgba(126,140,222,0.16)] flex items-center justify-between`
- `LeftCluster`
  - `flex flex-1 items-center gap-[10px] overflow-hidden`
- `UtilityCluster`
  - `flex flex-1 items-center justify-end gap-2`
  - direct child는 모두 `shrink-0`
- `CI`
  - `shrink-0 w-[139px] h-6`
- `SNBToggle`
  - `shrink-0 size-6`
- `Divider`
  - `shrink-0 w-[2px] h-3`
- `Breadcrumb`
  - `shrink-0 flex items-center py-[2px]`
- `UserConsole`
  - `shrink-0`
- `GlobalSearch`
  - `shrink-0 size-6`
  - `bg-[#070b13] border border-[rgba(126,140,222,0.16)]`
  - `size-6`는 outer control box를 뜻한다.
  - inner composition은 `SearchGlyph 18` 하나뿐이다.
- `TenantButton`
  - `shrink-0 h-6`
  - current visible sample: `w-[72px]`
  - `bg-[#070b13] border border-[rgba(126,140,222,0.16)]`
- `UserConsole`
  - `shrink-0 size-6 bg-[#070b13] border border-[rgba(126,140,222,0.16)]`
  - `size-6`는 outer control box를 뜻한다.
  - inner glyph는 `18 x 18` optical rule로 읽는다.
- `TrailingUtilityAction`
  - `shrink-0 size-6 bg-[#070b13] border border-[rgba(126,140,222,0.16)]`
  - `size-6`는 outer control box를 뜻한다.
  - inner glyph는 `18 x 18` optical rule로 읽는다.
- exact/arbitrary value가 필요한 값
  - `10`
  - `139`
  - `2`

## GNB가 직접 소유하는 것 / 소유하지 않는 것

- 직접 소유하는 것
  - top-level shell
  - left/right cluster arrangement
  - child family placement order
  - child family를 담는 composition boundary
- 직접 소유하지 않는 것
  - `CI` asset 도형/비율
  - `Breadcrumb`의 overflow/max-width 세부 규칙
  - `GlobalSearch`의 opened width, close 조건, focus move
  - `UserConsole`의 deeper menu model
  - child family 각각의 내부 state/behavior

## current project scope에서의 계약

- `GNB`는 current project scope에서 `shared shell + child family composition`으로 다룬다.
- left-side SNB top area의 `appNav`는 일반 dropdown이 아니라 app을 선택하고 실행하는 `app launcher panel`의 trigger로 읽는다.
- `variant=default`는 singleton representation으로만 읽고, broad state/behavior axis로 확장하지 않는다.
- 구현 baseline width는 `w-full`이다.
- shell width는 content-hug가 아니라 container-fill로 유지한다.
- trailing utility action은 business meaning보다 usage-level box fidelity와 placement를 current contract로 본다.

## 예외 처리 규칙

- `GNB` 안에 child family가 함께 보이더라도 이를 GNB-owned primitive anatomy로 승격하지 않는다.
- current source에 명확히 보이지 않는 primary nav zone은 문서 계약에 넣지 않는다.
- behavior-heavy detail은 각 child family 문서 또는 후속 GNB 규칙 정리 전까지 문서 밖에 둔다.

## 라이트 테마 추가 해석

- 본 섹션은 2026-05-04에 확인한 제품 light theme screenshot 기준 보강이다.
- light theme에서도 GNB shell 높이 `48`, 내부 control의 `24h` compact rhythm, `LeftCluster -> UtilityCluster` 구조는 그대로 유지한다.
- 다만 right-side utility control에 적혀 있는 dark fallback `#070b13`를 GNB 전체 shell background로 확장하지 않는다.
- light theme의 GNB shell은 별도 배경색을 칠한 header surface로 재해석하지 않는다. shell의 시각 분리는 bottom border `semantic.color.border.default`의 light value로 해결한다.
- `GlobalSearch`, `TenantButton`, `UserConsole`, `TrailingUtilityAction` boxed control은 same `24 x 24` 또는 `24h` grammar를 유지하되, light theme에서는 `semantic.color.surface.container.default`, `semantic.color.border.interactive.default`, `semantic.color.text.primary`의 light value를 사용한다.
- `Breadcrumb`는 previous/helper text가 dark helper tone으로, current item은 accent orange로 읽힌다.
- `SNBToggle`은 light theme에서도 right-side utility boxed grammar로 재해석하지 않고, borderless icon-only exception으로 유지한다.

## Figma evidence

- Figma file: `UI-5.1`
- Figma node: `9001:7167`
- Figma screenshot evidence: `issue-20260519-1529-shell-current-spec-refresh/DESIGN.md`
- current-spec gate: pass

## 구현 기준

- exact page: `component/navigation-shell/gnb.html`
- catalog route: `index.html#components`
- source owner: `app.js`의 `previewRenderers.GNB`, `componentCodeExamples.GNB`
- implemented HTML owner: generated exact page는 `app.js` runtime source를 로드한다.
- GNB 본체 CSS owner: `component-css/component.css`

## QA status

- QA mismatch count: `0` for current-spec static gate.
- static QA: `issue-20260519-1529-shell-current-spec-refresh/audit-shell-current-spec.mjs` `27/27 pass`
- rendered QA: Chrome `file://` exact page에서 `Logpresso`, `SNB 접기`, `현재 페이지`, `검색`, `Tenant`, `사용자 콘솔`, `지원` specimen 확인.
- catalog route QA: `index.html#components` registry에서 `GNB` link 확인.

## CSS source

- `sonar5.css`: 읽기 전용 reference. 수정하지 않는다.
- `component-css/component.css`: `.gnb-shell`, `.gnb-shell__left`, `.gnb-shell__utility`, `.gnb-shell__divider`, `.gnb-shell__breadcrumb`, `.gnb-shell__icon-button--snb`, `.gnb-shell__icon-button--utility`, `.gnb-shell__tenant` owner.

## boundary

- GNB는 shell, cluster, child placement order를 소유한다.
- `CI`, `SNBToggle`, `Breadcrumb`, `UserConsole` 내부 behavior는 각 child 문서가 소유한다.
- `index.html#components`는 registry route이며, 상세 구현 truth는 exact page `component/navigation-shell/gnb.html`에서 확인한다.
