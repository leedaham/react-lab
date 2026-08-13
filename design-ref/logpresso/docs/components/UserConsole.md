# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/navigation-shell/userconsole.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 / 9001:7171`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/UserConsole.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

UserConsole

## 목적

- `UserConsole`은 현재 프로젝트 범위에서 user-side console의 `entry-level trigger`만 다룬다.
- 이번 문서는 full dropdown/menu model이 아니라, current source에서 잠긴 entry UI와 GNB 안 placement 규칙만 기록한다.

## current source 읽는 법

- `UserConsole`은 compact user-entry trigger로 읽는다.
- current source는 아래까지만 안정적으로 보여 준다.
  - entry trigger UI
  - `default | active` visual delta
  - GNB `UtilityCluster` 안 placement
- attached/opened surface의 존재는 보이지만, 내부 menu model은 이번 문서 범위 밖이다.

## entry UI recipe

- default entry baseline
  - `24 x 24`
  - `1px` border
  - `8px` radius
  - `3px` inset
  - `person` icon `18px`
- layout
  - `inline-flex`
  - `items-center`
  - `justify-center`
- current source 기준 core slot
  - `Icon`
- current source 기준 non-core / not present
  - label 없음
  - badge 없음
  - dropdown indicator 없음
  - avatar image 없음

## state UI recipe

- `default`
  - background: `semantic.color.surface.container.default`
  - border: `semantic.color.border.interactive.default`
  - content/icon: `semantic.color.text.primary`
- `active`
  - border: `semantic.color.interactive.brand.accent`
  - background: `semantic/color/interactive/neutral/surface/emphasis`
  - inner shadow: `shadow/inner`
- 이번 문서에서는 `active`를 entry visual delta로만 기록한다.
- `active`는 entry/trigger 수준의 visual delta를 뜻할 뿐, full opened menu internal model이 문서화됐다는 뜻이 아니다.
- attached/opened surface 내부 구조는 이 문서의 contract에 포함하지 않는다.

## GNB UtilityCluster 안 배치 규칙

- current visible utility order
  - `GlobalSearch`
  - `Divider`
  - `TenantButton`
  - `Divider`
  - `UserConsole`
  - `TrailingUtilityAction`
- `UserConsole`은 두 번째 `Divider` 뒤, `TrailingUtilityAction` 앞에 놓인다.
- UtilityCluster baseline
  - `flex`
  - `flex-1`
  - `items-center`
  - `justify-end`
  - `gap 8`
- `UserConsole`은 cluster 안에서 `shrink-0`로 읽는다.
- vertical alignment는 UtilityCluster 안의 다른 child와 동일하게 center align이다.

## token / icon rule

- semantic token이 있으면 semantic token을 우선 source of truth로 기록한다.
- semantic token이 아직 정리되지 않은 항목은 current source token 이름을 그대로 유지한다.
- default
  - background: `semantic.color.surface.container.default`
  - border: `semantic.color.border.interactive.default`
  - content/icon: `semantic.color.text.primary`
- active
  - border: `semantic.color.interactive.brand.accent`
  - background: `semantic/color/interactive/neutral/surface/emphasis`
  - inner shadow: `shadow/inner`
- current source truth로 남기는 alias / 비정규 항목
  - `semantic/color/interactive/neutral/surface/emphasis`
- icon direction은 `Angular Material / Material Icons`
- current entry icon은 `person`
- typography는 entry 자체에는 직접 relevant하지 않다.

## Tailwind mapping rule

- default entry
  - `size-6 p-[3px] rounded-lg border flex items-center justify-center`
- icon
  - `size-[18px]`
- active entry
  - `size-6 p-[3px] rounded-lg border`
  - accent border
  - emphasis background
  - `shadow-inner`
- UtilityCluster placement
  - `flex flex-1 items-center justify-end gap-2`
- `UserConsole`
  - `shrink-0`
- exact/arbitrary value가 필요한 값
  - `3`
  - `18`

## boundary note

- current source는 attached/opened surface의 존재를 보여 준다.
- 하지만 그 surface의 internal dropdown/menu structure는 이번 문서 범위 밖이다.
- 따라서 `active` state와 opened surface 내부 모델을 같은 계약으로 읽지 않는다.
- 따라서 이번 문서는 `entry trigger`와 `GNB 내 배치`까지만 implementation/reconstruction-ready contract로 다룬다.

## current project scope에서의 계약

- `UserConsole`은 현재 `entry-level spec`까지만 잠근다.
- full dropdown/menu model은 이후 별도 round에서 다룬다.
- 현재 source에서는 `GNB utility-style icon-only entry trigger`로 기록하는 것이 가장 안전하다.

## Figma evidence

- Figma file: `UI-5.1`
- Figma node: `9001:7171`
- Figma screenshot evidence: `issue-20260519-1529-shell-current-spec-refresh/DESIGN.md`
- current-spec gate: pass

## 구현 기준

- exact page: `component/navigation-shell/userconsole.html`
- catalog route: `index.html#components`
- source owner: `app.js`의 `previewRenderers.UserConsole`
- implemented HTML owner: generated exact page는 `app.js` runtime source를 로드한다.
- UserConsole 본체 CSS owner: `component-css/component.css`

## QA status

- QA mismatch count: `0` for current-spec static gate.
- static QA: `issue-20260519-1529-shell-current-spec-refresh/audit-shell-current-spec.mjs` `27/27 pass`
- rendered QA: Chrome `file://` exact page에서 `사용자 콘솔` button specimen 확인.
- catalog route QA: `index.html#components` registry에서 `UserConsole` link 확인.

## CSS source

- `sonar5.css`: 읽기 전용 reference. 수정하지 않는다.
- `component-css/component.css`: `.btn.btn-icon-only.user-console-trigger`, `.user-console-trigger .material-icon[data-icon]` owner.

## boundary

- UserConsole은 entry trigger와 GNB UtilityCluster placement까지만 소유한다.
- opened menu 내부 구조는 이 문서가 추정하지 않는다.
- `index.html#components`는 registry route이며, 상세 구현 truth는 exact page `component/navigation-shell/userconsole.html`에서 확인한다.
