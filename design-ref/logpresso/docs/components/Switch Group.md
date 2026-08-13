# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/inputs-search-selection/switch-group.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `source required`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Switch Group.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

Switch Group

## Figma evidence

- UI-5.1 node: `17159:1144`
- Figma name: `Switch multi-item group`
- size: `132 x 88`
- group은 `Switch Row` 3개를 vertical stack으로 배치한다.
- confirmed row grammar: `Switch(size=default, value=off, state=default)` + `fieldLabel(fontWeight=Bold)`
- confirmed row gap: `8`
- confirmed internal gap: `12`
- not confirmed: group-owned selected/active state, primitive size/value/state 재정의

## 구현 기준

- exact page: `../../../site/component/inputs-search-selection/switch-group.html`
- catalog route: `../../../site/index.html#components`
- source helper: `../../../site/app.js`의 `switchGroupMarkup()`, `previewRenderers["Switch Group"]`
- generated owner: `../../../site/generate-component-pages.mjs`
- root selector / data attribute: `.checkbox-group`, `role="group"`, `aria-label="Switch Group"`
- base CSS selector from `sonar5.css`: `.checkbox-group`, `.checkbox-item`, `.toggle`, `.label`
- gap CSS selector from `component-css/component.css`: `.checkbox-group[aria-label="Switch Group"]`, `.checkbox-group[aria-label="Switch Group"] .checkbox-item`, `.checkbox-group[aria-label="Switch Group"] .label`, `.checkbox-group[aria-label="Switch Group"] .toggle::before`
- HTML handoff policy: 긴 HTML snippet은 이 문서에 복사하지 않는다. 실제 DOM, class, data attribute는 exact page에서 확인한다.

## QA status

- QA issue: `../../../site/issue-20260515-1057-checkbox-radio-switch-groups/REVIEW.md`
- exact page checked: `../../../site/component/inputs-search-selection/switch-group.html`
- catalog route checked: `../../../site/index.html#components`
- Figma-to-HTML mismatch count: `0`
- interaction checked: click toggles `aria-checked` to `true`
- CSS lock: `sonar5.css`는 수정하지 않았고 `.checkbox-group`과 `.toggle` selector를 읽기 전용 base로 재사용한다.
- remaining uncertainty: 전체 public validation의 기존 missing stylesheet resource mismatch는 Switch Group 본체 mismatch가 아니다.

## 목적

- `Switch Group`은 `Switch Row`를 vertical stack으로 배치하는 group container다.
- group은 stack gap과 repeated row assembly만 소유한다.
- `Switch` primitive와 `fieldLabel` typography truth는 다시 정의하지 않는다.

## 구조 / anatomy

- `Root`
- repeated `Switch Row`
- 각 row는 `Switch(size=default, value=off, state=default)`와 `fieldLabel(fontWeight=Bold)` 조합이다.

## 실제 UI recipe

- `Root`
  - `flex flex-col`
  - row gap `8`
  - width `132`
  - padding `0`
- `Switch Row`
  - width `132`
  - height `24`
  - control/label gap `12`
  - selected row variant: `size=md, position=Left`
- `Switch`
  - outer `40 x 24`
  - value `off`
  - state `default`
- `fieldLabel`
  - text `Label Text`
  - Pretendard Bold `16 / 24`
  - letter-spacing `0`
  - color `semantic.color.text.primary`

## 구현 HTML grammar

```html
<div class="checkbox-group" role="group" aria-label="Switch Group">
  <label class="checkbox-item">
    <input class="toggle" type="checkbox" role="switch" aria-label="Label Text" aria-checked="false" data-ui-switch />
    <span class="label">Label Text</span>
  </label>
</div>
```

## CSS 사용

- `sonar5.css` 재사용:
  - `.checkbox-group`
  - `.checkbox-item`
  - `.toggle`
  - `.label`
- `component-css/component.css` 보정:
  - `.checkbox-group[aria-label="Switch Group"]`
  - `.checkbox-group[aria-label="Switch Group"] .checkbox-item`
  - `.checkbox-group[aria-label="Switch Group"] .label`
  - `.checkbox-group[aria-label="Switch Group"] .toggle::before`
- `sonar5.css`는 읽기 전용 reference이며 수정하지 않는다.
- `lp-*`, `ui-*`, `demo-*` selector는 component body 보정에 사용하지 않는다.

## 접근성

- root는 `role="group"`과 접근 가능한 이름을 가진다.
- 각 switch는 native `input[type="checkbox"]`와 `role="switch"`를 사용한다.
- on/off state는 `checked`와 `aria-checked`를 함께 동기화한다.

## forbidden rule

- group이 `Switch` primitive size/value/state를 다시 정의하는 것은 금지한다.
- group이 `fieldLabel` typography truth를 임의로 바꾸는 것은 금지한다.
- row gap `8`과 row 내부 gap `12`를 임의 변경하는 것은 금지한다.
- label을 `Switch` primitive 내부로 넣는 것은 금지한다.
- `.demo-*` selector를 component body 기준으로 사용하지 않는다.
