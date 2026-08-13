# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/supporting/progressbar.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 / ProgressBar 8759:4270`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/ProgressBar.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

ProgressBar

## 기준 상태

- Figma source of truth: `UI-5.1`
- Figma node: `ProgressBar` `8759:4270`
- Figma URL: `https://www.figma.com/design/dodpG7QVPyrxWI1uFjKYrC/UI-5.1?node-id=8759-4270`
- verified HTML:
  - exact component page: `site/component/supporting/progressbar.html`
  - catalog route: `site/index.html#components`
- QA result: Figma-to-HTML mismatch count `0`

## 목적

- `ProgressBar`는 진행률을 표시하는 passive indicator다.
- 이 문서는 Figma `UI-5.1` node `8759:4270`에서 확인되고 HTML QA에서 검증된 구조와 상태만 기록한다.
- `ProgressBar`는 사용자 입력 컨트롤, slider, loading orchestration, animation component로 문서화하지 않는다.

## 확정 상태

- `state=zero`: fill 없음
- `state=33`: fill width `33px`
- `state=66`: fill width `66px`
- `state=99`: fill width `96px`
- state 값과 실제 fill width 사이의 수학적 환산 규칙은 확정하지 않는다.

## 구현 기준

- exact page: `site/component/supporting/progressbar.html`
- catalog route: `site/index.html#components`
- source owner: `site/app.js`
- source helper: `progressBarMarkup()`, `progressBarHtmlExample()`, `progressBarPreview()`
- implemented HTML owner: `app.js` helper output and `generate-component-pages.mjs` generated exact page
- root selector contract: `[data-progressbar][data-state]`
- code tab HTML과 live preview는 같은 `progressBarMarkup()` grammar를 사용한다.

## HTML grammar

```html
<span data-progressbar data-state="33" role="progressbar" aria-valuetext="%">
  <span class="progress-bar progress-bar-success" aria-hidden="true"></span>
  <span class="progress-text">%</span>
</span>
```

- root: `[data-progressbar][data-state]`
- optional fill: `.progress-bar.progress-bar-success`
- label: `.progress-text`
- `state=zero`에서는 `.progress-bar` element를 만들지 않는다.
- `state=33`, `state=66`, `state=99`에서는 `.progress-bar.progress-bar-success` element를 포함한다.

## 구조 / anatomy

- `ProgressBarRoot`
  - `FillSegment`
  - `ValueLabel`

## exact visual spec

- root body size는 `104 x 20`이다.
- root body radius는 `4px`이다.
- root border는 `1px solid rgba(126, 140, 222, 0.16)` reading이다.
- root body surface는 `#070b13` reading이다.
- fill height는 `12px`이다.
- fill color는 success green `#009f59` reading이다.
- label text 기본값은 `%`이다.
- label typography는 Pretendard Regular `12px/18px`, weight `400`, letter spacing `0`이다.

## state별 geometry

| state | fill element | fill width | fill height | label |
|---|---|---:|---:|---|
| `zero` | 없음 | 해당 없음 | 해당 없음 | `%` |
| `33` | 있음 | `33px` | `12px` | `%` |
| `66` | 있음 | `66px` | `12px` | `%` |
| `99` | 있음 | `96px` | `12px` | `%` |

## CSS owner / ladder

- `sonar5.css` exact selector 재사용:
  - `.progress-bar`
  - `.progress-bar-success`
  - `.progress-text`
- isolated CSS owner: `site/component-css/component.css`
- `component.css` selector:
  - `[data-progressbar]`
  - `[data-progressbar] .progress-bar`
  - `[data-progressbar][data-state] .progress-bar`
  - `[data-progressbar] .progress-text`
- `sonar5.css`는 read-only reference이며 수정하지 않는다.
- `styles.css`, `.demo-*`, `.progress-bar-spec`, `lp-*`, `ui-*`는 component body truth가 아니다.

## 접근성 계약

- `ProgressBar`는 passive indicator다.
- root에는 `role="progressbar"`를 사용한다.
- verified HTML은 Figma-confirmed label text `%`와 `aria-valuetext="%"`를 사용한다.
- keyboard interaction, click interaction, draggable behavior는 확정하지 않는다.

## Dashboard metric usage

- Dashboard KPI/status widget에서 `ProgressBar`는 coverage 또는 progress value가 실제로 제공되는 경우에만 사용한다.
- value semantics, threshold, denominator, permission-dependent visibility는 product spec이 소유한다.
- smoke placeholder에서 progress value를 쓰는 경우 실제 customer data가 아니라 contract coverage sample임을 trace 또는 문서에 기록한다.

## 추정 금지

- `hover`
- `active`
- `selected`
- `disabled`
- `loading`
- `indeterminate`
- color variants
- numeric label variants
- animation
- slider 또는 input control behavior

## supporting proof boundary

- `ProgressBarColorProof` `8759:4280`은 related color proof지만 `ProgressBar` confirmed color variant로 승격하지 않는다.
- `ProgressBar` 구현과 문서의 confirmed fill color는 green `#009f59`뿐이다.
- `Sample / dark canvas`, `Sample / light canvas`는 component source가 아니므로 active variant로 문서화하지 않는다.

## AI implementation handoff

- Figma node `8759:4270`, `DESIGN.md`, `CSSPLAN.md`, QA mismatch `0` 기록을 함께 확인한 뒤에만 이 문서를 변경한다.
- 구현은 `[data-progressbar][data-state]` root grammar와 `.progress-bar.progress-bar-success`, `.progress-text` product selector reuse를 유지한다.
- 새 ProgressBar body style은 `component-css/component.css`에서만 관리한다.
- `sonar5.css`와 generated HTML을 직접 수정하지 않는다.

## 오픈 이슈

- 없음
