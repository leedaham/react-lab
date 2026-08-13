# component accessibility coverage

## 목적

- 이 문서는 AI 에이전트가 모든 component의 접근성 처리 상태를 빠르게 확인하는 entrypoint다.
- machine-readable source는 [component-accessibility-coverage.json](component-accessibility-coverage.json)이다.
- 이 문서는 exact component accessibility audit를 대체하지 않고, 누락 여부와 읽기 순서를 통제한다.

## coverage level

- `explicit-baseline`: `component-accessibility-matrix.json`에 role, keyboard, required state baseline이 직접 있다.
- `composition-inherits-global`: parent composition이며 focus order, region relation, child sequence를 소유한다.
- `local-usage-inherits-parent`: 특정 parent 안에서만 접근성 의미가 완성된다.
- `supporting-boundary-inherits-global`: boundary grammar이며 소비하는 component가 final role을 정한다.
- `global-inherited-family`: global accessibility rule을 적용하고 component 문서에서 exact role/state/focus를 확인한다.
- `non-current-reference`: draft, deprecated, example-only라 current implementation truth로 쓰지 않는다.

## 사용 규칙

- 모든 component는 coverage ledger에 하나의 entry를 가져야 한다.
- `coverageLevel`만 보고 구현하지 말고 반드시 해당 component 문서를 읽는다.
- composition component는 child primitive role을 다시 정의하지 않는다.
- `non-current-reference`는 public mockup source로 사용하지 않는다.

## 검증

```powershell
node .\design\site\generate-accessibility-coverage.mjs --check
node .\design\site\validate-public-design-system.mjs
```
