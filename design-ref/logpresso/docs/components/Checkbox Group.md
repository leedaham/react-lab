# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/inputs-search-selection/checkbox-group.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `source required`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Checkbox Group.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

Checkbox Group

## Figma evidence

- UI-5.1 node: `17159:1142`
- Figma name: `Checkbox multi-item group`
- size: `126 x 76`
- group은 `Checkbox Row` 3개를 vertical stack으로 배치한다.
- confirmed row grammar: `Checkbox(size=sm, value=unchecked, state=default)` + `fieldLabel(size=sm, fontWeight=Medium, variant=noCap)`
- confirmed row gap: `8`
- not confirmed: group-owned selected/active state, primitive size/state/value 재정의

## 구현 기준

- exact page: `../../../site/component/inputs-search-selection/checkbox-group.html`
- catalog route: `../../../site/index.html#components`
- source helper: `../../../site/app.js`의 `checkboxGroupMarkup()`, `previewRenderers["Checkbox Group"]`
- generated owner: `../../../site/generate-component-pages.mjs`
- root selector / data attribute: `.checkbox-group`, `role="group"`, `aria-label="Checkbox Group"`
- base CSS selector from `sonar5.css`: `.checkbox-group`, `.checkbox-item`, `.checkbox`, `.checkbox-md`, `.label`
- gap CSS selector from `component-css/component.css`: `.checkbox-group[aria-label="Checkbox Group"]`, `.checkbox-group .checkbox-item`, `.checkbox-group .label`
- HTML handoff policy: 긴 HTML snippet은 이 문서에 복사하지 않는다. 실제 DOM, class, data attribute는 exact page에서 확인한다.

## QA status

- QA issue: `../../../site/issue-20260515-1057-checkbox-radio-switch-groups/REVIEW.md`
- exact page checked: `../../../site/component/inputs-search-selection/checkbox-group.html`
- catalog route checked: `../../../site/index.html#components`
- Figma-to-HTML mismatch count: `0`
- interaction checked: click toggles `aria-checked` to `true`
- CSS lock: `sonar5.css`는 수정하지 않았고 `.checkbox-group` 계열 selector를 읽기 전용 base로 재사용한다.
- remaining uncertainty: 전체 public validation의 기존 missing stylesheet resource mismatch는 Checkbox Group 본체 mismatch가 아니다.

## 목적

- `Checkbox Group`은 `Checkbox repeated row`를 vertical stack으로 배치하는 group container다.
- group은 stack gap과 repeated row assembly만 소유한다.
- `Checkbox` primitive와 `fieldLabel` typography truth는 다시 정의하지 않는다.

## 구조 / anatomy

- `Root`
- repeated `Checkbox Row`
- 각 row는 `Checkbox(size=sm, value=unchecked, state=default)`와 `fieldLabel(size=sm, fontWeight=Medium, variant=noCap)` 조합이다.

## 실제 UI recipe

- `Root`
  - `flex flex-col`
  - row gap `8`
  - width `126`
  - padding `0`
- `Checkbox Row`
  - width `126`
  - height `20`
  - control/label gap `8`
  - row는 top-aligned pair다.
- `Checkbox`
  - outer `20 x 20`
  - Figma primitive: `Checkbox`, selected variant `size=sm, value=unchecked, state=default`
- `fieldLabel`
  - text `Checkbox label`
  - Pretendard Medium `14 / 20`
  - letter-spacing `0`
  - color `semantic.color.text.primary`

## 구현 HTML grammar

```html
<div class="checkbox-group" role="group" aria-label="Checkbox Group">
  <label class="checkbox-item">
    <input class="checkbox checkbox-md" type="checkbox" aria-label="Checkbox label" aria-checked="false" data-ui-choice />
    <span class="label">Checkbox label</span>
  </label>
</div>
```

## CSS 사용

- `sonar5.css` 재사용:
  - `.checkbox-group`
  - `.checkbox-item`
  - `.checkbox`
  - `.checkbox-md`
  - `.label`
- `component-css/component.css` 보정:
  - `.checkbox-group[aria-label="Checkbox Group"]`
  - `.checkbox-group .checkbox-item`
  - `.checkbox-group .label`
- `sonar5.css`는 읽기 전용 reference이며 수정하지 않는다.
- `lp-*`, `ui-*`, `demo-*` selector는 component body 보정에 사용하지 않는다.

## 접근성

- root는 `role="group"`과 접근 가능한 이름을 가진다.
- 각 checkbox는 native `input[type="checkbox"]`를 사용한다.
- checked state는 `checked`와 `aria-checked`를 함께 동기화한다.

## forbidden rule

- group이 `Checkbox` primitive size/state/value를 다시 정의하는 것은 금지한다.
- group이 `fieldLabel` typography truth를 임의로 바꾸는 것은 금지한다.
- row gap `8`을 임의 변경하는 것은 금지한다.
- group row를 `variant=vertical` caption row로 바꾸는 것은 금지한다.
- `.demo-*` selector를 component body 기준으로 사용하지 않는다.
