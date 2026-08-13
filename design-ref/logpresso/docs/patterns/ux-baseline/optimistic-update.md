# UX Optimistic Update

## 기준선

- 원본 패턴: `../../../../ux/design-knowledge/patterns/feedback/optimistic-update.md`
- 구조 매핑: `../../../../ux/design-knowledge/mappings/optimistic-update.mapping.md`
- 관련 계약: `actions.json`, `roles.json`, `states.json`

## 목적

가벼운 업데이트를 즉시 반영하되, 실제 처리 실패 시 rollback과 오류 피드백을 보존한다.

## 구조

- `result surface`: 즉시 반영된 상태와 최종 확정 상태를 모두 견딘다.
- `feedback area`: 백그라운드 처리와 실패 복구를 알려준다.

## 필수 상태

- `idle`
- `optimistic`
- `background loading`
- `success`
- `rollback`
- `error`

## 추정 금지

- 서버 확정 시점
- rollback 가능 여부
- 충돌 해결 정책

## 조합 기준

- `Switch`, `Checkbox`, `StatusDot`, `InlineAlert`, `Toast`를 우선 조합한다.
- 실패를 무시하지 않고 사용자에게 상태 복구를 알려준다.
- 중복 업데이트로 상태 불일치가 생기지 않게 처리 중 맥락을 유지한다.

## AI handoff

optimistic 반영은 제품 spec이 허용한 경량 action에만 적용한다. 보안 정책, 결제, 파괴적 변경에는 기본값으로 사용하지 않는다.
