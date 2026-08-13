# UX Hierarchical Navigation

## 기준선

- 원본 패턴: `../../../../ux/design-knowledge/patterns/navigation/hierarchical-navigation.md`
- 구조 매핑: `../../../../ux/design-knowledge/mappings/hierarchical-navigation.mapping.md`
- 관련 계약: `roles.json`, `states.json`

## 목적

사용자가 계층 구조 안에서 현재 위치, 상위 경로, 하위 이동 가능성을 동시에 이해하게 한다.

## 구조

- `navigation context`: 현재 화면이 속한 전체 탐색 맥락을 제공한다.
- `location indicator`: 현재 위치를 명확히 표시한다.
- `navigation path`: 상위 이동과 경로 복귀를 지원한다.

## 필수 상태

- `idle`
- `current`
- `expanded`
- `collapsed`
- `deep path`
- `not found`

## 추정 금지

- 제품 정보 구조
- 메뉴 권한 정책
- default landing route

## 조합 기준

- `GNB`, `SNB`, `breadcrumb`, `tabNav`, `Disclosure`를 우선 조합한다.
- 깊이가 늘어나도 현재 위치와 path가 끊기지 않아야 한다.
- current 표시와 selected 표시를 혼용하지 않는다.

## AI handoff

신규 화면 설계 시 제품 IA가 없으면 메뉴 구조를 확정하지 않는다. 계층 위치 표시와 이동 경로의 필요 상태만 명시한다.
