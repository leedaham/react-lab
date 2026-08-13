# UX Permission Based UI

## 기준선

- 원본 패턴: `../../../../ux/design-knowledge/patterns/system-state/permission-based-ui.md`
- 구조 매핑: `../../../../ux/design-knowledge/mappings/permission-based-ui.mapping.md`
- 관련 계약: `roles.json`, `states.json`

## 목적

사용자 권한에 따라 가능한 행동, 제한된 행동, 설명해야 할 제한 이유를 일관되게 표현한다.

## 구조

- `action group`: 가능한 행동과 제한된 행동을 분리한다.
- `result surface`: 권한 제한으로 보이지 않는 데이터와 실제 empty를 구분한다.
- `feedback area`: 제한 이유와 다음 경로를 알려준다.

## 필수 상태

- `allowed`
- `disabled`
- `hidden`
- `permission denied`
- `read only`

## 추정 금지

- 권한 정책
- role 이름
- 숨김과 비활성화 선택 기준

## 조합 기준

- `Button`, `Tooltip`, `InlineAlert`, `Blankslate`, `Badge`를 우선 조합한다.
- 권한 없는 행동은 실행되지 않아야 한다.
- disabled만 표시하고 이유를 숨기지 않는다.

## AI handoff

권한 정책은 제품 spec이 소유한다. 이 문서는 노출 방식과 상태 coverage만 제공하며, role별 접근 범위는 추정하지 않는다.
