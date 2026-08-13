# UX Form Submission

## 기준선

- 원본 패턴: `../../../../ux/design-knowledge/patterns/form/form-submission.md`
- 구조 매핑: `../../../../ux/design-knowledge/mappings/form-submission.mapping.md`
- 관련 계약: `actions.json`, `roles.json`, `states.json`

## 목적

입력, validation, 제출 가능 조건, 처리 중, 성공과 실패를 한 흐름으로 연결한다.

## 구조

- `input area`: 입력 조건과 오류 위치를 가까이 둔다.
- `action group`: submit, cancel, secondary action을 현재 상태와 연결한다.
- `feedback area`: 제출 결과와 재제출 가능성을 알려준다.

## 필수 상태

- `idle`
- `dirty`
- `disabled`
- `loading`
- `field error`
- `screen error`
- `success`

## 추정 금지

- 기본 정책값
- 서버 validation rule
- 저장 API behavior

## 조합 기준

- `Form Layout`, `Input`, `Select`, `Textarea`, `InlineAlert`, `Button`, `buttonGroup`을 우선 조합한다.
- submit은 validation이 충족될 때만 실행 가능해야 한다.
- 처리 중에는 중복 제출을 차단한다.

## AI handoff

폼 mockup은 pristine 화면만 산출하지 않는다. dirty, validation error, loading, success 또는 error 상태를 함께 제공한다.
