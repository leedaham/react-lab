# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/actions/button.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Button.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

Button

## 목적

- 텍스트 기반 액션을 수행하는 기본 버튼 family다.
- current visible matrix는 `hasDropdown` 조합과 state/size/variant를 다룬다.
- 파생 사용 예시는 `dropdownbutton`처럼 존재할 수 있지만, core starting family는 `Button`이다.
- 공식 sibling family는 `iconButton`이다.

## Figma evidence

- Figma file: `UI-5.1`
- scope anchor: `4:657`
- component node: `215:5886`
- representative nodes: `4357:23269` small default, `9291:9583` small dropdown default
- confirmed variants: `default`, `primary`, `text`, `danger`
- confirmed sizes: `large`, `medium`, `small`, `xsmall`
- confirmed states for Forge component variants: `default`, `hover`, `pressed`, `disabled`, `loading`
- excluded from Forge component variants: `focus-visible` is system-level interaction policy only and must not be created as a Button state or `FocusRing` child.
- confirmed axis: `hasDropdown`
- not confirmed: Figma 근거 없는 group active state나 Button 외부 composition behavior

## 구현 기준

- exact page: `../../../site/component/actions/button.html`
- catalog route: `../../../site/index.html#components`
- source helper: `../../../site/app.js`의 `buttonDemo()`, `buttonDocExamples`, `renderButtonDocumentationPage()`
- generated owner: `../../../site/generate-component-pages.mjs`
- root selector / data attribute: `.btn`
- base CSS selector from `sonar5.css`: `.btn`, `.btn-default`, `.btn-primary`, `.btn-text`, `.btn-danger`, `.btn-xs`, `.btn-md`, `.btn-lg`, `.btn-icon`
- gap CSS selector from `component-css/component.css`: `.btn`, `.btn[aria-haspopup="menu"]`, `.btn.is-hover`, `.btn.is-pressed`
- HTML handoff policy: 긴 HTML snippet은 이 문서에 복사하지 않는다. 실제 DOM, class, data attribute는 exact page에서 확인한다.

## QA status

- QA issue: `../../../site/issue-20260515-1002-button-iconbutton-sonar5-sync/REVIEW.md`
- exact page checked: `../../../site/component/actions/button.html`
- catalog route checked: `../../../site/index.html#components`
- Figma-to-HTML mismatch count: `0`
- CSS lock: `sonar5.css`는 수정하지 않았고 `.btn` 계열 selector를 읽기 전용 base로 재사용한다.
- remaining uncertainty: 전체 public validation의 기존 missing stylesheet resource mismatch는 Button 본체 mismatch가 아니며, Button Component.md 계약에는 Figma-confirmed 범위만 기록한다.

## 구조 / anatomy

- `Root`
- `LeadingIcon`
- `Label`
- `TrailingIcon`
- `DropdownIndicator`
- `LoadingIndicator`

## layer naming rule

- Button가 직접 소유하는 slot/wrapper 레이어는 icon file name 대신 역할 기준 이름을 쓴다.
- `add`, `open_in_new`, `arrow_drop_down`, `arrow_drop_up`, `Spinner`, `focus-ring`, `button` 같은 이름은 Button 내부 기준 이름으로 쓰지 않는다.
- current source 기준 canonical visible slot은 `LeadingIcon`, `Label`, `TrailingIcon` 또는 `DropdownIndicator`, `LoadingIndicator`다.
- `Root` 같은 wrapper 이름은 실제로 component가 직접 소유한 wrapper가 있을 때만 쓴다. `FocusRing`은 Forge Button component 내부 이름으로 쓰지 않는다.
- raw icon asset 이름과 raw vector 레벨은 Button 문서의 기본 관리 범위가 아니다.

## variant/property naming rule

- `variant`: `default | primary | text | danger`
- `size`: `large | medium | small | xsmall`
- `state`: `default | hover | pressed | disabled | loading`
- `hasDropdown`: `true | false`
- current compact operational size는 `small`이다.
- product-system content default size는 `medium` 높이 `30`이다.
- `small` 높이 `24`는 GNB, toolbar, table row, dense filter처럼 compact operational 문맥에서 우선 사용한다.
- header 내부 button은 별도 예외 승인 전까지 `small` 높이 `24`를 compact 기본값으로 사용한다.
- `small`을 모든 Button/Input의 universal default로 승격하지 않는다.
- backgroundless exception은 별도 type을 만들지 않고 `variant=text`로 처리한다.

## 실제 UI recipe

- `Button`은 content-width `inline-flex` 계열 action control로 읽는다.
- canonical outer height는 `size`가 직접 결정한다.
  - `large`: `42`
  - `medium`: `30`
  - `small`: `24`
  - `xsmall`: `20`
- canonical gap은 아래처럼 잠근다.
  - `large | medium`: `8`
  - `small | xsmall`: `4`
- canonical radius는 아래처럼 잠근다.
  - `large | medium | small`: `8`
  - `xsmall`: `6`
- canonical border는 `1px solid`다.
- 기본 정렬은 `inline-flex`, `items-center`, `whitespace-nowrap`로 읽는다.
- current visible matrix의 canonical recipe
  - `hasDropdown=false`
    - `LeadingIcon + Label + TrailingIcon`
  - `hasDropdown=true`
    - `LeadingIcon + Label + DropdownIndicator`

## sizing / padding implementation rule

- 현재 Button source는 `1px border`를 가진 auto layout frame이며, source inspection에서는 `stroke included`로 읽는 것이 가장 안전하다.
- 따라서 구현 spec은 `padding 숫자만`으로 높이를 설명하지 않고, `outer height + 1px border included + inner content inset` 모델로 적는다.
- size별 canonical outer height는 아래 값을 source of truth로 둔다.
  - `large`: `42`
  - `medium`: `30`
  - `small`: `24`
  - `xsmall`: `20`
- size별 canonical inner inset token 값은 아래처럼 읽는다.
  - `large`: `px 16 / py 10`
  - `medium`: `px 12 / py 4`
  - `small`: `px 8 / py 2`
  - `xsmall`: `px 6 / py 0`
- dropdown attached에서는 trailing indicator 공간 때문에 right inset만 더 작아진다.
  - `large`: `pl 16 / pr 10 / py 10`
  - `medium`: `pl 12 / pr 4 / py 4`
  - `small`: `pl 8 / pr 2 / py 2`
  - `xsmall`: `pl 6 / pr 0 / py 0`
- 구현 우선순위는 `outer height 고정 -> border 1px 포함 -> inner inset 구현` 순서다.
- 높이 오차를 피하려면 compact size에서 `padding만 맞추고 height를 추론`하지 않는다.

## state naming rule

- `hover`, `pressed`는 component preview state로 본다. `focus-visible`은 component variant가 아니라 system-level interaction rule로만 다룬다.
- `disabled`와 `loading`은 runtime state로 문서화한다.
- source에서는 `loading`이 state axis에 함께 있어도, 문서와 FE handoff에서는 runtime state임을 분명히 적는다.
- `pressed`는 Button interaction-state name으로 유지한다.
- `pressed`를 `active`로 바꾸는 것은 금지한다.
- `active`, `selected`, `focused`는 Button shell canonical state naming이 아니다.
- field-family의 `focused` / system-level `focus-visible` 구분이 Button state naming을 덮어쓰는 것은 금지한다.

## anatomy slot naming rule if needed

- Forge Button component 안에 `focus-visible` preview 구조나 `FocusRing` child를 만들지 않는다.
- `LeadingIcon`과 `TrailingIcon`은 실제 역할이 있을 때만 쓴다.
- dropdown attached에서는 trailing 역할명을 `TrailingIcon` 대신 `DropdownIndicator`로 구체화한다.
- loading 상태에서는 leading role이 `LeadingIcon`에서 `LoadingIndicator`로 바뀔 수 있다.
- current Forge production에서는 dropdown button의 loading state를 만들지 않는다. `State=loading`은 `Has dropdown=false` 조합에만 존재한다.

## slot visibility rule

- 기본 non-dropdown sample recipe는 `LeadingIcon + Label + TrailingIcon`이다.
- 기본 dropdown sample recipe는 `LeadingIcon + Label + DropdownIndicator`다.
- `loading`은 runtime state로 읽으며, 기본 규칙은 `LeadingIcon -> LoadingIndicator` 치환이다.
- `loading + non-dropdown`에서는 trailing icon을 제거한다.
- current Forge production에서는 `loading + dropdown` 조합을 제거한다. dropdown button은 loading preview/runtime state를 가지지 않는다.
- 구현 관점에서는 `slot 존재`와 `slot visibility`를 분리해서 다루는 편이 안전하다.

## state delta rule

- `default`: variant별 기본 surface와 text color를 쓴다.
- `hover`
  - hover surface token과 `shadow/base`를 추가한다.
- `pressed`
  - pressed/emphasis surface overlay를 추가한다.
  - `shadow/inner`를 추가한다.
  - visible border는 accent 계열로 바뀐다.
  - `hasDropdown=true`에서는 `DropdownIndicator`가 `arrow_drop_up` 방향으로 바뀐다.
- `disabled`: disabled surface/text/border token으로 전환하고 interactive shadow를 제거한다.
- `focus-visible`
  - Forge Button component variant로 만들지 않는다.
  - `FocusRing` child를 만들지 않는다.
  - system-level focus-visible rule에서 별도로 정의한다.
- `loading`
  - `LoadingIndicator + Label`을 기본 visible recipe로 쓴다.
  - current Forge production에서는 `hasDropdown=true` loading 조합을 생성하지 않는다.
  - current source 기준 default/loading은 `shadow/base`를 함께 가진다.

## typography rule

- `large | medium`: `text-sm/leading-5/font-medium`
  - 항상 `Pretendard Medium / 14 / 20`
- `small | xsmall`: `text-xs/leading-4/font-medium`
  - 항상 `Pretendard Medium / 12 / 18`
- `Label`의 letter spacing은 `0`으로 유지한다.

## color / token rule

- Active Forge Figma production에서는 semantic token을 Button component에 바인딩하지 않는다. Semantic color는 component coverage와 primitive color 결정이 끝난 뒤 final integration 직전에 정리한다.
- Button/action family의 neutral-like dark surface는 `color/slate/*` primitive를 사용한다. 단, dark-mode 기준 `Label` 텍스트와 Button 내부 foreground affordance인 `DropdownIndicator`, `LoadingIndicator` content fill은 `color/neutral/*`만 사용한다.
- Button text/foreground content에는 `color/slate/*`, `color/brand/*`, `color/red/*`, raw hex를 직접 바인딩하지 않는다. Surface, border, pressed accent는 기존 slate/brand/red recipe를 유지한다.
- Button color recipe는 size별로 달라지지 않는다. 같은 `variant + state + hasDropdown` 조합이면 `small`, `medium`, `large`, `xsmall`의 surface, border, content, pressed border token은 동일해야 한다.
- Size는 outer height, padding, gap, typography, optional slot width만 바꿀 수 있다.
- Forge Figma 생성에서는 component-level `focus-visible` variant를 만들지 않는다. 이 문서의 `focus-visible` evidence는 source reference로만 유지하고, 현재 Forge component variant axis에서는 사용자 지시에 따라 제외한다.
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

- 2026-06-19 correction: Button은 여러 size/variant별 component set으로 나누지 않는다. Active Figma production source는 단일 `Button` component set이다.
- Current Button component set: `Button` `155:490`.
- Current variant axes: `Size=XSmall|Small|Medium|Large`, `Variant=Default|Primary|Text|Danger`, `State=default|hover|pressed|disabled|loading`, `Has dropdown=true|false`.
- Current variant count: `144`.
- Current removed combination: `State=loading` with `Has dropdown=true` is not present.
- Current primary rule: content over `color/brand/500`, `color/brand/600`, and loading `color/brand/500` is `color/neutral/50`. Primary disabled surface stays inside the brand family with `color/brand/900` fill and `color/brand/800` stroke.
- Current danger rule: danger disabled surface stays inside the red family with `color/red/900` fill and `color/red/800` stroke.
- Current icon slot rule: non-dropdown non-loading variants use `LeadingIcon + Label + TrailingIcon`; dropdown non-loading variants use `LeadingIcon + Label + DropdownIndicator`; loading variants use `LoadingIndicator + Label`.
- Current icon slot counts: `LeadingIcon=128`, `TrailingIcon=64`, `DropdownIndicator=64`, `LoadingIndicator=16`.
- Current component set layout: size groups are stacked vertically in order `XSmall`, `Small`, `Medium`, `Large`. Inside each size group, `State` runs vertically and `Variant + Has dropdown` pairs run horizontally.
- Current icon rule: `DropdownIndicator` and `LoadingIndicator` are SVG nodes created from local Material Design Icons outlined assets. Text glyphs such as `v`, `^`, or fake spinner text are invalid.
- Current icon sources: `src/navigation/arrow_drop_down/materialiconsoutlined/24px.svg`, `src/navigation/arrow_drop_up/materialiconsoutlined/24px.svg`, `src/action/autorenew/materialiconsoutlined/24px.svg`.
- Current text/foreground rule: `Label`, `DropdownIndicator`, and `LoadingIndicator` content fill variables are only `color/neutral/50`, `color/neutral/200`, and `color/neutral/500`.
- Superseded wrong split sets: `Button / Small / Default`, `Button / Small / Primary`, `Button / Small / Text`, `Button / Small / Danger`, `Button / Medium / Default`, `Button / Medium / Primary`, `Button / Medium / Text`, `Button / Medium / Danger`.
- Required QA before reporting Button work complete: split Button component set inventory `0`, single `Button` component set inventory `1`, `LeadingIcon=128`, `TrailingIcon=64`, `DropdownIndicator=64`, `LoadingIndicator=16`, non-dropdown missing leading/trailing `0`, dropdown missing leading `0`, order mismatch `0`, `Label` TEXT fill non-neutral `0`, Button foreground non-neutral `0`, primary non-disabled content not neutral/50 `0`, primary disabled non-brand surface `0`, danger disabled non-red surface `0`, dropdown loading variant `0`, paint fallback mismatch `0`, component-level `focus-visible` `0`, `FocusRing` `0`, component set overflow `0`, missing dropdown indicator `0`, missing loading indicator `0`, fake text icon `0`, SVG wrapper fill artifact `0`, same variant/state/dropdown color parity across sizes.
  - `--color/error-300`
  - `--color/error-400`
  - `--color/error-Alpha`
  - `semantic/color/interactive/neutral/surface/emphasis`
  - `color/focus/ring`

## icon rule

- icon source direction은 Material Icons 계열로 유지한다.
- `LeadingIcon`, `TrailingIcon`, `LoadingIndicator` 기본 size는 항상 `16px`다.
- `DropdownIndicator` 기본 size도 항상 `16px`다.
- Logpresso product UI icon policy는 `16px-first`다. Button size가 달라도 dropdown affordance glyph는 16px를 우선 사용한다.
- `20px+` icon은 standalone/emphasis/illustration/icon tile 같은 별도 family나 명시 승인된 예외에서만 사용한다.
- `hasDropdown=true`
  - `default | hover | disabled | loading`: `arrow_drop_down`
  - `pressed`: `arrow_drop_up`

## Tailwind mapping rule

- 구현 우선순위는 `outer height exact -> border included -> inner inset 구현`이다.
- foundation component인 Button은 height와 compact inset에서 arbitrary value 사용을 허용한다.
- non-dropdown 권장 클래스
  - `large`: `h-[42px] px-[17px] py-[11px] gap-2 rounded-lg`
  - `medium`: `h-[30px] px-[13px] py-[5px] gap-2 rounded-lg`
  - `small`: `h-6 px-[9px] py-[3px] gap-1 rounded-lg`
  - `xsmall`: `h-5 px-[7px] py-px gap-1 rounded-md`
- dropdown attached 권장 클래스
  - `large`: `h-[42px] pl-[17px] pr-[11px] py-[11px] gap-2 rounded-lg`
  - `medium`: `h-[30px] pl-[13px] pr-[5px] py-[5px] gap-2 rounded-lg`
  - `small`: `h-6 pl-[9px] pr-[3px] py-[3px] gap-1 rounded-lg`
  - `xsmall`: `h-5 pl-[7px] pr-px py-px gap-1 rounded-md`
- `gap`, `radius`, `icon size`는 Tailwind scale로 흡수하고, `height`와 compact inset은 exact value를 우선한다.

## specialization / usage handling

- `dropdownbutton`은 Button-derived specialization/usage로 문서화한다.
- Search input-like control은 현재 `Search` family 쪽에서 다루며, Button-derived usage로 문서화하지 않는다.
- specialization 문서가 필요해도 `Button` 기준서를 참조하는 하위 usage로 다룬다.

## usage-level boundary

- GNB 안의 `TenantButton`은 `Button` family를 그대로 반복 선언하는 영역이 아니라, GNB usage-level sample이다.
- `TenantButton`이 필요하면 `variant=default`, `size=small`, `hasDropdown=true`, `label=Tenant`를 먼저 맞춘다.
- Button family canonical small dropdown recipe는 항상 `LeadingIcon + Label + DropdownIndicator`다.
- Button family canonical small label typography는 항상 `Pretendard Medium / 12 / 18 / letter-spacing 0`이다.
- Button family canonical small `LeadingIcon`, `TrailingIcon`은 항상 `16 x 16`이다.
- Button family canonical small `DropdownIndicator`는 항상 `16 x 16`이다.
- GNB current visible sample에서는 `LeadingIcon`을 노출하지 않고 `Label + DropdownIndicator`만 사용한다.
- current visible sample width는 `72`다.
- GNB source 기준 compact inset은 항상 `pl 9 / pr 3 / py 3 / gap 4`다.
- GNB Tenant no-leading-icon recipe는 오직 usage override다.
- GNB Tenant usage는 Button family canonical truth를 절대 덮어쓰지 않는다.
- GNB Tenant usage에서도 `Label` typography는 항상 `Pretendard Medium / 12 / 18 / letter-spacing 0`을 유지한다.
- GNB Tenant usage override의 outer surface는 항상 `semantic.color.surface.container.default`다.
- GNB Tenant usage override의 outer surface fallback은 항상 `#070b13`이다.
- GNB Tenant usage override의 outer border는 항상 `semantic.color.border.interactive.default`다.
- GNB Tenant usage override의 outer border fallback은 항상 `rgba(126,140,222,0.16)`이다.
- GNB Tenant usage override의 label foreground는 항상 `semantic.color.text.primary`다.
- GNB Tenant usage override의 label foreground fallback은 항상 `#ebebeb`이다.
- generic dropdown canonical slot을 `TenantButton` usage에 자동 확장하는 것도 금지하고, `TenantButton` usage로 family canonical truth를 다시 쓰는 것도 금지한다.
- `TenantButton`의 `DropdownIndicator`는 utility/common affordance glyph family와 glyph source만 공유한다.
- `DropdownIndicator`의 glyph family 관계를 right-side utility boxed-control grammar 전체로 확장하는 것은 금지한다.
- `TenantButton`의 cluster alignment, compact height 유지, utility rhythm은 [GNB.md](GNB.md)가 직접 소유한다.

## dropdown example boundary

- `button + dropdownList example`은 example-only composition naming이다.
- example 안의 expanded button sample은 example-only composition truth다.
- example 안의 button trigger는 `Button` family canonical truth를 유지한 채 attached dropdown surface와 짝을 이룬다.
- example 안의 `dropdownList` surface는 [dropdownList.md](dropdownList.md)가 소유한다.
- example source에서 보이는 trigger width, top offset, left alignment, attached pairing 방식은 example composition truth일 뿐이고 `Button` family canonical truth를 덮지 않는다.
- example source에서 보이는 checkbox dropdown pairing을 `Button` family required pairing rule로 승격하는 것은 금지한다.

## ecosystem / grouping composition

- 공식/public label은 `buttonGroup`, `iconButtonGroup`이다.
- `buttonGroup`은 여러 `Button` instance를 하나의 연결된 그룹으로 조합하는 composition family다.
- group composition은 항상 same-family only다.
- `buttonGroup` child는 항상 `Button`만 반복한다.
- `buttonGroup` root는 seam overlap, end-side compensation, edge-only radius distribution만 소유한다.
- `buttonGroup` current grouped sample의 count는 `2 | 3 | 4 | 5`로만 관찰된다.
- `buttonGroup` current grouped sample child form은 `Label only` small `Button` grouped usage sample이다.
- grouped usage sample은 `Button` family canonical slot truth를 절대 덮지 않는다.
- exact group seam/radius/count contract는 [buttonGroup.md](buttonGroup.md)가 소유한다.
- mixed-family composition은 금지한다.

## implementation / reconstruction proof rule

- family canonical small label typography가 `Pretendard Medium 12/18 / letter-spacing 0`인지 확인한다.
- small `LeadingIcon`, `TrailingIcon`, `DropdownIndicator`가 모두 `16`인지 확인한다.
- GNB Tenant no-leading-icon recipe가 family canonical truth를 덮어쓰지 않았는지 확인한다.
- `button + dropdownList example`의 pairing truth가 `Button` family canonical truth를 덮어쓰지 않았는지 확인한다.
- `buttonGroup` grouped usage sample이 `Label only` child form을 유지하되 family canonical slot truth를 덮지 않았는지 확인한다.
- grouped composition에서는 seam/radius를 group doc가 소유하고 child `Button` truth를 다시 쓰지 않았는지 확인한다.

## 사용해야 하는 경우

- 일반적인 주요/보조/위험 액션 버튼이 필요할 때
- leading icon/trailing icon 조합과 dropdown attached를 같은 family vocabulary 안에서 관리해야 할 때
- GNB나 화면 전용 container보다 더 낮은 레벨의 기본 액션 컴포넌트가 필요할 때

## 사용하지 말아야 하는 경우

- icon only action이 주목적인 경우
  - 이 경우는 `iconButton` family를 우선 검토한다.
- 화면 전용 예외를 이유로 별도 Button type을 빠르게 늘리려는 경우
- backgroundless 표현만을 이유로 별도 family를 만들려는 경우

## 예외 처리 규칙

- backgroundless exception: `variant=text`
- runtime exception: `loading`은 source preview 축에 남아 있어도 runtime state로 기록

## 관련 backlog / deferred 항목

- [Button group ecosystem 후속 문서 분리](../backlog/button-family-boundary-%ED%99%95%EC%9D%B8.md)
- [Token/FE 정렬 검증](../backlog/token-fe-%EC%A0%95%EB%A0%AC-%EA%B2%80%EC%A6%9D.md)

## FE handoff note

- 공용 prop vocabulary는 `variant`, `size`, `disabled`, `loading` 중심으로 읽는 편이 안전하다.
- `state` 전체를 runtime prop으로 그대로 옮기지 않는다.
- `hasDropdown`은 현재 유지하지만 Button-specific property로 취급한다.
- Tailwind CSS 기준에서는 slot visibility와 state layer를 분리해 관리하는 편이 안정적이다.
- official sibling family naming은 `iconButton`으로 통일한다.
- exact fidelity가 필요한 foundation component이므로 `h-[42px]`, `px-[17px]` 같은 arbitrary value 사용을 허용한다.
- non-semantic alias token은 지금 stage에서 숨기지 않고, implementation note와 cleanup backlog에 함께 남긴다.

## icon / typography note if relevant

- 아이콘 기준은 Material Icons 계열을 우선 참고한다.
- 기본 폰트 기준은 Pretendard다.
- current compact operational size는 `small`이고, product-system content default size는 `medium`이다.
- `large`, `medium`은 현재 `14/20` typography를 사용한다.
- `small`, `xsmall`은 현재 `12/18` typography를 사용한다.
- compact step인 `small`에서도 dropdown indicator는 `16px-first` policy를 유지한다.
