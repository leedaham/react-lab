# Section Container

## AI Contract

- status: `ready`
- exactHtml: `site/component/surface/section-container.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 12481:5085`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Section-Container.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

## 목적

- `Section Container`는 `section` 안의 여러 content block를 한 번에 묶는 section-level grouping surface다.
- `Section Container`는 generic universal `Card`가 아니다.
- `Section Container`는 `Drawer Container`, `Card Item`, `Widget Container`와 다른 sibling pattern이며, section-wide parent surface 역할만 소유한다.
- 이 문서는 section용 outer shell truth, section-level containment, variable sizing boundary, ornament grammar만 기록한다.

## 현재 범위

- outer shell visual rule
- section-level containment
- current populated composition tendency
- ornament recipe
- variable sizing boundary
- section-wide parent surface role

## 구현 상태

- Figma 기준 node는 UI-5.1 `12481:5085`다.
- HTML 구현 기준은 `site/app.js`의 `sectionContainerHtmlExample()`이다.
- exact page는 `site/component/surface/section-container.html`이며, generated page를 직접 수정하지 않는다.
- exact page: `site/component/surface/section-container.html`
- catalog route: `site/index.html#components`
- source helper: `site/app.js`의 `sectionContainerHtmlExample()`
- root selector / data attribute: `.glass-container`, `.glass-container-decorations`, `.glass-container-bottom-line`, `.glass-container-top-line`, `.glass-container-left-line`, `.glass-container-right-line`, `.glass-container-ellipse`, `.glass-container-border`, `.glass-container-content`, `data-list-section-container`, `data-list-section-container-content`
- base CSS selector from `sonar5.css`: `.glass-container`, `.glass-container-decorations`, `.glass-container-bottom-line`, `.glass-container-top-line`, `.glass-container-left-line`, `.glass-container-right-line`, `.glass-container-ellipse`, `.glass-container-border`, `.glass-container-content`
- gap CSS selector from `component-css/component.css`: `.glass-container[data-section-container="specimen"]`은 component specimen 전용이다. 제품 화면 생성용 Section Container visual source로 사용하지 않는다.
- component body는 `sonar5.css`의 `.glass-container` 계열 selector를 먼저 사용한다.
- Figma와 `sonar5.css` 사이의 확인된 gap은 `site/component-css/component.css`의 `.glass-container[data-section-container="specimen"]` 범위에서만 보정한다.
- QA 기준 route는 exact page와 `site/index.html#components` catalog route다.
- 2026-05-18 QA 결과 mismatch count는 `0`이다.
- 2026-05-19 current QA refresh는 `issue-20260519-1411-surface-current-qa-refresh`에서 수행했고 mismatch count는 `0`이다.
- light/dark theme 모두 `.glass-container[data-section-container="specimen"]` root `400 x 400`, node id `12481:5085`, radius `8px`, top/bottom/left/right/top-glow decoration layer가 확인됐다.
- catalog route에서 `Section Container` link는 `component/surface/section-container.html`로 연결되며 `Surface` 섹션에 속한다.
- `sonar5.css`는 읽기 전용 reference로만 사용했고 수정하지 않았다.

```html
<div class="glass-container" data-section-container="specimen" data-node-id="12481:5085" data-name="Section Container">
  <div class="glass-container-decorations" aria-hidden="true">
    <i class="glass-container-bottom-line"></i>
    <i class="glass-container-top-line"></i>
    <i class="glass-container-left-line"></i>
    <i class="glass-container-right-line"></i>
    <i class="glass-container-ellipse"></i>
  </div>
  <div class="glass-container-border"></div>
  <div class="glass-container-content"></div>
</div>
```

위 HTML은 specimen handoff다. 제품 List 화면에서 Section Container surface를 사용하면 `glass-container-decorations`, edge line 요소, `glass-container-border`, `glass-container-content`를 함께 사용한다.

## List screen usage contract

- List 화면에서 section-level parent surface가 필요하면 root는 `section.glass-container[data-list-section-container]`를 사용한다.
- 이 List usage contract는 generic List surface에만 적용한다. `list-with-tree-panel`처럼 composition 문서가 outer workspace section을 소유하는 경우에는 해당 composition 문서가 우선한다.
- `ui/docs/composition/section-with-tree-panel.md`가 source trace에 포함된 화면에서는 `Section Container`가 `leftPanelRegion`과 `mainContentRegion`을 함께 감싸는 outer wrapper가 될 수 없다.
- `section.glass-container[data-list-section-container] > .glass-container-content[data-list-section-container-content] > [data-section-with-tree-panel]` 구조는 invalid output이다.
- `Section With Tree Panel`은 section-level layout composition이다. 이 말은 outer root가 좌/우 관계를 소유한다는 뜻이며, `Section With Tree Panel` 전체를 `Section Container` component로 감싸라는 뜻이 아니다.
- Figma UI 5.1 node `17465:8896` `Section Container + LEFT(tree) Section Container` 기준으로 `Section With Tree Panel` 화면에서 `Section Container`는 두 곳에 나타난다.
  - 왼쪽 Tree surface: `section.glass-container[data-list-section-container][data-left-tree-section-container][data-tree-panel-shell]`
  - 오른쪽 list surface: `section.glass-container[data-list-section-container][data-main-list-surface]`
- 이 두 Section Container는 `leftPanelRegion`과 `mainContentRegion` 안에 각각 들어가는 sibling surface다. 둘 중 하나가 전체 two-column relation을 감싸면 안 된다.
- 이 두 sibling Section Container 사이의 visible border-to-border gap은 `16px`다. 이 값은 layout root의 `gap` token만을 의미하지 않고, 실제 렌더된 왼쪽 Section Container 외곽선과 오른쪽 Section Container 외곽선 사이의 측정값이다.
- `leftPanelRegion` track, `mainContentRegion` wrapper, 또는 route column이 visible Section Container보다 넓어서 추가 빈 폭을 만든 뒤 `gap: 16px`을 더하면 invalid output이다.
- Connector-like tree/list management 화면에서 product route evidence가 `app-resizable-sidebar-layout + connector-tree + table-list`를 선택하면, 오른쪽 `table-list`의 visible parent surface는 `section.glass-container[data-list-section-container][data-main-list-surface]`다. 이 surface 안의 `.glass-container-content[data-list-section-container-content]`가 `Action Bar`, `Table`, `Pagination`을 함께 감싼다.
- Connector-like tree/list management 화면에서 왼쪽 `connector-tree` 또는 selected Tree Panel source의 visible parent surface는 `section.glass-container[data-list-section-container][data-left-tree-section-container][data-tree-panel-shell]`다. 이 surface 안의 `.glass-container-content[data-list-section-container-content][data-tree-panel-content]`가 Tree Panel body/header/list를 담는다.
- List 화면의 Section Container visual source는 `sonar5.css`의 `.glass-container`, `.glass-container-decorations`, edge line 요소, `.glass-container-border`, `.glass-container-content`다.
- List 화면에서는 `data-section-container="specimen"`을 사용하지 않는다. 이 selector는 exact page specimen의 `400 x 400` 고정 visual 보정용이다.
- List 화면 root 안에는 `.glass-container-decorations`와 다섯 highlight child를 `.glass-container-border`보다 먼저 둔다.
- List 화면 root 안에는 `.glass-container-border`를 `.glass-container-content`보다 먼저 둔다.
- List 화면처럼 넓은 Section Container에서는 화면 전용 CSS가 `.glass-container[data-list-section-container]`에 highlight placement custom property를 제공해서 top, bottom, left, right highlight line이 모두 보이게 해야 한다.
- List 화면에서 실제 content stack은 root 안의 `.glass-container-content[data-list-section-container-content]` wrapper 안에 둔다.
- action bar, table section, pagination은 오른쪽 `.glass-container-content[data-list-section-container-content]` 안에 포함한다.
- List product screen usage에서 `.glass-container-content[data-list-section-container-content]`는 vertical stack layout을 소유한다.
- List product screen usage에서 `.glass-container-content[data-list-section-container-content]`는 `display: flex`, `flex-direction: column`, `gap: 16px`, `padding: 16px`를 사용한다.
- 위 `16px` inner rhythm은 universal `Section Container` truth가 아니라 List product screen usage contract다.
- List product screen usage에서 action bar, table section, pagination, state coverage ledger는 같은 `.glass-container-content[data-list-section-container-content]` vertical stack 안에 배치한다.
- action bar, table section, pagination의 DOM 순서는 화면 맥락이 결정한다. 단, 같은 Section Container content wrapper 안에 있어야 한다.
- `glass-container-decorations`와 edge line ornament는 List 화면에서 Section Container highlight border로 사용한다.
- 화면 전용 CSS는 `.glass-container-content[data-list-section-container-content]`의 `display`, `grid-template-rows`, `gap`, `min-height`, `padding`, `overflow` 같은 layout-only 속성만 다룬다.
- 화면 전용 CSS가 `section.glass-container[data-list-section-container]` 또는 `[data-screen-section="list-section-container"]`에 `background`, `border`, `border-radius`, `box-shadow`, `backdrop-filter`, `padding`을 직접 재정의하면 실패다.
- 화면 전용 CSS가 `.glass-container-decorations`, edge line 요소, `.glass-container-border`를 숨기거나 `display: none`, `visibility: hidden`, `opacity: 0`, `border: none`으로 무력화하면 실패다.
- 화면 전용 CSS가 wide List surface에 `--glass-top-line-left`, `--glass-top-line-width`, `--glass-bottom-line-left`, `--glass-bottom-line-right`, `--glass-left-line-top`, `--glass-left-line-height`, `--glass-right-line-top`, `--glass-right-line-height`를 제공하지 않으면 실패다.
- List 화면용 별도 panel selector를 새로 만들어 Section Container visual을 대체하면 안 된다.

## Composition precedence

- Component 문서의 generic usage rule은 composition 문서의 assembly rule을 덮어쓰지 않는다.
- `Section Container`는 surface component이며, `Section With Tree Panel`, `Drawer Form`, `List With Detail Drawer` 같은 composition의 region relationship을 소유하지 않는다.
- `Section With Tree Panel`이 선택된 화면에서는 [../composition/section-with-tree-panel.md](../composition/section-with-tree-panel.md)가 outer section root, `leftPanelRegion`, `mainContentRegion`, Tree Panel placement, main content placement를 소유한다.
- `Section With Tree Panel`이 선택된 화면에서는 [../composition/section-with-tree-panel.md](../composition/section-with-tree-panel.md)의 visible sibling gap rule이 이 문서의 generic spacing language보다 우선한다.
- 이 문서의 `List screen usage contract`를 근거로 Tree Panel composition 전체를 Section Container 내부에 넣으면 안 된다.
- Plan이나 source trace가 `list-with-tree-panel`과 `Section-Container`를 동시에 포함하더라도, `Section-Container`는 전체 screen section wrapper가 아니라 명시적으로 요청된 surface slot에만 배치한다.
- Plan이나 source trace가 `list-with-tree-panel`과 connector-like product route evidence를 동시에 포함하면, `app-resizable-sidebar-layout`이 two-column composition owner이고 `Section-Container`는 왼쪽 Tree surface와 오른쪽 primary list surface owner다.

## 범위 제외

- child pattern의 exact slot / order / size / padding / gap
- child pattern의 exact radius / border / icon / typography / token / state
- `Action Bar`, `Table`, `Pagination`, filters, summaries의 child recipe
- exact header/body/footer padding
- section 내부 block gap
- direct child order
- required child set
- row/table/pagination behavior

## core anatomy

- `SurfaceRoot`
- `TopGlow`
- `TopEdgeHighlight`
- `BottomEdgeHighlight`
- `LeftEdgeHighlight`
- `RightEdgeHighlight`

- current source에는 shell-only `Section Container`와 direct child가 실제로 들어간 populated `Section Container`가 함께 보인다.
- 따라서 이 문서는 `Section Container`가 empty shell로도 존재할 수 있고, direct child stack을 가질 수도 있다고 읽는다.
- 다만 `Action Bar`, `Table`, `Pagination`은 이 source에서 direct child로 확인되지 않는다.
- `Action Bar`, `Table`, `Pagination`은 여전히 current product 문맥에서 가능한 소비자 예시이지, `Section Container`의 required anatomy가 아니다.

## layout / composition role

- `Section Container`는 section 안의 큰 content group를 감싸는 parent surface로 읽는다.
- width는 section content area를 따라 확장된다.
- height는 내부 content 길이에 따라 늘어난다.
- current populated source에서 가장 직접적으로 확인되는 `16px` rhythm은 content inset보다 section-level placement margin이다.
- `Section` frame 안에서 `Section Container`는 바깥에서 `16px` 떨어져 배치된다.
- 여러 `Section Container`가 sibling으로 놓일 때도 inter-container gap은 `16px`다.
- current visible sample처럼 `400 x 400` 정사각형으로 고정하면 안 된다.
- stable한 것은 shell 외곽 grammar, section-level containment, ornament placement principle이다.

## internal composition tendency

- `Section Container` 안에는 여러 block가 수직으로 누적될 수 있다.
- current source `9089:2`에서 가장 강하게 확인되는 populated 경향은 `full-width direct child row stack`이다.
- 큰 `Section Container`는 direct child row wrapper를 x=`0`에서 시작시키고, row를 수직으로 쌓을 수 있다.
- card-view example에서는 `Card Row -> Card Row -> Card Row -> Card Row` 순서가 직접 확인된다.
- 이 row stack은 `Section Container`의 current populated composition tendency로는 잠글 수 있다.
- 다만 이것을 universal `header/body/footer` grammar로 승격하면 안 된다.
- `top tool area`, `main content area`, `bottom utility area`는 더 이상 current source의 가장 강한 증거가 아니다.
- `Action Bar`, filters, summaries, `Table`, `Pagination`의 exact presence와 순서는 여전히 consumer composition이 결정한다.
- `Section Container`는 이 block들을 담는 parent surface일 뿐, 각 block의 내부 truth를 다시 쓰지 않는다.

## visual implementation / reconstruction rules

### shell

- `SurfaceRoot`는 `radius 8`, `border 1`, `overflow clip`을 유지한다.
- border color는 `semantic.color.border.default`, fallback `rgba(126,140,222,0.16)`다.
- shell background는 `rgba(137,137,137,0.05)`다.
- shell background는 주황색이 아니다.
- `rgba(255,125,74,...)` 값은 background/fill이 아니라 edge highlight ornament에만 제한된다.
- rgba/fallback 값은 source-confirmed visual recipe이며, light theme 구현에서 semantic token이 확인되면 semantic token value를 우선한다.
- current visible blur는 `75`다.
- current visible drop shadow는 없다.

### ornament

- top-center glow가 있다.
- current visible sample에는 edge highlight가 네 방향에 모두 있다.
- current visible `400` sample에서 직접 확인되는 ornament recipe는 아래와 같다.
  - top line: width `150`, left offset `49`
  - bottom line: width `300`, right offset `29`
  - left vertical line: height `100`, top offset `49`
  - right vertical line: height `150`, bottom offset `29`
  - top glow: width `50%`, height `15%`, top `-7.5%`, top center anchored
- populated example에서도 같은 종류의 ornament grammar가 반복되지만, non-`400` width/height에서의 exact responsive rule은 아직 이 문서가 잠그지 않는다.
- narrow width에서는 bottom line이 shell 바깥으로 일부 넘어갈 수 있다.
- ornament는 shell-owned decorative layer다.
- ornament는 content padding이나 content inset의 근거가 아니다.
- top glow와 edge highlight는 단순한 선이나 원형 blur가 아니라 SVG asset 기반 decorative layer로 읽는다.
- top glow asset recipe는 아래와 같다.
  - group opacity `0.6`
  - ellipse fill `#727272`
  - ellipse fill opacity `0.2`
  - Gaussian blur `50`
- edge highlight asset recipe는 방향별로 아래처럼 잠근다.
  - top edge highlight: `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3625) 50%, rgba(255,255,255,0) 100%)`
  - bottom edge highlight: `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3021) 50%, rgba(255,255,255,0) 100%)`
  - left edge highlight: `linear-gradient(90deg, rgba(255,125,74,0) 0%, rgba(255,125,74,0.6042) 50%, rgba(255,125,74,0) 100%)`, vertical rotation 적용
  - right edge highlight: `linear-gradient(90deg, rgba(255,125,74,0) 0%, rgba(255,125,74,0.3625) 50%, rgba(255,125,74,0) 100%)`, vertical rotation 적용
- `Section Container`는 네 sibling 중 가장 stable하고 가장 parent-surface-like한 shell impression을 유지해야 한다.
- 위 edge highlight recipe는 Figma specimen에 보이는 decorative layer다. 실제 제품 화면에서 edge highlight가 확인되지 않으면 이 layer를 기본으로 추가하지 않는다.
- 주황색 primary token을 `Section Container`의 panel background, card background, section background로 사용하면 안 된다.

## spacing / padding / region rule

- current source에서 `16px`는 먼저 section-level outer margin과 sibling gap으로 확인된다.
- current source에서 큰 `Section Container`의 direct child row는 container 안쪽에서 추가 inset 없이 `x=0`부터 시작한다.
- card-view example에서는 direct child row 간 vertical gap이 `16px`다.
- card row 안의 `Card Item` horizontal gap도 `16px`로 읽히지만, 그것은 row-level composition truth이며 `Card Item` family truth가 아니다.
- 따라서 `Section Container`는 모든 usage에서 사방 `16px` inner padding을 가진다고 쓰면 안 된다.
- `Section Container`가 소유하는 populated spacing truth는 아래처럼 좁게 읽는다.
  - section 안 배치될 때 outer margin `16px`
  - sibling `Section Container` 사이 gap `16px`
  - direct child row stack을 가질 때 row gap `16px`
- `Section With Tree Panel`의 sibling `Section Container` gap은 visible outer border boxes 사이의 `16px`로 측정한다. Route column width와 child surface width가 달라 생긴 빈 폭은 이 gap에 포함되지 않는 별도 오류다.
- exact child recipe와 child 내부 gap은 계속 이 문서가 다시 쓰지 않는다.

## flexible sizing rules

- width는 section 레이아웃이 소유한다.
- height는 내부 content가 소유한다.
- `Section Container`는 fixed-size component가 아니다.
- shell은 content가 늘어나도 border/radius/ornament tone을 유지해야 한다.
- current source에는 `1688 x 1000`, `1372 x 1000`, `300 x 1000`, `300 x 492` populated example이 모두 보인다.
- 즉 `Section Container`는 single full-width shell, split sibling shell, stacked narrow shell로 모두 사용될 수 있다.
- 같은 ornament grammar는 이 폭/높이 변화 안에서도 유지된다.

## usage guidance

- section 안 large data/content container
- 여러 content block를 하나의 section surface로 묶는 parent shell
- `Action Bar`, filters, summaries, `Table`, `Pagination` 같은 child block를 함께 수용할 수 있는 parent surface
- multiple internal blocks를 하나의 dark container로 묶는 목적에 사용

- 아래처럼 쓰면 안 된다.
  - repeated item card
  - drawer detail panel
  - dashboard widget tile

## boundary against sibling patterns

- `Drawer Container`와 닮았지만 same-family variant로 바로 묶지 않는다.
- `Drawer Container`는 더 짙은 drawer context surface를 소유한다.
- `Card Item`처럼 plain repeated item shell로 축소하면 안 된다.
- `Widget Container`처럼 top glow만 있는 compact widget shell로 축소하면 안 된다.

## ownership boundary

- `Section Container`가 소유하는 것
  - outer shell
  - section-level containment
  - variable sizing boundary
  - ornament grammar
  - current populated source에서 직접 확인된 row-stack tendency
- `Section Container`가 소유하지 않는 것
  - child pattern의 slot / order / size / padding / gap
  - child pattern의 radius / border / icon / typography / token / state
  - `Action Bar`, `Table`, `Pagination`, filters, summaries의 내부 recipe
  - `Card Item` 내부 recipe
  - exact generic header/body/footer canonical grammar

## deferred

- required child set
- exact generic header/body/footer canonical grammar
- `Action Bar` / `Table` / `Pagination` usage에서의 exact direct child order
- top utility / main content / bottom utility usage의 exact region size
- non-`400` width/height에서 ornament asset이 정확히 어떻게 scaling되는지
