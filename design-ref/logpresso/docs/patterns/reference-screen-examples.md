# reference screen examples

## 목적

- 이 문서는 AI 에이전트가 pattern 문서를 읽은 뒤 바로 화면 조합을 시작할 수 있도록 reference screen examples를 제공한다.
- machine-readable source는 [reference-screen-examples.json](reference-screen-examples.json)이다.

## 사용 규칙

- examples는 final product data가 아니라 composition starter다.
- component exact recipe는 각 component 문서를 다시 읽어야 한다.
- `doNotInfer`에 있는 항목은 제품 spec 없이는 만들지 않는다.
- 모든 example은 state coverage를 함께 고려해야 한다.

## 포함된 패턴

- Dashboard
- Data Table Workflow
- List Detail
- Settings / Policy Form
- Audit / Event History
- Workflow / Guided Setup
- UX Bulk Action
- UX Destructive Action
- UX Loading Feedback
- UX Optimistic Update
- UX Form Submission
- UX Inline Editing
- UX Hierarchical Navigation
- UX Empty State Recovery
- UX Permission Based UI

## 금지 규칙

- example의 region 이름을 component canonical name으로 승격하면 안 된다.
- example component list만 보고 exact layout, spacing, copy를 확정하면 안 된다.
- product-specific data를 임의로 생성하면 안 된다.
