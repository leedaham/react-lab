# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/navigation-shell/tabadd.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 / tabAdd 11914:2772`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/tabAdd.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

tabAdd

## Figma evidence

- Figma file: `UI-5.1`
- Figma node: `tabAdd` `11914:2772`
- Figma URL: `https://www.figma.com/design/dodpG7QVPyrxWI1uFjKYrC/UI-5.1?node-id=11914-2772`
- screenshot evidence: `392 x 76`
- confirmed scope: horizontal overflow control cluster, `showFrame=true|false`, add button state proof

## 구현 기준

- exact page: `site/component/navigation-shell/tabadd.html`
- catalog route: `site/index.html#components`
- source owner: `site/app.js`
- source helper: `tabAddMarkup()`, `tabAddHtmlExample()`, `tabAddPreview()`, `tabAddButton()`
- implemented HTML owner: `app.js` helper output and `generate-component-pages.mjs` generated exact page
- root selector contract: `[data-tab-add]`
- base CSS selector from `sonar5.css`: `.btn`, `.btn-default`, `.btn-icon-only`, `.tab-add-button`, `.tab-add-icon`
- gap CSS file: `component-css/component.css`, 기존 `[data-tab-add]` 보정 사용, 이번 문서 계약 보강에서는 신규 보정 없음
- `sonar5.css`는 read-only reference이며 수정하지 않는다.

## QA status

- exact page와 catalog route가 존재한다.
- exact page는 `sonar5.css`와 `component-css/component.css`를 외부 stylesheet로 로드한다.
- QA mismatch count: `0`

## 목적

- `tabAdd`는 horizontal tab strip이 길어져 해당 컴포넌트 frame이 좌우의 다른 frame이나 주변 요소 때문에 잘려 보일 때 쓰는 shared overflow controls pattern이다.
- 이 pattern은 `tabNav`, `pillTabs / direction=horizontal`에서 공통으로 사용될 수 있다.
- standalone `tabAdd`는 단순 `+` action이 아니라 `좌로 이동`, `우로 이동`, `탭 추가`를 함께 가진 control cluster다.
- `tabNav` 안에서는 `showFrame=false`로 쓰여 add iconButton만 보이는 sibling accessory가 될 수 있다.

## family boundary

- 이 문서는 `tabAdd`를 `family canonical`이 아니라 `reusable composition pattern`으로 다룬다.
- `tabAdd`는 `tabItem`, `tabNavItem`, `pillTabItem` anatomy에 포함되지 않는다.
- `tabAdd`는 horizontal overflow/accessory pattern이다.
- `direction=vertical`에는 현재 current truth로 연결하지 않는다.

## current truth

- `showFrame=true` visible recipe는 `chevron_left -> chevron_right -> add` 3개 icon button cluster다.
- `showFrame=false` visible recipe는 `add` iconButton만 남는다.
- `tabNav`, `pillTabs / direction=horizontal` 근처 사용 증거가 있다.
- 이 문서 범위에서 `tabAdd`는 horizontal strip 보조 control이라는 점까지만 확정한다.
- standalone overflow control로 사용할 때는 horizontal overflow가 실제로 발생할 때 나타난다.
- `tabNav` component node 안에서는 property로 `tabAdd`가 붙으며, `showFrame=false` 상태가 current evidence로 확인된다.
- 이 문서에서 overflow는 horizontal tab strip 자체가 길어져, 해당 컴포넌트 frame이 좌우의 다른 frame이나 주변 요소 때문에 잘려 보이는 상태를 뜻한다.
- overflow가 없으면 `tabAdd`는 렌더하지 않는다.
- `ChevronLeftButton`, `ChevronRightButton`은 hidden tab을 좌우로 다시 보이게 하는 overflow navigation control이다.
- `AddButton`은 같은 cluster 안에서 새 tab을 추가하는 action이다.

## 구조 / anatomy

- `ScrollControlsFrame?`
  - `ChevronLeftButton`
  - `ChevronRightButton`
- `AddButton`
- `showFrame`은 public property로 기록한다.
- `showFrame=true`일 때 좌우 이동 control cluster가 함께 보인다.
- `showFrame`은 `ScrollControlsFrame`의 노출 여부를 제어한다.
- `AddButton`은 `showFrame=true`에서는 cluster 바깥의 별도 button으로 읽는다.
- `showFrame=false`에서는 `ScrollControlsFrame`이 숨고 `AddButton`만 남는다.

## visual shell 규칙

- 세 control 모두 iconButton 계열 shell을 사용한다.
- 전체는 `24px` 계열 compact icon control grammar로 읽는다.
- outer wrapper density는 항상 `px 8 / py 6`이고, control 간 주 gap은 `8px`다.
- 좌우 이동 control cluster는 서로 붙은 grouped controls로 읽는다.
- 좌우 이동 control cluster 내부 두 button 사이 gap도 `8px`이다.
- 각 control은 `border radius 8`, `border 1`, `padding 3`, `icon size 18`을 유지한다.
- 기본 border color는 항상 `semantic.color.border.interactive.default / rgba(126,140,222,0.16)`다.
- 기본 surface는 항상 `semantic.color.surface.container.default / #070b13`다.
- fallback hex/rgba 값은 source reference이며, light theme 구현에서는 semantic token value를 우선한다.
- add button은 cluster 오른쪽의 별도 control로 읽는다.
- hover와 active visual은 iconButton family grammar를 참조하되, `tabAdd` 자체가 iconButton family canonical truth를 다시 정의하지는 않는다.

## state 규칙

- 현재 source state naming은 `default`, `add-hover`, `add-active`다.
- current spec에서는 아래 시각 차이만 잠근다.
  - `default`
    - 세 control 모두 `semantic.color.surface.container.default / #070b13` + `semantic.color.border.interactive.default / rgba(126,140,222,0.16)`를 유지한다.
  - `add-hover`
    - 좌우 이동 control은 default를 유지한다.
    - add button만 `semantic.color.interactive.neutral.surface.hover / #0e1322`로 올라간다.
    - add button에 `shadow/base`가 들어간다.
      - `0 2 3 rgba(0,0,0,0.10)`
      - `0 1 2 rgba(0,0,0,0.06)`
  - `add-active`
    - 좌우 이동 control은 default를 유지한다.
    - add button border는 `semantic.color.interactive.brand.accent / #ff692a`로 전환된다.
    - add button 내부 surface는 `semantic.color.interactive.neutral.surface.emphasis / #151c33`다.
    - add button에는 `shadow/inner`
      - `inset 0 2 4 rgba(0,0,0,0.06)`
      가 들어간다.

## 사용해야 하는 경우

- horizontal tab strip이 길어져 해당 컴포넌트 frame이 좌우의 다른 frame이나 주변 요소 때문에 잘려 보일 때
- `tabNav` trailing accessory로 붙을 때
- `pillTabs / direction=horizontal` trailing accessory로 붙을 때

## 사용하지 말아야 하는 경우

- `tabItem` 내부 trailing slot처럼 넣으면 안 된다.
- `tabNavItem` 내부 anatomy처럼 넣으면 안 된다.
- `pillTabItem` 내부 anatomy처럼 넣으면 안 된다.
- `pillTabs / direction=vertical`의 current truth로 자동 승격하면 안 된다.

## current spec에서 제외하는 것

- `tabAdd`를 단순 add-only button으로 읽는 해석
- `tabAdd`를 item variant로 읽는 해석
- overflow가 없는데도 항상 노출되는 fixed trailing accessory 해석

## implementation / reconstruction 시 반드시 지켜야 하는 규칙

- `showFrame=true`의 `tabAdd`는 `left / right / add`를 가진 shared overflow controls pattern으로 읽는다.
- `showFrame=false`의 `tabAdd`는 add iconButton만 남는다. 이 상태를 `tabNavItem` anatomy로 흡수하면 안 된다.
- standalone `tabAdd`를 근거 없이 단일 iconButton으로 단순화하면 안 된다.
- `tabAdd`를 `tabNavItem` 또는 `pillTabItem` anatomy로 흡수하면 안 된다.
- `tabAdd`는 horizontal strip accessory다.
- overflow가 없으면 `tabAdd`를 렌더하지 않는다.
- 여기서 overflow는 viewport 일반론이 아니라, 해당 컴포넌트 frame이 좌우의 다른 frame이나 주변 요소 때문에 잘려 보이는 상태를 뜻한다.
- `vertical` context에 자동 적용하면 안 된다.

## pending / later decision log

- `tabAdd`를 별도 family canonical component로 승격할지 여부

## implementation snapshot

- HTML 구현은 `site/app.js`의 `tabAddMarkup`, `tabAddButton`, `tabAddPreview`가 소유한다.
- standalone `showFrame=true`는 `data-tab-add` root 아래 `chevron_left`, `chevron_right`, `add` 3개 control로 구현한다.
- 각 control은 기존 Button family 구현과 같은 `.btn`, `.btn-default`, `.btn-icon-only`를 사용하고, tabAdd 보정에는 `sonar5.css`에 존재하는 `.tab-add-button`, `.tab-add-icon` 제품 selector를 함께 사용한다.
- `showFrame=false` add-only accessory는 `tabNav`와 `pillTabs / direction=horizontal`에서 `.tab-nav-add`, `.tab-nav-add-icon` 제품 selector로 구현한다.
- Figma state gap인 `add-hover`, `add-active`는 `component-css/component.css`의 `[data-tab-add] .tab-add-button.is-add-hover`, `[data-tab-add] .tab-add-button.is-add-active`에서만 보정한다.
- `sonar5.css`는 읽기 전용 reference이며 이번 구현에서 수정하지 않는다.
