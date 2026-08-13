# motion

## 목적

- 이 문서는 current spec 문서 체계에서 shared motion foundation과 usage boundary를 정의한다.
- 이 문서는 component별 final animation recipe 전체를 새로 만들지 않는다.
- 이 문서는 overlay, disclosure, loading, state transition을 화면설계에 표현할 때 과한 motion을 만들지 않도록 공통 기준을 잠근다.

## source of truth

- component 문서가 exact duration, easing, transform, opacity delta를 잠그면 component 문서를 우선한다.
- component 문서가 motion 값을 잠그지 않은 경우 이 문서의 baseline을 starting point로 사용한다.
- motion은 state change를 설명하기 위한 보조 수단이며, 상태 의미의 유일한 전달 수단이 아니다.
- reduced motion 환경에서는 essential visibility change만 남기고 transform 또는 looping motion을 줄인다.

## 소유하는 truth

- motion은 functional, compact, restrained 방향을 따른다.
- 일반 interaction feedback은 짧게 끝나야 한다.
- overlay enter/exit는 opacity와 small offset 또는 scale 중 하나만 사용한다.
- disclosure expand/collapse는 content height 또는 clip transition을 사용할 수 있지만, content reflow가 지연되어 조작을 방해하면 안 된다.
- loading skeleton은 final layout rhythm을 보존해야 하며, shimmer가 있어도 정보 hierarchy를 바꾸지 않는다.
- toast, inline alert, modal 같은 status surface는 등장 motion보다 focus와 읽기 순서를 우선한다.
- duration baseline은 아래를 starting point로 쓴다.
  - instant state feedback: `80ms`
  - compact control transition: `120ms`
  - overlay enter/exit: `160ms`
  - drawer/modal large surface transition: `200ms`
- easing baseline은 아래를 starting point로 쓴다.
  - enter: `cubic-bezier(0.2, 0, 0, 1)`
  - exit: `cubic-bezier(0.4, 0, 1, 1)`
  - state feedback: `ease-out`
- motion token이 별도로 잠기면 token을 우선하고, literal duration은 fallback으로만 병기한다.

## usage boundary

- motion foundation은 shared duration/easing 방향과 reduced motion boundary를 소유한다.
- component 문서는 exact animation property, transform distance, opacity delta, trigger timing을 소유한다.
- parent composition 문서는 open/close orchestration과 sibling surface 간 sequencing을 소유할 수 있다.
- accessibility foundation은 reduced motion과 focus order safety를 함께 검증한다.
- example-only sample은 motion canonical truth를 만들지 못한다.

## forbidden rule

- motion만으로 상태 변화를 전달하는 것은 금지한다.
- 반복 shimmer, pulse, bounce를 의미 없이 사용하는 것은 금지한다.
- hover feedback에 layout shift를 넣는 것은 금지한다.
- overlay가 exit animation 중에도 background interaction을 잘못 허용하는 것은 금지한다.
- reduced motion에서 large transform을 그대로 유지하는 것은 금지한다.
- chart, loading, progress motion을 실제 데이터 갱신처럼 오해하게 만드는 것은 금지한다.

## 관련 문서

- [components.md](../components/components.md)
- [state.md](state.md)
- [accessibility.md](accessibility.md)
- [layer.md](layer.md)
- [Modal.md](../components/Modal.md)
- [Popover.md](../components/Popover.md)
- [Disclosure.md](../components/Disclosure.md)
- [Skeleton.md](../components/Skeleton.md)
- [Toast.md](../components/Toast.md)

## 이 문서가 소유하지 않는 것

- 각 component의 final keyframe 전체
- 각 component의 exact transform distance
- chart 또는 map 같은 product-specific data animation
- route transition policy 전체
- OS 또는 browser native animation override
