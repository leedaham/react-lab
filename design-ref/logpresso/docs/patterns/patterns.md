<!-- ds-locale:ko -->
# patterns

## 목적

- 이 문서는 화면설계에 필요한 reusable screen pattern entrypoint다.
- pattern 문서는 component recipe를 다시 정의하지 않는다.
- pattern 문서는 page-level intent, reading order, required composition, state coverage, forbidden composition을 소유한다.

## 읽는 순서

1. 만들려는 화면의 pattern 문서를 먼저 읽는다.
2. pattern이 요구하는 parent component 문서를 읽는다.
3. parent가 담는 child component 문서를 읽는다.
4. 필요한 foundation 문서만 추가로 읽는다.
5. product copy와 data semantics는 제품 spec에서 확인한다.

Component assembly가 필요한 화면은 [../composition/README.md](../composition/README.md)를 통해 선택된 composition 문서를 함께 읽는다.

## 패턴 인덱스

### Screen Composition

Sonar 제품의 실제 업무 흐름에 직접 대응하는 화면 단위 패턴이다.
이 목록은 대시보드, 데이터 탐색, 목록-상세, 설정/정책 입력, 이벤트 이력, 가이드형 구성 작업을 대표한다.

| 패턴명 | 문서 경로 | 목적 |
| --- | --- | --- |
| Dashboard | [dashboard.md](dashboard.md) | 운영 상태, 위젯, 주요 지표, drill-down entry를 조합하는 Sonar 대시보드 화면 |
| Data Table Workflow | [data-table-workflow.md](data-table-workflow.md) | 탐지 규칙, 티켓, 보고서, 데이터셋처럼 검색/필터/정렬/테이블/페이지네이션이 중심인 관리 화면 |
| List Detail | [list-detail.md](list-detail.md) | 목록 선택과 상세 drawer/panel을 같은 문맥에 유지하는 탐색/처리 화면 |
| Settings / Policy Form | [settings-form.md](settings-form.md) | 탐지 정책, 수집 모델, 계정, 프로필처럼 fieldset 반복과 저장 검증이 중심인 설정 화면 |
| Audit / Event History | [audit-timeline.md](audit-timeline.md) | 감사 로그, 티켓 이력, 자동 대응 내역처럼 시간순 이벤트와 상세 확장을 읽는 화면 |
| Workflow / Guided Setup | [wizard-flow.md](wizard-flow.md) | 대시보드 위젯 추가, 플레이북 구성처럼 설정 패널과 구성 캔버스/프리뷰를 함께 다루는 가이드형 작업 화면 |

### UX Baseline

아래 항목은 독립 화면 패턴이 아니라 모든 Sonar 화면에 겹쳐 적용하는 행동, 피드백, 권한, 편집, 제출 기준선이다.
화면을 설계할 때는 먼저 Screen Composition 중 하나를 고르고, 필요한 UX Baseline을 추가로 적용한다.

| 패턴명 | 문서 경로 | 목적 |
| --- | --- | --- |
| UX Bulk Action | [ux-baseline/bulk-action.md](ux-baseline/bulk-action.md) | 다중 선택, 일괄 실행, 부분 실패 결과를 함께 유지하는 action 기준선 |
| UX Destructive Action | [ux-baseline/destructive-action.md](ux-baseline/destructive-action.md) | 파괴적 행동의 영향 설명, 확인, 취소, 결과 피드백 기준선 |
| UX Loading Feedback | [ux-baseline/loading-feedback.md](ux-baseline/loading-feedback.md) | 비동기 처리 중 대기, 중복 차단, 결과 전환을 설명하는 feedback 기준선 |
| UX Optimistic Update | [ux-baseline/optimistic-update.md](ux-baseline/optimistic-update.md) | 즉시 반영, 백그라운드 확정, 실패 rollback을 다루는 feedback 기준선 |
| UX Form Submission | [ux-baseline/form-submission.md](ux-baseline/form-submission.md) | 입력, validation, 제출, 성공과 실패를 연결하는 form 기준선 |
| UX Inline Editing | [ux-baseline/inline-editing.md](ux-baseline/inline-editing.md) | 현재 맥락 안에서 편집, commit, cancel, 실패 복구를 처리하는 기준선 |
| UX Hierarchical Navigation | [ux-baseline/hierarchical-navigation.md](ux-baseline/hierarchical-navigation.md) | 현재 위치, 상위 경로, 깊은 계층 이동을 유지하는 navigation 기준선 |
| UX Empty State Recovery | [ux-baseline/empty-state-recovery.md](ux-baseline/empty-state-recovery.md) | 빈 결과를 설명과 다음 행동으로 연결하는 system-state 기준선 |
| UX Permission Based UI | [ux-baseline/permission-based-ui.md](ux-baseline/permission-based-ui.md) | 권한별 행동 노출, 제한 설명, read-only 상태를 다루는 기준선 |

## pattern boundary

- pattern은 화면 조합과 상태 coverage를 소유한다.
- component exact visual recipe는 각 component 문서가 소유한다.
- foundation rule은 shared principle과 boundary만 소유한다.
- 실제 제품 데이터, 권한 정책, API 상태, 도메인 용어는 product spec이 소유한다.
- `Empty Error Loading`, `Auth Session` 문서는 하위 reference로 보관하되 공개 패턴 카드의 1차 선택지는 아니다.
- 독립 화면을 만들 때는 Screen Composition을 먼저 선택하고, UX Baseline은 상태/행동 보강 기준으로만 적용한다.

## forbidden rule

- pattern 문서만 읽고 component exact size, color, typography를 새로 만들면 안 된다.
- pattern sample text를 제품 copy로 확정하면 안 된다.
- 화면 상태가 하나뿐인 mockup을 complete design으로 보고하면 안 된다.
- empty, loading, error, permission denied 상태를 생략하면 안 된다.
<!-- /ds-locale -->

<!-- ds-locale:en -->
# patterns

## Purpose

- This document is the reusable screen pattern entrypoint for screen design.
- Pattern documents do not redefine component recipes.
- Pattern documents own page-level intent, reading order, required composition, state coverage, and forbidden composition.

## Reading Order

1. Read the target screen pattern document first.
2. Read the parent component documents required by the pattern.
3. Read the child component documents contained by the parent.
4. Add only the required foundation documents.
5. Confirm product copy and data semantics from the product spec.

When screen assembly requires composition guidance, also read the selected composition document through [../composition/README.md](../composition/README.md).

## Pattern Index

### Screen Composition

These screen-level patterns map directly to real Sonar work flows.
The list represents dashboards, data exploration, list-detail work, settings and policy entry, event history, and guided setup work.

| Pattern | Document path | Purpose |
| --- | --- | --- |
| Dashboard | [dashboard.md](dashboard.md) | A Sonar dashboard screen that combines operational status, widgets, key metrics, and drill-down entry points. |
| Data Table Workflow | [data-table-workflow.md](data-table-workflow.md) | A management screen centered on search, filters, sorting, tables, and pagination for detection rules, tickets, reports, and datasets. |
| List Detail | [list-detail.md](list-detail.md) | A navigation and handling screen that keeps list selection and a detail drawer or panel in the same context. |
| Settings / Policy Form | [settings-form.md](settings-form.md) | A settings screen centered on repeated fieldsets and save validation for detection policies, collection models, accounts, and profiles. |
| Audit / Event History | [audit-timeline.md](audit-timeline.md) | A chronological event reading screen with detail expansion for audit logs, ticket history, and automated response history. |
| Workflow / Guided Setup | [wizard-flow.md](wizard-flow.md) | A guided task screen that pairs setup panels with a configuration canvas or preview, such as adding dashboard widgets or configuring playbooks. |

### UX Baseline

These entries are not standalone screen patterns. They are behavior, feedback, permission, editing, and submission baselines layered onto every Sonar screen.
When designing a screen, choose a Screen Composition first, then add the required UX Baseline.

| Pattern | Document path | Purpose |
| --- | --- | --- |
| UX Bulk Action | [ux-baseline/bulk-action.md](ux-baseline/bulk-action.md) | An action baseline that keeps multi-selection, bulk execution, and partial failure results together. |
| UX Destructive Action | [ux-baseline/destructive-action.md](ux-baseline/destructive-action.md) | A baseline for explaining impact, confirming, canceling, and reporting the result of destructive actions. |
| UX Loading Feedback | [ux-baseline/loading-feedback.md](ux-baseline/loading-feedback.md) | A feedback baseline for waiting states, duplicate-action blocking, and result transitions during asynchronous work. |
| UX Optimistic Update | [ux-baseline/optimistic-update.md](ux-baseline/optimistic-update.md) | A feedback baseline for immediate updates, background confirmation, and rollback on failure. |
| UX Form Submission | [ux-baseline/form-submission.md](ux-baseline/form-submission.md) | A form baseline that connects input, validation, submission, success, and failure. |
| UX Inline Editing | [ux-baseline/inline-editing.md](ux-baseline/inline-editing.md) | A baseline for editing, commit, cancel, and failure recovery inside the current context. |
| UX Hierarchical Navigation | [ux-baseline/hierarchical-navigation.md](ux-baseline/hierarchical-navigation.md) | A navigation baseline that preserves the current location, parent path, and deep hierarchy movement. |
| UX Empty State Recovery | [ux-baseline/empty-state-recovery.md](ux-baseline/empty-state-recovery.md) | A system-state baseline that connects empty results to explanation and the next available action. |
| UX Permission Based UI | [ux-baseline/permission-based-ui.md](ux-baseline/permission-based-ui.md) | A baseline for role-based action visibility, restriction messaging, and read-only states. |

## Pattern Boundary

- Patterns own screen composition and state coverage.
- Component documents own exact visual component recipes.
- Foundation documents own shared principles and boundaries only.
- Product specs own real product data, permission policy, API state, and domain terms.
- `Empty Error Loading` and `Auth Session` are preserved as lower-level references, but they are not primary public pattern card choices.
- Choose a Screen Composition before designing an independent screen. Use UX Baseline only to strengthen state and behavior rules.

## Forbidden Rule

- Do not invent component exact size, color, or typography after reading only a pattern document.
- Do not treat pattern sample text as confirmed product copy.
- Do not report a one-state mockup as a complete design.
- Do not omit empty, loading, error, or permission denied states.
<!-- /ds-locale -->
