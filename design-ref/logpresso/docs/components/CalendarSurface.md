# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/supporting/calendarsurface.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `17416:6324`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/CalendarSurface.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=mismatch count 0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

CalendarSurface

## 목적

- `CalendarSurface`는 date picker overlay를 위한 surface/popup pattern이다.
- `CalendarSurface`는 field shell family가 아니다.
- 이 문서는 `CalendarSurface` surface truth와 implementation/reconstruction-critical interior region geometry를 소유한다.

## source boundary note

- current verification page source는 `CalendarSurface`를 `DateInput`, `DateRangeInput`과 분리된 overlay surface로 보여 준다.
- current source 기준 `type=single|multi`는 `monthLayout=single|double`로 정리되었다.
- current source 기준 `DateSelectorHeader`는 preset row를 포함하는 현재 role scope가 accepted truth다.
- current verification page의 `CalendarSurface` section은 light demo card가 아니라 dark overlay verification matrix다.
- 이 dark overlay verification matrix는 source coverage 형태일 뿐이며, 제품이 dark-only라는 뜻은 아니다.
- 구현/재구성에서는 `monthLayout`과 `time` variant coverage를 유지해야 하며, `monthLayout=double, time=true`는 dense overlay composition으로 구현해야 한다.

## surface boundary

- `CalendarSurface`는 항상 popup/overlay shell이다.
- `CalendarSurface`는 date field shell truth를 소유하지 않는다.
- `CalendarSurface`는 date range field shell truth를 소유하지 않는다.
- `CalendarSurface`는 inner supporting/composition truth 전체를 giant primitive처럼 삼키지 않는다.

## 구조 / anatomy

- `SurfaceRoot`
- `DateSelectorHeader`
- `CalendarBodyRow`
- `CalendarColumn`
- `YearMonthNavigation`
- `CalendarGrid`
- `TimeFieldGroup`
- `CalendarFooterActionRow`

## variant/property naming rule

- `monthLayout`: `single | double`
- `time`: `true | false`

## canonical structure rule

- `SurfaceRoot`는 항상 overlay shell이다.
- region order는 항상 `DateSelectorHeader -> CalendarBodyRow -> CalendarFooterActionRow`다.
- `DateSelectorHeader`는 항상 surface 상단 header block이다.
- `monthLayout=single`이면 항상 `CalendarColumn` 하나를 가진다.
- `monthLayout=double`이면 항상 `CalendarColumn` 두 개를 가진다.
- `CalendarBodyRow`는 항상 visible `CalendarColumn`만 담는 중간 body region이다.
- `time=true`이면 각 visible `CalendarColumn` 아래에 `TimeFieldGroup`을 추가한다.
- `time=false`이면 `TimeFieldGroup`을 추가하지 않는다.
- surface 하단에는 항상 `CalendarFooterActionRow`가 붙는다.
- `CalendarSurface` verification sample은 white/local panel 위에 올리는 card가 아니라 source overlay 자체를 바로 보여 준다.

## exact surface rule

- `monthLayout=single`, `time=false`면 `SurfaceRoot` size는 항상 `248 x 348`이다.
- `monthLayout=single`, `time=true`면 `SurfaceRoot` size는 항상 `248 x 446`이다.
- `monthLayout=double`, `time=false`면 `SurfaceRoot` size는 항상 `488 x 348`이다.
- `monthLayout=double`, `time=true`면 `SurfaceRoot` size는 항상 `488 x 446`이다.
- `SurfaceRoot`는 항상 `background semantic.color.surface.container.default / border 1 / radius 8 / shadow/base / p 8 / gap 8`을 유지한다.
- `SurfaceRoot` border token은 항상 `semantic.color.border.default`를 우선한다.
- `shadow/base`는 항상 `0 1px 2px rgba(0,0,0,0.06) + 0 2px 3px rgba(0,0,0,0.10)`이다.
- `monthLayout=double`은 two-column surface arrangement를 뜻하며 selection mode 이름이 아니다.
- `time`은 interaction state가 아니라 visible time block mode를 뜻한다.
- `monthLayout=double`, `time=true`
  - `DateSelectorHeader`는 항상 상단 첫 region으로 온다.
  - `CalendarBodyRow`는 항상 두 개의 `CalendarColumn`을 `gap 8`로 배치한다.
  - 각 `CalendarColumn` width는 항상 `232`다.
  - 각 `CalendarColumn` direct child order는 항상 `YearMonthNavigation -> CalendarGrid -> TimeFieldGroup`이다.
  - 각 `CalendarColumn` direct child gap은 항상 `8`이다.
  - `YearMonthNavigation`은 항상 `232 x 24`다.
  - `CalendarGrid`는 항상 `232 x 240`이다.
  - `TimeFieldGroup`은 항상 `160 x 90`이며 column 하단에서 중앙 정렬된다.
  - `CalendarFooterActionRow`는 항상 마지막 region으로 오고, action을 right-align하며 internal gap `8`을 유지한다.

## visual / color rule

- 이 섹션의 `dark overlay`, `dark bordered`, `dark source` 표현은 current source reading을 설명하는 말이며, light theme 구현에서는 대응 semantic token value를 우선한다.
- `SurfaceRoot`
  - background는 항상 `semantic.color.surface.container.default`를 우선한다.
  - background fallback은 항상 `#070b13`이다.
  - border fallback은 항상 `rgba(126,140,222,0.16)`다.
  - fallback `#070b13`은 dark source reference이며, light theme 구현에서는 semantic token value를 우선한다.
  - overlay shell을 white canvas card로 치환하지 않는다.
- `DateSelectorHeader`
  - `LabelBlock` title은 항상 `Pretendard Bold 12/18 / semantic.color.text.primary / fallback #ebebeb`다.
  - preset button은 filled chip이 아니라 dark bordered compact control이다.
  - preset button label은 항상 `Pretendard Medium 12/18 / semantic.color.text.primary / fallback #ebebeb`다.
  - preset button shell background fallback은 항상 `#070b13`이다.
  - preset button shell border fallback은 항상 `rgba(126,140,222,0.16)`다.
- `YearMonthNavigation`
  - prev/next icon button과 year/month selector button 모두 dark bordered compact control이다.
  - button shell background fallback은 항상 `#070b13`이다.
  - button shell border fallback은 항상 `rgba(126,140,222,0.16)`다.
  - selector label은 항상 `Pretendard Medium 12/18 / semantic.color.text.primary / fallback #ebebeb`다.
- `CalendarGrid`
  - shell은 separate bordered card가 아니다.
  - `CalendarGrid` visual density는 `weekday row gap 8 + date cell wrap width 216 + cell 24 x 24`로 유지한다.
  - weekday label은 항상 `Pretendard Regular 12/18 / semantic.color.text.primary / fallback #ebebeb`다.
  - `past date` foreground는 항상 `semantic.color.text.helper / fallback #808080`이다.
  - default in-range-free current-month `date` foreground는 항상 `semantic.color.text.primary / fallback #ebebeb`다.
  - `selected` state는 항상 accent circular day pill이다.
  - selected day fill fallback은 항상 `#ff692a`다.
  - selected day text fallback은 항상 `#ebebeb`다.
  - `range-start`와 `range-end`는 항상 orange-tinted range background band 위에 circular selected endpoint를 얹는다.
  - range band fill은 항상 `semantic.color.interactive.brand.surface.disabled`를 우선하고 fallback은 항상 `rgba(255,105,42,0.5)`다.
  - `range-start`는 left edge만 full-round cap, `range-end`는 right edge만 full-round cap을 가진다.
- `TimeFieldGroup`
  - time input shell background fallback은 항상 `#070b13`이다.
  - time input shell border fallback은 항상 `rgba(126,140,222,0.16)`다.
  - time value foreground는 helper tier를 유지하고 fallback은 항상 `#808080`이다.
  - `시 / 분 / 초` caption과 colon foreground는 primary tier를 유지하고 fallback은 항상 `#ebebeb`다.
  - bottom action은 underline text action이며 fallback foreground는 항상 `#ff692a`다.
- `CalendarFooterActionRow`
  - row 자체는 dark overlay 안의 action placement만 소유한다.
  - `CancelButton`은 dark bordered compact control이며 background fallback은 항상 `#070b13`, text fallback은 항상 `#ebebeb`다.
  - `ConfirmButton`은 accent filled compact control이며 fill fallback은 항상 `#ff692a`, text fallback은 항상 `#ebebeb`다.
  - `CancelButton`, `ConfirmButton` shell에는 shadow가 없다.
  - footer button을 white default button으로 치환하는 것은 금지한다.

## supporting / composition boundary

- `DateSelectorHeader`
  - 층위: supporting block
  - 현재 role scope에는 `LabelBlock`과 `PresetActionRow`가 함께 포함된다.
  - `DateSelectorHeader`는 surface 상단 header block까지만 소유한다.
  - current source-confirmed `monthLayout=double`, `time=true` variant에서 exact size는 `462 x 20`이다.
  - `DateSelectorHeader`는 항상 `LabelBlock -> PresetActionRow` 좌우 정렬 구조를 가진다.
  - `PresetActionRow` internal gap은 항상 `8`이다.
  - preset button shell은 현재 source 기준 `border 1 / radius 6 / px 7 / py 1 / Pretendard Medium 12/18`을 유지한다.
  - `DateSelectorHeader`와 `PresetActionRow` preset button shell에는 shadow가 없다.
  - `DateSelectorHeader`는 `CalendarGrid`, footer action, field shell truth를 소유하지 않는다.
- `CalendarGrid`
  - 층위: supporting primitive
  - day-of-week row, empty-space treatment, date-cell grid, date-cell selection state를 소유한다.
  - `CalendarGrid` exact outer size는 항상 `232 x 240`이다.
  - `CalendarGrid` shell은 항상 `padding 8 / radius 8`을 유지한다.
  - `CalendarGrid` shell에는 shadow가 없다.
  - weekday row는 항상 `7`개 day label을 `24 x 24` footprint와 `gap 8`로 배치한다.
  - date-cell wrap region은 항상 width `216`, cell gap `8`, cell footprint `24 x 24`를 유지한다.
  - `state=default`는 helper `past date`와 primary current-month `date`만 보인다.
  - `state=selected`는 circular accent day만 보인다.
  - `state=range-start`, `state=range-end`는 orange-tinted range band + accent endpoint pill을 함께 유지한다.
  - `CalendarGrid`는 field shell truth, month navigation truth, footer action을 소유하지 않는다.
- `YearMonthNavigation`
  - 층위: composition pattern
  - prev/next icon button, year selector button, month selector button 관계를 소유한다.
  - `YearMonthNavigation` exact outer size는 항상 `232 x 24`다.
  - layout은 항상 `prev button -> center selector cluster -> next button`의 justify-between row다.
  - prev/next button은 compact boxed control로 유지되고, year/month selector button은 동일 row 안에서 compact dropdown control로 유지된다.
  - `YearMonthNavigation`의 icon button과 selector button shell에는 shadow가 없다.
  - `YearMonthNavigation`는 calendar grid cell state나 field shell truth를 소유하지 않는다.
- `TimeFieldGroup`
  - 층위: composition pattern
  - 시/분/초 field block과 `현재 시각으로 설정` action relationship을 소유한다.
  - `TimeFieldGroup` exact outer size는 항상 `160 x 90`이다.
  - top row는 항상 `HourField -> Colon -> MinuteField -> Colon -> SecondField` 순서를 가진다.
  - top row internal gap은 항상 `8`이다.
  - 각 time input shell width는 항상 `40`, radius는 항상 `8`, border는 항상 `1`, inset은 항상 `px 13 / py 5`다.
  - colon slot footprint는 항상 `4 x 28`이다.
  - bottom action은 항상 top row 아래에 오는 underlined text action이다.
  - `TimeFieldGroup`과 각 time input shell에는 shadow가 없다.
  - `TimeFieldGroup`은 `DateInput`, `DateRangeInput` shell truth를 소유하지 않는다.
- `CalendarFooterActionRow`
  - 층위: usage-level structure
  - `CalendarFooterActionRow`는 항상 surface 하단에 붙는 right-aligned action row다.
  - internal gap은 항상 `8`이다.
  - `CalendarFooterActionRow` row 자체에는 shadow가 없다.
  - `CancelButton`은 dark bordered compact control로 유지되고 shell shadow를 추가하지 않는다.
  - `ConfirmButton`은 accent filled compact control로 유지되고 shell shadow를 추가하지 않는다.
  - `CalendarFooterActionRow`는 `Button` family canonical truth를 다시 정의하지 않는다.

## usage boundary

- [DateInput](DateInput.md)은 single-date field shell을 소유한다.
- [DateRangeInput](DateRangeInput.md)은 paired range field shell을 소유한다.
- `CalendarSurface`는 overlay shell과 source-confirmed interior region geometry를 소유한다.
- preset/header/footer/grid/time block을 하나의 giant primitive로 다시 합치지 않는다.
- source-confirmed icon/label slot이 없는 세부 표현을 임의로 추가하는 것은 금지한다.
- 구현/재구성에서 `CalendarSurface`를 white sample card나 pale neutral panel로 바꾸는 것은 금지한다.

## forbidden rule

- `CalendarSurface`를 giant `Datepicker` family canonical owner로 사용하는 것은 금지한다.
- `CalendarSurface`가 `DateInput`, `DateRangeInput` shell truth를 소유하는 것처럼 문서화하는 것은 금지한다.
- `CalendarSurface`가 `CalendarGrid`, `YearMonthNavigation`, `TimeFieldGroup`, `DateSelectorHeader`를 하나의 primitive처럼 다시 평탄화하는 것은 금지한다.
- `monthLayout=single|double`를 selection mode나 single/range family axis로 재해석하는 것은 금지한다.
- `time=true|false`를 interaction state처럼 설명하는 것은 금지한다.
- `CalendarSurface`를 shell-only note 수준으로 축소해 region geometry를 비워 두는 것은 금지한다.

## implementation / reconstruction proof rule

- `CalendarSurface`가 field family가 아니라 surface/popup pattern으로 유지되는지 확인한다.
- property naming이 항상 `monthLayout | time`인지 확인한다.
- `type=single|multi`를 오래된 property로 유지하지 않았는지 확인한다.
- `monthLayout=double`이 month layout을 뜻하지 single/range selection mode를 뜻하지 않는지 확인한다.
- `monthLayout=double`, `time=true` surface size가 `488 x 446`인지 확인한다.
- `SurfaceRoot`에만 shadow/base가 있고 `DateSelectorHeader`, `YearMonthNavigation`, `CalendarGrid`, `TimeFieldGroup`에는 shadow가 없다는 점을 유지하는지 확인한다.
- `SurfaceRoot`가 semantic surface shell로 유지되고 white/generic card로 치환되지 않았는지 확인한다.
- dark fallback value를 dark-only 제품 규칙이나 새 palette로 승격하지 않았는지 확인한다.
- region order가 `DateSelectorHeader -> CalendarBodyRow -> CalendarFooterActionRow`인지 확인한다.
- `CalendarBodyRow`가 `CalendarColumn` 두 개를 `gap 8`로 배치하는지 확인한다.
- 각 `CalendarColumn`이 `232` width와 `YearMonthNavigation -> CalendarGrid -> TimeFieldGroup` 순서를 유지하는지 확인한다.
- `DateSelectorHeader` current role scope가 preset row를 포함하는 supporting header block으로 유지되는지 확인한다.
- `DateSelectorHeader` exact size가 `462 x 20`, `PresetActionRow` gap이 `8`인지 확인한다.
- preset button이 dark bordered compact control로 유지되고 white chip이나 solid accent chip으로 변형되지 않았는지 확인한다.
- `YearMonthNavigation`이 `232 x 24`, `CalendarGrid`가 `232 x 240`, `TimeFieldGroup`이 `160 x 90`인지 확인한다.
- `YearMonthNavigation`의 prev/next, year/month selector가 dark bordered compact control을 유지하는지 확인한다.
- `CalendarFooterActionRow` row 자체와 `CancelButton`, `ConfirmButton` shell 모두에 shadow를 추가하지 않았는지 확인한다.
- `CancelButton`이 dark bordered compact control이고 `ConfirmButton`이 accent filled compact control인지 확인한다.
- `CalendarGrid default`가 helper `past date` + primary current-month date hierarchy를 유지하는지 확인한다.
- `CalendarGrid selected`가 accent circular day pill을 유지하는지 확인한다.
- `CalendarGrid range-start`, `range-end`가 orange-tinted range band와 capped endpoint pill을 유지하는지 확인한다.
- `TimeFieldGroup`이 dark bordered time fields + helper value + primary caption + accent underlined action을 유지하는지 확인한다.
- `CancelButton`이 dark bordered compact control이고 `ConfirmButton`이 accent filled compact control인지 확인한다.
- `CalendarGrid`, `YearMonthNavigation`, `TimeFieldGroup`, `CalendarFooterActionRow`가 giant `Datepicker` core truth로 승격되지 않았는지 확인한다.
- `CalendarFooterActionRow`가 surface 하단 composition으로만 읽히는지 확인한다.

## UI-5.1 implementation sync record

- sync date: `2026-05-15`
- Figma node: `17416:6324`
- implemented HTML owner: `site/app.js`
- implemented CSS owner: `site/component-css/component.css`
- reused product selector grammar: `.datetime`, `.datetime-body`, `.datetime-footer`, `.btn`, `.btn-default`, `.btn-primary`, `.btn-xs`, `.input`
- `sonar5.css`는 reference로만 사용했고 수정하지 않았다.
- exact component page QA: `component/supporting/calendarsurface.html`
- catalog route QA: `index.html#components`
- QA result: mismatch count `0`
- confirmed rendered coverage: `monthLayout=single|double`, `time=false|true`, `248x348`, `248x446`, `488x348`, `488x446`
