# UX Empty State Recovery

## 기준선

- 원본 패턴: `../../../../ux/design-knowledge/patterns/system-state/empty-state-recovery.md`
- 구조 매핑: `../../../../ux/design-knowledge/mappings/empty-state-recovery.mapping.md`
- 관련 계약: `roles.json`, `states.json`

## 목적

빈 결과를 막힌 상태로 두지 않고 이유 설명, 다음 행동, 회복 경로로 연결한다.

## 구조

- `result surface`: 현재 결과 부재를 명확히 드러낸다.
- `feedback area`: 빈 이유와 사용자가 할 수 있는 일을 설명한다.
- `action group`: 검색 변경, 생성, 재시도 같은 다음 행동을 제공한다.

## 필수 상태

- `initial empty`
- `search no results`
- `filter no results`
- `permission empty`
- `recoverable empty`

## 추정 금지

- 빈 이유
- 생성 가능 여부
- 지원 문의 문구

## 조합 기준

- `Blankslate`, `Button`, `Search`, `InlineAlert`를 우선 조합한다.
- empty와 error를 같은 상태로 취급하지 않는다.
- 다음 행동 없는 empty 화면을 complete design으로 보지 않는다.

## AI handoff

제품 spec이 빈 이유를 주지 않으면 일반화된 copy를 확정하지 않는다. 원인, 다음 행동, 재검색 또는 생성 경로를 deferred assumption으로 남긴다.
