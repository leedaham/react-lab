# Dashboard

## 목적

- `Dashboard` pattern은 보안/운영 상태를 빠르게 파악하기 위한 landing 화면 조합이다.
- 이 패턴은 widget 배치, summary hierarchy, drill-down entry를 소유한다.
- metric, chart, table, widget 내부 primitive recipe는 각 component 또는 product spec이 소유한다.

## source order

1. [Page Layout](../components/Page%20Layout.md)
2. [GNB](../components/GNB.md)
3. [SNB](../components/SNB.md)
4. [Widget Container](../components/Widget-Container.md)
5. [Card Item](../components/Card-Item.md)
6. [Table](../components/Table.md)
7. [Blankslate](../components/Blankslate.md)
8. [content](../foundation/content.md)

## UX source

- Official UX pattern: `ux/design-knowledge/patterns/dashboard.md`
- Official UX mapping: `ux/design-knowledge/mappings/dashboard.mapping.md`
- `ux/issues` 하위 문서는 Dashboard screen source trace로 사용하지 않는다.

## source order 적용 규칙

- `Dashboard` mockup이나 screen spec은 위 `source order`를 축약하지 않는다.
- 설계 산출물의 `참조 문서`에는 위 문서가 모두 포함되어야 한다.
- `Page Layout`은 shell 배치만 소유하므로, global header가 보이면 [GNB](../components/GNB.md), side navigation이 보이면 [SNB](../components/SNB.md)를 반드시 별도 구현 기준으로 읽는다.
- `GNB`, `SNB`, `Widget Container`, `Table`, `Blankslate`를 비슷한 모양의 ad-hoc markup으로 대체하면 `Dashboard` pattern 준수로 보지 않는다.
- standalone preview나 별도 사이트로 제공하더라도 `source order`의 component contract는 그대로 유지한다.

## required composition

- `Page Layout`은 shell과 content region을 만든다.
- 상단에는 화면 제목, 기간/필터 요약, primary action이 들어갈 수 있다.
- 본문은 `Widget Container` 반복 grid로 구성한다.
- 첫 행은 핵심 metric 또는 alert summary를 우선한다.
- 보조 행은 trend, recent activity, top list, status distribution을 배치할 수 있다.
- 각 widget은 title/control/content/supporting tendency를 가질 수 있지만, exact slot은 widget consumer가 결정한다.
- smoke 또는 generated product screen에서 Dashboard visible body는 아래 selector를 제공해야 한다.
  - `[data-dashboard-kpi-row]`
  - `[data-dashboard-chart-surface]`
  - `[data-dashboard-risk-feed]`
  - `[data-dashboard-recent-event-list]`
- KPI row는 최소 3개 이상의 compact summary widget을 포함해야 한다.
- chart component contract가 없으면 chart semantics를 발명하지 않고 placeholder surface로 제한한다.
- risk feed와 recent event list는 product schema가 없으면 smoke placeholder row로 제한하고 product copy/API/permission/customer data를 추정하지 않는다.
- source/debug trace는 visible body가 아니라 `screen-source-trace`, evidence, issue 문서에 기록한다.

## state coverage

- default populated
- loading skeleton
- empty dashboard
- partial data unavailable
- permission denied
- refresh failed

State coverage는 실제 rendered state와 ledger-only coverage를 구분해야 한다. Smoke에서 default populated만 렌더링하고 loading/empty/error/permission을 ledger로만 기록하는 경우, 그 상태가 ledger-only임을 trace와 review에 명시한다.

## forbidden rule

- 모든 정보를 동일한 widget weight로 배치하면 안 된다.
- chart가 없는 데이터를 임의 chart로 꾸미면 안 된다.
- widget 내부 child recipe를 `Dashboard` pattern에서 다시 정의하면 안 된다.
- empty/loading/error 상태를 widget별이 아니라 화면 전체 하나로만 처리하면 안 된다.
- `standalone`이라는 이유로 `GNB`/`SNB`를 새 shell component처럼 다시 정의하면 안 된다.
- `Page Layout`을 읽고도 `GNB`/`SNB` child document를 생략하면 안 된다.
- visible body에 `Family Pattern`, `Workspace Composition`, `Component Body Sources`, `Context Trace`, `Source Trace` 같은 debug/source label을 렌더링하면 안 된다.
- chart placeholder 값을 inline `style` attribute로 넣으면 안 된다.

## validation checklist

- `DESIGN.md`에 `Dashboard`, `Page Layout`, `GNB`, `SNB`, `Widget Container`, `Card Item`, `Table`, `Blankslate`, `content`가 모두 참조 문서로 기록되어 있는가.
- `GNB` 영역이 `CI`, `SNBToggle`, `Divider`, `Breadcrumb`, utility cluster placement를 따르는가.
- `SNB` 영역이 `appNav area`, `AppNavButton`, `navList body` 구조를 따르는가.
- `DEVLOG.md`에 component usage ledger와 visual/browser verification 결과가 남아 있는가.
- visible body selector 4종이 모두 존재하는가.
- Material Symbols visible fallback text가 `0`인가.
- inline `style` attribute가 `0`인가.
- exact component specimen root를 product layout wrapper로 사용하지 않았는가.
- browser evidence가 topbar `y=0`, height `48`, SNB product divider, uncontrolled overflow `0`, large unexplained empty area `0`을 확인했는가.
