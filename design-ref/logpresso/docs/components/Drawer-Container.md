# Drawer Container

## AI Contract

- status: `ready`
- exactHtml: `site/component/surface/drawer-container.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 13091:2226이`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Drawer-Container.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

## 목적

- `Drawer Container`는 right-side drawer 안에서 section content의 상세를 붙여 보여 주는 detail sibling surface다.
- `Drawer Container`는 right-side drawer 안에서 detail content를 담는 drawer-level parent surface다.
- `Drawer Container`는 generic universal container가 아니다.
- 이 문서는 drawer 문맥의 shell truth, drawer-level containment, variable sizing boundary, `Section Container`와 다른 `rgba(14,19,34,0.5)` overlay surface만 기록한다.

## 현재 범위

- outer shell visual rule
- drawer-level containment
- ornament recipe
- variable sizing boundary
- drawer detail parent surface 역할

## 구현 상태

- Figma 기준 node는 UI-5.1 `13091:2226`이다.
- HTML 구현 기준은 `site/app.js`의 `drawerContainerHtmlExample()`이다.
- exact page는 `site/component/surface/drawer-container.html`이며, generated page를 직접 수정하지 않는다.
- exact page: `site/component/surface/drawer-container.html`
- catalog route: `site/index.html#components`
- source helper: `site/app.js`의 `drawerContainerHtmlExample()`
- root selector / data attribute: `.glass-container`, `.glass-container-decorations`, `.glass-container-bottom-line`, `.glass-container-top-line`, `.glass-container-left-line`, `.glass-container-right-line`, `.glass-container-ellipse`, `.glass-container-border`, `.glass-container-content`, `.side-panel`, `.side-panel-resize-handle`, `.side-panel-header`, `.side-panel-title`, `.side-panel-content`, `data-list-detail-drawer-panel`, `data-drawer-container="screen"`
- base CSS selector from `sonar5.css`: `.glass-container`, `.glass-container-decorations`, `.glass-container-bottom-line`, `.glass-container-top-line`, `.glass-container-left-line`, `.glass-container-right-line`, `.glass-container-ellipse`, `.glass-container-border`, `.glass-container-content`, `.side-panel`, `.side-panel-resize-handle`, `.side-panel-header`, `.side-panel-title`, `.side-panel-content`
- gap CSS selector from `component-css/component.css`: `.glass-container[data-drawer-container="specimen"]`은 component specimen 전용이다. 제품 화면 생성용 우측 드로어 root로 사용하지 않는다.
- component body는 `sonar5.css`의 `.glass-container` 계열 selector를 먼저 사용한다.
- Figma와 `sonar5.css` 사이의 확인된 gap은 `site/component-css/component.css`의 `.glass-container[data-drawer-container="specimen"]` 범위에서만 보정한다.
- QA 기준 route는 exact page와 `site/index.html#components` catalog route다.
- 2026-05-18 QA 결과 mismatch count는 `0`이다.
- 2026-05-19 current QA refresh는 `issue-20260519-1411-surface-current-qa-refresh`에서 수행했고 mismatch count는 `0`이다.
- light/dark theme 모두 `.glass-container[data-drawer-container="specimen"]` root `400 x 400`, node id `13091:2226`, radius `8px`, top/bottom/left/right/top-glow decoration layer가 확인됐다.
- dark theme에서 Figma 기준 darker overlay surface `rgba(14,19,34,0.5)`가 유지된다.
- catalog route에서 `Drawer Container` link는 `component/surface/drawer-container.html`로 연결되며 `Surface` 섹션에 속한다.
- `sonar5.css`는 읽기 전용 reference로만 사용했고 수정하지 않았다.

```html
<div class="glass-container" data-drawer-container="specimen" data-node-id="13091:2226" data-name="Drawer Container">
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

위 HTML은 specimen-only handoff다. 제품 화면에서 우측으로 열리는 드로어 shell은 `sonar5.css`의 `.side-panel` 계열을 사용한다. `.glass-container[data-drawer-container="specimen"]`은 exact component page의 specimen visual이며 제품 화면 root로 쓰지 않는다.

## Product screen usage contract

- `Drawer Container`는 `row-detail-open`에서 소비되는 drawer shell이다. Parent composition이 `screenState=base-list`를 기록한 경우 `aside.side-panel[data-list-detail-drawer-panel]`를 렌더하지 않는다.
- `row click opens drawer`는 parent list/table의 trigger capability이며, `Drawer Container`를 초기 visible state로 렌더하라는 의미가 아니다.
- open/close state ownership은 parent composition이 소유한다. 이 문서는 visible drawer shell의 root, width, placement, resize handle, content inset만 소유한다.
- List 또는 Detail 문맥에서 우측 생성, 수정, 상세조회 드로어가 열리면 screen root는 `aside.side-panel[data-list-detail-drawer-panel][data-drawer-container="screen"]`를 사용한다.
- 제품 화면의 우측 드로어 width, placement, resize handle source는 `sonar5.css`의 `.side-panel`과 `.side-panel-resize-handle`이다.
- `.side-panel`은 `position: fixed`, `right: 0`, `width: 100%`, `max-width: 50%`, `min-width: var(--container-2xl, 42rem)`를 갖는 제품 CSS 기준이다.
- `.side-panel-resize-handle`은 좌측 edge resize hit area이며 `cursor: ew-resize`를 갖는다.
- `.side-panel-header`는 드로어 상단 title/action row다.
- `.side-panel-header`의 좌측 back/collapse icon button은 우측 드로어가 열린 목록 맥락으로 돌아가는 방향을 표현하는 `chevron_left`를 사용한다.
- `.side-panel-title`은 드로어 제목 text owner다.
- `.side-panel-header`의 title group에는 드로어 제목만 둔다. 경로, breadcrumb, parent page label, subtitle, description, helper text를 추가하지 않는다.
- `정책 / 실시간 탐지`, `대응 > 티켓`, `data-drawer-subtitle`, `breadcrumb` 같은 헤더 보조 경로 표기는 제품 화면 우측 드로어 패턴에 넣지 않는다.
- `.side-panel-content`는 드로어 내부 scroll/content owner다.
- 제품 화면의 모든 우측 드로어 composition은 `.side-panel-content[data-list-detail-drawer-content]` 또는 동등한 drawer content wrapper에 상하좌우 `16px` padding을 적용한다.
- 이 `16px` inset은 `row-detail`, `drawer-form`, 설정, 추가, 수정, 상세조회 drawer 모두에 적용되는 product screen usage contract다.
- `.side-panel-content`의 product CSS base가 `padding: 0`이어도 screen usage에서는 그대로 두지 않는다. Drawer content wrapper가 16px inset을 소유하도록 보정해야 한다.
- 이 보정은 `.side-panel-content[data-list-detail-drawer-content]` 자체의 computed padding으로 확인되어야 한다. 첫 번째 detail field, form section, metadata block, paragraph, table wrapper가 drawer header divider 바로 아래 또는 drawer left edge에 붙어 시작하면 invalid output이다.
- Padding을 drawer child section, `data-drawer-detail`, `data-drawer-form`, 또는 임의 inner wrapper에만 넣어서 `.side-panel-content`가 여전히 `padding: 0`인 상태로 두면 안 된다. Scroll/content owner가 padding owner여야 한다.
- Drawer header는 padding owner가 아니다. Header 아래 content 시작점은 `.side-panel-content[data-list-detail-drawer-content]`의 top padding `16px` 이후여야 하며, left/right content 시작점도 drawer content edge에서 각각 `16px` 안쪽이어야 한다.
- Drawer 내부 repeated content rhythm은 기본 `8px` gap을 사용한다. Form field stack, read-only detail field stack, section stack 모두 같은 compact drawer rhythm에서 시작한다.
- Drawer 내부 section은 generic card 안에 다시 넣지 않는다. Section grouping은 divider, field stack, heading/label rhythm으로 구분한다.
- Drawer 내부 horizontal divider는 `.side-panel-divider` 또는 동등한 theme-aware divider token을 따른다. `var(--color-neutral-alpha-300)` / `--semantic-color-divider-default` 계열을 사용하고, screen-local light fallback color로 divider를 직접 칠하지 않는다.
- screen usage에서는 `.side-panel-footer`를 기본 필수 구조로 보지 않는다. 저장 action은 사용자 확인 기준에 따라 header right에 둘 수 있다.
- screen usage에서 `data-drawer-container="specimen"`을 사용하면 안 된다.
- screen usage에서 `.glass-container[data-drawer-container="specimen"]`을 우측 드로어 root로 사용하면 안 된다.
- `Drawer Container`라는 문서명은 right-side detail parent surface 의미를 유지하지만, 제품 화면에서 실제 우측 드로어 shell은 `.side-panel` CSS family로 구현한다.

## 범위 제외

- drawer 자체의 open/close behavior
- detail field, form, metadata child recipe
- scroll behavior exact contract
- child pattern의 exact slot / order / size / padding / gap
- child pattern의 exact radius / border / icon / typography / token / state
- exact direct child order
- exact header/body/footer grammar
- fixed action 영역의 canonical contract

## core anatomy

- `SurfaceRoot`
- `TopGlow`
- `TopEdgeHighlight`
- `BottomEdgeHighlight`
- `LeftEdgeHighlight`
- `RightEdgeHighlight`

- 현재 visible source는 empty shell preview다.
- direct child로 확인되는 것은 shell과 ornament layer뿐이다.
- child stack order와 required child set은 이 문서가 잠그지 않는다.
- detail form, summary, action row는 current product 문맥에서 들어올 수 있는 소비자 예시이지, `Drawer Container`의 required anatomy가 아니다.

## layout / composition role

- `Drawer Container`는 section content 옆 right-side drawer에 붙는 detailed content sibling panel로 읽는다.
- width는 component 자체의 fixed size가 아니라 drawer context가 소유하는 폭을 따른다.
- height는 내부 detail content와 drawer viewport 제약의 영향을 받을 수 있다.
- current visible `400 x 400`은 preview observation일 뿐 canonical size가 아니다.
- stable한 것은 shell 외곽 grammar, drawer-level containment, right-side detail sibling surface 역할, ornament placement principle이다.

## internal composition tendency

- `Drawer Container` 안에는 여러 detail block가 수직으로 누적될 수 있다.
- implementation/reconstruction 관점에서 가장 안전한 경향은 `상단 supporting/summary 성격 block -> 주 detail content block -> 하단 action/supporting 성격 block`이다.
- 이 경향은 drawer 상세 패널 문맥과 잘 맞지만, required anatomy contract는 아니다.
- `top`, `main`, `bottom`은 exact region 이름이나 fixed header/body/footer grammar가 아니라, drawer 안에서 자주 읽히는 high-level tendency로만 다룬다.
- exact direct child order와 exact presence는 consumer composition이 결정한다.
- `Drawer Container`는 이 block들을 담는 parent surface일 뿐, 각 block의 내부 truth를 다시 쓰지 않는다.

## visual implementation / reconstruction rules

### shell

- `SurfaceRoot`는 `radius 8`, `border 1`, `overflow clip`을 유지한다.
- border color는 `semantic.color.border.default`, fallback `rgba(126,140,222,0.16)`다.
- shell background는 `rgba(14,19,34,0.5)`다.
- shell background는 주황색이 아니다.
- `rgba(255,125,74,...)` 값은 background/fill이 아니라 edge highlight ornament에만 제한된다.
- rgba/fallback 값은 source-confirmed visual recipe이며, light theme 구현에서 semantic token이 확인되면 semantic token value를 우선한다.
- current visible blur는 `75`다.
- current visible drop shadow는 없다.
- `Section Container`의 `rgba(137,137,137,0.05)`보다 더 짙은 overlay surface를 유지해야 한다.
- 핵심 차이는 ornament 구조가 아니라 `rgba(14,19,34,0.5)` shell background 위에 같은 ornament grammar가 얹히며 생기는 더 닫히고 더 무거운 overlay-like surface impression이다.

### ornament

- `Section Container`와 같은 종류의 top glow + 4면 edge highlight를 가진다.
- current visible sample-size recipe는 `Section Container`와 동일하게 읽힌다.
  - top line: width `150`, left offset `49`
  - bottom line: width `300`, right offset `29`
  - left vertical line: height `100`, top offset `49`
  - right vertical line: height `150`, bottom offset `29`
  - top glow: width `50%`, height `15%`, top `-7.5%`, top center anchored
- 이 값들은 current visible `400` sample에서 직접 확인된 ornament recipe다.
- ornament는 shell-owned decorative layer다.
- ornament는 content padding이나 content inset의 근거가 아니다.
- 이 값을 generic spacing token이나 responsive rule로 일반화하면 안 된다.
- top glow와 edge highlight는 단순한 선이 아니라 SVG asset 기반 decorative layer로 읽는다.
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
- 위 edge highlight recipe는 Figma specimen에 보이는 decorative layer다. 실제 제품 화면에서 edge highlight가 확인되지 않으면 이 layer를 기본으로 추가하지 않는다.
- 주황색 primary token을 `Drawer Container`의 panel background나 overlay background로 사용하면 안 된다.

## spacing / padding / region rule

- drawer 안에 여러 detail block가 들어올 수 있는 경향은 현재 product role과 맞다.
- 현재 shell source는 empty shell preview이지만, product screen usage에서는 사용자가 확정한 drawer content inset/rhythm을 우선한다.
- `.side-panel-content[data-list-detail-drawer-content]` 또는 동등한 drawer content wrapper는 상하좌우 `16px` padding을 가진다.
- Drawer 내부 repeated content rhythm은 `8px` gap에서 시작한다.
- `p-*`, `gap-*`, `header/body/footer height`, direct child order를 임의로 새 값으로 잠그지 않는다. 단, drawer content padding `16px`와 repeated content gap `8px`는 product screen usage source truth다.
- detail form, summary, action row를 `Drawer Container`의 required internal skeleton으로 쓰면 안 된다.

## flexible sizing rules

- width는 drawer container가 소유한다.
- height는 내부 detail content와 drawer viewport 제약의 영향을 받을 수 있다.
- `Drawer Container`는 fixed-size component가 아니다.
- darker surface와 edge highlight grammar는 size와 무관하게 유지돼야 한다.
- ornament의 exact length/offset은 current visible sample-size recipe로만 남긴다.

## usage guidance

- list item click 후 우측 drawer에서 보여 주는 상세 content container
- metadata / detail / action block을 묶는 dark detail surface

- 아래처럼 쓰면 안 된다.
  - section-wide table container
  - repeated card-view item
  - dashboard widget module tile

## boundary against sibling patterns

- `Section Container`와 4면 highlight grammar는 비슷하지만, `Drawer Container`는 우측 상세 sibling panel 문맥에서 `rgba(14,19,34,0.5)` shell background를 소유한다.
- `Section Container`가 section 안의 큰 parent grouping surface라면, `Drawer Container`는 그 옆에 붙어 상세를 보여 주는 darker overlay sibling surface다.
- `Card Item`처럼 plain shell로 축소하면 drawer context가 사라진다.
- `Widget Container`처럼 top glow-only shell로 축소하면 안 된다.

## ownership boundary

- `Drawer Container`가 소유하는 것
  - outer shell
  - drawer-level containment
  - variable sizing boundary
  - ornament grammar
  - `rgba(14,19,34,0.5)` overlay shell background
- `Drawer Container`가 소유하지 않는 것
  - child pattern의 slot / order / size / padding / gap
  - child pattern의 radius / border / icon / typography / token / state
  - detail field, form, metadata, summary, action block의 내부 recipe
  - exact direct child order
  - exact header/body/footer canonical grammar
  - scroll 영역과 fixed action 영역의 exact ownership

## evidence limitation

- current source는 empty shell preview다.
- 따라서 내부 content recipe에 대한 직접 증거는 약하다.
- 이 문서는 shell과 ornament에서 직접 확인되는 truth만 강하게 잠그고, 내부 recipe는 deferred로 남긴다.

## deferred

- exact direct child order
- required child set
- exact header/body/footer canonical grammar
- exact right-side detail block skeleton
- footer/action area가 항상 존재하는지
- scroll 영역과 fixed action 영역의 분리 여부
- ornament가 non-400 width에서 어떻게 유지되는지
