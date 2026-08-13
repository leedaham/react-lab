# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/navigation-shell/breadcrumb.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 / breadcrumb 6301:4310`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/breadcrumb.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

breadcrumb

## Figma evidence

- Figma file: `UI-5.1`
- Figma node: `breadcrumb` `6301:4310`
- Figma URL: `https://www.figma.com/design/dodpG7QVPyrxWI1uFjKYrC/UI-5.1?node-id=6301-4310`
- confirmed variant/property 범위: `count=1 | 2 | 3 | 4`
- confirmed child 범위: `breadcrumbItemPrevious`, `breadcrumbItemCurrent`, `Separator` / `chevron_right`
- Figma screenshot 기준 크기: `391 x 196`

## 목적

- GNB 안에서 현재 위치 경로를 표시하는 path display 전용 family다.
- 링크 이동이나 탐색 액션이 아니라 현재 위치를 읽기 위한 표시 용도로만 쓴다.

## 구조 / anatomy

- `Root`
- `breadcrumbItemPrevious`
- `breadcrumbItemCurrent`
- `Separator`

## layer naming rule

- family 이름은 `breadcrumb`으로 잠근다.
- child item 이름은 `breadcrumbItemPrevious`, `breadcrumbItemCurrent`로 잠근다.
- separator는 역할 기준으로 `Separator`로 읽는다.
- raw icon asset 이름과 raw vector 내부 이름은 breadcrumb 문서의 현재 계약에 포함하지 않는다.

## variant/property naming rule

- 축 이름은 `count`
- current source에서 확인된 값은 `1 | 2 | 3 | 4`
- `count=1`
  - top-level leaf/current-only screen
  - `current page`
- `count=2`
  - child screen
  - `parent > current child`
- `count=3`
  - `first menu > previous page > current page`
- `count=4`
  - `first menu > ... > previous page > current page`
- collapsed `...`는 별도 family가 아니라 `breadcrumbItemPrevious` label override를 사용한다.

## state naming rule

- current source node에는 별도 interactive state axis가 없다.
- breadcrumb는 current spec에서 non-clickable path display로만 기록한다.
- hover, focus, link behavior는 current spec 계약으로 승격하지 않는다.

## 실제 UI recipe

- root height
  - 항상 `24`
- root vertical inset
  - 항상 `py 2`
- item 간 gap
  - 항상 `4`
- separator size
  - 항상 `18 x 18`
- separator asset identity는 항상 `materialiconsoutlined SVG / chevron_right`다.
- separator는 `previous`와 `current` 사이의 path separator role이다.

## GNB compact usage rule

- GNB 안에서 breadcrumb는 one-line compact trail로 유지한다.
- top-level leaf/current-only screen은 항상 `count=1` compact trail을 사용한다.
- child screen은 항상 `count=2`의 `parent > current child`를 사용한다.
- GNB는 breadcrumb item 의미를 새로 만들지 않고 screen context에 맞는 `count`와 item text를 선택한다.
- wrapper는 `content-hug`를 유지하고, 추가 horizontal padding을 넣지 않는다.
- bg/border/chip처럼 독립 tag UI로 재조립하지 않는다.
- `shrink-0`와 `py 2`를 유지해 GNB header line 안에서 vertical center를 맞춘다.

## screen display contract

- top-level leaf/current-only screen
  - `count=1`
  - `current page`
- child screen
  - `count=2`
  - `parent > current child`
- breadcrumb는 expanded parent set이나 emphasized sibling을 path에 포함하지 않는다.
- child screen에서 `count=1 current-only`를 기본값처럼 사용하지 않는다.

## typography rule

- `breadcrumbItemPrevious`
  - 항상 `Pretendard Regular / 14 / 20`
  - letter spacing은 항상 `0`
- `breadcrumbItemCurrent`
  - 항상 `Pretendard Regular / 14 / 20`
  - letter spacing은 항상 `0`
- `breadcrumbItemCurrent`는 절대 weight로 구분하지 않는다.
- `13/17` fallback 조합은 금지한다.
- bold current item은 금지한다.

## color / token rule

- `breadcrumbItemPrevious`
  - `semantic.color.text.helper`
  - current source fallback `#808080`
- `breadcrumbItemCurrent`
  - `semantic.color.interactive.brand.accent`
  - current source fallback `#ff692a`
- `breadcrumbItemCurrent`는 항상 color로만 current를 구분한다.
- `Separator`
  - helper/neutral foreground 계열로 읽는다.
- root는 canonical background, border, shadow를 소유하지 않는다.

## anatomy slot naming rule if needed

- `first menu`, `collapsed`, `previous page`, `current page`는 anatomy slot 이름이 아니라 semantic role이다.
- `first menu`, `collapsed`, `previous page`는 모두 `breadcrumbItemPrevious` base를 공유한다.
- `current page`는 `breadcrumbItemCurrent` base로 표현한다.

## FE handoff note

- FE 구현에서도 breadcrumb는 non-clickable path display로 읽는 편이 안전하다.
- child item을 interactive link component로 바꾸지 않는다.
- `count`는 표시 단계 수를 설명하는 UI property로 읽는다.
- 구현/재구성 시 width는 label 길이에 따라 달라질 수 있으므로 고정 폭으로 잠그지 않는다.
- GNB 안에서 breadcrumb wrapper를 parent line-height나 arbitrary padding으로 다시 키우지 않는다.

## 구현 / HTML 기준

- verified exact page는 `site/component/navigation-shell/breadcrumb.html`이다.
- catalog route는 `site/index.html#components`이다.
- 구현 source는 `site/app.js`의 `breadcrumbHtmlExample()`이며, preview와 HTML code tab이 같은 component body grammar를 사용한다.
- component specimen root는 `data-breadcrumb-stack`을 사용하고, Figma source node `6301:4310`을 `data-node-id`로 남긴다.
- 각 count specimen은 `nav[data-breadcrumb-nav][data-count]` 안의 `ol.breadcrumbs[data-breadcrumb]`로 구현한다.
- `sonar5.css`의 `.breadcrumbs`, `.breadcrumbs > li`, `.breadcrumbs > li:last-child`, `.breadcrumbs-caret` selector를 우선 재사용한다.
- Figma frame spacing, separator icon rendering, exact typography reinforcement는 `site/component-css/component.css`에서 보정한다.
- legacy `.demo-breadcrumb-*` selector는 더 이상 구현 기준이 아니며 source와 generated DOM에서 제거되어야 한다.
- `sonar5.css`는 읽기 전용 product CSS reference이며 이번 구현에서 수정하지 않는다.
- QA 기준 mismatch count는 `0`이며, 확인 evidence는 `site/issue-20260518-1157-breadcrumb-sync/REVIEW.md`에 기록한다.

## implementation / reconstruction proof rule

- `count=1 | 2 | 3 | 4` 중 맞는 축 값을 선택했는지 확인한다.
- child screen에서 `count=2 parent > current child`를 유지하는지 확인한다.
- `breadcrumbItemPrevious`, `breadcrumbItemCurrent`가 모두 `Pretendard Regular 14/20 / letter-spacing 0`인지 확인한다.
- current item이 Bold가 아니고 color로만 구분되는지 확인한다.
- separator가 `18 x 18 materialiconsoutlined SVG / chevron_right`인지 확인한다.

## 라이트 테마 추가 해석

- 본 섹션은 2026-05-04에 확인한 제품 light theme screenshot 기준 보강이다.
- light theme에서도 `count`, `24h`, `py 2`, `separator 18` contract는 바뀌지 않는다.
- `breadcrumbItemPrevious`는 light theme에서 helper gray 계열로 읽고, `breadcrumbItemCurrent`는 accent orange로 유지한다.
- `Separator`도 previous item과 같은 helper/neutral tone으로 읽는다.
- light theme에서도 breadcrumb를 chip, tag, bordered pill로 재조립하지 않는다.
