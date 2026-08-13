# Card Item

## AI Contract

- status: `ready`
- exactHtml: `site/component/surface/card-item.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `12480:5075, 400 x 400, child 없는 gradient shell`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Card-Item.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

## 목적

- `Card Item`은 section이 list/table 대신 card-view를 사용할 때 repeated item card로 쓰이는 pattern이다.
- `Card Item`은 generic universal `Card`가 아니다.
- `Card Item`은 `Section Container`, `Drawer Container`, `Widget Container` 같은 parent surface가 아니다.
- 이 문서는 repeated item shell truth, repeated-item containment, variable sizing boundary, plain-shell visual grammar만 기록한다.

## Figma evidence

| 항목 | 값 |
| --- | --- |
| Figma file | `UI-5.1` |
| Node | `12480:5075` |
| Name | `Card Item` |
| Metadata | `symbol`, `400 x 400` |
| Design context | child 없는 단일 shell |

`400 x 400`은 Figma specimen 크기다. 제품에서 `Card Item`의 canonical fixed size로 승격하지 않는다.

## 현재 범위

- plain shell visual rule
- repeated-item containment
- variable sizing boundary
- repeated item card 역할

## 범위 제외

- thumbnail / preview media recipe
- title / metadata / footer child recipe
- selection state
- filter chip / token / multi-select behavior
- child pattern의 exact slot / order / size / padding / gap
- child pattern의 exact radius / border / icon / typography / token / state
- exact direct child order
- exact block grammar
- exact width tendency

## core anatomy

- `SurfaceRoot`

- current visible source는 plain shell preview다.
- current visible source에서 ornament layer는 보이지 않는다.
- current visible source는 가장 plain한 item shell만 보여 준다.
- direct child로 확인되는 것은 `SurfaceRoot`뿐이다.
- 내부 child order와 required child set은 이 문서가 고정하지 않는다.
- media, title, meta, footer, action은 current product 문맥에서 들어올 수 있는 소비자 예시이지, `Card Item`의 required anatomy가 아니다.

## layout / composition role

- `Card Item`은 section 안 grid/list에 반복 배치되는 개별 item card다.
- width는 card-view layout slot이 소유한다.
- height는 내부 item content 양의 영향을 받을 수 있다.
- current visible `400 x 400`은 preview board sample이고 canonical size가 아니다.
- stable한 것은 shell 외곽 grammar와 repeated item card role이다.

## internal composition tendency

- `Card Item` 안에는 여러 item content block가 들어올 수 있다.
- implementation/reconstruction 관점에서 가장 안전한 경향은 `preview/media-like block`, `title/meta-like block`, `supporting/action-like block` 같은 item summary 성격의 내용이 들어올 수 있다는 정도다.
- 이 경향은 repeated item 문맥과 잘 맞지만, required anatomy contract는 아니다.
- exact slot 수, exact block 이름, exact 순서는 consumer composition이 결정한다.
- `Card Item`은 이 block들을 담는 item shell일 뿐, 각 block의 내부 truth를 다시 쓰지 않는다.

## visual implementation / reconstruction rules

### shell

- `SurfaceRoot`는 `radius 8`, `border 1`, `overflow clip`을 유지한다.
- border color는 `semantic.color.border.default`, fallback `rgba(126,140,222,0.16)`다.
- surface background는 주황색이 아니다.
- `Card Item`은 주황 edge highlight ornament를 소유하지 않는다.
- current visible blur는 없다.
- shell background는 `linear-gradient(92.11233447830095deg, rgba(255, 255, 255, 0.05) 0%, rgba(153, 153, 153, 0.02) 100.03%)`다.
- gradient/fallback 값은 source-confirmed visual recipe이며, light theme 구현에서 semantic token이 확인되면 semantic token value를 우선한다.
- current visible drop shadow는 없다.
- top glow와 edge highlight ornament는 없다.
- `Section Container`, `Drawer Container`, `Widget Container`보다 장식이 없는 gradient-only shell을 유지해야 한다.
- 핵심 차이는 `linear-gradient(92.11233447830095deg, rgba(255, 255, 255, 0.05) 0%, rgba(153, 153, 153, 0.02) 100.03%)` shell background라는 점이다.
- generic dark gradient나 다른 angle/stop의 gradient로 치환하면 outer visual impression이 달라지므로 exact gradient recipe를 유지해야 한다.
- HTML은 `sonar5.css`의 `.glass-card-container` 제품 selector를 먼저 사용한다.
- `sonar5.css`와 Figma 사이의 gradient/specimen gap만 `component-css/component.css`에서 `.glass-card-container[data-card-item="specimen"]`로 좁게 보정한다.
- `sonar5.css`는 읽기 전용 reference이며 수정 대상이 아니다.

## spacing / padding / region rule

- repeated item card인 만큼 여러 internal content block가 들어올 수 있는 경향은 현재 product role과 맞다.
- 하지만 현재 source는 exact padding, gap, block order를 보여 주지 않는다.
- 따라서 `Card Item`에 임의 `p-*`, `gap-*`, fixed header/footer region을 잠그지 않는다.
- media/title/meta/footer/action을 `Card Item`의 required internal skeleton으로 쓰면 안 된다.

## flexible sizing rules

- width는 card-view grid/list slot을 따른다.
- height는 내부 item content 양의 영향을 받을 수 있다.
- example screen에서 보이는 equal-width repetition은 `Card Item` family truth가 아니라 `card-view layout` contract에 속한다.
- repeated item이므로 same-grid 안에서 width rhythm이 맞춰질 수는 있지만, 그 리듬을 `Card Item` 자체의 fixed width, min-width, exact width tendency로 올리면 안 된다.
- shell은 size가 달라져도 plain gradient surface, radius, border, no-ornament 성격을 유지해야 한다.

## usage guidance

- card-view 안 repeated item surface
- 개별 item identity, preview, summary를 담는 parent shell

- 아래처럼 쓰면 안 된다.
  - section-wide content container
  - drawer detail panel
  - dashboard widget module shell

## boundary against sibling patterns

- `Card Item`은 네 pattern 중 가장 plain하다.
- `Section Container`, `Drawer Container`처럼 4면 ornament를 가지지 않는다.
- `Widget Container`처럼 top glow를 가지지 않는다.
- `Section Container`, `Drawer Container`, `Widget Container`와 달리 ornament 없이 `linear-gradient(92.11233447830095deg, rgba(255, 255, 255, 0.05) 0%, rgba(153, 153, 153, 0.02) 100.03%)` shell background로 읽혀야 한다.
- repeated item shell이므로 large content container로 읽히면 안 된다.
- example 화면에서 보이는 반복 폭 리듬은 `Card Item`과 sibling pattern의 시각 차이를 보조할 수는 있어도, `Card Item` family contract 자체를 정의하지는 않는다.

## ownership boundary

- `Card Item`이 소유하는 것
  - outer shell
  - repeated-item containment
  - variable sizing boundary
  - plain-shell visual grammar
  - `linear-gradient(92.11233447830095deg, rgba(255, 255, 255, 0.05) 0%, rgba(153, 153, 153, 0.02) 100.03%)` shell background
- `Card Item`이 소유하지 않는 것
  - child pattern의 slot / order / size / padding / gap
  - child pattern의 radius / border / icon / typography / token / state
  - thumbnail, preview media, title, metadata, footer, action block의 내부 recipe
  - exact direct child order
  - exact block grammar
  - exact width tendency
  - state existence

## evidence limitation

- current source는 plain shell preview다.
- 따라서 내부 content recipe에 대한 직접 증거는 약하다.
- 이 문서는 shell에서 직접 확인되는 truth만 강하게 잠그고, 내부 recipe는 deferred로 남긴다.

## deferred

- exact inner padding
- repeated item 내부 media/title/meta/footer/action order
- exact direct child order
- required child set
- exact block grammar
- grid/list 안 width rhythm을 family width truth로 승격할 수 있는지
- minimum width tendency가 실제로 `Card Item` family에 속하는지
- hover/selected 같은 반복 item 상태가 존재하는지

## HTML handoff

```html
<div
  class="glass-card-container"
  data-card-item="specimen"
  data-node-id="12480:5075"
  data-name="Card Item"
></div>
```

이 HTML은 Figma `12480:5075`의 child 없는 shell specimen이다. 내부 title, metadata, action, selected state는 확인된 Figma evidence가 아니므로 이 handoff에 포함하지 않는다.
이 specimen을 실제 화면에 옮길 때 주황색 primary token을 background로 추가하면 안 된다.

## QA status

- exact page: `site/component/surface/card-item.html`
- catalog route: `site/index.html#components`
- QA mismatch count: `0`
- `sonar5.css` diff: 없음
- local server: 사용하지 않음

## Current QA refresh

- QA issue: `site/issue-20260519-1411-surface-current-qa-refresh`
- Figma evidence: `12480:5075`, `400 x 400`, child 없는 gradient shell
- source owner: `site/app.js`
- source helper: `cardItemHtmlExample()`, `cardItemPreview()`
- exact page result: light/dark theme 모두 `.glass-card-container[data-card-item="specimen"]` root `400 x 400`, node id `12480:5075`, radius `8px`, no decoration layer 확인
- catalog route result: `Card Item` link resolves to `component/surface/card-item.html` under `Surface`
- mismatch count: `0`
- `sonar5.css`는 읽기 전용 reference로만 사용했고 수정하지 않았다.
