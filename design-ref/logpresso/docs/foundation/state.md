# state

## 목적

- 이 문서는 current spec 문서 체계에서 shared state model과 state ownership boundary를 정의한다.
- 이 문서는 component별 full state rendering recipe를 대신 쓰지 않는다.

## source of truth

- state는 current spec 문서에 반복 확인된 공통 interaction/runtime axis만 foundation에서 다룬다.
- component doc가 exact state set과 state delta를 잠그면 component doc를 우선한다.
- foundation은 baseline reference일 뿐이고 existing component exact truth를 덮지 못한다.

## 소유하는 truth

- foundation이 소유하는 shared state 축은 아래다.
  - `default`
  - `hover`
  - `focused`
  - `pressed`
  - `focus-visible`
  - `disabled`
  - `loading`
  - `selected`
  - `active`
- foundation은 state meaning distinction만 소유한다.
- `hover`, `focused`, `pressed`, `focus-visible`은 interaction preview state다.
- `disabled`, `loading`은 runtime state다.
- `selected`와 `active`는 selection/activation meaning을 가지며, interaction preview state와 같은 뜻이 아니다.
- `focused`는 direct activation / input-ready field state를 뜻한다.
- `focus-visible`은 keyboard accessibility focus state를 뜻한다.
- `focused`와 `focus-visible`은 같은 뜻이 아니다.
- `focus-visible` outer ring geometry는 component doc가 소유한다.
- numeric value가 우연히 같아도 ownership은 각 component doc에 남는다.
- foundation은 `focus-visible` ring의 exact inset, radius, stroke를 정의하지 않는다.
- `pressed`는 action control interaction preview state다.
- `pressed`, `active`, `selected`를 같은 뜻으로 섞는 것은 금지한다.
- accessibility communication은 state meaning을 흐리지 않아야 한다.

## usage boundary

- foundation은 shared state model과 naming boundary만 소유한다.
- component 문서는 exact state set, state delta, visual rendering을 소유한다.
- parent composition 문서는 open-state orchestration 같은 composition state를 소유할 수 있다.
- local usage 문서는 문서에 명시된 경우에만 limited state override를 가질 수 있다.
- example-only sample은 state canonical truth를 만들지 못한다.
- existing component doc가 exact state truth를 소유하면 foundation baseline보다 component truth가 항상 우선한다.
- exact truth가 아직 잠기지 않은 새 component에서만 foundation baseline을 starting point로 사용한다.
- foundation baseline이 source-confirmed component truth와 충돌하면 source를 다시 확인한 뒤 component truth를 문서에 반영한다.

## forbidden rule

- foundation이 component specialization state를 shared foundation state로 승격하는 것은 금지한다.
- `expanded`, `checked`, `on/off` 같은 specialization state meaning을 foundation에서 canonical shared state로 만드는 것은 금지한다.
- sample appearance를 보고 새 state axis를 발명하는 것은 금지한다.
- parent composition state를 child family canonical state로 승격하는 것은 금지한다.
- foundation baseline으로 existing component exact truth를 덮어쓰는 것은 금지한다.

## 관련 문서

- [components.md](../components/components.md)
- [assembly-protocol.md](../assembly-protocol.md)
- [Button.md](../components/Button.md)
- [iconButton.md](../components/iconButton.md)
- [Search.md](../components/Search.md)
- [Form Field Foundation.md](../components/Form%20Field%20Foundation.md)

## 이 문서가 소유하지 않는 것

- 각 component의 full state rendering recipe
- 각 component의 specialization state 의미
- parent composition의 orchestration state 전체
