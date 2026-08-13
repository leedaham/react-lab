# shadow

## 목적

- 이 문서는 current spec 문서 체계에서 shared shadow system과 shadow ownership boundary를 정의한다.
- 이 문서는 component final shadow recipe 전체를 다시 쓰지 않는다.

## source of truth

- shadow는 component doc가 exact token을 잠그면 그 값을 우선한다.
- component doc가 exact shadow를 잠그지 않은 경우에는 system token을 우선한다.
- 현재 문서 체계에서 반복 확인된 shadow token은 `shadow/base`, `shadow/inner`, `shadow/lg`, `shadow/sm`이다.

## 소유하는 truth

- foundation이 소유하는 shadow 축은 아래다.
  - elevation
  - interaction shadow
  - inset shadow
- `shadow/base`는 default 또는 hover surface 보강에 반복적으로 쓰인다.
- `shadow/inner`는 pressed-like emphasis에 반복적으로 쓰인다.
- shadow는 component doc가 exact rule을 잠근 경우에만 사용한다.
- shadow가 잠기지 않은 영역에 임의 shadow를 추가하는 것은 금지한다.

## usage boundary

- foundation은 shadow token/system과 허용 사용 원칙만 소유한다.
- component 문서는 final shadow recipe를 소유한다.
- parent composition 문서는 child shadow recipe를 다시 쓰지 않는다.
- local usage 문서는 문서에 명시된 범위 안에서만 shadow override를 가질 수 있다.
- example-only sample은 shadow canonical truth를 만들지 못한다.

## forbidden rule

- foundation이 component final shadow recipe를 다시 정의하는 것은 금지한다.
- sample appearance를 보고 ambient effect를 보정하는 것은 금지한다.
- shadow가 잠기지 않은 영역에 임의 elevation을 추가하는 것은 금지한다.
- shadow를 border나 fill substitute로 쓰는 것은 금지한다.

## 관련 문서

- [components.md](../components/components.md)
- [assembly-protocol.md](../assembly-protocol.md)
- [Button.md](../components/Button.md)
- [iconButton.md](../components/iconButton.md)
- [dropdownList.md](../components/dropdownList.md)
- [dropdownCheckboxList.md](../components/dropdownCheckboxList.md)

## 이 문서가 소유하지 않는 것

- 각 component의 final shadow recipe
- 각 component의 state별 shadow delta 전체
- parent composition의 surface depth choreography
