# radius

## 목적

- 이 문서는 current spec 문서 체계에서 shared radius system과 radius ownership boundary를 정의한다.
- 이 문서는 component exact radius recipe를 다시 쓰지 않는다.

## source of truth

- radius foundation의 base skeleton은 항상 Tailwind CSS radius scale/system이다.
- component doc가 exact radius를 잠근 경우에는 그 값을 우선한다.
- component doc가 exact radius를 잠그지 않은 경우에만 Tailwind scale/system을 우선한다.

## 소유하는 truth

- foundation이 소유하는 radius system은 아래다.
  - `0`
  - `6`
  - `8`
  - `12`
  - `full-round`
- `spacing`과 마찬가지로 component doc가 exact value를 잠그지 않은 경우에만 Tailwind scale을 기본값으로 사용한다.
- divider처럼 radius 금지 영역은 foundation rule로 유지할 수 있다.
- full-round는 switch track이나 handle처럼 source-confirmed current spec에만 쓴다.

## usage boundary

- foundation은 radius system과 semantic usage boundary만 소유한다.
- component 문서는 exact radius recipe를 소유한다.
- parent composition 문서는 child radius를 다시 정의하지 않는다.
- local usage 문서는 문서에 명시된 경우에만 limited radius override를 가질 수 있다.
- example-only sample은 radius canonical truth를 만들지 못한다.

## forbidden rule

- foundation이 component exact radius recipe를 다시 쓰는 것은 금지한다.
- sample appearance를 보고 rounded/pill 해석을 일반화하는 것은 금지한다.
- component doc가 exact radius를 잠근 영역에 foundation scale을 덮어쓰는 것은 금지한다.
- radius 금지 영역에 rounded substitute를 넣는 것은 금지한다.

## 관련 문서

- [components.md](../components/components.md)
- [assembly-protocol.md](../assembly-protocol.md)
- [Button.md](../components/Button.md)
- [iconButton.md](../components/iconButton.md)
- [Search.md](../components/Search.md)
- [Divider.md](../components/Divider.md)
- [Switch.md](../components/Switch.md)

## 이 문서가 소유하지 않는 것

- 각 component family의 final radius recipe
- 각 component family의 edge-radius ownership 전체
- parent composition의 seam/radius distribution
