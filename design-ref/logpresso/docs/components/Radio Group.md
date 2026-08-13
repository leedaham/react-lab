# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/inputs-search-selection/radio-group.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `source required`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Radio Group.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

Radio Group

## Figma evidence

- UI-5.1 node: `17159:1143`
- Figma name: `Radiobox multi-item group`
- size: `112 x 76`
- group은 `Radiobox Row` 3개를 vertical stack으로 배치한다.
- confirmed row grammar: `Radiobox(size=sm, value=unchecked, state=default)` + `fieldLabel(size=sm, fontWeight=Medium, variant=noCap)`
- confirmed row gap: `8`
- not confirmed: group-owned selected/active state, primitive size/state/value 재정의

## 구현 기준

- exact page: `../../../site/component/inputs-search-selection/radio-group.html`
- catalog route: `../../../site/index.html#components`
- source helper: `../../../site/app.js`의 `radioGroupMarkup()`, `previewRenderers["Radio Group"]`
- generated owner: `../../../site/generate-component-pages.mjs`
- root selector / data attribute: `.checkbox-group`, `role="radiogroup"`, `aria-label="Radio Group"`
- base CSS selector from `sonar5.css`: `.checkbox-group`, `.checkbox-item`, `.radio`, `.label`
- gap CSS selector from `component-css/component.css`: `.checkbox-group[aria-label="Radio Group"]`, `.checkbox-group .checkbox-item`, `.checkbox-group .label`
- HTML handoff policy: 긴 HTML snippet은 이 문서에 복사하지 않는다. 실제 DOM, class, data attribute는 exact page에서 확인한다.

## QA status

- QA issue: `../../../site/issue-20260515-1057-checkbox-radio-switch-groups/REVIEW.md`
- exact page checked: `../../../site/component/inputs-search-selection/radio-group.html`
- catalog route checked: `../../../site/index.html#components`
- Figma-to-HTML mismatch count: `0`
- interaction checked: selecting row 2 yields `["false","true","false"]`
- CSS lock: `sonar5.css`는 수정하지 않았고 `.checkbox-group`과 `.radio` selector를 읽기 전용 base로 재사용한다.
- remaining uncertainty: 전체 public validation의 기존 missing stylesheet resource mismatch는 Radio Group 본체 mismatch가 아니다.

## 목적

- `Radio Group`은 `Radio repeated row`를 vertical stack으로 배치하는 group container다.
- group은 stack gap과 repeated row assembly만 소유한다.
- `Radio` primitive와 `fieldLabel` typography truth는 다시 정의하지 않는다.

## 구조 / anatomy

- `Root`
- repeated `Radiobox Row`
- 각 row는 `Radiobox(size=sm, value=unchecked, state=default)`와 `fieldLabel(size=sm, fontWeight=Medium, variant=noCap)` 조합이다.

## 실제 UI recipe

- `Root`
  - `flex flex-col`
  - row gap `8`
  - width `112`
  - padding `0`
- `Radiobox Row`
  - width `112`
  - height `20`
  - control/label gap `8`
  - row는 top-aligned pair다.
- `Radio`
  - outer `20 x 20`
  - Figma primitive: `Radiobox`, selected variant `size=sm, value=unchecked, state=default`
- `fieldLabel`
  - text `Radio label`
  - Pretendard Medium `14 / 20`
  - letter-spacing `0`
  - color `semantic.color.text.primary`

## 구현 HTML grammar

```html
<div class="checkbox-group" role="radiogroup" aria-label="Radio Group">
  <label class="checkbox-item">
    <input class="radio" type="radio" name="radio-group-preview" aria-label="Radio label" aria-checked="false" data-ui-choice />
    <span class="label">Radio label</span>
  </label>
</div>
```

## CSS 사용

- `sonar5.css` 재사용:
  - `.checkbox-group`
  - `.checkbox-item`
  - `.radio`
  - `.label`
- `component-css/component.css` 보정:
  - `.checkbox-group[aria-label="Radio Group"]`
  - `.checkbox-group .checkbox-item`
  - `.checkbox-group .label`
- `sonar5.css`는 읽기 전용 reference이며 수정하지 않는다.
- `lp-*`, `ui-*`, `demo-*` selector는 component body 보정에 사용하지 않는다.

## 접근성

- root는 `role="radiogroup"`과 접근 가능한 이름을 가진다.
- 각 radio는 native `input[type="radio"]`를 사용한다.
- 같은 group 안의 radio는 같은 `name`을 공유한다.
- selected state는 `checked`와 `aria-checked`를 함께 동기화한다.

## forbidden rule

- group이 `Radio` primitive size/state/value를 다시 정의하는 것은 금지한다.
- group이 `fieldLabel` typography truth를 임의로 바꾸는 것은 금지한다.
- row gap `8`을 임의 변경하는 것은 금지한다.
- group row를 `variant=vertical` caption row로 바꾸는 것은 금지한다.
- `.demo-*` selector를 component body 기준으로 사용하지 않는다.
