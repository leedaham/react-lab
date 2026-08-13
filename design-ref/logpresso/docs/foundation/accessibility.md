# accessibility

## 목적

- 이 문서는 current spec 문서 체계에서 shared accessibility foundation과 usage boundary를 정의한다.
- 이 문서는 component별 exact keyboard interaction, ARIA role, focus ring geometry 전체를 새로 정의하지 않는다.
- 이 문서는 AI 에이전트가 목업이나 화면설계를 만들 때 접근성 의미를 누락하지 않도록 최소 공통 기준을 잠근다.

## source of truth

- component 문서가 exact focus-visible geometry, role, keyboard behavior를 잠그면 component 문서를 우선한다.
- component 문서가 접근성 세부값을 잠그지 않은 경우 이 문서를 starting point로 사용한다.
- 브라우저 기본 semantic element가 접근성 의미를 제공할 수 있으면 `div + role`보다 native element를 우선한다.
- 접근성 의미는 visual state와 분리해서 읽는다.
- `focused`와 `focus-visible`은 같은 state가 아니며, keyboard 사용자에게 보이는 focus indicator는 항상 `focus-visible` 기준으로 판단한다.

## 소유하는 truth

- 모든 interactive control은 keyboard로 도달 가능해야 한다.
- 모든 interactive control은 accessible name을 가져야 한다.
- icon-only control은 visible text가 없더라도 `aria-label` 또는 동등한 accessible name을 가져야 한다.
- disabled control은 시각적 disabled만으로 끝내지 않고 interaction unavailable 의미를 함께 가져야 한다.
- loading control은 가능한 경우 loading state를 assistive technology에 전달해야 한다.
- selected, checked, expanded, pressed, current는 서로 대체하지 않는다.
- `aria-expanded`는 disclosure, dropdown, popover, tree처럼 열림/닫힘 상태가 있는 trigger에만 사용한다.
- `aria-selected`는 tab, option, grid row처럼 selection model이 있는 role에서만 사용한다.
- `aria-pressed`는 toggle button 의미가 있을 때만 사용한다.
- `aria-current`는 현재 페이지, 현재 위치, 현재 단계처럼 navigation current 의미가 있을 때만 사용한다.
- focus trap은 modal처럼 background interaction을 막는 overlay에서만 필요하다.
- tooltip은 focusable content를 소유하지 않으며, focusable content가 필요하면 popover 또는 modal로 승격한다.
- color만으로 상태를 전달하지 않는다. text, icon, shape, accessible state 중 하나 이상을 함께 사용한다.
- error는 field status, helper/error message, accessible relation을 함께 고려한다.
- reduced motion 환경에서는 motion foundation의 reduced motion rule을 따른다.

## usage boundary

- accessibility foundation은 접근성 의미와 검증 기준을 소유한다.
- component 문서는 해당 component의 exact role, keyboard behavior, focus-visible geometry, state mapping을 소유한다.
- parent composition 문서는 focus order, overlay focus return, landmark/region 관계를 소유할 수 있다.
- local usage 문서는 특정 parent 안에서만 유효한 aria label 또는 helper text relation을 소유할 수 있다.
- example-only sample은 accessibility canonical truth를 만들지 못한다.

## forbidden rule

- visible focus ring을 디자인상 보이지 않는다는 이유로 제거하는 것은 금지한다.
- hover state만 있고 keyboard focus state가 없는 interactive pattern을 current spec으로 승격하는 것은 금지한다.
- `selected`, `active`, `current`, `pressed`, `checked`를 같은 의미로 섞는 것은 금지한다.
- icon glyph 이름을 accessible name으로 그대로 노출하는 것은 금지한다.
- color contrast를 확인하지 않은 raw color pair를 접근 가능한 조합처럼 문서화하는 것은 금지한다.
- modal이 열렸는데 background content가 계속 keyboard focus를 받는 구조를 current spec으로 승격하는 것은 금지한다.
- tooltip 안에 button, input, link 같은 focusable element를 넣는 것은 금지한다.

## 관련 문서

- [components.md](../components/components.md)
- [state.md](state.md)
- [color.md](color.md)
- [motion.md](motion.md)
- [Modal.md](../components/Modal.md)
- [Popover.md](../components/Popover.md)
- [Tooltip.md](../components/Tooltip.md)
- [Input.md](../components/Input.md)
- [Checkbox.md](../components/Checkbox.md)
- [Radio.md](../components/Radio.md)
- [Switch.md](../components/Switch.md)

## 이 문서가 소유하지 않는 것

- 각 component의 exact keyboard shortcut 전체
- 각 component의 exact focus-visible ring inset, radius, stroke
- 각 component의 final ARIA attribute matrix 전체
- 제품 화면별 실제 문구
- 법무 또는 컴플라이언스 접근성 인증 범위
