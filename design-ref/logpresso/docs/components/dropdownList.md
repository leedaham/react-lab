# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/dropdown-list/dropdownlist.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 / dropdownList 17122:21085`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/dropdownList.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

dropdownList

## Figma evidence

- Figma file: `UI-5.1`
- Figma node: `dropdownList` `17122:21085`
- Figma URL: `https://www.figma.com/design/dodpG7QVPyrxWI1uFjKYrC/UI-5.1?node-id=17122-21085`
- screenshot evidence: `980 x 704`
- confirmed scope: label row dropdown surface, `hasSearch`, `hasSubtitle`, `surfaceState`

## 구현 기준

- exact page: `site/component/dropdown-list/dropdownlist.html`
- catalog route: `site/index.html#components`
- source owner: `site/app.js`
- source helper: `dropdownListDemo()`, `dropdownListPreview()`, `dropdownListSurface()`
- implemented HTML owner: `app.js` helper output and `generate-component-pages.mjs` generated exact page
- root selector contract: `.dropdown-list-panel` with `.dropdown-list`
- base CSS selector from `sonar5.css`: `.dropdown-list`, `.dropdown-option`, `.label`
- gap CSS file: `component-css/component.css`, 이번 문서 계약 보강에서는 신규 보정 없음
- `sonar5.css`는 read-only reference이며 수정하지 않는다.

## QA status

- exact page와 catalog route가 존재한다.
- exact page는 `sonar5.css`와 `component-css/component.css`를 외부 stylesheet로 로드한다.
- QA mismatch count: `0`

## 기준

- Source of truth: Figma UI-5.1
- Figma node: `17122:21085`
- 상태: `confirmed`
- 이번 문서는 label row 기반 canonical surface를 기준으로 한다.
- footer wrapper set `17159:6893`는 composition 성격이므로 다음 차수로 보류한다.

## 목적

- `dropdownList`는 검색 가능한 label row dropdown surface다.
- label row surface는 checkbox/radio selection row와 섞지 않는다.
- 현재 구현은 light theme site에서 semantic token 결과값을 따른다.

## 구조 / anatomy

- `Root`
- `SearchRegion`
- `SearchResultCount`
- repeated label row
- `ScrollAffordance`

## variant/property rule

- Figma variant 축은 `hasSearch`, `hasSubtitle`, `surfaceState`다.
- 확인된 `surfaceState`는 `default`, `loading`, `noResult`, `empty`다.
- 이번 HTML 구현은 `default` surface를 우선 구현한다.
- `selected` 상태를 초기 고정값으로 두지 않는다.
- label row 선택 시 live interaction으로 `aria-selected`를 변경한다.

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
- `dropdown-list-scroll-affordance`
- `material-icon`
- `label`

## 금지 사항

- checkbox/radio row를 label row 대체재로 사용하지 않는다.
- `17159:6893` wrapper의 `hasFooter` 구조를 이번 canonical surface truth로 승격하지 않는다.
- Figma에 없는 fixed selected item을 예시로 고정하지 않는다.
- 현재 HTML이나 이전 문서를 보고 Figma spec을 역추정하지 않는다.

## 재현 확인

- `17122:21085` node가 confirmed evidence로 남아 있어야 한다.
- exact HTML page와 catalog route에서 `dropdown-list-panel` body markup이 보여야 한다.
- 코드 탭 기본값이 `HTML`이어야 한다.
- 본체에 새 `.demo-*` class가 없어야 한다.
