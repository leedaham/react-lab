# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/inputs-search-selection/switch.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `source required`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Switch.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

Switch

## Figma evidence

- UI-5.1 node: `16615:9360`
- Figma name: `Switch`
- type: `COMPONENT_SET`
- page: `Checkbox / Radio / Switch / Label Text`
- confirmed sizes: `large`, `default`, `small`
- confirmed values: `on`, `off`
- confirmed states: `default`, `disabled`
- not confirmed: track 내부 text/icon, primitive 내부 label text, row/group layout ownership

## 구현 기준

- exact page: `../../../site/component/inputs-search-selection/switch.html`
- catalog route: `../../../site/index.html#components`
- source helper: `../../../site/app.js`의 `switchDemo()`, `previewRenderers.Switch`
- generated owner: `../../../site/generate-component-pages.mjs`
- root selector / data attribute: `.toggle`, `data-ui-switch`
- base CSS selector from `sonar5.css`: `.toggle`, `.toggle-xs`, `.toggle-lg`, `.toggle:checked`, `.toggle:disabled`, `.toggle::before`
- gap CSS selector from `component-css/component.css`: `.toggle`, `.toggle::before`, `.toggle:checked`, `.toggle.toggle-xs`, `.toggle.toggle-xs::before`, `.toggle.toggle-lg`, `.toggle.toggle-lg::before`
- HTML handoff policy: 긴 HTML snippet은 이 문서에 복사하지 않는다. 실제 DOM, class, data attribute는 exact page에서 확인한다.

## QA status

- QA issue: `../../../site/issue-20260515-1141-checkbox-radio-switch-primitives/REVIEW.md`
- exact page checked: `../../../site/component/inputs-search-selection/switch.html`
- catalog route checked: `../../../site/index.html#components`
- Figma-to-HTML mismatch count: `0`
- static selector grammar mismatch count: `0`
- CSS lock: `sonar5.css`는 수정하지 않았고 `.toggle` 계열 selector를 읽기 전용 base로 재사용한다.
- remaining uncertainty: 전체 public validation의 기존 missing stylesheet resource mismatch는 Switch 본체 mismatch가 아니다.

## 목적

- `Switch`는 on/off binary value를 전환하는 primitive control family다.
- `Switch`는 label을 직접 소유하지 않는다.
- row/group 문맥의 label은 외부 `fieldLabel` 조합으로 다룬다.

## 구조 / anatomy

- `RootTrack`
- `handle`

## variant/property naming rule

- `size`: `large | default | small`
- `value`: `on | off`
- `state`: `default | disabled`

## 실제 UI recipe

- `size=large`
  - outer: `56 x 30`
  - padding: `3`
  - handle: `24`
- `size=default`
  - outer: `40 x 24`
  - padding: `3`
  - handle: `18`
- `size=small`
  - outer: `32 x 20`
  - padding: `3`
  - handle: `14`
- track radius는 항상 `64` full-round다.
- handle radius도 항상 `64` full-round다.
- handle shadow는 `shadow/sm`, `0px 1px 2px rgba(0,0,0,0.05)`다.
- `value=on`은 handle을 end 쪽에 정렬한다.
- `value=off`는 handle을 start 쪽에 정렬한다.
- `state=disabled`는 disabled track/handle token으로 바뀐다.

## 구현 HTML grammar

```html
<input class="toggle" type="checkbox" role="switch" aria-label="설정 전환" aria-checked="false" data-ui-switch />
```

## CSS 사용

- `sonar5.css` 재사용:
  - `.toggle`
  - `.toggle-xs`
  - `.toggle-lg`
  - `.toggle:checked`
  - `.toggle:disabled`
  - `.toggle::before`
- `component-css/component.css` 보정:
  - `.toggle`
  - `.toggle::before`
  - `.toggle:checked`
  - `.toggle.toggle-xs`
  - `.toggle.toggle-xs::before`
  - `.toggle.toggle-lg`
  - `.toggle.toggle-lg::before`
- `sonar5.css`는 읽기 전용 reference이며 수정하지 않는다.
- `lp-*`, `ui-*`, `demo-*` selector는 component body 보정에 사용하지 않는다.

## 접근성

- native `input[type="checkbox"]`와 `role="switch"`를 함께 사용한다.
- runtime on/off state는 `checked`와 `aria-checked`를 함께 동기화한다.

## forbidden rule

- square radius를 사용하는 것은 금지한다.
- label을 primitive 내부에 넣는 것은 금지한다.
- padding을 size마다 다르게 추론하는 것은 금지한다.
- on/off를 icon or text inside track로 표현하는 것은 금지한다.
- row/container가 `Switch` primitive size를 다시 정의하는 것은 금지한다.

## implementation / reconstruction proof rule

- size별 outer width/height가 `56 x 30`, `40 x 24`, `32 x 20`인지 확인한다.
- handle size가 `24`, `18`, `14`인지 확인한다.
- handle alignment가 `on=end`, `off=start`인지 확인한다.
- full-round radius와 `shadow/sm`을 유지하는지 확인한다.
- label이 primitive 내부로 들어가지 않았는지 확인한다.
