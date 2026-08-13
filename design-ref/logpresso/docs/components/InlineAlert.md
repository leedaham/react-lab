# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/supporting/inlinealert.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 component set 17540:8162`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/InlineAlert.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

InlineAlert

## 목적

- `InlineAlert`는 compact one-line status message family다.
- 이 문서는 current source에서 직접 확인되는 `InlineAlert`의 type axis, shell grammar, icon/text reading을 implementation/reconstruction-grade 기준으로 잠근다.
- current source에서 `type=neutral` visible proof는 [InlineMessage.md](InlineMessage.md)의 `InlineMessageSet / contentType=textOnly`와 같은 컴포넌트로 읽는다.
- broader inline rich text behavior나 parent placement rule은 이 문서가 소유하지 않는다.

## family boundary

- family canonical 범위
  - `InlineAlert / type=error`
  - `InlineAlert / type=warning`
  - `InlineAlert / type=success`
  - `InlineAlert / type=info`
  - `InlineAlert / type=system`
  - `InlineAlert / type=neutral`
- child/local usage 범위
  - `leadingStatusIcon`
  - `message`
- current spec에서 제외하는 범위
  - `Toast`
  - `InlineMessageSet`
  - `InlineCode`

## current truth

- `InlineAlert`는 width `300`, height `28`의 compact single-line status message family다.
- non-neutral type은 `leadingStatusIcon + message` 구조를 가진다.
- `type=neutral`은 dark compact pill reading을 가지며, visible source 기준 leading icon이 없다.
- `type=neutral` visible proof는 `InlineMessageSet / contentType=textOnly`와 동일한 shell/text proof를 공유한다.
- `InlineAlert`는 close/dismiss icon을 소유하지 않는다.

## 구조 / anatomy

- `InlineAlertRoot`
  - `leadingStatusIcon?`
  - `message`

## exact visual spec

### shell

- outer size는 항상 `300 x 28`이다.
- outer padding은 항상 `px 8 / py 4`다.
- outer radius는 항상 `8`이다.
- non-neutral type gap은 항상 `8`이다.
- `type=neutral`은 children gap이 `0`으로 읽힌다.

### message

- typography는 항상 `Pretendard Regular / 14 / 20`이다.
- `message`는 single-line reading을 유지한다.

### icon grammar

- non-neutral type의 `leadingStatusIcon` size는 항상 `16`이다.
- `type=neutral`은 current visible source 기준 leading status icon을 포함하지 않는다.

### type별 visual proof

- 아래 fallback hex/rgba 값은 source reference이며, light theme 구현에서는 확인된 semantic token value를 우선한다.
- `type=error`
  - surface는 `semantic.color.status.error.surface / #ffebef`
  - text는 error accent tone으로 읽는다.
- `type=warning`
  - surface는 `semantic.color.status.warning.surface / #fff8e4`
  - text는 `semantic.color.status.warning.accent / #fba434`다.
- `type=success`
  - surface는 success tinted surface로 읽는다.
  - text는 success accent tone으로 읽는다.
- `type=info`
  - surface는 info tinted surface로 읽는다.
  - text는 info accent tone으로 읽는다.
- `type=system`
  - surface는 system tinted surface로 읽는다.
  - text는 system accent tone으로 읽는다.
- `type=neutral`
  - surface는 `semantic.color.surface.container.strong / #1d2544`
  - border는 `semantic.color.border.default / rgba(126,140,222,0.16)`
  - text는 `semantic.color.text.primary / #ebebeb`
  - visible source proof는 `InlineMessageSet / contentType=textOnly`와 동일하다.

## state / type 규칙

- current visible axis는 `type=error | warning | success | info | system | neutral`이다.
- 현재 source 기준으로 `type`이 곧 visual variant axis다.

## supporting child / reuse boundary

- status icon source/path truth는 [icon.md](../foundation/icon.md)가 소유한다.
- `InlineAlert`는 icon size와 구조만 소유한다.
- color token과 fallback 원칙은 [color.md](../foundation/color.md)가 소유한다.
- radius system은 [radius.md](../foundation/radius.md)가 소유한다.

## current spec에서 제외하는 것

- dismiss/close icon을 `InlineAlert` current truth로 승격하는 해석
- multiline inline alert를 public variant로 승격하는 해석
- `Toast`와 `InlineAlert`를 하나의 동일 family size variant로 합치는 해석
- `InlineMessageSet`을 `InlineAlert` type variant로 흡수하는 해석

## implementation / reconstruction 시 반드시 지켜야 하는 규칙

- `InlineAlert`는 항상 `300 x 28` compact shell을 유지한다.
- non-neutral type의 `leadingStatusIcon`을 제거하면 안 된다.
- `type=neutral`에 status icon을 역주입하면 안 된다.
- `InlineAlert`를 dismissible toast처럼 구현/재구성하면 안 된다.
- `InlineAlert`를 multiline block으로 확장하면 안 된다.
- `type=neutral`을 `InlineMessageSet / contentType=textOnly`와 다른 별도 shell로 구현/재구성하면 안 된다.

## verified HTML / CSS implementation

- Figma 기준 node는 UI-5.1 component set `17540:8162`다.
- 구현 source는 `site/app.js`의 `inlineAlertMarkup`, `messagePreview("inline-alert")`, `inlineAlertHtmlExample`이다.
- HTML root는 기존 제품 selector `.alert`와 tone selector `.alert-error`, `.alert-warning`, `.alert-success`, `.alert-info`, `.alert-system`, `.alert-general`을 먼저 사용하고, 의미 속성 `data-inline-alert`와 `data-type`을 함께 둔다.
- `sonar5.css`의 alert selector를 재사용하고, Figma의 `300 x 28`, type별 surface/text, neutral dark surface는 `site/component-css/component.css`의 `.alert[data-inline-alert]` 계열 selector에서 보정한다.
- exact page: `site/component/supporting/inlinealert.html`
- catalog route: `site/index.html#components`
- verified exact page는 `site/component/supporting/inlinealert.html`이고 catalog route는 `site/index.html#components`다.
- QA 결과: `file://` exact page와 catalog route에서 mismatch count `0`.

## pending / later decision log

- inline alert parent placement rule
