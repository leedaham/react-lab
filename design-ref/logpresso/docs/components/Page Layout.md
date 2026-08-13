# Page Layout

## AI Contract

- status: `blocked`
- exactHtml: `source required`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `source required`
- baseCss: `source required`
- gapCss: `none documented`
- sourcePointer: `ui/docs/components/Page Layout.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=blocked`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

## 목적

- `Page Layout`은 제품 화면의 최상위 shell region을 배치하는 page-level composition이다.
- `Page Layout`은 `GNB`, `SNB`, `Action Bar`, content surface, optional footer/status region의 placement contract를 소유한다.
- child component의 visual recipe와 interaction state는 각 child 문서가 소유한다.

## 문서화 대상 범위

- page root
- global header slot
- side navigation slot
- main content region
- optional page header / action bar region
- optional footer/status region
- responsive collapse boundary

## core anatomy

- `PageRoot`
- optional `GnbSlot`
- optional `SnbSlot`
- `MainRegion`
- optional `PageHeader`
- optional `ActionBarSlot`
- `ContentRegion`
- optional `FooterRegion`

## variant / property naming rule

- `shell`
  - `none`
  - `gnb`
  - `gnb-snb`
- `contentWidth`
  - `fluid`
  - `contained`
- `density`
  - `default`
  - `compact`
- `scrollMode`
  - `page`
  - `content`

## layout 규칙

- `PageRoot`는 viewport 또는 parent app frame을 채운다.
- `GnbSlot`은 top-level horizontal shell이고 [GNB.md](GNB.md)가 visual truth를 소유한다.
- `SnbSlot`은 left-side navigation rail이고 [SNB.md](SNB.md)가 visual truth를 소유한다.
- `MainRegion`은 shell을 제외한 나머지 area를 소유한다.
- `PageHeader`는 title, breadcrumb summary, local description 같은 page-level heading을 담을 수 있다.
- `ActionBarSlot`은 page-local actions/filter/search를 담으며 [Action Bar.md](Action%20Bar.md)를 참조한다.
- `ContentRegion`은 table, form, list, section, card 같은 page body composition을 담는다.
- `FooterRegion`은 pagination/status/action summary 같은 bottom utility를 담을 수 있다.

## shell background ownership

- `Page Layout`은 shell region placement를 소유하지만 shell visual fill을 소유하지 않는다.
- `PageRoot`, `GnbSlot`, `SnbSlot`, `[data-screen-shell]`, `[data-screen-shell-body]`는 structural wrapper다. 이 wrapper들은 generated background color, background image, gradient, tint, glass, blur, shadow를 소유하지 않는다.
- GNB/SNB의 시각 분리는 [GNB.md](GNB.md)와 [SNB.md](SNB.md)의 locked border/divider가 소유한다.
- Product screen background는 `MainRegion` / `ContentRegion` / `[data-screen-workspace]` 또는 그 내부 canvas에서만 시작한다.
- Product screen background asset, fallback canvas, gradient, tint, glass effect가 GNB 48px row, SNB 200px rail, SNB app area 40px row 뒤에 보이면 invalid output이다.
- Raw computed background가 `transparent`인 것만으로 통과하지 않는다. Screenshot/composited visual에서 GNB/SNB/SNB app area가 독립된 header bar, left rail panel, app area panel처럼 읽히면 실패다.
- CSS source에 `[data-screen-shell]` 또는 `[data-screen-shell-body]` background가 있더라도, 제품 화면 생성 source truth로 승격하지 않는다. App shell wrapper는 paintless structural layer로 해석한다.
- `site/screen-css/product-screen-background.css`는 product workspace/canvas background owner로만 읽는다. Shell wrapper나 GNB/SNB visual fill owner로 읽지 않는다.

## standalone / mockup 적용 규칙

- `standalone`은 파일 구조, 배포 단위, 정적 실행 방식의 독립을 뜻한다.
- `standalone`은 `Page Layout` child component contract에서 독립한다는 뜻이 아니다.
- standalone dashboard, reference screen, 별도 사이트도 `shell=gnb` 또는 `shell=gnb-snb`를 쓰면 [GNB.md](GNB.md), [SNB.md](SNB.md), [Action Bar.md](Action%20Bar.md)의 child visual truth를 그대로 따른다.
- mockup shell을 새 class namespace로 구현할 수는 있지만, slot order, state naming, size, icon, typography, border, divider contract는 child component 문서를 우선한다.
- component contract를 구현할 수 없으면 임의 대체하지 않고 `DESIGN.md` 또는 `DEVLOG.md`의 `오픈 이슈`에 기록한다.

## spacing / scrolling

- shell spacing은 page-level layout이 소유하고 child component 내부 spacing을 덮어쓰지 않는다.
- `shell=gnb-snb` 제품 화면에서 `MainRegion` / `ContentRegion`은 SNB 오른쪽 divider에 붙지 않는다.
- compact density의 기본 workspace outer inset은 `16px` top/right/bottom/left다.
- SNB 오른쪽 divider와 첫 functional content surface 사이에는 최소 `16px` horizontal inset을 유지한다.
- 첫 content가 `Table`, `List`, `Section Container`, `Dashboard grid`처럼 viewport 폭을 많이 쓰는 surface여도 outer workspace inset은 제거하지 않는다.
- `ContentRegion` 내부 child component의 padding을 키워서 outer inset을 흉내 내지 않는다. Outer inset은 page-level layout이 소유한다.
- `scrollMode=page`에서는 전체 page가 스크롤된다.
- `scrollMode=content`에서는 GNB/SNB/page header를 고정하고 ContentRegion만 스크롤될 수 있다.
- exact breakpoint 값은 이 문서가 잠그지 않지만, narrow width에서는 SNB collapse 또는 overlay navigation이 먼저 검토된다.

## 사용해야 하는 경우

- GNB/SNB가 있는 제품 화면
- dashboard, table list, settings, detail page 같은 full-page screen
- 다른 AI 에이전트가 화면 골격을 먼저 잡아야 하는 mockup

## 사용하지 말아야 하는 경우

- modal 내부 layout
- popover/drawer 내부 layout
- card 내부 small composition
- standalone component preview

## child family reference

- global header는 [GNB.md](GNB.md)를 사용한다.
- side navigation은 [SNB.md](SNB.md)를 사용한다.
- local action cluster는 [Action Bar.md](Action%20Bar.md)를 사용한다.
- table content는 [Table.md](Table.md)를 사용한다.
- form content는 [Form Layout.md](Form%20Layout.md)를 사용한다.
- repeated item content는 [List.md](List.md)를 사용한다.
- section surface는 [Section-Container.md](Section-Container.md)를 참조한다.

## current spec에서 제외하는 것

- router policy
- authentication guard
- responsive breakpoint exact pixel
- sticky shell implementation detail
- data fetching lifecycle
- screen-specific business order

## implementation / reconstruction 시 반드시 지켜야 하는 규칙

- Page Layout을 child component visual token owner로 사용하지 않는다.
- GNB/SNB/Action Bar를 page layout 안에 배치하되 각 child의 height, icon, typography, state를 바꾸지 않는다.
- content body가 table인지 form인지 list인지 먼저 결정하고 해당 component 문서를 읽는다.
- page title/header와 Action Bar를 같은 slot으로 섞지 않는다.
- modal/drawer/popover 내부에 Page Layout을 중첩하지 않는다.
- `Dashboard` 같은 pattern 문서가 `source order`를 제공하면, Page Layout만 읽고 shell 구현을 끝내지 않는다.
- implementation 완료 전 `GNB`/`SNB` child document 적용 여부를 component usage ledger로 기록한다.

## pending / later decision log

- exact responsive breakpoint token
- fixed header / fixed side nav variants
- footer region의 canonical child set

## 라이트 테마 추가 해석

- light theme에서는 page canvas를 white/light neutral로 읽고, shell과 content boundary는 subtle divider와 surface hierarchy로 나눈다.
- dark fallback canvas를 light theme에 강제하지 않는다.
