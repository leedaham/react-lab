# color

## 목적

- 이 문서는 current spec 문서 체계에서 shared semantic color foundation과 usage boundary를 정의한다.
- 이 문서는 exact token registry를 새로 만드는 문서가 아니라, semantic color ownership과 fallback boundary를 잠그는 문서다.

## source of truth

- color foundation은 항상 project의 semantic color direction을 따른다.
- semantic token이 문서에 잠겨 있으면 semantic token을 source of truth로 사용한다.
- semantic token이 아직 정리되지 않은 항목은 component 문서에 남아 있는 source token 이름을 유지한다.
- 현재 저장소 안에서는 foundation 전체를 닫을 exact semantic-color JSON 또는 token registry source가 확인되지 않았다.
- 따라서 이 문서는 반복 확인된 semantic role과 fallback 원칙만 소유한다.

## 소유하는 truth

- semantic color를 raw hex보다 우선한다.
- foundation이 소유하는 role model은 아래다.
  - surface
  - text
  - border
  - divider
  - accent
  - disabled
  - on-brand
- 반복 확인된 공통 semantic token 방향은 아래다.
  - `semantic.color.surface.container.default`
  - `semantic.color.surface.subtle`
  - `semantic.color.border.interactive.default`
  - `semantic.color.border.default`
  - `semantic.color.text.primary`
  - `semantic.color.text.helper`
  - `semantic.color.interactive.brand.accent`
  - `semantic.color.interactive.brand.surface.disabled`
  - `semantic.color.interactive.neutral.surface.hover`
  - `semantic.color.interactive.neutral.surface.disabled`
  - `semantic.color.interactive.neutral.surface.emphasis`
  - `semantic.color.interactive.neutral.border.disabled`
  - `semantic.color.divider.default`
- current verification-family page에서 반복 확인된 dark fallback 방향은 아래다.
  - dark container surface fallback `#070b13`
  - dark subtle/hover surface fallback `#0e1322`
  - dark emphasis surface fallback `#151c33`
  - primary text fallback `#ebebeb`
  - helper text fallback `#808080`
  - accent fallback `#ff692a`
  - strong error fallback `#d50000`
- 문서 간 반복 확인으로 추가로 닫힌 fallback 방향은 아래다.
  - `semantic.color.background.canvas` fallback `#0b0f15`
  - `semantic.color.surface.subtle` fallback `#0e1322`
  - `semantic.color.interactive.neutral.border.disabled` fallback `rgba(126,140,222,0.16)`
  - `semantic.color.content.on-error.strong` fallback `#d50000`
  - `semantic.color.status.error.accent` fallback `#ff2a31`
  - `semantic.color.utility.border-alpha` fallback `rgba(255,255,255,0.1)`
- raw hex는 fallback이나 source-confirmed fallback note로만 쓴다.
- raw hex를 semantic ownership보다 앞세우는 것은 금지한다.
- fallback은 semantic token이 문서에 함께 적힌 경우에만 병기한다.
- component 문서가 exact color recipe를 잠글 때는 semantic token과 literal fallback을 항상 함께 적는다.
- alpha가 들어가는 색은 hex만 적지 않고 rgba literal까지 함께 적는다.
- overlay/alpha 기반 surface는 base surface와 overlay color를 분리해서 적는다.
- semantic token이 잠긴 항목은 component doc가 exact recipe를 소유한다.

## usage boundary

- foundation은 semantic color principle, role model, fallback boundary만 소유한다.
- component 문서는 exact foreground, background, border, divider recipe를 소유한다.
- parent composition 문서는 cluster나 shell placement를 소유할 수 있지만 child color recipe를 다시 쓰지 않는다.
- local usage 문서는 특정 문맥의 color override를 소유할 수 있지만 family canonical truth를 덮지 못한다.
- example-only sample은 color canonical truth를 만들지 못한다.

## forbidden rule

- foundation이 새 color system을 발명하는 것은 금지한다.
- foundation이 raw hex를 main active rule로 쓰는 것은 금지한다.
- foundation이 component state 색 recipe를 다시 정의하는 것은 금지한다.
- semantic token naming을 component naming이나 state naming으로 승격하는 것은 금지한다.
- alias 또는 transitional token을 foundation canonical registry처럼 정리하는 것은 금지한다.
- exact semantic token registry가 없다는 이유로 색을 추정해서 채우는 것은 금지한다.
- semantic token 없이 literal만 남기는 것은 금지한다.
- literal 없이 `비슷한 어두운색`, `조금 더 진한색` 같은 인상 표현만 남기는 것은 금지한다.
- overlay/alpha surface를 임의의 비슷한 단색으로 치환하는 것은 금지한다.

## 관련 문서

- [components.md](../components/components.md)
- [assembly-protocol.md](../assembly-protocol.md)
- [Button.md](../components/Button.md)
- [iconButton.md](../components/iconButton.md)
- [GNB.md](../components/GNB.md)
- [UserConsole.md](../components/UserConsole.md)
- [semantic-color-ui-naming-경계-관리.md](../backlog/semantic-color-ui-naming-경계-관리.md)

## 이 문서가 소유하지 않는 것

- exact semantic token registry 전체
- 각 component의 final foreground/background/border recipe
- 각 component의 state별 color delta 전체
- raw hex 기반 별도 palette system
