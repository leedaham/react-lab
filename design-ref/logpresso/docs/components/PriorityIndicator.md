# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/supporting/priorityindicator.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 / PriorityIndicator 2304:21324`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/PriorityIndicator.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

PriorityIndicator

## 목적

- `PriorityIndicator`는 multi-dot level indicator family다.
- 이 문서는 Figma `UI-5.1` node `2304:21324`에서 확인되고 HTML QA에서 검증된 구조와 상태만 기록한다.
- broader product semantics나 placement orchestration은 이 문서가 소유하지 않는다.

## Figma evidence

- Figma file: `UI-5.1`
- Figma node: `PriorityIndicator` `2304:21324`
- Figma URL: `https://www.figma.com/design/dodpG7QVPyrxWI1uFjKYrC/UI-5.1?node-id=2304-21324`
- confirmed priorities:
  - `priority=low`
  - `priority=medium`
  - `priority=high`
- confirmed disabled axis:
  - `disabled=false`
- confirmed anatomy:
  - `PriorityIndicatorRoot`
  - `Dot1`
  - `Dot2`
  - `Dot3`
- not confirmed:
  - `disabled=true`
  - `hover`
  - `active`
  - `selected`
  - `loading`
  - `focus`

## 구현 기준

- exact page: `../../../site/component/supporting/priorityindicator.html`
- catalog route: `../../../site/index.html#components`
- source helper: `../../../site/app.js`의 `priorityIndicatorMarkup()`, `priorityIndicatorPreview()`
- generated page owner: `../../../site/generate-component-pages.mjs`
- root selector / priority contract: `[data-priority-indicator][data-priority]`
- segment selector: `[data-segment]`
- base CSS selector from `sonar5.css`: 없음
- gap CSS selector from `component-css/component.css`: `[data-priority-indicator]`, `[data-priority-indicator] [data-segment]`, `[data-priority-indicator][data-priority] [data-segment]`
- HTML handoff:
  - 전체 HTML snippet은 이 문서에 반복 복사하지 않는다.
  - 실제 DOM, class, data attribute 기준은 exact page와 `priorityIndicatorMarkup()`을 따른다.

## QA status

- QA issue: `../../../site/issue-20260519-1356-status-priority-doc-qa-refresh/REVIEW.md`
- historical sync issue: `../../../site/issue-20260514-1744-priorityindicator-figma-sync/REVIEW.md`
- exact page checked: `../../../site/component/supporting/priorityindicator.html`
- catalog route checked: `../../../site/index.html#components`
- render evidence: `../../../site/issue-20260519-1356-status-priority-doc-qa-refresh/html-render-evidence.json`
- screenshot evidence: `../../../site/issue-20260519-1356-status-priority-doc-qa-refresh/priorityindicator-exact-light.png`
- Figma-to-HTML mismatch count: `0`
- CSS lock:
  - `sonar5.css` 수정 없음
  - `component-css/component.css`의 확인된 selector만 사용
  - 신규 `lp-*`, `ui-*`, `demo-*` component body selector 없음

## 확정 상태

- `priority=low`
- `priority=medium`
- `priority=high`
- Figma에서 확인된 disabled proof는 `disabled=false`뿐이다.

## HTML grammar

```html
<span data-priority-indicator data-priority="medium" aria-hidden="true">
  <span data-segment></span>
  <span data-segment></span>
  <span data-segment></span>
</span>
```

- root: `[data-priority-indicator][data-priority]`
- segment: `3`개의 `[data-segment]`
- `data-priority` 값은 `low`, `medium`, `high`만 사용한다.
- text label, icon, border shell, dismiss affordance는 구현하지 않는다.

## 구조 / anatomy

- `PriorityIndicatorRoot`
  - `Dot1`
  - `Dot2`
  - `Dot3`

## exact visual spec

- root size는 `28 x 20`이다.
- root gap은 `2px`이다.
- root vertical padding은 `6px`이다.
- segment size는 각각 `8 x 8`이다.
- segment radius는 `2px`이다.
- `priority=low`: 첫 번째 segment만 info blue, 나머지는 neutral gray다.
- `priority=medium`: 앞 두 segment가 warning yellow, 마지막은 neutral gray다.
- `priority=high`: 세 segment가 모두 strong error red다.

## CSS owner / ladder

- `sonar5.css` exact selector 재사용: 없음
- isolated CSS owner: `site/component-css/component.css`
- `component.css` selector:
  - `[data-priority-indicator]`
  - `[data-priority-indicator] [data-segment]`
  - `[data-priority-indicator][data-priority] [data-segment]`
- `sonar5.css`는 read-only reference이며 수정하지 않는다.
- `styles.css`, `.demo-*`, `lp-*`, `ui-*`는 component body truth가 아니다.

## 접근성 계약

- verified HTML은 `aria-hidden="true"`로 노출된다.
- 의미 전달이 필요한 문맥에서는 parent 영역이 별도 텍스트나 label을 제공해야 한다.
- `PriorityIndicator` 자체에 keyboard interaction, tooltip, label을 추가하지 않는다.

## 추정 금지

- `disabled=true`를 visible variant처럼 임의 생성하는 해석
- `PriorityIndicator`와 `StatusDot`을 하나의 family variant로 병합하는 해석
- line meter, bar chart, signal icon처럼 구현/재구성하는 해석
- text label이나 numeric value를 현재 family anatomy로 추가하는 해석
- `.demo-priority*`를 component body truth로 되살리는 해석
- `hover`, `active`, `selected`, `loading`, `focus` 상태 추가

## AI implementation handoff

- Figma node `2304:21324`, `DESIGN.md`, `CSSPLAN.md`, QA mismatch `0` 기록을 함께 확인한 뒤에만 이 문서를 변경한다.
- 구현은 `[data-priority-indicator][data-priority] > 3 [data-segment]` grammar를 유지한다.
- 새 PriorityIndicator body style은 `component-css/component.css`에서만 관리한다.
- `sonar5.css`와 generated HTML을 직접 수정하지 않는다.

## 오픈 이슈

- 없음
