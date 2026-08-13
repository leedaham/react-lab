# Widget Container

## AI Contract

- status: `ready`
- exactHtml: `site/component/surface/widget-container.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `17040:858, 400 x 400, top highlight child 17040:863`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Widget-Container.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

## 목적

- `Widget Container`는 dashboard widget/module을 담는 dashboard module shell이다.
- `Widget Container`는 generic universal container가 아니다.
- 이 문서는 widget shell truth, widget/module containment, variable sizing boundary, top-glow-based shell grammar만 기록한다.

## Figma evidence

| 항목 | 값 |
| --- | --- |
| Figma file | `UI-5.1` |
| Node | `17040:858` |
| Name | `Widget Container` |
| Metadata | `symbol`, `400 x 400` |
| Design context | child 없는 shell + top highlight child `17040:863` |

`400 x 400`은 Figma specimen 크기다. 제품에서 `Widget Container`의 canonical fixed size로 승격하지 않는다.

## 현재 범위

- outer shell visual rule
- widget/module containment
- top glow ornament
- variable sizing boundary
- dashboard module shell 역할

## 범위 제외

- widget title row exact recipe
- chart / metric / table child recipe
- widget control button exact recipe
- grid span rule
- child pattern의 exact slot / order / size / padding / gap
- child pattern의 exact radius / border / icon / typography / token / state
- exact direct child order
- exact header/body/footer grammar
- scroll behavior exact contract

## core anatomy

- `SurfaceRoot`
- `TopGlow`

- current visible source는 empty shell preview다.
- current visible source에서 4면 edge highlight는 보이지 않는다.
- direct child로 확인되는 것은 shell과 top glow layer뿐이다.
- widget 내부 child order와 required child set은 이 문서가 고정하지 않는다.
- title row, control row, content area, supporting footer는 current product 문맥에서 들어올 수 있는 소비자 예시이지, `Widget Container`의 required anatomy가 아니다.

## layout / composition role

- `Widget Container`는 dashboard grid 안 module container로 읽는다.
- width는 dashboard layout slot이 소유한다.
- height는 내부 widget content 양과 widget 성격의 영향을 받을 수 있다.
- current visible `400 x 400`은 preview sample일 뿐 canonical size가 아니다.
- stable한 것은 shell 외곽 grammar, widget/module containment, top glow placement principle이다.

## internal composition tendency

- `Widget Container` 안에는 여러 module block가 수직으로 누적될 수 있다.
- implementation/reconstruction 관점에서 가장 안전한 경향은 `상단 title/control 성격 block -> 주 content block -> 하단 supporting 성격 block`이다.
- 이 경향은 dashboard widget 문맥과 잘 맞지만, required anatomy contract는 아니다.
- `title`, `control`, `content`, `footer`는 exact region 이름이나 fixed header/body/footer grammar가 아니라, widget 안에서 자주 읽히는 high-level tendency로만 다룬다.
- exact direct child order와 exact presence는 consumer composition이 결정한다.
- `Widget Container`는 이 block들을 담는 parent surface일 뿐, 각 block의 내부 truth를 다시 쓰지 않는다.

## visual implementation / reconstruction rules

### shell

- `SurfaceRoot`는 `radius 8`, `border 1`, `overflow clip`을 유지한다.
- border color는 `semantic.color.border.default`, fallback `rgba(126,140,222,0.16)`다.
- surface background는 주황색이 아니다.
- shell background는 `rgba(137,137,137,0.05)`다.
- rgba/fallback 값은 source-confirmed visual recipe이며, light theme 구현에서 semantic token이 확인되면 semantic token value를 우선한다.
- current visible blur는 `75`다.
- current visible drop shadow는 없다.
- `Section Container`와 같은 `rgba(137,137,137,0.05)` shell background를 쓰더라도, 4면 ornament가 없는 top-glow-only grammar를 유지해야 한다.
- 핵심 차이는 더 밝기보다는 4면 highlight가 제거된 top-glow-only shell과 더 가벼운 modular impression에 있다.
- HTML은 `sonar5.css`의 `.glass-container`, `.glass-container-border`, `.glass-container-content`, `.glass-container-ellipse` 제품 selector를 먼저 사용한다.
- `sonar5.css`와 Figma 사이의 specimen/top-glow gap만 `component-css/component.css`에서 `.glass-container[data-widget-container="specimen"]`로 좁게 보정한다.
- `sonar5.css`는 읽기 전용 reference이며 수정 대상이 아니다.

### ornament

- top-center glow만 있다.
- `Section Container`, `Drawer Container`처럼 top/bottom/left/right edge highlight를 추가하면 안 된다.
- 따라서 `--glass-highlight`나 주황 edge line을 `Widget Container` background처럼 사용하면 안 된다.
- current visible `400` sample에서 top glow는 width `50%`, height `15%`, top `-7.5%`, top center anchored로 읽힌다.
- `TopGlow`는 `Section Container`, `Drawer Container`와 같은 계열의 glow이지만, 이 layer만 남고 4면 highlight는 제거된다.
- `TopGlow`는 shell-owned decorative layer다.
- `TopGlow`는 content padding이나 content inset의 근거가 아니다.
- top glow 위치/폭을 generic spacing token이나 responsive rule로 일반화하면 안 된다.
- current source에서 `TopGlow`는 SVG asset로 표현돼 있고, asset recipe는 아래와 같다.
  - group opacity `0.6`
  - ellipse fill `#727272`
  - ellipse fill opacity `0.2`
  - Gaussian blur `50`
- HTML 구현은 동일한 product selector grammar 안에서 `.glass-container-ellipse`를 top-center glow로 사용한다.

## spacing / padding / region rule

- widget 안에 여러 module block가 들어올 수 있는 경향은 현재 product role과 맞다.
- 하지만 현재 shell source는 empty shell preview이므로 exact region height, padding, gap을 직접 보여 주지 않는다.
- 따라서 `Widget Container`에 `p-*`, `gap-*`, exact `header/body/footer` recipe를 잠그지 않는다.
- title row, control row, content area, supporting footer를 `Widget Container`의 required internal skeleton으로 쓰면 안 된다.
- Dashboard screen usage에서는 `title/control tendency -> content tendency -> supporting tendency`를 사용할 수 있다.
- 이 tendency를 사용할 때도 `Widget Container`가 child component의 exact typography, icon, chart, metric, table, feed row grammar를 소유한다고 해석하면 안 된다.
- Dashboard smoke에서 screen-only CSS가 padding을 적용하는 경우, 그 값은 product screen layout containment용이며 exact component specimen spacing으로 승격하지 않는다.
- scroll은 widget 전체가 아니라 consumer가 지정한 내부 content region 또는 table/list wrapper가 소유한다. `Widget Container` 문서는 scroll owner를 고정하지 않는다.

## Dashboard screen usage

이 섹션은 Figma specimen root가 아니라 `Dashboard` 제품 화면에서 `Widget Container`를 소비할 때만 적용한다.

- Dashboard 제품 화면의 widget content wrapper는 `.glass-container-content[data-dashboard-widget-content]`를 사용한다.
- Dashboard 제품 화면의 widget content wrapper는 vertical stack이다.
- Dashboard 제품 화면의 widget content wrapper는 `padding: 16px`를 유지한다.
- Dashboard 제품 화면의 widget content wrapper 내부 `gap`은 compact density 기준 `8px` 또는 `16px`만 허용한다.
- title row, KPI value, chart body, feed row, compact table은 이 content wrapper 안에 배치한다.
- first content child가 widget shell border에 붙어 보이면 invalid screen output이다.
- chart/feed/table 같은 child pattern 자체의 내부 recipe는 각 child pattern 또는 product screen contract가 소유한다.

## flexible sizing rules

- width는 dashboard grid slot/span을 따른다.
- height는 내부 widget content 양의 영향을 받을 수 있다.
- `Widget Container`는 fixed-size tile이 아니다.
- shell은 size가 달라져도 top glow 중심 장식과 `rgba(137,137,137,0.05)` shell background를 유지해야 한다.

## usage guidance

- dashboard widget/module container
- metric, chart, mini-list, status summary 같은 compact module shell
- chart exact component가 없으면 chart surface를 placeholder로 표현할 수 있다. 이때 product data semantics를 만들지 않고 placeholder/evidence로 기록한다.
- metric exact recipe가 없으면 value/label/status는 consumer composition으로 둔다. 이 문서가 metric number semantics를 확정하지 않는다.

- 아래처럼 쓰면 안 된다.
  - section-wide table container
  - drawer detail panel
  - plain repeated card-view item

## boundary against sibling patterns

- `Card Item`보다 장식이 한 단계 더 있다.
- `Section Container`, `Drawer Container`처럼 4면 ornament를 가지지 않는다.
- `Section Container`, `Drawer Container`와 같은 border/radius/fill 계열을 가지더라도, top-glow-only grammar로 더 가벼운 widget shell로 읽혀야 한다.
- widget shell이므로 section-wide grouping container처럼 읽히면 안 된다.

## ownership boundary

- `Widget Container`가 소유하는 것
  - outer shell
  - widget/module containment
  - variable sizing boundary
  - top-glow-based shell grammar
  - `rgba(137,137,137,0.05)` shell background
- `Widget Container`가 소유하지 않는 것
  - child pattern의 slot / order / size / padding / gap
  - child pattern의 radius / border / icon / typography / token / state
  - title row, control row, chart, metric, list, summary block의 내부 recipe
  - exact direct child order
  - exact header/body/footer canonical grammar
  - grid span rule
  - scroll behavior exact ownership

## evidence limitation

- current source는 empty shell preview다.
- 따라서 내부 content recipe에 대한 직접 증거는 약하다.
- 이 문서는 shell과 top glow에서 직접 확인되는 truth만 강하게 잠그고, 내부 recipe는 deferred로 남긴다.

## deferred

- exact widget inner padding은 component specimen truth로 확정하지 않는다
- title/control/content row exact spacing은 consumer tendency로만 둔다
- exact direct child order
- required child set
- exact header/body/footer canonical grammar
- dashboard grid span과 widget shell의 관계
- widget 종류별 height tendency
- scroll-region ownership
- non-`400` width/height에서 top glow asset이 정확히 어떻게 scaling되는지

## Dashboard screen completion usage

- Dashboard completion은 `Widget Container` 자체가 아니라 Dashboard pattern과 browser evidence가 판정한다.
- `Widget Container` screen usage root는 `data-widget-container="screen"`처럼 specimen root와 구분해야 한다.
- `data-widget-container="specimen"` root를 제품 화면 layout wrapper로 쓰면 실패다.
- screen-only wrapper가 KPI, chart placeholder, risk feed, recent event list를 담을 수 있지만, 이 문서는 그 내부 business schema를 확정하지 않는다.

## HTML handoff

```html
<div
  class="glass-container"
  data-widget-container="specimen"
  data-node-id="17040:858"
  data-name="Widget Container"
>
  <div class="glass-container-decorations" aria-hidden="true">
    <i class="glass-container-ellipse"></i>
  </div>
  <div class="glass-container-border"></div>
  <div class="glass-container-content"></div>
</div>
```

이 HTML은 Figma `17040:858`의 child 없는 shell specimen이다. title row, chart, metric, control, footer는 확인된 Figma evidence가 아니므로 이 handoff에 포함하지 않는다.
실제 화면 구현에서는 top glow만 유지하고 주황 edge highlight나 주황 background를 추가하지 않는다.

## QA status

- exact page: `site/component/surface/widget-container.html`
- catalog route: `site/index.html#components`
- QA mismatch count: `0`
- `sonar5.css` diff: 없음
- local server: 사용하지 않음

## Current QA refresh

- QA issue: `site/issue-20260519-1411-surface-current-qa-refresh`
- Figma evidence: `17040:858`, `400 x 400`, top highlight child `17040:863`
- source owner: `site/app.js`
- source helper: `widgetContainerHtmlExample()`, `widgetPreview()`
- exact page result: light/dark theme 모두 `.glass-container[data-widget-container="specimen"]` root `400 x 400`, node id `17040:858`, radius `8px`, top glow only 확인
- catalog route result: `Widget Container` link resolves to `component/surface/widget-container.html` under `Surface`
- mismatch count: `0`
- `sonar5.css`는 읽기 전용 reference로만 사용했고 수정하지 않았다.
