# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/inputs-search-selection/checkbox.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `source required`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Checkbox.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

Checkbox

## Figma evidence

- UI-5.1 node: `13390:26116`
- Figma name: `Checkbox`
- type: `COMPONENT_SET`
- page: `Checkbox / Radio / Switch / Label Text`
- confirmed sizes: `md`, `sm`, `xs`
- confirmed values: `unchecked`, `checked`, `indeterminate`
- confirmed states: `default`, `hover`, `disabled`
- not confirmed: primitive 내부 label text, row/group layout ownership

## 구현 기준

- exact page: `../../../site/component/inputs-search-selection/checkbox.html`
- catalog route: `../../../site/index.html#components`
- source helper: `../../../site/app.js`의 `checkboxDemo()`, `previewRenderers.Checkbox`
- generated owner: `../../../site/generate-component-pages.mjs`
- root selector / data attribute: `.checkbox`, `data-ui-choice`
- base CSS selector from `sonar5.css`: `.checkbox`, `.checkbox-md`, `.checkbox-xs`, `.checkbox:checked`, `.checkbox:indeterminate`, `.checkbox:disabled`
- gap CSS selector from `component-css/component.css`: `.checkbox`, `.checkbox.checkbox-md`, `.checkbox.checkbox-xs`, `.checkbox::before`, `.checkbox:hover:not(:disabled)`
- checked/indeterminate indicator gap selector: `.checkbox:checked::before`, `.checkbox:indeterminate::before`
- HTML handoff policy: 긴 HTML snippet은 이 문서에 복사하지 않는다. 실제 DOM, class, data attribute는 exact page에서 확인한다.

## QA status

- QA issue: `../../../site/issues/issue-20260515-1141-checkbox-radio-switch-primitives/REVIEW.md`, `../../../issues/issue-20260527-1127-checkbox-exact-page-visual-sync/REVIEW.md`
- exact page checked: `../../../site/component/inputs-search-selection/checkbox.html`
- catalog route checked: `../../../site/index.html#components`
- Figma-to-HTML mismatch count: `0`
- static selector grammar mismatch count: `0`
- CSS lock: `sonar5.css`는 수정하지 않았고 `.checkbox` 계열 selector를 읽기 전용 base로 재사용한다.
- remaining uncertainty: 전체 public validation의 기존 missing stylesheet resource mismatch는 Checkbox 본체 mismatch가 아니다.

## 목적

- `Checkbox`는 multi-select primitive control family다.
- `Checkbox`는 label을 직접 소유하지 않는다.
- repeated row와 group 문맥의 label은 외부 `fieldLabel` 조합으로만 다룬다.

## 구조 / anatomy

- `Root`
- `Vector`
- hover state의 `hover-surface`
- unchecked disabled state의 `disabled-surface`

## variant/property naming rule

- `size`: `md | sm | xs`
- `value`: `unchecked | checked | indeterminate`
- `state`: `default | hover | disabled`

## 실제 UI recipe

- `size=md`
  - outer: `24 x 24`
  - padding: `3`
  - indicator graphic box: `18 x 18`
- `size=sm`
  - outer: `20 x 20`
  - padding: `2`
  - indicator graphic box: `16 x 16`
- `size=xs`
  - outer: `18 x 18`
  - padding: `2`
  - indicator graphic box: `14 x 14`
- `IndicatorGraphic`는 항상 centered다.
- `value=checked`, `value=indeterminate`는 `Vector` graphic change로 구분한다.
- control shape는 항상 square checkbox primitive다.
- `checked` indicator는 square surface 전체를 채우지 않고 centered check vector로 표시한다.
- `indeterminate` indicator는 centered horizontal bar vector로 표시한다.

## 구현 HTML grammar

```html
<input class="checkbox" type="checkbox" aria-label="선택 항목" aria-checked="false" data-ui-choice />
```

- 화면과 component exact page에서 Checkbox primitive는 항상 native `input.checkbox[type="checkbox"]`와 `data-ui-choice`를 함께 사용한다.
- `checked` 상태를 HTML에 초기값으로 둘 때는 `checked`와 `aria-checked="true"`를 함께 둔다.
- unchecked 상태는 `aria-checked="false"`를 명시한다.
- Table Cell 안 selection checkbox도 같은 Checkbox primitive grammar를 사용한다. Table Cell이 checkbox shape나 check indicator를 다시 그리지 않는다.
- Generated List product screen의 Table selection checkbox는 row selection state가 명시된 경우에만 초기 `checked` 상태를 가질 수 있다.
- row에 `aria-selected="true"`, `data-selected`, `data-row-state="selected"` 같은 selection evidence가 없으면 table selection checkbox는 unchecked 상태로 시작한다. `data-row-state="active"`는 해당 screen spec에서 active가 selected row를 뜻한다고 명시된 경우에만 selection evidence로 인정한다.
- `aria-current`, focus, hover, row 강조용 current state는 selection evidence가 아니다.
- 예시 데이터를 강조하거나 첫 행을 눈에 띄게 하기 위해 selection checkbox를 임의로 checked로 두는 것은 금지한다.

## CSS 사용

- `sonar5.css` 재사용:
  - `.checkbox`
  - `.checkbox-md`
  - `.checkbox-xs`
  - `.checkbox:checked`
  - `.checkbox:indeterminate`
  - `.checkbox:disabled`
- `component-css/component.css` 보정:
  - `.checkbox`
  - `.checkbox.checkbox-md`
  - `.checkbox.checkbox-xs`
  - `.checkbox::before`
  - `.checkbox:checked::before`
  - `.checkbox:indeterminate::before`
  - `.checkbox:hover:not(:disabled)`
- `sonar5.css`는 읽기 전용 reference이며 수정하지 않는다.
- `lp-*`, `ui-*`, `demo-*` selector는 component body 보정에 사용하지 않는다.

## 접근성

- native `input[type="checkbox"]`를 사용한다.
- runtime checked state는 `checked`와 `aria-checked`를 함께 동기화한다.
- indeterminate state가 필요하면 native `indeterminate` property와 `aria-checked="mixed"`를 함께 사용한다.

## forbidden rule

- label text를 primitive 내부에 넣는 것은 금지한다.
- `data-ui-choice` 없이 `.checkbox`만 단독으로 쓰는 것은 금지한다.
- `checked`만 두고 `aria-checked="true"`를 빠뜨리는 것은 금지한다.
- Generated List product screen에서 Table row selection evidence 없이 row checkbox를 `checked`로 초기화하는 것은 금지한다.
- 화면 전용 CSS가 `.checkbox`의 `appearance`, `clip-path`, check indicator geometry를 새로 소유하는 것은 금지한다.
- outer size를 임의 추론하는 것은 금지한다.
- checkbox를 rounded radio-like circle로 바꾸는 것은 금지한다.
- `indeterminate`를 제거하거나 `Radio`와 같은 value set으로 축소하는 것은 금지한다.

## implementation / reconstruction proof rule

- size별 outer box와 indicator box가 `24/18`, `20/16`, `18/14`를 유지하는지 확인한다.
- `value` 축에 `indeterminate`가 남아 있는지 확인한다.
- label이 primitive 내부에 들어가지 않았는지 확인한다.
- visible Checkbox가 `data-ui-choice`와 `aria-checked`를 가진 native checkbox인지 확인한다.
- square primitive가 radio-like circle로 바뀌지 않았는지 확인한다.
