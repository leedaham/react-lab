# Badge

## AI Contract

- status: `ready`
- exactHtml: `site/component/supporting/badge.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 / Badge 12413:11138`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Badge.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

## Figma evidence

- Figma file: `UI-5.1`
- Figma node: `Badge` `12413:11138`
- Figma URL: `https://www.figma.com/design/dodpG7QVPyrxWI1uFjKYrC/UI-5.1?node-id=12413-11138`
- screenshot evidence: `214 x 332`
- confirmed scope: compact display marker, `filled=true|false`, `color=default|error|danger|warning|info|success|system`

## 구현 기준

- exact page: `site/component/supporting/badge.html`
- catalog route: `site/index.html#components`
- source owner: `site/app.js`
- source helper: `badgeMarkup()`, `badgeHtmlExample()`, `badgePreview()`
- implemented HTML owner: `app.js` helper output and `generate-component-pages.mjs` generated exact page
- root selector contract: `.badge.badge-xs`
- base CSS selector from `sonar5.css`: `.badge`, `.badge-xs`, `.badge-solid-*`, `.badge-outline-*`
- gap CSS file: `component-css/component.css`, 기존 `.badge[data-color]` 보정 사용, 이번 문서 계약 보강에서는 신규 보정 없음
- `sonar5.css`는 read-only reference이며 수정하지 않는다.

## QA status

- exact page와 catalog route가 존재한다.
- exact page는 `sonar5.css`와 `component-css/component.css`를 외부 stylesheet로 로드한다.
- QA mismatch count: `0`

## 기준

- Figma source of truth: UI-5.1 `Badge` node `12413:11138`
- 구현 상태: HTML/Figma 정합성 QA 완료, mismatch `0`
- 문서 기준: 검증된 HTML 구현과 Figma evidence만 기록한다.

## 목적

`Badge`는 짧은 상태, 속성, 메타데이터 정보를 표시하는 compact display marker다. `Tag`, removable chip, count badge, notification badge와 섞지 않는다.

## 구현 스냅샷

```html
<span class="badge badge-xs badge-solid-default" data-filled="true" data-color="default">
  <span class="material-icon" aria-hidden="true">star_outline</span>
  <span>Badge</span>
</span>
```

- root class: `badge badge-xs badge-solid-*` 또는 `badge badge-xs badge-outline-*`
- required leading icon: `star_outline`
- data axes: `data-filled`, `data-color`
- component body 기준 `lp-*`, `ui-*`, `.demo-*` selector를 사용하지 않는다.

## Variant

| axis | 값 |
| --- | --- |
| `filled` | `true`, `false` |
| `color` | `default`, `error`, `danger`, `warning`, `info`, `success`, `system` |

- `filled=true`는 `badge-solid-*` class를 사용한다.
- `filled=false`는 `badge-outline-*` class를 사용한다.
- `danger`는 `orange`, `error`는 `red`, `system`은 `purple` 제품 selector에 매핑한다.
- interaction state `hover`, `active`, `selected`, `disabled`는 Figma `12413:11138`에서 확인되지 않아 문서화하지 않는다.

## CSS 소유권

- `sonar5.css`는 read-only reference이며 수정하지 않았다.
- 재사용 selector: `.badge`, `.badge-xs`, `.badge-solid-*`, `.badge-outline-*`
- Figma gap 보정 owner: `site/component-css/component.css`
- exact page와 catalog는 `component-css/component.css`를 외부 stylesheet로 로드한다.

`component-css/component.css`는 Figma와 `sonar5.css` 사이에서 확인된 gap만 보정한다.

- shell height `20px`
- icon footprint `16px x 16px`
- gap `4px`
- padding `1px 8px`
- typography `12px/18px/400`
- default tone과 warning filled foreground의 Figma 차이

## 접근성 계약

- leading icon은 장식 아이콘으로 `aria-hidden="true"`를 사용한다.
- 의미 전달은 visible label이 담당한다.
- Badge 자체에는 확인된 interactive role이 없으므로 button, link, checkbox, selected state로 문서화하지 않는다.

## AI 구현 handoff

- 생성/구현 시 `.badge` 제품 selector grammar를 먼저 사용한다.
- 새 visual rule은 `sonar5.css`에 추가하지 않는다.
- Figma와 `sonar5.css` 사이의 확인된 차이만 `component-css/component.css`에서 보정한다.
- 코드 탭 HTML과 preview HTML은 같은 Badge body grammar를 사용해야 한다.

## 추론 금지

- `Badge`를 removable chip, item chip, Tag, License Badge, count badge로 대체하지 않는다.
- Figma에서 확인되지 않은 state, slot, icon identity, 색상 token을 추가하지 않는다.
- `lp-*`, `ui-*`, `.demo-*` selector를 Badge component body 기준으로 되살리지 않는다.
- `sonar5.css`를 수정 대상으로 해석하지 않는다.
