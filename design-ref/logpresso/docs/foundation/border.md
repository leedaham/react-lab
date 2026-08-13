# border

## 목적

- 이 문서는 current spec 문서 체계에서 shared border system과 border ownership boundary를 정의한다.
- 이 문서는 component의 full border composition recipe를 대신 쓰지 않는다.

## source of truth

- border는 semantic token과 exact width contract를 우선한다.
- component doc가 exact border grammar를 잠그면 component doc를 우선한다.
- divider primitive와 container border는 서로 다른 grammar다.

## 소유하는 truth

- foundation이 소유하는 border 축은 아래다.
  - width
  - style
  - semantic border role
  - divider vs container boundary
- current spec baseline border width는 항상 `1px`다.
- current spec baseline border style은 항상 `solid`다.
- semantic border가 문서에 잠겨 있으면 semantic token을 우선한다.
- divider primitive는 container border를 대체하지 않는다.
- container border는 divider primitive를 대체하지 않는다.

## usage boundary

- foundation은 border width/style/token boundary만 소유한다.
- component 문서는 full border recipe와 border ownership을 소유한다.
- parent composition 문서는 shell border ownership을 소유할 수 있다.
- local usage 문서는 문서에 명시된 범위 안에서만 border override를 가질 수 있다.
- example-only sample은 border canonical truth를 만들지 못한다.

## forbidden rule

- foundation이 component full border recipe를 다시 정의하는 것은 금지한다.
- divider primitive를 container border substitute로 쓰는 것은 금지한다.
- sample appearance를 보고 border meaning을 일반화하는 것은 금지한다.
- semantic border token 없이 raw color로 border system을 새로 쓰는 것은 금지한다.

## 관련 문서

- [components.md](../components/components.md)
- [assembly-protocol.md](../assembly-protocol.md)
- [Divider.md](../components/Divider.md)
- [GNB.md](../components/GNB.md)
- [dropdownList.md](../components/dropdownList.md)
- [Button.md](../components/Button.md)

## 이 문서가 소유하지 않는 것

- 각 component의 final border composition recipe
- 각 component의 border ownership 전체
- parent shell의 exact border placement recipe
