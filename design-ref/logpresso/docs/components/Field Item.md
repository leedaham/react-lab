# Field Item

## AI Contract

- status: `ready`
- exactHtml: `site/component/inputs-search-selection/field-item.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Field Item.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

## 목적

`Field Item`은 선택되었거나 적용된 field 값을 한 줄로 표시하는 compact row입니다. Badge, Checkbox, leading icon, label, trailing remove icon을 조합하지만 각 child primitive의 full visual truth를 다시 정의하지 않습니다.

## Figma evidence

- Figma file: `UI-5.1`
- root node: `301:15746` / `fieldItem`
- confirmed states:
  - `301:15745` `state=default`
  - `301:15747` `state=hover`
  - `301:15753` `state=active`
  - `8314:6143` `state=applied`
  - `8314:6132` `state=disabled+none-data`
  - `11335:3365` `state=highlight`
  - `13383:12361` `state=state7`
- confirmed anatomy:
  - `FieldItemRoot`
  - optional `Badge`
  - optional `Checkbox`
  - optional leading `link` icon
  - label or empty data text
  - optional trailing `highlight_off` remove icon
- not confirmed:
  - field value data type
  - business/query behavior
  - keyboard/focus choreography
  - selected/current/open state beyond the listed Figma states

## 구현 기준

- exact page: `../../../site/component/inputs-search-selection/field-item.html`
- catalog route: `../../../site/index.html#components`
- source helper: `../../../site/app.js`의 `fieldItemHtmlExample()`, `fieldItemMarkup()`, `fieldItemPreview()`
- generated page owner: `../../../site/generate-component-pages.mjs`
- root selector / data contract: `[data-field-item-set][data-node-id="301:15746"]`
- item selector / state contract: `[data-field-item].field-item[data-state]`
- base CSS selector from `sonar5.css`: `.field-item`, `.field-item .badge`, `.field-item .icon`, `.field-item .label`, `.field-item .close-btn`, `.field-item.hover`, `.field-item.active`, `.field-item.highlight`, `.field-item.disabled`, `.field-item.none-data`, `.checkbox`
- gap CSS selector from `component-css/component.css`: `[data-field-item-set]`, `[data-field-item].field-item`, `[data-field-item].field-item[data-state]`, `[data-field-item].field-item .material-icon[data-icon]`
- HTML handoff:
  - 전체 HTML snippet은 이 문서에 복사하지 않는다.
  - 실제 DOM, class, data attribute 기준은 exact page와 `fieldItemHtmlExample()`를 따른다.

## anatomy

- `FieldItemRoot`: `216 x 30`, radius `8`, border `1`, compact row shell입니다.
- `Badge`: default/hover/active row에서 보이는 leading badge slot입니다.
- `Checkbox`: default/hover/active row에서 보이는 selection affordance입니다.
- `LeadingIcon`: Figma의 `link` icon slot입니다.
- `Label`: field item의 visible value label입니다.
- `TrailingRemoveIcon`: Figma의 `highlight_off` icon slot입니다.
- `EmptyDataText`: `state7`에서만 보이는 `보여줄 데이터가 없습니다.` text입니다.

## variants / states

- `default`: badge, checkbox, leading icon, label, trailing remove icon을 모두 가진 기본 row입니다.
- `hover`: default와 같은 anatomy를 유지하고 hover surface만 바뀝니다.
- `active`: accent border, active badge, checked checkbox, accent icon/text 상태입니다.
- `applied`: orange fill, label, trailing remove icon만 가진 applied row입니다.
- `disabled+none-data`: visible child가 없는 empty field shell입니다.
- `highlight`: accent border와 orange alpha fill을 가진 empty highlight shell입니다.
- `state7`: empty data text를 가진 row입니다.

## usage guidance

- Field Item은 `Input`, `Select`, `Search`, `Filter & Multi Sort` 같은 parent composition 안에서 선택된 field/value를 compact row로 표시할 때 사용합니다.
- Field Item의 row height와 width는 Figma proof 기준을 따른다.
- `Badge`, `Checkbox`, icon의 세부 family rule은 각 component 문서를 참조한다.
- 적용된 값의 business meaning은 parent가 소유한다.

## boundary / do not infer

- Field Item을 `Tag`나 `Badge` family로 치환하지 않는다.
- `fieldLabel`을 Field Item 내부 label로 흡수하지 않는다.
- Figma에 없는 focus, selected, current, open state를 만들지 않는다.
- `disabled+none-data`, `highlight`, `state7`을 같은 empty state로 합치지 않는다.
- `sonar5.css`를 수정하지 않는다.

## QA status

- QA issue: `../../../site/issue-20260519-1342-field-item-sync/REVIEW.md`
- exact page checked: `../../../site/component/inputs-search-selection/field-item.html`
- catalog route checked: `../../../site/index.html#components`
- render evidence: `../../../site/issue-20260519-1342-field-item-sync/html-render-evidence.json`
- screenshot evidence:
  - `../../../site/issue-20260519-1342-field-item-sync/field-item-exact-light.png`
  - `../../../site/issue-20260519-1342-field-item-sync/field-item-catalog.png`
- Figma-to-HTML mismatch count: `0`
- CSS lock:
  - `sonar5.css` 수정 없음
  - `component-css/component.css`의 확인된 gap selector만 사용
  - 신규 `lp-*`, `ui-*`, `demo-*` component body selector 없음
