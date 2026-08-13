# component accessibility matrix

## 목적

- 이 문서는 공개용 AI 에이전트가 component accessibility baseline을 빠르게 읽기 위한 entrypoint다.
- machine-readable matrix는 [component-accessibility-matrix.json](component-accessibility-matrix.json)에 있다.
- 전체 component별 coverage ledger는 [component-accessibility-coverage.json](component-accessibility-coverage.json)에 있다.
- exact component visual state recipe는 각 component 문서가 계속 소유한다.

## 사용 규칙

- matrix에 명시된 component는 해당 role, keyboard, state baseline을 우선 확인한다.
- matrix에 없는 component도 [accessibility.md](../foundation/accessibility.md)의 global requirement를 따른다.
- matrix에 없는 component도 coverage ledger에는 반드시 포함되어야 한다.
- implementation handoff 전에는 component 문서에 exact role/keyboard/focus rule을 닫아야 한다.

## 범위

- 이 matrix는 public baseline이다.
- 인증, 법무, WCAG audit 결과를 대체하지 않는다.
- 제품별 domain wording과 user permission policy를 소유하지 않는다.

## 금지 규칙

- `focused`와 `focus-visible`을 같은 상태로 취급하면 안 된다.
- `selected`, `active`, `current`, `checked`, `pressed`, `expanded`를 섞으면 안 된다.
- tooltip에 interactive content를 넣으면 안 된다.
- modal background focus를 허용하면 안 된다.
