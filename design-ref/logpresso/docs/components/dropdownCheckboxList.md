# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/dropdown-list/dropdowncheckboxlist.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 / dropdownCheckboxList 12576:23259`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/dropdownCheckboxList.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

dropdownCheckboxList

## Figma evidence

- Figma file: `UI-5.1`
- Figma node: `dropdownCheckboxList` `12576:23259`
- Figma URL: `https://www.figma.com/design/dodpG7QVPyrxWI1uFjKYrC/UI-5.1?node-id=12576-23259`
- screenshot evidence: `980 x 704`
- confirmed scope: checkbox selection row dropdown surface, `hasSearch`, `hasSubtitle`, `surfaceState`

## 구현 기준

- exact page: `site/component/dropdown-list/dropdowncheckboxlist.html`
- catalog route: `site/index.html#components`
- source owner: `site/app.js`
- source helper: `dropdownCheckboxListDemo()`, `dropdownCheckboxListPreview()`, `dropdownListSurface()`
- implemented HTML owner: `app.js` helper output and `generate-component-pages.mjs` generated exact page
- root selector contract: `.dropdown-list-panel` with `.dropdown-list` and native `.checkbox`
- base CSS selector from `sonar5.css`: `.dropdown-list`, `.dropdown-option`, `.checkbox`, `.label`
- gap CSS file: `component-css/component.css`, 이번 문서 계약 보강에서는 신규 보정 없음
- `sonar5.css`는 read-only reference이며 수정하지 않는다.

## QA status

- exact page와 catalog route가 존재한다.
- exact page는 `sonar5.css`와 `component-css/component.css`를 외부 stylesheet로 로드한다.
- QA mismatch count: `0`

## 기준

- Source of truth: Figma UI-5.1
- Figma node: `12576:23259`
- 상태: `confirmed`

## 목적

- `dropdownCheckboxList`는 checkbox selection row를 반복하는 dropdown surface다.
- `Checkbox` primitive truth는 `Checkbox.md`가 소유하며, 이 컴포넌트는 dropdown surface 안의 placement와 row assembly만 소유한다.

## 구조 / anatomy

- `Root`
- `SearchRegion`
- `SearchResultCount`
- repeated checkbox row
- `ScrollAffordance`

## variant/property rule

- Figma variant 축은 `hasSearch`, `hasSubtitle`, `surfaceState`다.
- 확인된 `surfaceState`는 `default`, `loading`, `noResult`, `empty`다.
- 이번 HTML 구현은 `default` surface를 우선 구현한다.
- checked 상태를 초기 고정값으로 두지 않는다.
- checkbox row는 native input checked state로 live interaction을 표현한다.

## 구현 규칙

- component body는 `sonar5.css` product class만 사용한다.
- 문서 shell, preview-stage, route UI는 HTML 코드 예시에 포함하지 않는다.
- 본체 구현에 새 `.demo-*` class를 만들지 않는다.
- HTML 코드 탭은 실제 component body markup을 기본으로 보여준다.

## 사용 class

- `dropdown-list`
- `dropdown-list-panel`
- `dropdown-list-search`
- `dropdown-list-search-count`
- `dropdown-list-items`
- `dropdown-option`
- `checkbox`
- `label`
- `dropdown-list-scroll-affordance`

## 상태 규칙

- `default`: checkbox는 unchecked다.
- `checked`: native checkbox value가 true일 때만 표현한다.
- `hover`, `active`, `selected`, `open`은 서로 대체하지 않는다.

## 금지 사항

- checkbox를 icon 또는 plain row leading visual로 치환하지 않는다.
- radio row grammar를 섞지 않는다.
- Figma에 없는 fixed checked item을 예시로 고정하지 않는다.
- `17159:6893` wrapper의 footer 구조를 이번 canonical surface truth로 승격하지 않는다.

## 재현 확인

- `12576:23259` node가 confirmed evidence로 남아 있어야 한다.
- exact HTML page와 catalog route에서 checkbox row surface가 보여야 한다.
- 코드 탭 기본값이 `HTML`이어야 한다.
- 본체에 새 `.demo-*` class가 없어야 한다.
