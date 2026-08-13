# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/supporting/toast.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 component set 9064:2211`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Toast.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

Toast

## 목적

- `Toast`는 dismiss 가능한 large status message family다.
- 이 문서는 current source에서 직접 확인되는 `Toast`의 state axis, shell visual grammar, content block 구조를 implementation/reconstruction-grade 기준으로 잠근다.
- richer notification flow, stack orchestration, auto-dismiss timing, broader UX contract는 이 문서가 소유하지 않는다.

## family boundary

- family canonical 범위
  - `Toast / state=error`
  - `Toast / state=warning`
  - `Toast / state=success`
  - `Toast / state=info`
  - `Toast / state=system`
  - `Toast / state=neutral`
- child/local usage 범위
  - `leadingStatusIcon`
  - `contentBlock`
  - `dismissIcon`
- current spec에서 제외하는 범위
  - `InlineAlert`
  - `InlineMessageSet`
  - `InlineCode`

## current truth

- `Toast`는 width `600`, height `64`의 large dismissible status message family다.
- 모든 current visible state는 `leadingStatusIcon + contentBlock + dismissIcon` 3-part 구조를 가진다.
- `contentBlock`은 `title + message` 2-row block이다.
- title과 message는 current source 기준 같은 typography weight/size를 공유한다.
- `Toast`는 항상 rounded rectangle shell과 `shadow/base`를 가진다.
- non-neutral state는 state-specific tinted surface + state-specific border + state-accent icon/close reading을 가진다.
- `state=neutral`은 dark neutral surface와 default border를 가진다.

## 구조 / anatomy

- `ToastRoot`
  - `leadingStatusIcon`
  - `contentBlock`
    - `title`
    - `message`
  - `dismissIcon`

## exact visual spec

### shell

- outer size는 항상 `600 x 64`다.
- outer padding은 항상 `px 16 / py 8`이다.
- children gap은 항상 `16`이다.
- outer radius는 항상 `8`이다.
- shell shadow는 항상 `shadow/base`다.
  - `0 1 2 rgba(0,0,0,0.06)`
  - `0 2 3 rgba(0,0,0,0.10)`

### contentBlock

- `contentBlock`은 `flex-1`로 읽는다.
- `contentBlock`은 vertical stack이며, inner gap은 항상 `8`이다.
- title typography는 `Pretendard Regular / 14 / 20`이다.
- message typography는 `Pretendard Regular / 14 / 20`이다.
- `state=error | warning | success | info | system`의 text color는 `semantic.color.content.on-subtle-surface / #191919`다.
- `state=neutral`의 text color는 `semantic.color.content.on-brand / #ebebeb`다.

### icon grammar

- `leadingStatusIcon` size는 항상 `16`이다.
- `dismissIcon` size는 항상 `16`이다.
- `leadingStatusIcon`, `dismissIcon`은 state accent tone과 함께 읽는다.

### state별 shell proof

- 아래 fallback hex/rgba 값은 source reference이며, light theme 구현에서는 확인된 semantic token value를 우선한다.
- `state=error`
  - surface는 `semantic.color.status.error.surface / #ffebef`
  - border는 `#d50000`
- `state=warning`
  - surface는 `semantic.color.status.warning.surface / #fff8e4`
  - border는 `#ffca48`
- `state=success`
  - surface는 `#e3f2ff`
  - border는 `#00cc88`
- `state=info`
  - surface는 `semantic.color.status.info.surface / #e3f2ff`
  - border는 `#36a4ff`
- `state=system`
  - surface는 `#f2e9ff`
  - border는 `#915cff`
- `state=neutral`
  - surface는 `semantic.color.surface.container.default / #070b13`
  - border는 `semantic.color.border.default / rgba(126,140,222,0.16)`

## state 규칙

- current visible axis는 `error | warning | success | info | system | neutral`이다.
- `error | warning | success | info | system`은 모두 같은 large status shell grammar를 유지하고, state tone만 바뀐다.
- `neutral`도 같은 shell geometry를 유지하지만, dark neutral reading으로 바뀐다.

## supporting child / reuse boundary

- `leadingStatusIcon`, `dismissIcon`의 source/path truth는 [icon.md](../foundation/icon.md)가 소유한다.
- `Toast`는 icon family path를 다시 정의하지 않고, visible role과 size만 소유한다.
- color token과 fallback 원칙은 [color.md](../foundation/color.md)가 소유한다.
- radius system은 [radius.md](../foundation/radius.md)가 소유한다.
- shadow token은 [shadow.md](../foundation/shadow.md)가 소유한다.

## current spec에서 제외하는 것

- title과 message의 typography weight를 서로 다르게 승격하는 해석
- auto-dismiss, stack order, placement zone을 current UI spec으로 승격하는 해석
- `InlineAlert`, `InlineMessageSet`, `InlineCode`를 `Toast` family child로 흡수하는 해석

## implementation / reconstruction 시 반드시 지켜야 하는 규칙

- `Toast`는 항상 `600 x 64` shell로 유지한다.
- `leadingStatusIcon`, `dismissIcon`을 제거하면 안 된다.
- `contentBlock`은 반드시 `title + message` 2-row 구조를 유지한다.
- title/message typography를 임의로 bold hierarchy로 분리하면 안 된다.
- non-neutral state의 tinted surface와 border를 flat neutral surface로 평탄화하면 안 된다.
- `state=neutral`을 `system`과 같은 light-tinted state로 구현하면 안 된다.

## verified HTML / CSS implementation

- Figma 기준 node는 UI-5.1 component set `9064:2211`다.
- 구현 source는 `site/app.js`의 `toastMessageMarkup`, `messagePreview("toast")`, `toastMessageHtmlExample`이다.
- HTML root는 기존 제품 selector `.toast-message`와 state selector `.danger`, `.warning`, `.success`, `.info`, `.system`, `.message`를 먼저 사용하고, 의미 속성 `data-toast-message`와 `data-state`를 함께 둔다.
- `sonar5.css`의 `.toast-message`, `.toast-message-content`, `.toast-text`, `.toast-title`, `.toast-message-text`, `.toast-close`를 재사용하고, Figma의 `600 x 64`, state별 surface/border/text, neutral dark surface는 `site/component-css/component.css`의 `.toast-message[data-toast-message]` 계열 selector에서 보정한다.
- exact page: `site/component/supporting/toast.html`
- catalog route: `site/index.html#components`
- verified exact page는 `site/component/supporting/toast.html`이고 catalog route는 `site/index.html#components`다.
- QA 결과: `file://` exact page와 catalog route에서 mismatch count `0`.

## pending / later decision log

- toast stack / placement orchestration contract
