# UX Loading Feedback

## 기준선

- 원본 패턴: `../../../../ux/design-knowledge/patterns/feedback/loading-feedback.md`
- 구조 매핑: `../../../../ux/design-knowledge/mappings/loading-feedback.mapping.md`
- 관련 계약: `roles.json`, `states.json`

## 목적

사용자가 시스템 응답을 기다리는 동안 현재 작업, 대기 이유, 다음 전환을 이해하게 한다.

## 구조

- `feedback area`: 진행 중인 작업 존재를 즉시 알린다.
- `result surface`: 이전 상태, skeleton, 결과 전환의 관계를 유지한다.
- `action group`: 중복 실행을 막고 가능한 행동을 제한한다.

## 필수 상태

- `first loading`
- `refresh loading`
- `long loading`
- `success`
- `error`
- `empty`

## 추정 금지

- 처리 시간
- 실패 원인
- 재시도 side effect

## 조합 기준

- `Skeleton`, `ProgressBar`, `InlineAlert`, `Button`, `Toast`를 우선 조합한다.
- loading 종료 후 이전 content를 stale하게 남기지 않는다.
- 짧은 지연과 긴 지연은 같은 피드백으로 처리하지 않는다.

## AI handoff

mockup은 default 화면만 만들지 않는다. 최초 로딩, 새로고침 로딩, 실패 전환, empty 전환 중 적어도 필요한 상태를 명시한다.
