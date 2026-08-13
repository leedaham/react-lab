# Surface-Foundation

## AI Contract

- status: `ready`
- exactHtml: `site/component/surface/surface-foundation.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `9089:2 root 안의 sibling nodes 12480:5075, 17040:858, 12481:5085, 13091:2226`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Surface-Foundation.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

## 목적

- 이 문서는 `Section Container`, `Drawer Container`, `Card Item`, `Widget Container`가 공유하는 **narrow surface grammar**만 기록한다.
- Figma UI-5.1 `9089:2` `Card + countainer`는 `Surface Foundation` 자체 node가 아니라 네 sibling을 비교하기 위한 evidence node다.
- 사용자는 A안을 승인했으며, HTML의 `Surface Foundation` 페이지는 네 sibling의 공통 boundary/overview page로 구현한다.
- 이 문서는 universal `Card` owner가 아니다.
- 이 문서는 네 pattern의 main owner가 아니다.
- 이 문서는 content recipe, header/body/footer exact layout, child component truth를 소유하지 않는다.

## Figma evidence

| 항목 | Figma node | 문서 판정 |
| --- | --- | --- |
| Evidence root | `9089:2` `Card + countainer` | 네 sibling 비교 board |
| `Card Item` | `12480:5075` | repeated item shell sibling |
| `Widget Container` | `17040:858` | dashboard module shell sibling |
| `Section Container` | `12481:5085` | section-level parent surface sibling |
| `Drawer Container` | `13091:2226` | drawer/detail parent surface sibling |

`Surface Foundation`은 위 sibling들의 owner나 variant set이 아니다. HTML은 위 Figma evidence를 근거로 boundary 비교만 표시한다.

## 현재 범위

- shared border / radius / overflow rule
- shared variable sizing boundary
- narrow shared shell grammar
- `sonar5.css`의 `.glass-container`, `.glass-container-border`, `.glass-container-content`, `.glass-container-*-line`, `.glass-container-ellipse`, `.glass-card-container` grammar 재사용
- `component-css/component.css`의 `[data-surface-foundation]` 범위 보정

## 범위 제외

- generic `Card` family 정의
- fixed width / fixed height
- 내부 content padding / gap의 공통 canonical 값
- child block recipe
- interactive state system
- 네 sibling 중 일부에만 있는 fill, blur, ornament를 foundation 공통값으로 승격하는 것

## 공통 shell anatomy

- `SurfaceRoot`
- 일부 sibling pattern에 보일 수 있는 separate decorative layer

- `SurfaceRoot`는 항상 relative shell로 읽는다.
- ornament layer의 존재 여부와 exact recipe는 foundation이 소유하지 않는다.

## visual implementation / reconstruction rules

### shell

- 네 pattern은 모두 current visible source 기준 `radius 8`을 유지한다.
- 네 pattern은 모두 `1px border`를 유지한다.
- border color는 항상 `semantic.color.border.default`, fallback `rgba(126,140,222,0.16)`이다.
- fallback rgba 값은 source reference이며, light theme 구현에서는 semantic token value를 우선한다.
- 네 pattern은 모두 `overflow clip`을 유지한다.
- current visible source 기준 별도 drop shadow는 보이지 않는다.
- HTML overview는 `.glass-container`와 `.glass-card-container`를 먼저 적용한다.
- Figma와 `sonar5.css` 사이의 layout/content gap만 `component-css/component.css`에서 `[data-surface-foundation]` 또는 `[data-surface-foundation-item]`로 좁게 보정한다.
- `sonar5.css`는 읽기 전용 reference이며 수정 대상이 아니다.

### shared surface language

- 네 pattern 전체에 공통으로 잠긴 single surface color token은 없다.
- shell background value, blur, density, ornament grammar는 pattern-specific truth다.
- `Section Container`, `Drawer Container`, `Widget Container`, `Card Item`는 border/radius는 같아도 background value와 ornament grammar가 다르다.
- 따라서 shared border/radius가 있다고 해서 one-family `Card` variant로 평탄화하면 안 된다.
- Surface 계열의 background를 주황색으로 구현하면 안 된다.
- `sonar5.css`의 primary orange와 `component-css/component.css`의 `--glass-highlight`는 surface fill/background가 아니라 일부 specimen의 edge highlight ornament에만 제한된다.
- 실제 제품 화면에서 Figma가 edge highlight ornament를 명시하지 않으면 `glass-container-left-line`, `glass-container-right-line`, `glass-container-top-line`, `glass-container-bottom-line`을 기본으로 추가하지 않는다.

## flexible sizing rules

- width와 height는 canonical fixed size가 아니다.
- current visible `400 x 400`은 preview board의 sample observation이다.
- pattern 문서에서 width/height는 항상 parent layout과 content가 결정하는 값으로 읽는다.
- `SurfaceRoot`가 소유하는 것은 size가 커지거나 작아져도 유지되는 shell visual rule뿐이다.
- `padding`, `content gap`, `header/body/footer height`는 이 source만으로 공통 canonical 값으로 잠그지 않는다.

## 관계 정리

- 네 pattern은 sibling이다.
- 이 문서가 네 pattern의 상위 layout owner가 되면 안 된다.
- pattern-specific 역할, fill, density, ornament, spacing은 각 sibling 문서가 소유한다.
- `Section Container`는 [Section-Container.md](./Section-Container.md)에서 읽는다.
- `Drawer Container`는 [Drawer-Container.md](./Drawer-Container.md)에서 읽는다.
- `Widget Container`는 [Widget-Container.md](./Widget-Container.md)에서 읽는다.
- `Card Item`은 [Card-Item.md](./Card-Item.md)에서 읽는다.

## HTML handoff

```html
<div class="glass-container" data-surface-foundation="overview" aria-label="Surface Foundation boundary overview">
  <div class="glass-container-border"></div>
  <div class="glass-container-content">
    <header data-surface-foundation-summary>
      <strong>Surface Foundation</strong>
      <span>UI-5.1 9089:2 / Card + countainer</span>
    </header>
    <div data-surface-foundation-grid>
      <article class="glass-card-container" data-surface-foundation-item="card" aria-label="Card Item boundary evidence">
        <strong>Card Item</strong>
        <span>12480:5075</span>
        <p>radius 8 / border default / item shell</p>
      </article>
      <article class="glass-container" data-surface-foundation-item="widget" aria-label="Widget Container boundary evidence">
        <div class="glass-container-border"></div>
        <div class="glass-container-content">
          <strong>Widget Container</strong>
          <span>17040:858</span>
          <p>blur evidence</p>
        </div>
      </article>
    </div>
  </div>
</div>
```

위 예시는 handoff 축약본이다. 실제 HTML page는 `Section Container`와 `Drawer Container` evidence card도 같은 grammar로 함께 표시한다.
위 예시는 documentation specimen이다. 실제 화면 구현에서 이 specimen의 decorative edge highlight를 background/fill로 번역하면 안 된다.

## QA status

- exact page: `site/component/surface/surface-foundation.html`
- catalog route: `site/index.html#components`
- QA mismatch count: `0`
- `sonar5.css` diff: 없음
- local server: 사용하지 않음

## Current QA refresh

- QA issue: `site/issue-20260519-1411-surface-current-qa-refresh`
- Figma evidence: `9089:2` root 안의 sibling nodes `12480:5075`, `17040:858`, `12481:5085`, `13091:2226`
- source owner: `site/app.js`
- source helper: `surfaceFoundationHtmlExample()`, `surfaceFoundationPreview()`
- exact page result: light/dark theme 모두 `[data-surface-foundation="overview"]` root, four sibling evidence items, `glass-container` grammar 확인
- catalog route result: `Surface Foundation` link resolves to `component/surface/surface-foundation.html` under `Surface`
- mismatch count: `0`
- `sonar5.css`는 읽기 전용 reference로만 사용했고 수정하지 않았다.

## deferred

- shared semantic surface token이 실제로 존재하는지
- pattern-specific glow/highlight/fill value를 foundation이 공유값처럼 끌어올릴 수 있는지
