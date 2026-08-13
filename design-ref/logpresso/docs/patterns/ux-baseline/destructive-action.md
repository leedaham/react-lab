# UX Destructive Action

## 기준선

- 원본 패턴: `../../../../ux/design-knowledge/patterns/action/destructive-action.md`
- 구조 매핑: `../../../../ux/design-knowledge/mappings/destructive-action.mapping.md`
- 관련 계약: `actions.json`, `roles.json`, `states.json`

## 목적

복구 비용이 큰 행동을 즉시 실행하지 않고 영향 설명, 확인, 취소, 결과 피드백으로 분리한다.

## 구조

- `confirmation surface`: 파괴적 결과와 영향을 설명한다.
- `action group`: 취소와 확인을 명확히 분리한다.
- `feedback area`: 처리 중, 성공, 실패를 같은 맥락에서 연결한다.

## 필수 상태

- `idle`
- `confirming`
- `loading`
- `success`
- `error`
- `permission denied`

## 추정 금지

- 삭제 영향 범위
- 복구 가능 여부
- 권한 정책과 승인 절차

## 조합 기준

- `Button`, `buttonGroup`, `Modal`, `InlineAlert`, `Toast`를 우선 조합한다.
- destructive action은 확인 단계 없이 실행하지 않는다.
- 실패 후에는 사용자가 복구 또는 재시도 판단을 할 수 있어야 한다.

## AI handoff

제품 spec이 제공하지 않은 실제 삭제 대상, 법적 문구, 복구 정책은 확정하지 않는다. 확인 전과 확인 후 상태를 분리해서 산출한다.
