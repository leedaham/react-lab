# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/supporting/slider.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `사용자 제공 UI-5.1 page 8786:9124와 frame 9476:2260, 8786:9126, 9476:2264`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Slider.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

Slider

## 목적

- `Slider`는 compact horizontal slider family다.
- 이 문서는 current source에서 직접 확인되는 `Slider`의 shell grammar, value proof, track rule note를 implementation/reconstruction-grade 기준으로 잠근다.
- broader interaction state, drag behavior, range selection contract는 이 문서가 소유하지 않는다.

## family boundary

- family canonical 범위
  - `Slider / value=low`
  - `Slider / value=mid`
  - `Slider / value=high`
- supporting proof 범위
  - `Track rule note`
- current spec에서 제외하는 범위
  - vertical slider
  - dual-handle range slider
  - progress indicator

## current truth

- `Slider`는 width `394`, height `12`의 horizontal slider family다.
- current source는 `low | mid | high` value proof를 직접 보여준다.
- shell은 dark neutral track + thin border reading이다.
- fill bar는 orange accent reading이다.
- handle은 filled bar 끝에 직접 연결된다.
- handle center는 track center line에 맞는다.

## 구조 / anatomy

- `SliderRoot`
  - `Track`
  - `FillBar`
  - `HandleOuter`
    - `HandleInner`

## exact visual spec

### shell

- outer size는 항상 `394 x 12`다.
- track inset current visible proof는 `x 2 / y 2`다.
- track visible size proof는 height `8`이다.
- 아래 fallback hex/rgba 값은 source reference이며, light theme 구현에서는 확인된 semantic token value를 우선한다.
- track background는 `var(--color-neutral) / #070b13`다.
- track border는 `1px solid var(--color-neutral-alpha-300) / rgba(126,140,222,0.16)`다.
- track은 fully rounded bar reading을 유지한다.

### fill bar

- fill bar height는 항상 `8`이다.
- fill bar는 track 안 left edge에서 시작한다.
- fill tone은 `semantic.color.interactive.brand.accent / #ff692a` reading이다.
- `value=low`는 near-zero fill proof다.
- `value=mid`는 middle fill proof다.
- `value=high`는 near-max fill proof다.

### handle

- `HandleOuter` size는 항상 `20 x 20`이다.
- `HandleInner` size는 항상 `12 x 12`이다.
- `HandleOuter`는 fill bar 끝에 직접 붙는다.
- `HandleInner`는 `HandleOuter` 중심에 배치된다.
- handle은 circular knob reading을 유지한다.

## value proof 규칙

- current visible axis는 `value=low | mid | high`다.
- 이 값들은 current source의 value position proof다.
- `low`, `mid`, `high`를 exact numeric public contract로 일반화하면 안 된다.
- current source는 left / center / right position proof를 직접 보여주는 구조로 읽는다.

## supporting proof

### Track rule note

- `Track rule note`는 component owner가 아니라 supporting visual rule proof다.
- current visible note는 track background와 border rule을 설명한다.

## supporting child / reuse boundary

- color token naming과 fallback 원칙은 [color.md](../foundation/color.md)가 소유한다.
- radius system은 [radius.md](../foundation/radius.md)가 소유한다.
- border system은 [border.md](../foundation/border.md) 가 소유한다.
- `Slider`는 shell geometry, fill/handle relation, value position proof만 소유한다.

## current spec에서 제외하는 것

- `low | mid | high`를 exact numeric property로 승격하는 해석
- hover / active / disabled interaction state를 임의로 추가하는 해석
- vertical slider, range slider, dual-handle slider로 확장하는 해석
- `Slider`를 `ProgressBar`처럼 passive indicator로 재해석하는 것

## implementation / reconstruction 시 반드시 지켜야 하는 규칙

- `Slider`는 항상 `394 x 12` horizontal shell을 유지한다.
- dark track + thin border + orange fill reading을 유지한다.
- handle outer `20`, inner `12` grammar를 유지한다.
- handle은 fill 끝과 직접 연결돼야 한다.
- `low | mid | high` proof를 exact number state처럼 과해석하면 안 된다.

## verified HTML / CSS implementation

- Figma 기준 node는 사용자 제공 UI-5.1 page `8786:9124`와 frame `9476:2260`, `8786:9126`, `9476:2264`다.
- 구현 source는 `site/app.js`의 `sliderMarkup`, `sliderPreview`, `sliderHtmlExample`이다.
- HTML root는 기존 제품 selector `.slider`와 의미 속성 `data-slider`를 함께 사용한다.
- `sonar5.css`의 `.slider` grammar를 재사용하되, native range input으로는 Figma의 `Track / FillBar / HandleOuter / HandleInner` 구조를 정확히 재현할 수 없어 `site/component-css/component.css`에서 `.slider[data-slider]` gap만 보정한다.
- verified exact page는 `site/component/supporting/slider.html`이고 catalog route는 `site/index.html#components`다.
- QA 결과: `file://` exact page와 catalog route에서 mismatch count `0`.

## pending / later decision log

- exact public value property naming
- hover / active / disabled proof 추가 여부
