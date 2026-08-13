# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/supporting/tooltip.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 component set 2594:51482`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Tooltip.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

Tooltip

## 목적

- `Tooltip`은 theme-aware floating helper surface family다.
- 이 문서는 current source에서 직접 확인되는 `Tooltip`의 text tooltip grammar, max-width proof, rich-content proof를 implementation/reconstruction-grade 기준으로 잠근다.
- placement direction, pointer tail, focus orchestration, trigger behavior는 이 문서가 소유하지 않는다.
- Tooltip의 dark neutral reading은 dark theme proof이며, light theme에서는 raised surface/text/border/shadow 토큰으로 전환한다.

## family boundary

- family canonical 범위
  - `Tooltip / contentType=text-min`
  - `Tooltip / contentType=text-max`
- supporting proof 범위
  - `Tooltip / contentType=info`
  - `Tooltip rule note`
  - `Cursor proof`
- current spec에서 제외하는 범위
  - speech bubble tail
  - popover / dropdown surface
  - pinned info card

## current truth

- `Tooltip`은 light theme에서 raised surface/text/border/shadow 토큰을 사용하고, dark theme에서 neutral dark surface와 light text proof를 유지하는 floating helper container다.
- text tooltip current source proof는 `contentType=text-min | text-max`다.
- `contentType=text-min`은 short one-line tooltip proof이며, 고정 폭이 아니라 최소 폭 이후 content width를 hug한다.
- `contentType=text-max`는 multiline text tooltip proof다.
- current source note 기준 text area max width proof는 `280px`다.
- `contentType=info`는 richer content layout를 보여주는 supporting proof다.
- current source에는 pointer tail이 없다.

## 구조 / anatomy

### Tooltip / contentType=text-min

- `TooltipRoot`
  - `message`

### Tooltip / contentType=text-max

- `TooltipRoot`
  - multiline `message`

### Tooltip / contentType=info

- `TooltipRoot`
  - repeated `Label`
  - repeated `Value`

## exact visual spec

### shell

- light theme shell background는 `var(--surface-raised) / #ffffff`다.
- light theme text color는 `var(--text) / #111827`다.
- light theme border와 shadow는 `var(--border)`, `0 8px 18px rgba(15, 23, 42, 0.12)` 계열 elevation을 사용한다.
- dark theme shell background는 `var(--color-neutral) / #070b13` proof를 유지한다.
- dark theme text color는 `var(--color-base-content) / #ebebeb` proof를 유지한다.
- shell은 small rounded container reading을 유지한다.
- current source에서 tail-less floating box reading이 직접 확인된다.

### contentType=text-min

- current visible minimum size proof는 `95 x 26`이다.
- one-line text reading을 유지하며, short helper copy 길이에 맞춰 shell width를 hug한다.
- short helper copy가 shell 안에 compact하게 들어가야 하며 텍스트가 shell 밖으로 넘치면 안 된다.

### contentType=text-max

- current visible size proof는 `296 x 44`다.
- multiline wrapping proof를 직접 보여준다.
- current source note 기준 text area max width proof는 `280px`다.

### contentType=info

- current visible size proof는 `286 x 222`다.
- text tooltip과 달리 rich key/value block layout를 가진다.
- repeated row stack과 two-column reading이 직접 보인다.
- current source 기준 richer content proof이지만, `text-min | text-max`와 같은 무게의 general text variant로 일반화하면 안 된다.

## contentType 규칙

- current source에서 directly confirmed text tooltip proof는 `contentType=text-min | text-max`다.
- `contentType=info`는 richer content supporting proof다.
- `contentType=info`를 ordinary text tooltip width variant처럼 해석하면 안 된다.

## supporting proof

### Tooltip rule note

- `Tooltip rule note`는 component owner가 아니라 supporting visual rule proof다.
- current source note는 tooltip background/text color rule을 설명한다.

### Cursor proof

- `Cursor proof`는 tooltip usage context proof다.
- cursor는 `Tooltip` anatomy가 아니다.

## supporting child / reuse boundary

- color token naming과 fallback 원칙은 [color.md](../foundation/color.md)가 소유한다.
- radius system은 [radius.md](../foundation/radius.md)가 소유한다.
- typography source-of-truth는 [typography.md](../foundation/typography.md)가 소유한다.
- `Tooltip`은 shell/background/text reading, text width proof, rich-content proof 위계만 소유한다.

## current spec에서 제외하는 것

- `contentType=info`를 text tooltip과 동일한 public width axis로 승격하는 해석
- tooltip tail/caret을 current truth로 추가하는 해석
- direction top/bottom/left/right placement를 current truth로 추가하는 해석
- cursor를 tooltip anatomy에 포함하는 해석
- `Tooltip`을 dropdown/popover/card family로 재해석하는 것

## implementation / reconstruction 시 반드시 지켜야 하는 규칙

- `Tooltip`은 light theme에서 raised surface/text/border/shadow 토큰을 사용하고 dark theme에서 dark neutral surface + light text reading을 유지한다.
- `contentType=text-min`은 compact one-line tooltip proof로 유지하되, fixed width가 아니라 `min-width: 95px` 이후 content width를 hug한다.
- `contentType=text-max`는 multiline text tooltip proof와 `280px` max-width reading을 유지한다.
- `contentType=info`는 richer content proof로 유지하되, ordinary text width variant처럼 평탄화하면 안 된다.
- current source에 없는 tail을 역주입하면 안 된다.

## verified HTML / CSS implementation

- Figma 기준 node는 UI-5.1 component set `2594:51482`다.
- 구현 source는 `site/app.js`의 `tooltipMarkup`, `tooltipPreview`, `tooltipHtmlExample`이다.
- HTML root는 기존 제품 selector `.tooltip-container`와 의미 속성 `data-tooltip`을 함께 사용한다.
- `sonar5.css`의 `.tooltip-container`를 재사용하고, Figma의 `contentType`별 width, height, info row layout, light/dark theme color mapping은 `site/component-css/component.css`의 `.tooltip-container[data-tooltip]` 계열 selector에서 보정한다.
- exact page: `site/component/supporting/tooltip.html`
- catalog route: `site/index.html#components`
- verified exact page는 `site/component/supporting/tooltip.html`이고 catalog route는 `site/index.html#components`다.
- QA 결과: `file://` exact page와 catalog route에서 mismatch count `0`.

## pending / later decision log

- `contentType=info`를 future canonical rich tooltip variant로 승격할지 여부
- direction placement proof를 current source에 추가할지 여부
