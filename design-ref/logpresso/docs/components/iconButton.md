# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/actions/iconbutton.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/iconButton.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

iconButton

## 목적

- `iconButton`은 label 없이 icon 중심 action을 수행하는 `Button`의 공식 sibling family다.
- 현재 source 기준 canonical visual recipe는 `Icon + DropdownIndicator`를 가진 compact utility control이다.
- current visible matrix는 attached form만 직접 노출한다.

## Figma evidence

- Figma file: `UI-5.1`
- scope anchor: `4:657`
- component node: `16508:3064`
- representative node: `16508:3083` small default
- confirmed variants: `default`, `primary`, `text`, `danger`
- confirmed sizes: `large`, `medium`, `small`, `xsmall`
- confirmed states for Forge component variants: `default`, `hover`, `pressed`, `disabled`, `loading`
- excluded from Forge component variants: `focus-visible` is system-level interaction policy only and must not be created as an Icon Button state or `FocusRing` child.
- confirmed recipe: attached `Icon + DropdownIndicator`와 single icon-only usage를 구분한다.
- not confirmed: GNB utility `24 x 24` usage를 iconButton family canonical truth로 승격하는 것

## 구현 기준

- exact page: `../../../site/component/actions/iconbutton.html`
- catalog route: `../../../site/index.html#components`
- source helper: `../../../site/app.js`의 `iconButtonDemo()`, `iconButtonDocExamples`, `renderIconButtonDocumentationPage()`
- generated owner: `../../../site/generate-component-pages.mjs`
- root selector / data attribute: `.btn` with `aria-label`
- base CSS selector from `sonar5.css`: `.btn`, `.btn-default`, `.btn-primary`, `.btn-text`, `.btn-danger`, `.btn-icon`, `.btn-icon-only`, `.btn-xs`, `.btn-md`, `.btn-lg`
- gap CSS selector from `component-css/component.css`: `.btn.btn-icon[aria-label][aria-haspopup="menu"]`, `.btn.btn-icon-only`, `.btn.is-hover`, `.btn.is-pressed`
- HTML handoff policy: 긴 HTML snippet은 이 문서에 복사하지 않는다. 실제 DOM, class, data attribute는 exact page에서 확인한다.

## QA status

- QA issue: `../../../site/issue-20260515-1002-button-iconbutton-sonar5-sync/REVIEW.md`
- exact page checked: `../../../site/component/actions/iconbutton.html`
- catalog route checked: `../../../site/index.html#components`
- Figma-to-HTML mismatch count: `0`
- CSS lock: `sonar5.css`는 수정하지 않았고 `.btn` 계열 selector를 읽기 전용 base로 재사용한다.
- remaining uncertainty: 전체 public validation의 기존 missing stylesheet resource mismatch는 iconButton 본체 mismatch가 아니다.

## 구조 / anatomy

- `Root`
- `Icon`
- `DropdownIndicator`
- `LoadingIndicator`

## layer naming rule

- role-based rename은 component가 직접 소유한 slot/wrapper 레이어에만 적용한다.
- `arrow_drop_down`, `arrow_drop_up`, `Spinner`, `focus-ring`, `button` 같은 asset/local 이름은 iconButton 내부 기준 이름으로 쓰지 않는다.
- 권장 이름은 `Icon`, `DropdownIndicator`, `LoadingIndicator`, `Root`다. `FocusRing`은 Forge Icon Button component 내부 이름으로 쓰지 않는다.
- raw icon asset 이름과 raw vector 내부는 iconButton naming cleanup의 기본 범위가 아니다.

## variant/property naming rule

- `variant`: `default | primary | text | danger`
- `size`: `large | medium | small | xsmall`
- `state`: `default | hover | pressed | disabled | loading`
- 기본 권장 size는 `small`이다.
- compact step 표준 이름은 `small`로 통일한다.

## 실제 UI recipe

- `iconButton`은 content-width `inline-flex` compact action control로 읽는다.
- canonical outer size는 source variant axis를 기준으로 아래처럼 잠근다.
  - `large`: icon-only `42 x 42`, dropdown `62 x 42`
  - `medium`: icon-only `30 x 30`, dropdown `46 x 30`
  - `small`: icon-only `24 x 24`, dropdown `40 x 24`
  - `xsmall`: icon-only `20 x 20`, dropdown `38 x 20`
- canonical gap은 아래처럼 잠근다.
  - `large`: `8`
  - `medium`: `4`
  - `small`: `2`
  - `xsmall`: `2`
- canonical radius는 아래처럼 잠근다.
  - `large | medium | small`: `8`
  - `xsmall`: `6`
- canonical border는 `1px solid`다.
- 기본 정렬은 `inline-flex`, `items-center`, `justify-start`가 아니라 slot content width 그대로를 유지하는 `items-center` recipe로 읽는다.
- current visible matrix의 canonical recipe는 `Icon + DropdownIndicator`다.

## sizing / inset implementation rule

- 현재 iconButton source는 `1px border`를 가진 auto layout frame이며, source inspection에서는 `stroke included`로 읽는 것이 가장 안전하다.
- 따라서 구현 spec은 `padding 숫자만`으로 width/height를 설명하지 않고, `outer size + border included + inner inset` 모델로 적는다.
- size별 measured inset은 icon-only source 기준 아래처럼 읽는다.
  - `large`: `p 11`
  - `medium`: `p 5`
  - `small`: `p 3`
  - `xsmall`: `p 2`
- compact size에서는 `padding만 맞추고 outer size를 추론`하지 않는다.
- 구현 우선순위는 `outer width/height 고정 -> border 1px 포함 -> inner inset 구현`이다.

## state naming rule

- `hover`, `pressed`는 component preview state로 본다. `focus-visible`은 component variant가 아니라 system-level interaction rule로만 다룬다.
- `disabled`와 `loading`은 runtime state로 문서화한다.
- source state axis 안에 `loading`이 남아 있어도, 문서와 FE handoff에서는 runtime state라고 명시한다.

## slot visibility rule

- canonical attached form은 `Icon + DropdownIndicator`다.
- Current Forge source exposes `IconSlot#786:145` as an `INSTANCE_SWAP` component property for icon glyph changes. Consumers that need `add`, `chevron_left`, `chevron_right`, `close`, or another supported glyph must set the Icon Button instance property instead of overlaying a separate icon layer.
- `loading`에서는 `Icon`이 `LoadingIndicator`로 치환된다.
- current Forge production에서는 dropdown iconButton의 loading state를 만들지 않는다. `State=loading`은 `Has dropdown=false` 조합에만 존재한다.
- Forge Icon Button component 안에 `focus-visible` preview 구조나 `FocusRing` child를 만들지 않는다.

## state delta rule

- `default`: variant별 기본 surface와 content color를 쓴다.
- `hover`
  - hover surface token과 `shadow/base`를 추가한다.
- `pressed`
  - pressed surface overlay를 추가한다.
  - `shadow/inner`를 추가한다.
  - visible border는 accent 계열로 바뀐다.
  - `DropdownIndicator`는 `arrow_drop_up` 방향으로 바뀐다.
- `disabled`: disabled surface/content/border token으로 전환하고 interactive shadow를 제거한다.
- `focus-visible`
  - Forge Icon Button component variant로 만들지 않는다.
  - `FocusRing` child를 만들지 않는다.
  - system-level focus-visible rule에서 별도로 정의한다.
- `loading`
  - `LoadingIndicator`를 앞자리에 노출한다.
  - current Forge production에서는 `hasDropdown=true` loading 조합을 생성하지 않는다.

## color / token rule

- Active Forge Figma production에서는 semantic token을 iconButton component에 바인딩하지 않는다. Semantic color는 component coverage와 primitive color 결정이 끝난 뒤 final integration 직전에 정리한다.
- iconButton surface recipe는 Button family와 같은 primitive recipe를 따른다. Text node는 없지만 `Icon`, `DropdownIndicator`, `LoadingIndicator` foreground content는 dark-mode 기준 `color/neutral/*`만 사용한다.
- `default`
  - default surface/border/content: `color/slate/900`, `color/slate/800`, `color/neutral/50`
  - hover surface/border/content: `color/slate/800`, `color/slate/700`, `color/neutral/50`
  - pressed surface/border/content: `color/slate/700`, `color/brand/500`, `color/neutral/50`
  - disabled surface/border/content: `color/slate/950`, `color/slate/800`, `color/neutral/500`
  - loading surface/border/content: `color/slate/900`, `color/slate/800`, `color/neutral/50`
- `primary`
  - default surface/border/content: `color/brand/500`, `color/brand/500`, `color/neutral/50`
  - hover surface/border/content: `color/brand/600`, `color/brand/600`, `color/neutral/50`
  - pressed surface/border/content: `color/brand/700`, `color/brand/700`, `color/neutral/50`
  - disabled surface/border/content: `color/brand/900`, `color/brand/800`, `color/neutral/500`
  - loading surface/border/content: `color/brand/500`, `color/brand/500`, `color/neutral/50`
- `text`
  - default surface/border/content: transparent, transparent, `color/neutral/200`
  - hover surface/border/content: `color/slate/900`, `color/slate/900`, `color/neutral/50`
  - pressed surface/border/content: `color/slate/800`, `color/slate/800`, `color/neutral/50`
  - disabled surface/border/content: transparent, transparent, `color/neutral/500`
  - loading surface/border/content: transparent, transparent, `color/neutral/200`
- `danger`
  - default surface/border/content: `color/red/600`, `color/red/600`, `color/neutral/50`
  - hover surface/border/content: `color/red/700`, `color/red/700`, `color/neutral/50`
  - pressed surface/border/content: `color/red/800`, `color/red/800`, `color/neutral/50`
  - disabled surface/border/content: `color/red/900`, `color/red/800`, `color/neutral/500`
  - loading surface/border/content: `color/red/600`, `color/red/600`, `color/neutral/50`

## active Figma rebuild record

- 2026-06-19 correction: Icon Button은 Button처럼 단일 component set으로 관리한다.
- Current Icon Button component set: `Icon Button` `162:562`.
- Current variant axes: `Size=XSmall|Small|Medium|Large`, `Variant=Default|Primary|Text|Danger`, `State=default|hover|pressed|disabled|loading`, `Has dropdown=true|false`.
- Current variant count: `144`.
- Current removed combination: `State=loading` with `Has dropdown=true` is not present.
- Current component set layout: size groups are stacked vertically in order `XSmall`, `Small`, `Medium`, `Large`. Inside each size group, `State` runs vertically and `Variant + Has dropdown` pairs run horizontally.
- Current icon swap property: `IconSlot#786:145`, backed by local glyph components `IconButtonGlyph / default` `786:3481`, `IconButtonGlyph / add` `786:3484`, `IconButtonGlyph / chevron_left` `786:3487`, `IconButtonGlyph / chevron_right` `786:3490`, and `IconButtonGlyph / close` `807:8300`.
- Current slot binding rule: every non-loading `Icon Button` variant uses an `IconButtonGlyph / default` instance as the `Icon` child with `componentPropertyReferences.mainComponent=IconSlot#786:145`. Loading variants do not expose `Icon`; they expose `LoadingIndicator`.
- Current consumer rule: `Transfer Item` remove action and `Transfer` move actions use direct `Icon Button` instances with `IconSlot` overrides. `Transfer Item Action`, `Transfer Move Button`, local overlay icons, and helper-wrapper exceptions are obsolete and invalid.
- Current icon rule: `Icon`, `DropdownIndicator`, and `LoadingIndicator` are SVG nodes created from local Material Design Icons outlined assets. Text glyphs or fake spinner placeholders are invalid.
- Current composition rule: when a consumer such as `TabAdd` needs a different icon inside Icon Button, use `IconSlot` instance swap on the Icon Button instance. Do not hide source Icon and overlay a separate glyph.
- Current primary rule: content over `color/brand/500`, `color/brand/600`, and loading `color/brand/500` is `color/neutral/50`. Primary disabled surface stays inside the brand family with `color/brand/900` fill and `color/brand/800` stroke.
- Current danger rule: danger disabled surface stays inside the red family with `color/red/900` fill and `color/red/800` stroke.
- Required QA before reporting Icon Button work complete: single `Icon Button` component set inventory `1`, expected variant count `144`, non-loading IconSlot wiring mismatch `0`, non-loading icon size mismatch `0`, icon-only non-square mismatch `0`, foreground non-neutral `0`, primary non-disabled content not neutral/50 `0`, primary disabled non-brand surface `0`, danger disabled non-red surface `0`, dropdown loading variant `0`, paint fallback mismatch `0`, component-level `focus-visible` `0`, `FocusRing` `0`, component set overflow `0`, missing dropdown indicator `0`, missing loading indicator `0`, fake text icon `0`, SVG wrapper fill artifact `0`.

## icon rule

- icon source direction은 Material Icons 계열로 유지한다.
- family canonical `Icon`, `DropdownIndicator` asset family는 항상 `materialiconsoutlined SVG`다.
- canonical `Icon` size는 모든 product UI control size에서 `16 x 16`이다.
- `DropdownIndicator`도 `16 x 16`을 사용한다.
- `20px+` icon은 upload illustration, empty state, avatar/logo/status artwork처럼 비컨트롤 아이콘일 때만 허용한다.
- icon과 indicator는 같은 vertical center line에 정렬한다.
- indicator direction
  - `default | hover | disabled | loading`: `arrow_drop_down`
  - `pressed`: `arrow_drop_up`

## Tailwind mapping rule

- 구현 우선순위는 `outer size exact -> border included -> inner inset 구현`이다.
- foundation sibling component인 iconButton은 width/height와 compact inset에서 arbitrary value 사용을 허용한다.
- icon-only 권장 클래스
  - `large`: `h-[42px] w-[42px] p-[11px] rounded-lg`
  - `medium`: `h-[30px] w-[30px] p-[5px] rounded-lg`
  - `small`: `h-6 w-6 p-[3px] rounded-lg`
  - `xsmall`: `h-5 w-5 p-[2px] rounded-md`
- dropdown 권장 클래스
  - `large`: `h-[42px] w-[62px] p-[11px] gap-2 rounded-lg`
  - `medium`: `h-[30px] w-[46px] p-[5px] gap-1 rounded-lg`
  - `small`: `h-6 w-10 p-[3px] gap-[2px] rounded-lg`
  - `xsmall`: `h-5 w-[38px] p-[2px] gap-[2px] rounded-md`
- focus-visible wrapper
  - Forge Icon Button component에서는 생성하지 않는다.
  - system-level focus-visible rule에서 별도로 정의한다.
- `gap`, `radius`는 가능한 Tailwind scale을 쓰고, `outer width/height`와 compact inset은 exact value를 우선한다.

## 사용해야 하는 경우

- label 없는 compact action이 필요할 때
- Button과 같은 variant/state vocabulary를 유지하면서 icon 중심 control이 필요할 때
- `iconButtonGroup` 같은 grouped composition 안의 child control이 필요할 때
- attached dropdown affordance가 필요한 compact utility control이 필요할 때

## 사용하지 말아야 하는 경우

- label이 필요한 일반 액션 버튼인 경우
  - 이 경우는 `Button` family를 우선 사용한다.
- 현재 source와 다른 별도 icon-only taxonomy를 빠르게 만들려는 경우

## usage-level boundary

- GNB 안의 trailing utility action은 outer box visibility와 cluster alignment를 [GNB.md](GNB.md)가 직접 소유한다.
- `iconButton` family canonical source는 `Has dropdown=false` icon-only 정사각형 control과 `Has dropdown=true` attached dropdown control을 모두 포함한다.
- GNB utility `24 x 24` usage는 `iconButton` family canonical source와 동일하지 않다.
- GNB utility `24 x 24` usage를 `iconButton` family canonical truth로 승격하는 것은 금지한다.
- 따라서 GNB usage에서는 `iconButton` family의 dropdown attached box를 자동 적용하지 않는다.
- GNB utility action 조립에서는 family canonical attached slot보다 parent shell이 소유하는 `24 x 24` visible boxed control을 우선한다.
- shell/navigation context 안 utility action은 parent shell의 usage-level fidelity를 먼저 따른다.
- GNB right-side utility control은 항상 visible boxed control grammar를 사용한다.
- GNB right-side utility control을 bare glyph-only action으로 축소하는 것은 금지한다.
- GNB right-side utility control의 `24 x 24`는 outer control box이고, inner glyph는 `18 x 18` optical rule로 읽는다.
- GNB right-side utility control outer surface는 항상 `semantic.color.surface.container.default`다.
- GNB right-side utility control outer surface fallback은 항상 `#070b13`이다.
- GNB right-side utility control outer border는 항상 `semantic.color.border.interactive.default`다.
- GNB right-side utility control outer border fallback은 항상 `rgba(126,140,222,0.16)`이다.
- GNB right-side utility control glyph foreground는 항상 `semantic.color.text.primary`다.
- GNB right-side utility control glyph foreground fallback은 항상 `#ebebeb`이다.
- GNB source 기준 `GlobalSearch`, `UserConsole`, `TrailingUtilityAction`은 `single Icon only` boxed control이다.
- GNB source 기준 `GlobalSearch`에 `DropdownIndicator`를 추가하는 것은 금지한다.
- 이 grammar는 `SNBToggle`에 적용하지 않는다.
- 이 grammar는 multicolor app/category icon family에 적용하지 않는다.
- GNB utility `24 x 24` usage로 iconButton family canonical truth를 다시 쓰는 것은 금지한다.
- GNB utility/common icon usage는 multicolor app/category icon family와 같은 grammar로 읽지 않는다.
- `AppNavButton`의 `CategoryIcon`이나 SNB top-level category/menu icon-bearing row는 `iconButton` family usage로 환원하지 않는다.

## group relationship

- `iconButtonGroup`은 `iconButton` child만 반복하는 same-family composition이다.
- `iconButtonGroup`의 seam/radius/count truth는 [iconButtonGroup.md](iconButtonGroup.md)가 소유한다.
- `iconButtonGroup` current grouped sample child form은 `single Icon only / 24 x 24 / p 3 / Icon 16 / no DropdownIndicator` grouped usage sample이다.
- grouped usage sample은 `iconButton` family canonical small icon-only `24 x 24` truth와 dropdown `40 x 24` truth를 절대 덮지 않는다.
- group usage가 canonical small icon-only/dropdown truth를 덮어쓰는 것은 금지한다.

## dropdown example boundary

- `button + dropdownList example`은 example-only composition naming이다.
- example 안의 expanded iconButton sample은 example-only composition truth다.
- example 안의 iconButton trigger는 `iconButton` family canonical truth를 유지한 채 attached dropdown surface와 짝을 이룬다.
- example 안의 `dropdownList` surface는 [dropdownList.md](dropdownList.md)가 소유한다.
- example source에서 보이는 trigger width, top offset, left alignment, attached pairing 방식은 example composition truth일 뿐이고 `iconButton` family canonical truth를 덮지 않는다.
- example source에서 보이는 plain-row dropdown pairing을 `iconButton` family required pairing rule로 승격하는 것은 금지한다.

## 예외 처리 규칙

- runtime exception: `loading`은 source preview 축에 남아 있어도 runtime state로 기록

## 관련 backlog / deferred 항목

- [Button 파생 family taxonomy 정리](../backlog/button-family-boundary-%ED%99%95%EC%9D%B8.md)
- [Token/FE 정렬 검증](../backlog/token-fe-%EC%A0%95%EB%A0%AC-%EA%B2%80%EC%A6%9D.md)

## FE handoff note

- 공용 prop vocabulary는 `variant`, `size`, `disabled`, `loading` 중심으로 읽는 편이 안전하다.
- `state` 전체를 runtime prop으로 그대로 옮기지 않는다.
- Tailwind CSS 기준에서는 slot visibility와 state layer를 분리해 관리하는 편이 안정적이다.
- grouped composition에서는 seam/radius 책임을 group root가 소유하고, child `iconButton`은 자기 고유 vocabulary만 유지한다.
- `iconButtonGroup`은 `iconButton`만 반복하는 composition family로 문서화한다.
- non-semantic alias token은 지금 stage에서 숨기지 않고, implementation note와 cleanup backlog에 함께 남긴다.

## icon / typography note if relevant

- 아이콘 기준은 Material Icons 계열을 우선 참고한다.
- 기본 권장 size는 `small`이다.
- 기본 폰트 기준은 Pretendard지만, iconButton 자체는 label을 기본 전제로 하지 않는다.

## implementation / reconstruction proof rule

- family canonical small outer size가 icon-only `24 x 24`, dropdown `40 x 24`인지 확인한다.
- small inset이 `p 3`, gap이 `2`, icon/indicator가 `16`인지 확인한다.
- GNB utility `24 x 24` usage와 family canonical dropdown truth가 섞이지 않았는지 확인한다.
- `button + dropdownList example`의 pairing truth가 `iconButton` family canonical truth를 덮어쓰지 않았는지 확인한다.
- `iconButtonGroup` grouped usage sample이 `single Icon only / 24 x 24 / no DropdownIndicator`를 유지하되 family canonical attached truth를 덮지 않았는지 확인한다.
- `iconButtonGroup`에서 seam/radius를 group doc가 소유하고 child `iconButton` truth를 다시 쓰지 않았는지 확인한다.
