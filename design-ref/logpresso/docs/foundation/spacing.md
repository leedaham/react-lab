# spacing

## 목적

- 이 문서는 current spec 문서 체계에서 shared spacing system과 spacing ownership boundary를 정의한다.
- 이 문서는 component exact spacing recipe를 대신 쓰지 않고, Tailwind baseline과 arbitrary-value boundary만 잠근다.

## source of truth

- spacing foundation의 base skeleton은 항상 Tailwind CSS scale/system이다.
- component doc가 exact spacing을 source truth로 잠근 경우에는 그 exact value를 우선한다.
- exact spacing이 source-confirmed current spec으로 잠기지 않은 경우에는 Tailwind scale/system을 우선한다.
- foundation은 baseline reference일 뿐이고 existing component exact truth를 덮지 못한다.

## 소유하는 truth

- foundation이 소유하는 spacing 개념은 아래다.
  - gap
  - padding
  - inset
  - cluster spacing
  - section spacing
  - row spacing
- current spec가 exact value를 소유하지 않은 spacing은 Tailwind scale/system을 우선 적용한다.
- component doc가 exact value를 명시하지 않은 경우에는 arbitrary exact 값보다 Tailwind scale을 먼저 선택한다.
- foundation baseline에서 반복적으로 안전한 spacing step은 아래다.
  - `1`
  - `2`
  - `3`
  - `4`
  - `6`
  - `8`
  - `12`
  - `16`
- cluster와 row spacing은 foundation guidance만 제공한다.
- exact gap/padding/inset recipe는 component doc가 소유한다.

## usage boundary

- foundation은 spacing system과 arbitrary-value boundary만 소유한다.
- component 문서는 exact gap, padding, inset, row geometry를 소유한다.
- parent composition 문서는 child block 사이 spacing ownership만 소유한다.
- local usage 문서는 특정 문맥의 spacing override를 소유할 수 있지만 family canonical truth를 덮지 못한다.
- example-only sample은 spacing canonical truth를 만들지 못한다.
- existing component doc가 exact spacing truth를 소유하면 foundation baseline보다 component truth가 항상 우선한다.
- exact truth가 아직 잠기지 않은 새 component에서만 foundation baseline을 starting point로 사용한다.
- foundation baseline이 source-confirmed component truth와 충돌하면 source를 다시 확인한 뒤 component truth를 문서에 반영한다.
- `px 13 / py 5`, textarea exact height, trailing affordance absolute inset, example fixed width처럼 source-confirmed exact exception은 foundation이 아니라 component 또는 example/composition 문서가 소유한다.

## forbidden rule

- foundation이 component size-specific spacing recipe를 다시 정의하는 것은 금지한다.
- component doc가 exact spacing을 잠근 영역에 Tailwind 기본 scale을 덮어쓰는 것은 금지한다.
- Tailwind scale로 충분한 영역에 arbitrary 값을 발명하는 것은 금지한다.
- sample appearance를 보고 spacing recipe를 일반화하는 것은 금지한다.
- parent composition spacing을 child spacing canonical truth로 승격하는 것은 금지한다.
- foundation baseline으로 source-confirmed component exact spacing을 지우는 것은 금지한다.

## 관련 문서

- [components.md](../components/components.md)
- [assembly-protocol.md](../assembly-protocol.md)
- [Button.md](../components/Button.md)
- [iconButton.md](../components/iconButton.md)
- [Search.md](../components/Search.md)
- [Action Bar.md](../components/Action%20Bar.md)

## 이 문서가 소유하지 않는 것

- 각 component family의 exact gap recipe
- 각 component family의 exact padding recipe
- 각 component family의 exact inset recipe
- parent composition의 exact ordering이나 placement recipe
