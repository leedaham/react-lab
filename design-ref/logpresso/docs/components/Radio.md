# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/inputs-search-selection/radio.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `source required`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Radio.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

Radio

## Figma evidence

- UI-5.1 node: `11992:1029`
- Figma name: `Radiobox`
- type: `COMPONENT_SET`
- page: `Checkbox / Radio / Switch / Label Text`
- site component name `Radio`는 Figma primitive `Radiobox`의 alias다.
- confirmed sizes: `md`, `sm`, `xs`
- confirmed values: `unchecked`, `checked`
- confirmed states: `default`, `hover`, `disabled`
- not confirmed: `indeterminate`, primitive 내부 label text, row/group layout ownership

## 구현 기준

- exact page: `../../../site/component/inputs-search-selection/radio.html`
- catalog route: `../../../site/index.html#components`
- source helper: `../../../site/app.js`의 `radioDemo()`, `previewRenderers.Radio`
- generated owner: `../../../site/generate-component-pages.mjs`
- root selector / data attribute: `.radio`, `data-ui-choice`, `data-size`
- base CSS selector from `sonar5.css`: `.radio`, `.radio:checked`, `.radio:disabled`, `.radio::before`
- gap CSS selector from `component-css/component.css`: `.radio[data-size="md"]`, `.radio[data-size="xs"]`, `.radio[data-size="md"]::before`, `.radio[data-size="xs"]::before`, `.radio:hover:not(:disabled)`
- HTML handoff policy: 긴 HTML snippet은 이 문서에 복사하지 않는다. 실제 DOM, class, data attribute는 exact page에서 확인한다.

## QA status

- QA issue: `../../../site/issue-20260515-1141-checkbox-radio-switch-primitives/REVIEW.md`
- exact page checked: `../../../site/component/inputs-search-selection/radio.html`
- catalog route checked: `../../../site/index.html#components`
- Figma-to-HTML mismatch count: `0`
- static selector grammar mismatch count: `0`
- CSS lock: `sonar5.css`는 수정하지 않았고 `.radio` selector를 읽기 전용 base로 재사용한다.
- remaining uncertainty: 전체 public validation의 기존 missing stylesheet resource mismatch는 Radio 본체 mismatch가 아니다.

## 목적

- `Radio`는 single-select primitive control family다.
- `Radio`는 label을 직접 소유하지 않는다.
- repeated row와 group 문맥의 label은 외부 `fieldLabel` 조합으로만 다룬다.

## 구조 / anatomy

- `Root`
- `IndicatorGraphic`
- hover/disabled surface의 `StateSurface`

## variant/property naming rule

- `size`: `md | sm | xs`
- `value`: `unchecked | checked`
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
- `value=checked`와 `value=unchecked`만 사용한다.
- control shape는 항상 circular radio primitive다.

## 구현 HTML grammar

```html
<input class="radio" type="radio" name="radio-preview" aria-label="단일 선택 항목" data-size="md" aria-checked="false" data-ui-choice />
```

## CSS 사용

- `sonar5.css` 재사용:
  - `.radio`
  - `.radio:checked`
  - `.radio:disabled`
  - `.radio::before`
- `component-css/component.css` 보정:
  - `.radio[data-size="md"]`
  - `.radio[data-size="xs"]`
  - `.radio[data-size="md"]::before`
  - `.radio[data-size="xs"]::before`
  - `.radio:hover:not(:disabled)`
- `sonar5.css`는 읽기 전용 reference이며 수정하지 않는다.
- `lp-*`, `ui-*`, `demo-*` selector는 component body 보정에 사용하지 않는다.

## 접근성

- native `input[type="radio"]`를 사용한다.
- 같은 group 안의 radio는 같은 `name`을 공유한다.
- runtime selected state는 `checked`와 `aria-checked`를 함께 동기화한다.

## forbidden rule

- label text를 primitive 내부에 넣는 것은 금지한다.
- outer size를 임의 추론하는 것은 금지한다.
- radio를 square checkbox-like primitive로 바꾸는 것은 금지한다.
- `indeterminate` state를 추가하는 것은 금지한다.

## implementation / reconstruction proof rule

- size별 outer box가 `24`, `20`, `18`을 유지하는지 확인한다.
- `value` 축이 `unchecked | checked`만 유지되는지 확인한다.
- label이 primitive 내부에 들어가지 않았는지 확인한다.
- circular primitive가 checkbox-like square로 바뀌지 않았는지 확인한다.
