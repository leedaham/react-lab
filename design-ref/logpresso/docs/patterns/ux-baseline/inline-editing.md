# UX Inline Editing

## 기준선

- 원본 패턴: `../../../../ux/design-knowledge/patterns/form/inline-editing.md`
- 구조 매핑: `../../../../ux/design-knowledge/mappings/inline-editing.mapping.md`
- 관련 계약: `actions.json`, `roles.json`, `states.json`

## 목적

사용자가 현재 화면 맥락을 떠나지 않고 값을 수정하고 commit 또는 cancel로 종료하게 한다.

## 구조

- `result surface`: 읽기 상태와 편집 상태를 구분한다.
- `input area`: 수정 가능한 값과 오류를 가까이 둔다.
- `action group`: commit과 cancel을 명확히 제공한다.

## 필수 상태

- `idle`
- `editing`
- `dirty`
- `loading`
- `success`
- `error`
- `conflict`

## 추정 금지

- 자동 저장 여부
- 충돌 해결 방식
- field별 validation rule

## 조합 기준

- `Table Cell`, `Input`, `Button`, `InlineMessage`, `Toast`를 우선 조합한다.
- editing 상태는 보기 상태와 명확히 구분한다.
- commit 실패 후에도 사용자가 기존 맥락을 잃지 않아야 한다.

## AI handoff

inline editing은 편의 기능이 아니라 상태 전환 패턴이다. edit 진입, commit, cancel, 실패 복구를 한 세트로 산출한다.
