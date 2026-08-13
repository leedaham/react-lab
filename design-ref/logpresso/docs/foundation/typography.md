# typography

## 목적

- 이 문서는 current spec 문서 체계에서 shared typography source-of-truth rule과 fallback boundary를 정의한다.
- 이 문서는 component final typography mapping 전체를 다시 쓰지 않는다.

## source of truth

- current spec 문서 체계의 기본 font family는 항상 `Pretendard`다.
- exact typography가 component doc에 잠겨 있으면 component doc를 우선한다.
- `Pretendard`가 실행 환경에서 정상 렌더링되지 않거나 로드되지 않는 경우에만 `Inter`를 fallback font로 사용할 수 있다.
- fallback은 environment limitation handling일 뿐 canonical truth가 아니다.

## 소유하는 truth

- typography foundation이 소유하는 축은 아래다.
  - font family
  - size
  - line-height
  - weight
  - letter-spacing
- current spec 기본 font family는 항상 `Pretendard`다.
- fallback font는 exact family load 또는 rendering이 실패한 경우에만 사용한다.
- fallback이 필요할 때 사용할 수 있는 font는 항상 `Inter`다.
- fallback을 사용해도 size, line-height, weight, letter-spacing은 canonical truth를 유지해야 한다.
- 반복 확인된 current spec typography step은 아래다.
  - `12 / 18`
  - `14 / 20`
  - `16 / 24`
  - `18 / 28`
- current spec letter-spacing baseline은 항상 `0`이다.
- weight naming은 `Regular`, `Medium`, `Bold`를 우선 기준으로 둔다.

## usage boundary

- foundation은 typography source-of-truth와 fallback handling만 소유한다.
- component 문서는 slot별 final typography mapping을 소유한다.
- parent composition 문서는 child typography recipe를 다시 정의하지 않는다.
- local usage 문서는 문서에 명시된 경우에만 limited typography override를 가질 수 있다.
- example-only sample은 typography canonical truth를 만들지 못한다.

## forbidden rule

- foundation이 component slot별 typography를 다시 매핑하는 것은 금지한다.
- fallback font를 canonical family처럼 보고하는 것은 금지한다.
- `Pretendard`가 정상 적용되는 상황에서 임의로 다른 font를 선택하는 것은 금지한다.
- `Inter` 외의 fallback font를 임의로 사용하는 것은 금지한다.
- sample appearance를 보고 font weight나 size를 일반화하는 것은 금지한다.
- parent row나 cluster가 child typography를 덮어쓰는 것은 금지한다.
- letter-spacing을 임의로 추가하거나 제거하는 것은 금지한다.

## 관련 문서

- [components.md](../components/components.md)
- [assembly-protocol.md](../assembly-protocol.md)
- [fieldLabel.md](../components/fieldLabel.md)
- [Button.md](../components/Button.md)
- [Search.md](../components/Search.md)
- [breadcrumb.md](../components/breadcrumb.md)

## 이 문서가 소유하지 않는 것

- 각 component의 final typography mapping 전체
- 각 component의 slot별 typography recipe
- parent composition의 text hierarchy layout
