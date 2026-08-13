# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/supporting/blankslate.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 / 8819:12860`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Blankslate.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=mismatch count 0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

Blankslate

## 목적

- `Blankslate`는 empty-state 화면에서 쓰는 centered content composition pattern이다.
- 이 문서는 `Blankslate`가 직접 소유하는 vertical ordering, centered alignment, action region 구조만 implementation/reconstruction-grade 기준으로 잠근다.
- child primitive의 visual truth는 기존 family를 재사용한다.

## current source 읽는 법

- current source는 giant empty-state primitive보다 `reusable composition pattern`으로 읽는다.
- large dark canvas 위에 centered content stack이 직접 확인된다.
- current source에서 직접 보이는 top-level role은 `Title`, `Description`, `SubLabel`, `PrimaryAction`, `SecondaryAction`이다.
- current source는 one-button + one text action 조합을 직접 보여준다.

## 구조 / anatomy

- `Blankslate`
  - `Title`
  - `Description`
  - `SubLabel`
  - `PrimaryAction`
  - `SecondaryAction`

## current truth

- `Blankslate`는 large empty canvas/surface 안에서 centered vertical stack을 만든다.
- top-level ordering은 항상 `Title -> Description -> SubLabel -> PrimaryAction -> SecondaryAction`이다.
- `PrimaryAction`은 filled primary action reading을 가진다.
- `SecondaryAction`은 text-link-like secondary action reading을 가진다.
- current source는 one primary action + one secondary action 조합을 직접 확인시킨다.
- `Title`, `Description`, `SubLabel`은 text hierarchy role을 보여주는 parent-owned slot naming이다.
- `Blankslate`는 child primitive의 exact typography, exact button recipe를 다시 정의하지 않는다.

## composition 규칙

- content stack은 large surface 안에 centered 배치된다.
- top-level children은 vertical order를 유지한다.
- `PrimaryAction`과 `SecondaryAction`은 action region을 구성하지만, exact interaction contract는 child 문서가 소유한다.
- `Blankslate`는 empty-state의 centered composition grammar를 소유한다.
- exact business copy, exact wording, exact domain semantics는 sample truth다.

## child family reference

- `PrimaryAction` primitive truth는 [Button.md](Button.md)가 소유한다.
- text hierarchy의 exact typography truth는 [typography.md](../foundation/typography.md)가 소유한다.
- color/background/token truth는 [color.md](../foundation/color.md)가 소유한다.
- radius, border, shadow lower rule은 foundation 문서가 소유한다.

## current spec에서 제외하는 것

- illustration/icon empty-state를 current truth로 승격하는 해석
- action이 없는 variant를 current truth로 승격하는 해석
- button 2개, secondary button, tertiary action 조합을 current truth로 승격하는 해석
- `Blankslate`가 `Button`이나 text-link primitive visual truth를 다시 소유하는 해석
- `Title`, `Description`, `SubLabel`의 exact typography를 이 문서가 직접 소유하는 해석

## implementation / reconstruction 시 반드시 지켜야 하는 규칙

- `Blankslate`는 centered empty-state composition으로 구현/재구성한다.
- top-level ordering을 바꾸면 안 된다.
- `PrimaryAction`과 `SecondaryAction`을 삭제하거나 같은 역할로 평탄화하면 안 된다.
- child primitive truth를 `Blankslate` 문서 안에서 다시 발명하면 안 된다.
- current source에 없는 illustration/icon/action breadth를 임의로 추가하면 안 된다.

## Dashboard state coverage usage

- Dashboard empty coverage는 empty dashboard 또는 empty table/list fallback에 사용할 수 있다.
- Smoke 화면에서 empty dashboard를 실제 rendered state로 전환하지 않고 ledger-only로 기록할 수 있다.
- Permission denied, refresh failed, partial data unavailable은 Blankslate 하나로 합치지 않는다. 각 상태는 permission/error/feedback source에 따라 분리한다.
- Product copy, action label, permission policy는 product spec이 없으면 deferred로 둔다.

## Figma evidence

- Figma file: `UI-5.1`
- Figma node: `8819:12860`
- node type: `COMPONENT`
- confirmed size: `1192 x 992`
- confirmed boolean props: `title`, `context`, `subtitle`, `button`, `text-link`
- confirmed anatomy: `Title`, `Description`, `SubLabel`, `PrimaryAction`, `SecondaryAction`
- unconfirmed and excluded from this contract: illustration, icon, actionless variant, multi-button variant, business copy variants

## 구현 기준

- exact page: `site/component/supporting/blankslate.html`
- catalog route: `site/index.html#components`
- source owner: `site/app.js`
- source helpers: `blankslateMarkup()`, `blankslatePreview()`, `blankslateHtmlExample()`
- component CSS owner: `site/component-css/component.css`
- documentation shell CSS owner for preview frame only: `site/styles.css`
- reused `sonar5.css` selector grammar: `.btn`, `.btn-primary`, `.btn-link`, `.btn-md`
- component body selectors: `[data-blankslate]`, `[data-blankslate-title]`, `[data-blankslate-context]`, `[data-blankslate-subtitle]`, `.btn[data-blankslate-primary]`, `.btn[data-blankslate-link]`
- HTML handoff는 전체 snippet 복사가 아니라 exact page, source helper, selector contract를 기준으로 한다.

## QA status

- QA issue: `site/issue-20260519-1401-blankslate-doc-qa-refresh`
- QA evidence: `html-render-evidence.json`
- exact page result: `[data-blankslate]` root `1192 x 992`, slot order `Title > Description > SubLabel > PrimaryAction > SecondaryAction`
- catalog route result: `Blankslate` link resolves to `component/supporting/blankslate.html`
- stylesheet result: `sonar5.css`, `styles.css`, `component-css/component.css` loaded
- forbidden body selector count: `0` for `demo-blankslate`, `ui-blankslate`, `lp-blankslate`
- mismatch count: `0`
- documentation gate: `allowed`
- `sonar5.css`는 읽기 전용 reference로만 사용했고 수정하지 않았다.

## pending / later decision log

- action 없는 empty-state breadth를 current source에 추가할지 여부
- richer empty-state breadth(illustration, multi-button)를 별도 proof로 추가할지 여부

## UI-5.1 implementation sync record

- sync date: `2026-05-15`
- Figma node: `8819:12860`
- implemented HTML owner: `site/app.js`
- implemented CSS owner: `site/component-css/component.css`
- reused product selector grammar: `.btn`, `.btn-primary`, `.btn-link`, `.btn-md`
- `sonar5.css`는 reference로만 사용했고 수정하지 않았다.
- exact component page QA: `component/supporting/blankslate.html`
- catalog route QA: `index.html#components`
- QA result: mismatch count `0`
- confirmed rendered coverage: root `1192x992`, centered stack, `Title`, `Description`, `SubLabel`, `PrimaryAction`, `SecondaryAction`
