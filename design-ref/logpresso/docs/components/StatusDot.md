# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/supporting/statusdot.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 / StatusDot 904:8140`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/StatusDot.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

StatusDot

## 목적

- `StatusDot`은 single-dot status indicator family다.
- 이 문서는 Figma `UI-5.1` node `904:8140`에서 확인되고 HTML QA에서 검증된 구조와 상태만 기록한다.
- broader product semantics, parent placement rule, label composition은 이 문서가 소유하지 않는다.

## Figma evidence

- Figma file: `UI-5.1`
- Figma node: `StatusDot` `904:8140`
- Figma URL: `https://www.figma.com/design/dodpG7QVPyrxWI1uFjKYrC/UI-5.1?node-id=904-8140`
- confirmed states:
  - `state=off`
  - `state=low`
  - `state=medium`
  - `state=high`
- confirmed anatomy:
  - `StatusDotRoot`
  - `IndicatorFill`
- not confirmed:
  - `hover`
  - `active`
  - `selected`
  - `disabled`
  - `loading`
  - `focus`

## 구현 기준

- exact page: `../../../site/component/supporting/statusdot.html`
- catalog route: `../../../site/index.html#components`
- source helper: `../../../site/app.js`의 `statusDotMarkup()`, `statusDotPreview()`
- generated page owner: `../../../site/generate-component-pages.mjs`
- root selector / state contract: `[data-status-dot][data-state]`
- indicator selector: `[data-indicator]`
- base CSS selector from `sonar5.css`: 없음
- gap CSS selector from `component-css/component.css`: `[data-status-dot]`, `[data-status-dot] [data-indicator]`, `[data-status-dot][data-state] [data-indicator]`
- HTML handoff:
  - 전체 HTML snippet은 이 문서에 반복 복사하지 않는다.
  - 실제 DOM, class, data attribute 기준은 exact page와 `statusDotMarkup()`을 따른다.

## QA status

- QA issue: `../../../site/issue-20260519-1356-status-priority-doc-qa-refresh/REVIEW.md`
- historical sync issue: `../../../site/issue-20260514-1729-statusdot-figma-sync/REVIEW.md`
- exact page checked: `../../../site/component/supporting/statusdot.html`
- catalog route checked: `../../../site/index.html#components`
- render evidence: `../../../site/issue-20260519-1356-status-priority-doc-qa-refresh/html-render-evidence.json`
- screenshot evidence: `../../../site/issue-20260519-1356-status-priority-doc-qa-refresh/statusdot-exact-light.png`
- Figma-to-HTML mismatch count: `0`
- CSS lock:
  - `sonar5.css` 수정 없음
  - `component-css/component.css`의 확인된 selector만 사용
  - 신규 `lp-*`, `ui-*`, `demo-*` component body selector 없음

## 확정 상태

- `state=off`
- `state=low`
- `state=medium`
- `state=high`

## HTML grammar

```html
<span data-status-dot data-state="medium" aria-hidden="true">
  <span data-indicator></span>
</span>
```

- root: `[data-status-dot][data-state]`
- indicator: `[data-indicator]`
- `data-state` 값은 `off`, `low`, `medium`, `high`만 사용한다.
- 텍스트, 아이콘, slot, label은 구현하지 않는다.

## 구조 / anatomy

- `StatusDotRoot`
  - `IndicatorFill`

## exact visual spec

- root size는 `20 x 20`이다.
- root padding은 `4px`이다.
- indicator size는 `12 x 12`이다.
- indicator radius는 원형이다.
- `off`는 neutral gray reading이다.
- `low`는 green reading이다.
- `medium`은 amber/yellow reading이다.
- `high`는 red reading이다.

## CSS owner / ladder

- `sonar5.css` exact selector 재사용: 없음
- isolated CSS owner: `site/component-css/component.css`
- `component.css` selector:
  - `[data-status-dot]`
  - `[data-status-dot] [data-indicator]`
  - `[data-status-dot][data-state] [data-indicator]`
- `sonar5.css`는 read-only reference이며 수정하지 않는다.
- `styles.css`, `.demo-*`, `lp-*`, `ui-*`는 component body truth가 아니다.

## 접근성 계약

- verified HTML은 `aria-hidden="true"`로 노출된다.
- 상태 의미를 사용자에게 전달해야 하는 문맥에서는 parent component가 accessible name 또는 description을 제공한다.
- `StatusDot` 내부에 임의의 label, tooltip, icon, interaction state를 추가하지 않는다.

## 추정 금지

- `StatusDot`과 `PriorityIndicator`를 하나의 count variant family로 병합하는 해석
- label이나 icon을 역주입하는 해석
- border ring이나 outlined shell을 current truth로 승격하는 해석
- `hover`, `active`, `selected`, `disabled`, `loading`, `focus` 상태 추가

## AI implementation handoff

- Figma node `904:8140`, `DESIGN.md`, `CSSPLAN.md`, QA mismatch `0` 기록을 함께 확인한 뒤에만 이 문서를 변경한다.
- 구현은 `[data-status-dot][data-state] > [data-indicator]` grammar를 유지한다.
- 새 StatusDot body style은 `component-css/component.css`에서만 관리한다.
- `sonar5.css`와 generated HTML을 직접 수정하지 않는다.

## 오픈 이슈

- 없음
