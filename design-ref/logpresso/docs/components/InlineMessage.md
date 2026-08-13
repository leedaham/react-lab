# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/supporting/inlinemessage.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `17540:9492`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/InlineMessage.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=mismatch count 0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

InlineMessage

## 목적

- `InlineMessage`는 inline text/message proof를 기록하는 family canonical 컴포넌트 문서다.
- 이 문서는 current source에서 직접 확인되는 `InlineMessageSet`과 `InlineCode`의 visible structure만 잠근다.
- current source에서 `InlineMessageSet / contentType=textOnly`는 [InlineAlert.md](InlineAlert.md)의 `type=neutral`과 같은 visible proof로 읽는다.
- richer rich-text system, parser rule, markdown grammar, token interpolation contract는 이 문서가 소유하지 않는다.

## family boundary

- canonical 범위
  - `InlineMessageSet / contentType=textWithInlineCode`
  - `InlineCode`
- shared visible proof
  - `InlineMessageSet / contentType=textOnly`
- current spec에서 제외하는 범위
  - `Toast`
  - `InlineAlert`

## current truth

- `InlineMessageSet / contentType=textOnly` visible proof는 `InlineAlert / type=neutral`와 같다.
- `InlineMessageSet`이 독자적으로 소유하는 canonical proof는 `contentType=textWithInlineCode`다.
- `InlineCode`는 inline code highlight pill proof다.
- `InlineCode`는 단독으로도 current visible proof가 존재하며 standalone usage가 가능하다.

## 구조 / anatomy

### InlineMessageSet

- `contentType=textWithInlineCode`
  - `message`
  - `InlineCode`
  - trailing `message`

### InlineCode

- code highlight pill
  - code text

## exact visual spec

### InlineMessageSet

- `contentType=textWithInlineCode` width proof는 `280`, height proof는 `28`이다.
- 아래 fallback hex 값은 source reference이며, light theme 구현에서는 확인된 semantic token value를 우선한다.
- background는 `semantic.color.surface.container.strong / #1d2544`다.
- outer padding은 `px 8 / py 4`다.
- radius는 `8`이다.
- typography는 `Pretendard Regular / 14 / 20`이다.
- `contentType=textWithInlineCode`의 inner gap은 `4`다.
- text color는 `semantic.color.text.primary / #ebebeb`다.

### InlineCode

- width proof는 `96`, height proof는 `20`이다.
- background는 `semantic.color.background.code / #fbebe8`다.
- text color는 `semantic.color.text.code / #ff692a`다.
- outer padding은 `px 6 / py 1`이다.
- radius는 `4`다.
- typography는 `D2Coding Regular / 12 / 18`이다.

## family canonical boundary

- `InlineMessageSet`은 current source 기준 family canonical set proof다.
- `contentType=textOnly`는 별도 supporting set owner가 아니라 `InlineAlert / type=neutral`와 shared visible proof다.
- `InlineCode`도 current source 기준 inline code proof다.
- 둘 모두 `InlineMessage` family canonical 범위 안에서 사용한다.

## current spec에서 제외하는 것

- markdown/rich-text parsing rule을 current UI spec로 승격하는 해석
- token interpolation 문법을 current component truth로 승격하는 해석
- `InlineMessageSet`을 `Toast`나 `InlineAlert` family child로 흡수하는 해석
- `contentType=textOnly`를 `InlineAlert / type=neutral`와 다른 별도 shell owner로 승격하는 해석

## implementation / reconstruction 시 반드시 지켜야 하는 규칙

- `InlineMessageSet`의 strong neutral surface를 제거하면 안 된다.
- `InlineCode`의 code-tone background와 D2Coding text를 flat text로 평탄화하면 안 된다.
- `contentType=textWithInlineCode`에서 inline code token을 ordinary text로 바꾸면 안 된다.

## pending / later decision log

- richer multiline inline message proof를 current source에 추가할지 여부

## UI-5.1 implementation sync record

- sync date: `2026-05-15`
- Figma node: `17540:9492`
- implemented HTML owner: `site/app.js`
- implemented CSS owner: `site/component-css/component.css`
- reused product selector grammar: `.alert`, `.alert-general`, `.bg-inlinecode`, `.text-inlinecode-content`
- `sonar5.css`는 reference로만 사용했고 수정하지 않았다.
- exact component page QA: `component/supporting/inlinemessage.html`
- catalog route QA: `index.html#components`
- QA result: mismatch count `0`
- confirmed rendered coverage: `contentType=textOnly`, `contentType=textWithInlineCode`, root `280x28`, `InlineCode` `96x20`
