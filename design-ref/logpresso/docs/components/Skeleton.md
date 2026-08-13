# Skeleton

## AI Contract

- status: `ready`
- exactHtml: `site/component/supporting/skeleton.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `미적용. 사용자가 Skeleton은 Figma 미적용으로 승인하고, sonar5.css 기존 skeleton selector 기준으로 작업 진행을 승인했다.`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Skeleton.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

## 목적

- `Skeleton`은 data 또는 content가 로딩 중일 때 최종 layout의 자리와 rhythm을 보존하는 placeholder primitive다.
- `Skeleton`은 spinner, progress bar, empty state, disabled state를 대체하지 않는다.
- 화면설계에서는 실제 content가 들어오기 전에도 table row, card, form field, text block의 밀도를 표현하기 위해 사용한다.

## 문서화 대상 범위

- skeleton block
- skeleton text line
- skeleton avatar/circle
- repeated skeleton stack
- loading placeholder placement

## core anatomy

- `SkeletonRoot`
- `SkeletonBlock`
- `SkeletonLine`
- optional `SkeletonCircle`
- optional `SkeletonStack`

## variant / property naming rule

- `shape`
  - `line`
  - `block`
  - `circle`
- `density`
  - `default`
  - `compact`
- `animated`
  - `true`
  - `false`

## visual / layout 규칙

- skeleton은 final content layout의 크기와 위치를 근사해야 한다.
- text placeholder는 line shape를 사용한다.
- image/avatar placeholder는 block 또는 circle shape를 사용한다.
- table loading은 row height와 column track을 보존해야 한다.
- form loading은 label/control/message group의 위치를 보존해야 한다.
- skeleton color는 semantic neutral loading surface를 우선한다.
- animation이 있어도 layout shift가 발생하면 안 된다.

## 사용해야 하는 경우

- table/list/card initial loading
- detail panel loading
- form field data loading
- dashboard widget loading

## Dashboard state coverage usage

- Dashboard loading coverage는 final content layout의 KPI row, chart surface, feed/list surface rhythm을 보존하는 skeleton으로 해석한다.
- Smoke 화면에서 loading을 실제 rendered state로 전환하지 않고 ledger-only로 기록할 수 있다.
- ledger-only loading coverage는 `State coverage ledger` 또는 source trace에 명시해야 하며, 실제 skeleton이 렌더링된 것으로 보고하면 안 된다.
- Skeleton은 Dashboard metric, chart, feed schema를 대신하지 않는다.

## 사용하지 말아야 하는 경우

- 작업 진행률을 수치로 보여야 할 때
- 오류 또는 empty 상태
- disabled/read-only state
- blocking async action의 confirmation

## child family reference

- progress value가 있는 경우 [ProgressBar.md](ProgressBar.md)를 사용한다.
- empty state는 [Blankslate.md](Blankslate.md)를 사용한다.
- table loading은 [Table.md](Table.md)의 column schema와 [Table Cell.md](Table%20Cell.md)의 row shell을 유지한다.
- avatar placeholder는 [Avatar.md](Avatar.md)를 참조한다.

## current spec에서 제외하는 것

- shimmer animation exact duration
- server/client loading lifecycle
- suspense boundary API
- accessibility live-region policy

## implementation / reconstruction 시 반드시 지켜야 하는 규칙

- skeleton이 final layout보다 커져서 reflow를 만들면 안 된다.
- skeleton을 실제 content text처럼 읽히는 fake text로 만들면 안 된다.
- semantic loading surface token을 사용하고 arbitrary gray를 고정하지 않는다.
- motion-reduced 환경에서는 animation 없이도 placeholder가 읽혀야 한다.

## pending / later decision log

- shimmer animation token
- table skeleton row count default
- card/list skeleton preset을 별도 composition으로 둘지 여부

## 라이트 테마 추가 해석

- light theme에서는 pale neutral fill과 subtle highlight로 읽는다.
- dark fallback fill을 light theme에 그대로 강제하지 않는다.

## UI-5.1 sync 기록

- sync date: 2026-05-15
- Figma node: 미적용. 사용자가 `Skeleton은 Figma 미적용으로 승인하고, sonar5.css 기존 skeleton selector 기준으로 작업 진행`을 승인했다.
- 구현 기준: `sonar5.css`의 기존 skeleton selector.
- implemented HTML source: `site/app.js`
- exact page: `site/component/supporting/skeleton.html`
- catalog route: `site/index.html#components`
- CSS owner: `sonar5.css` 기존 selector 재사용. `sonar5.css`는 수정하지 않는다.
- 별도 CSS 보정: 없음. `component-css/component.css`는 Skeleton component body에 사용하지 않는다.

## 구현 selector

- `.side-panel-form-skeleton`
- `.skeleton-form-group`
- `.skeleton-input`
- `.skeleton-textarea`
- `.skeleton-checkbox-group`
- `.skeleton-checkbox-item`
- `.skeleton-checkbox`
- `.skeleton-label-sm`
- `.skeleton-label-md`
- `.skeleton-table-cell`
- `.skeleton-table-cell-sm`
- `.skeleton-table-cell-md`
- `.skeleton-table-cell-lg`
- `.table-skeleton`
- `.skeleton-divider`

## QA 기록

- exact component page: `site/component/supporting/skeleton.html`
- catalog route: `site/index.html#components`
- exact page에서 form skeleton, table skeleton, divider skeleton이 `sonar5.css` selector 치수로 렌더링됨을 확인했다.
- catalog route에서 `Skeleton` 카드와 `./component/supporting/skeleton.html` 링크를 확인했다.
- mismatch count: 0
