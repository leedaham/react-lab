# layer

## 목적

- 이 문서는 current spec 문서 체계에서 shared layer, overlay, z-index, portal boundary를 정의한다.
- 이 문서는 component별 exact elevation, shadow, overlay geometry 전체를 새로 정의하지 않는다.
- 이 문서는 modal, popover, tooltip, dropdown, drawer 같은 floating UI가 서로 충돌하지 않도록 공통 stacking rule을 잠근다.

## source of truth

- component 문서가 exact layer role, overlay placement, shadow, z-index token을 잠그면 component 문서를 우선한다.
- component 문서가 layer 값을 잠그지 않은 경우 이 문서를 starting point로 사용한다.
- visual elevation은 `shadow.md`와 연결해서 읽고, interaction modality는 이 문서에서 읽는다.
- modal처럼 background interaction을 막는 surface와 tooltip처럼 보조 정보만 제공하는 surface를 같은 layer로 취급하지 않는다.

## 소유하는 truth

- layer role은 z-index 숫자보다 먼저 결정한다.
- z-index literal은 token이 없을 때만 fallback으로 기록한다.
- shared layer role은 아래 순서를 따른다.
  - base content
  - sticky shell
  - dropdown/menu/select surface
  - popover
  - tooltip
  - drawer
  - modal backdrop
  - modal dialog
  - toast
- dropdown/menu/select surface는 trigger와 강하게 연결된 selection/action surface다.
- popover는 non-blocking floating panel이며, focusable content를 가질 수 있다.
- tooltip은 helper text surface이며, focusable content를 소유하지 않는다.
- drawer는 side detail 또는 task panel이며, blocking 여부를 문서에 명시해야 한다.
- modal은 background interaction을 막고 focus trap과 focus return을 가져야 한다.
- toast는 screen-level transient status이며, modal dialog보다 위에 놓을지 여부를 제품 정책으로 잠가야 한다.
- overlay surface는 trigger alignment, collision handling, viewport clipping, scroll container relation을 문서에 남겨야 한다.
- portal을 쓰는 경우 source DOM 위치와 visual layer 위치가 다를 수 있음을 명시한다.

## usage boundary

- layer foundation은 shared layer order, modality, portal boundary를 소유한다.
- component 문서는 exact width, offset, placement, shadow, radius, border, z-index token을 소유한다.
- parent composition 문서는 여러 overlay가 동시에 열릴 때 orchestration과 close order를 소유할 수 있다.
- accessibility foundation은 focus trap, focus return, background inert 처리 기준을 소유한다.
- motion foundation은 enter/exit timing을 소유한다.
- example-only sample은 layer canonical truth를 만들지 못한다.

## forbidden rule

- z-index 숫자를 높여서 충돌을 임시로 덮는 것은 금지한다.
- modal, drawer, popover, tooltip을 visual shape만 보고 같은 overlay로 취급하는 것은 금지한다.
- tooltip에 interactive content를 넣는 것은 금지한다.
- modal open 상태에서 background가 scroll/focus/click 가능한 구조를 current spec으로 승격하는 것은 금지한다.
- portal 사용 여부를 숨긴 채 placement만 문서화하는 것은 금지한다.
- shadow 강도를 layer hierarchy의 유일한 근거로 쓰는 것은 금지한다.

## 관련 문서

- [components.md](../components/components.md)
- [shadow.md](shadow.md)
- [accessibility.md](accessibility.md)
- [motion.md](motion.md)
- [dropdownList.md](../components/dropdownList.md)
- [Menu.md](../components/Menu.md)
- [Popover.md](../components/Popover.md)
- [Tooltip.md](../components/Tooltip.md)
- [Drawer-Container.md](../components/Drawer-Container.md)
- [Modal.md](../components/Modal.md)
- [Toast.md](../components/Toast.md)

## 이 문서가 소유하지 않는 것

- 각 component의 exact z-index token registry 전체
- 각 component의 exact shadow recipe
- viewport collision algorithm 구현
- portal library 선택
- 제품 화면별 overlay 동시 노출 정책 전체
