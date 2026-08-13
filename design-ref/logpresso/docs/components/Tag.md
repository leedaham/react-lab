# Tag

## AI Contract

- status: `ready`
- exactHtml: `site/component/supporting/tag.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 / Tag 17438:29`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Tag.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

## Figma evidence

- Figma file: `UI-5.1`
- Figma node: `Tag` `17438:29`
- Figma URL: `https://www.figma.com/design/dodpG7QVPyrxWI1uFjKYrC/UI-5.1?node-id=17438-29`
- screenshot evidence: `172 x 112`
- confirmed scope: item identity chip, `tone=default|warning`, `removable=false|true`

## 구현 기준

- exact page: `site/component/supporting/tag.html`
- catalog route: `site/index.html#components`
- source owner: `site/app.js`
- source helper: `tagMarkup()`, `tagHtmlExample()`, `tagPreview()`
- implemented HTML owner: `app.js` helper output and `generate-component-pages.mjs` generated exact page
- root selector contract: `.badge[data-component="tag"]`
- base CSS selector from `sonar5.css`: `.badge`, `.badge-sm`, `.badge-xs`, `.badge-rounded`, `.badge-solid-default`, `.badge-solid-red`, `.badge-close`
- gap CSS file: `component-css/component.css`, 기존 `.badge[data-component="tag"]` 보정 사용, 이번 문서 계약 보강에서는 신규 보정 없음
- `sonar5.css`는 read-only reference이며 수정하지 않는다.

## QA status

- exact page와 catalog route가 존재한다.
- exact page는 `sonar5.css`와 `component-css/component.css`를 외부 stylesheet로 로드한다.
- QA mismatch count: `0`

## 기준

- Figma source of truth: UI-5.1 `Tag` node `17438:29`
- 구현 상태: HTML/Figma 정합성 QA 완료, mismatch `0`
- 문서 기준: 검증된 HTML 구현과 Figma evidence만 기록한다.

## 목적

`Tag`는 item-identity chip family다. `Badge`와 달리 marker가 아니라 항목 그 자체를 붙잡는 pill chip으로 읽는다.

## 현재 범위

- `tone=default`
- `tone=warning`
- `removable=false`
- `removable=true`
- compact chip shell
- optional trailing remove affordance

## 구현 스냅샷

```html
<span class="badge badge-sm badge-xs badge-rounded badge-solid-default" data-component="tag" data-removable="true">
  <span>Tag</span>
  <span class="material-icon badge-close" aria-hidden="true">highlight_off</span>
</span>
```

- root class: `badge badge-sm badge-xs badge-rounded badge-solid-default|badge-solid-red`
- semantic attribute: `data-component="tag"`
- removable axis: `data-removable="true"`
- warning tone: `data-tone="warning"` + `badge-solid-red`
- component body 기준 `lp-*`, `ui-*`, `.demo-*` selector를 사용하지 않는다.

## core anatomy

| slot | 상태 | 규칙 |
| --- | --- | --- |
| `TagShell` | required | 항상 full pill shell이다. |
| `Label` | required | item identity text를 한 줄로 표시한다. |
| `TrailingRemoveAffordance` | optional | `removable=true`일 때만 trailing에 붙는다. |
| `LeadingMarker` | forbidden | 현재 `Tag`에는 넣지 않는다. |

## visual implementation

- shell min-height는 `20px`이다.
- shell shape는 `rounded-full`, radius `64px`이다.
- removable=false inset은 `1px 8px`이다.
- removable=true inset은 `1px 4px 1px 8px`이다.
- label과 remove affordance 사이 gap은 `4px`이다.
- remove affordance footprint는 `16px x 16px`이다.
- label typography는 `Pretendard Regular / 12 / 18 / letter-spacing 0`이다.

## CSS 소유권

- `sonar5.css`는 read-only reference이며 수정하지 않았다.
- 재사용 selector: `.badge`, `.badge-sm`, `.badge-xs`, `.badge-rounded`, `.badge-solid-default`, `.badge-solid-red`, `.badge-close`
- Figma gap 보정 owner: `site/component-css/component.css`
- exact page와 catalog는 `component-css/component.css`를 외부 stylesheet로 로드한다.

## 접근성 계약

- `Tag` shell은 현재 구현에서 item identity chip으로 노출된다.
- remove glyph는 `aria-hidden="true"`인 visual affordance다.
- 이 문서는 keyboard remove interaction, validation logic, token input behavior를 Tag family의 confirmed ownership으로 문서화하지 않는다.

## AI 구현 handoff

- 코드 탭 HTML과 preview는 같은 component body grammar를 사용해야 한다.
- shell class는 `.badge` 제품 selector grammar를 유지한다.
- Figma-confirmed gap 없이 `sonar5.css` 또는 `styles.css`에 Tag 본체 visual rule을 추가하지 않는다.
- 필요한 보정은 `component-css/component.css`에만 둔다.

## 추론 금지

- `Tag`를 generic status badge로 대체하지 않는다.
- `Tag`를 form validation state owner로 확장하지 않는다.
- `Tag`를 future token input system owner로 문서화하지 않는다.
- `lp-*`, `ui-*`, `.demo-*` selector를 Tag component body 기준으로 되살리지 않는다.
