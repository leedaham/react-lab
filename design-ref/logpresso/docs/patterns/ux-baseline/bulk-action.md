# UX Bulk Action

## 기준선

- 원본 패턴: `../../../../ux/design-knowledge/patterns/action/bulk-action.md`
- 구조 매핑: `../../../../ux/design-knowledge/mappings/bulk-action.mapping.md`
- 관련 계약: `actions.json`, `roles.json`, `states.json`

## 목적

여러 항목에 같은 행동을 실행할 때 selection 범위, 실행 상태, 부분 실패 결과를 한 흐름 안에서 유지한다.

## 구조

- `selection context`: 선택된 대상 수와 범위를 고정한다.
- `action group`: 선택이 유효할 때만 bulk action을 활성화한다.
- `feedback area`: 전체 결과와 항목별 실패를 분리해서 보여준다.

## 필수 상태

- `idle`
- `selection active`
- `loading`
- `partial success`
- `success`
- `error`

## 추정 금지

- bulk 대상의 제품 의미
- 일부 실패 처리 정책
- 권한별 실행 가능 범위

## 조합 기준

- `Action Bar`, `Table`, `Checkbox`, `Button`, `InlineAlert`, `Toast`를 우선 조합한다.
- 처리 중에는 같은 bulk action의 반복 실행을 차단한다.
- 일부 실패가 있으면 전체 성공처럼 보이지 않게 항목별 결과를 드러낸다.

## AI handoff

이 패턴은 화면 구조보다 selection과 action contract를 먼저 읽는다. mockup 생성 시 selected count, processing, partial failure를 반드시 포함한다.
