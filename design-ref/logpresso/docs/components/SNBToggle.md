# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/navigation-shell/snbtoggle.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 / 9001:7157`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/SNBToggle.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

SNBToggle

## 목적

- `SNBToggle`은 `GNB` 안에서 `SNB shell`의 visible/open 상태를 제어하는 icon-only toggle이다.
- `SNB`의 `navList` row family와는 다른 usage-level control로 읽는다.
- `SNBToggle`은 GNB 안에서 유일한 icon-only exception이다.

## current source 읽는 법

- `SNBToggle`은 `GNB` 내부 child control이다.
- `expanded | emphasized | current | pressed` 같은 `navList` state와 섞지 않는다.
- `open | close`는 `SNBToggle` 자체의 control state로만 읽는다.

## 구조 / anatomy

- `ControlFootprint`
- `GlyphSample`

## state naming rule

- `open`
  - `SNB shell`이 열려 있는 상태를 나타내는 control state
- `close`
  - `SNB shell`이 닫혀 있는 상태를 나타내는 control state

## 실제 UI recipe

- visible icon-only toggle footprint
  - `24 x 24`
- current source reading
  - current source는 flattened-asset-like icon-only toggle sample로 읽는다.
  - `border`, `radius`, `inset`을 분리된 primitive layer로 직접 노출하지 않는다.
- 정렬
  - `24 x 24` footprint 안에서 glyph sample은 center align을 유지한다.

## state visual rule

- `open | close`는 glyph sample만 바뀌고 `24 x 24` footprint는 유지한다.
- 구현/재구성에서는 glyph보다 먼저 `24 x 24` control footprint를 고정한다.
- literal border/radius/inset primitive를 source에 없는 상태로 새로 분해하지 않는다.
- boxed/button-like chrome을 current contract로 승격하지 않는다.
- right-side utility boxed-control grammar를 `SNBToggle`에 적용하는 것은 금지한다.

## GNB context rule

- `SNBToggle`은 `CI`와 `Divider` 사이의 compact icon-only toggle이다.
- `SNBToggle`은 GNB 안에서 유일한 left-side icon-only exception이다.
- `shrink-0`를 유지한다.
- `CI`, `Divider`, `Breadcrumb`와 같은 header line 안에서 같은 vertical center를 유지한다.
- `24 x 24` footprint가 사라지거나 더 작게 수축되면 GNB left rhythm도 함께 무너진다고 본다.
- `SNBToggle`의 current contract는 `24 x 24` footprint와 glyph state 전환까지이며, exact box chrome은 source에 직접 드러난 수준까지만 읽는다.
- right-side utility boxed-control grammar를 절대 상속하지 않는다.
- `SNBToggle`의 icon-only grammar를 right-side utility control에 일반화하는 것은 금지한다.
- boxed/button-like control로 재조립하는 것은 금지한다.
- right-side utility/common control의 dark surface token을 상속하는 것은 금지한다.
- right-side utility/common control의 border token을 상속하는 것은 금지한다.

## Tailwind mapping baseline

- `shrink-0 size-6`
- source가 primitive border/radius/inset을 직접 노출하지 않는 동안, 이 문서에서는 exact box chrome을 Tailwind contract로 다시 고정하지 않는다.

## current project scope에서의 계약

- current spec은 `24 x 24` footprint, `open | close` glyph truth, flattened-asset-like source reading, icon-only toggle grammar, GNB rhythm까지만 잠근다.
- current spec은 `SNBToggle`을 GNB 안의 유일한 icon-only exception으로 잠근다.
- glyph 도형 자체의 broader icon taxonomy는 여기서 새로 정의하지 않는다.

## 라이트 테마 추가 해석

- 본 섹션은 2026-05-04에 확인한 제품 light theme screenshot 기준 보강이다.
- light theme에서도 `SNBToggle`은 동일한 `24 x 24` footprint와 centered glyph를 유지한다.
- light theme screenshot 기준 `SNBToggle`은 right-side utility boxed control처럼 밝은 surface/border를 두르지 않는다.
- glyph foreground는 light header 위에서 읽히는 neutral/primary dark tone으로 처리하고, accent current chip처럼 주황 foreground로 고정하지 않는다.
- `SNBToggle`은 light theme에서도 `CI -> SNBToggle -> Divider -> Breadcrumb` rhythm 사이의 compact whitespace control로 남는다.

## Figma evidence

- Figma file: `UI-5.1`
- Figma node: `9001:7157`
- Figma screenshot evidence: `issue-20260519-1529-shell-current-spec-refresh/DESIGN.md`
- current-spec gate: pass

## 구현 기준

- exact page: `component/navigation-shell/snbtoggle.html`
- catalog route: `index.html#components`
- source owner: `app.js`의 `previewRenderers.SNBToggle`, `snbControlIcon()`
- implemented HTML owner: generated exact page는 `app.js` runtime source를 로드한다.
- SNBToggle 본체 CSS owner: `component-css/component.css`

## QA status

- QA mismatch count: `0` for current-spec static gate.
- static QA: `issue-20260519-1529-shell-current-spec-refresh/audit-shell-current-spec.mjs` `27/27 pass`
- rendered QA: Chrome `file://` exact page에서 `SNB 접기` button specimen 확인.
- catalog route QA: `index.html#components` registry에서 `SNBToggle` link 확인.

## CSS source

- `sonar5.css`: 읽기 전용 reference. 수정하지 않는다.
- `component-css/component.css`: `.snb-control`, `.snb-control__icon`, `.gnb-shell__icon-button--snb` owner.

## boundary

- SNBToggle은 GNB 안 left icon-only exception이다.
- right-side utility boxed-control grammar를 상속하지 않는다.
- `index.html#components`는 registry route이며, 상세 구현 truth는 exact page `component/navigation-shell/snbtoggle.html`에서 확인한다.
