# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/supporting/divider.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `17193:11462`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Divider.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=mismatch count 0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

Divider

## 목적

- 작은 visual separator primitive다.
- 서로 다른 기능 그룹이나 성격이 다른 control group 사이의 경계를 가볍게 드러내는 데 사용한다.

## 현재 source 읽는 법

- current source 기준으로는 `vertical divider`만 확인됐다.
- divider primitive는 항상 `2 x 12 px`다.
- divider primitive는 항상 flat rectangle이다.
- divider fill color는 항상 `semantic.color.divider.default`다.
- divider fill fallback color는 항상 `rgba(126,140,222,0.16)`이다.
- divider radius는 금지한다.
- divider stroke는 금지한다.
- divider shadow는 금지한다.
- full-height `1 x 24` divider 해석은 금지한다.
- `roughly similar compact line` 같은 느슨한 해석은 금지한다.
- 현재 page에서 확인된 source는 단일 primitive 수준의 간단한 시각 요소다.

## 구조 / anatomy

- minimal visual separator primitive
- 의미 있는 내부 sub-part나 복합 anatomy는 없다.
- exact primitive size는 active contract에 포함한다.
- visible primitive는 항상 `2 x 12` fill rectangle 한 개다.
- rounded line, pill, capsule, hairline substitute는 금지한다.
- 다른 neutral border token이나 shell border token으로 대체하는 것은 금지한다.

## variant/property naming rule

- current source 기준 confirmed prop/state는 없다.
- `orientation`, `size`, `thickness`, `state` 같은 축은 아직 source로 확인되지 않았다.

## 사용 가이드

- 서로 다른 기능 그룹을 한 줄 안에서 함께 정렬할 때, 두 그룹 사이를 시각적으로 분리할 때 사용한다.
- 예를 들어 `Tenant selector`와 icon-only 사용자 행동 그룹 사이나, `추가` 같은 text button과 일반 icon button group 사이에 사용한다.
- 같은 계층의 icon-only 사용자 행동 버튼끼리는 divider 없이 함께 묶는다.
- `mode selector + profile icon button + apps icon button`는 divider 없이 하나의 group으로 읽는다.
- action bar와 GNB는 대표 예시일 뿐, usage를 그 둘로만 잠그지 않는다.
- container border를 divider primitive로 대체하지 않는다.
- container bottom border와 divider primitive는 서로 다른 grammar다.

## 예외 처리 규칙

- current source 기준 문서 계약은 vertical primitive까지만 다룬다.
- horizontal version이나 추가 variant는 실제 source가 생기기 전까지 문서 표준으로 올리지 않는다.

## implementation / reconstruction proof rule

- divider가 exact `2 x 12`인지 확인한다.
- divider fill color가 `semantic.color.divider.default` 또는 fallback `rgba(126,140,222,0.16)`인지 확인한다.
- divider에 radius, stroke, shadow가 없는지 확인한다.
- divider가 rounded line, pill, capsule, hairline substitute로 바뀌지 않았는지 확인한다.
- container border를 divider primitive로 대체하지 않았는지 확인한다.

## UI-5.1 implementation sync record

- sync date: `2026-05-15`
- Figma node: `17193:11462`
- implemented HTML owner: `site/app.js`
- implemented CSS owner: `site/component-css/component.css`
- reused product selector grammar: `.divider-vertical`
- `sonar5.css`는 reference로만 사용했고 수정하지 않았다.
- `styles.css`는 이번 작업의 수정 대상이 아니다.
- exact component page QA: `component/supporting/divider.html`
- catalog route QA: `index.html#components`
- QA result: mismatch count `0`
- confirmed rendered coverage: `2 x 12`, fill `rgba(126,140,222,0.16)`, radius 없음, stroke 없음, shadow 없음
