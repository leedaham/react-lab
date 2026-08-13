# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/supporting/modal.html`
- catalogRoute: `site/index.html#components`
- root selector / data attribute: `source required`
- figma: `8902:3768 Modal / width=1120, 12200:4352 Modal / width=360`
- base CSS selector from `sonar5.css`: `site/sonar5.css`
- gap CSS selector from `component-css/component.css`: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Modal.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

Modal

## 목적

- `Modal`은 overlay 문맥에서 사용하는 modal shell family다.
- 이 문서는 modal shell의 width variant, region 구조, shell visual grammar만 implementation/reconstruction-grade 기준으로 잠근다.
- child content의 exact recipe는 이 문서가 소유하지 않는다.

## family boundary

- family canonical 범위
  - `Modal / width=1120`
  - `Modal / width=880`
  - `Modal / width=600`
  - `Modal / width=360`
- region canonical 범위
  - `modalHeader`
  - `modalBody`
  - `modalFooter`
- local usage
  - `footerLeadingOption`
  - `footerActions`

## current truth

- `Modal`은 width variant를 가진 shell family로 읽는다.
- current source에서 직접 확인되는 width는 `1120 | 880 | 600 | 360`이다.
- 모든 visible source variant는 `modalHeader -> modalBody -> modalFooter` 3-region 구조를 가진다.
- `modalFooter`는 current product rule 기준 필수 region으로 읽는다.
- modal을 닫는 action은 항상 footer 안에 존재한다.
- 닫기 action의 exact label은 고정하지 않지만, footer 안에서 modal close가 가능해야 한다.

## 구조 / anatomy

- `ModalRoot`
  - `modalHeader`
    - `label`
  - `modalBody`
  - `modalFooter`
    - `footerLeadingOption?`
    - `footerActions`

## visual shell 규칙

### outer shell

- shell background는 항상 `semantic.color.background.canvas`다.
- resolved value는 theme이 결정한다. 현재 확인값은 light `#f3f5fa`, dark `#0b0f15`다.
- fallback `#0b0f15`는 dark source reference일 뿐이고, light theme 구현에서는 semantic token이 theme value를 결정한다.
- outer border는 항상 `1px solid semantic.color.border.default`다.
- resolved value는 theme이 결정한다. 현재 확인값은 light `rgba(23,39,101,0.16)`, dark `rgba(126,140,222,0.16)`다.
- outer radius는 항상 `16px`이다.
- shell은 항상 `overflow clip`을 유지한다.
- shell shadow는 항상 `shadow/base`다.
  - `0 2 3 rgba(0,0,0,0.10)`
  - `0 1 2 rgba(0,0,0,0.06)`

### width / height

- width variant는 `1120 | 880 | 600 | 360`이다.
- overall height는 content-driven이다.
- shell preview source에는 `600` 높이 sample이 보이지만, populated example source는 `170`, `248`, `258`, `384`, `450`, `479.115...`, `522`, `763`처럼 달라진다.
- 따라서 `Modal`의 overall height를 `600`으로 고정하면 안 된다.

## region 규칙

### modalHeader

- populated example source 기준 `modalHeader` 높이는 항상 `56`이다.
- `modalHeader`는 항상 `px 16 / py 16` inset을 가진다.
- `modalHeader`는 항상 하단 accent border를 가진다.
- header bottom border color는 항상 `semantic.color.interactive.brand.accent / #ff692a`다.
- header 내부 current source proof는 `label` block 하나뿐이다.
- `label`은 `Title + Caption Text` vertical stack으로 읽는다.
- title typography는 항상 `Pretendard Bold / 16 / 24 / letter-spacing 0`이다.
- title foreground는 항상 `semantic.color.text.primary`다. 현재 확인값은 light `#191919`, dark `#ebebeb`다.
- caption typography는 항상 `Pretendard Regular / 14 / 20 / letter-spacing 0`이다.
- caption foreground는 항상 `semantic.color.text.helper`다. 현재 확인값은 light/dark 모두 `#808080`다.
- label block 내부 gap은 항상 `4`다.
- current source에는 close action이 직접 확인되지 않는다.
- 따라서 close action을 header required slot로 승격하면 안 된다.
- caption은 shell preview source에서 직접 확인되고, populated example source에서는 생략될 수 있다.
- 따라서 `Caption Text`는 visible source proof가 있는 supporting text로 읽되, 모든 modal의 required slot로 고정하지 않는다.

### modalBody

- `modalBody`는 width를 full로 유지하는 flexible content region으로 읽는다.
- `modalBody` 높이는 content-driven이다.
- current source populated examples에서 body 내부 기본 inset은 `16`으로 반복 확인된다.
- `modalBody` 안의 direct child block는 vertical stack tendency를 가진다.
- body 안의 exact block 종류는 고정하지 않지만, current visible source에서는 아래 family가 직접 확인된다.
  - `Input`
  - `Button`
  - `Blankslate`
  - `tableGrid` 기반 list/table composition
  - `dropdownList`
  - `searchButton`
  - `InlineMessage`
- body는 fixed skeleton이 아니라 content stack container다.
- exact scroll behavior, exact direct child order, exact required child set은 이 문서가 잠그지 않는다.
- body direct child block 간 간격은 current visible source 기준 항상 `16`으로 읽는다.
- body 내부 stack gap은 `16px rhythm`이 아니라 exact `16px`로 잠근다.
- viewport 높이 제약으로 modal overall height가 줄어드는 경우, scroll은 body 내부에서만 발생한다.
- 이 경우에도 header와 footer는 region으로 유지되고, body만 overflow region으로 읽는다.

### modalFooter

- current visible source에서 `modalFooter` 높이는 항상 `62`다.
- `modalFooter`는 항상 상단 divider를 가진다.
- footer top border color는 항상 `semantic.color.border.default / rgba(126,140,222,0.16)`다.
- footer inset은 항상 `16`이다.
- footer는 horizontal row로 읽는다.
- `footerLeadingOption`이 없는 source proof에서는 trailing action만 right-aligned로 놓인다.
- `footerLeadingOption`이 있는 source proof에서는 leading option과 trailing actions가 양 끝으로 분리된다.
- `modalFooter`의 exact content 조합은 fixed contract가 아니다.
- 다만 footer 안에는 항상 modal close를 수행할 수 있는 action이 있어야 한다.

## footer local usage boundary

- `footerActions`는 trailing action cluster local usage다.
- current source proof에서는 `Button` 2개가 보이지만, exact button count와 exact semantic role은 canonical contract가 아니다.
- `footerLeadingOption`은 local usage다.
- `footerLeadingOption` primitive truth는 새 modal 전용 control이 아니다.
- `footerLeadingOption`은 `Checkbox(size=sm)` + label 조합으로 읽는다.
- `Checkbox` primitive truth는 [Checkbox.md](Checkbox.md)가 소유한다.
- footer leading label block truth는 [fieldLabel.md](fieldLabel.md)가 소유한다.
- `footerLeadingOption`을 `Modal` family canonical slot로 승격하면 안 된다.
- `footerActions` 안의 exact button count와 exact label은 local usage다.
- 다만 footer 안에는 항상 modal close를 수행하는 action이 포함되어야 한다.

## child family reference

- footer button truth는 [Button.md](Button.md)가 소유한다.
- footer leading checkbox truth는 [Checkbox.md](Checkbox.md)가 소유한다.
- footer leading label truth는 [fieldLabel.md](fieldLabel.md)가 소유한다.
- `Modal`은 child primitive의 size, typography, icon, token을 다시 정의하지 않는다.

## current spec에서 제외하는 것

- `footerLeadingOption`을 modal 공통 variant로 승격하는 해석
- `footerActions`의 exact button count를 canonical contract로 승격하는 해석
- header에 close action이 항상 있다고 가정하는 해석
- body 내부를 fixed skeleton이나 fixed table/form recipe로 고정하는 해석
- `Modal` overall height를 `600`으로 고정하는 해석
- `modalHeader`를 항상 `80` height로 고정하는 해석

## implementation / reconstruction 시 반드시 지켜야 하는 규칙

- `Modal`은 width variant shell family로 구현하거나 재구성한다.
- shell background, border, radius, shadow를 임의 완화하면 안 된다.
- `modalHeader`의 accent bottom border를 제거하면 안 된다.
- `modalFooter`의 top divider를 제거하면 안 된다.
- `modalHeader`는 populated example current truth 기준 `56` height로 읽는다.
- `modalBody`는 content-driven height와 `16px` inset stack tendency를 유지한다.
- `modalBody` direct child block gap은 exact `16`을 유지한다.
- viewport 높이 제약이 생기면 body만 internal scroll region이 된다.
- `modalFooter`를 fixed button recipe로 구현하거나 재구성하면 안 된다.
- `modalFooter`를 제거하거나, footer 밖에서만 modal close가 가능하게 구현하면 안 된다.
- `footerLeadingOption`을 모든 modal의 필수 요소로 승격하면 안 된다.
- `footerLeadingOption`을 modal 전용 primitive로 다시 만들면 안 된다.
- header close action을 modal current truth로 역주입하면 안 된다.
- body 내부 exact recipe가 없는데도 table/form/detail skeleton을 임의 고정하면 안 된다.
- shell preview source만 보고 `height=600`, `header=80`, `body=458`을 universal truth로 승격하면 안 된다.

## pending / later decision log

- body internal scroll의 max-height / threshold 계산식을 별도 문서에서 잠글지 여부

## UI-5.1 sync 기록

- sync date: 2026-05-15
- Figma nodes: `8902:3768` `Modal / width=1120`, `12200:4352` `Modal / width=360`
- implemented HTML source: `site/app.js`
- exact page: `site/component/supporting/modal.html`
- catalog route: `site/index.html#components`
- CSS owner: `sonar5.css` 기존 `.modal` selector grammar 재사용 + `component-css/component.css` Figma gap 보정.
- `sonar5.css` 수정 여부: 수정하지 않음.
- `styles.css` 수정 여부: 수정하지 않음.

## 구현 selector

- `.modal`
- `.modal-xs`
- `.modal-title`
- `.modal-content`
- `.modal-footer`
- `.btn`
- `.btn-default`
- `.btn-primary`
- `.input`
- `.textarea`
- `.checkbox`

## 별도 CSS 보정

- `.modal[data-modal-shell]`: flex column, overflow clip, canvas background, default border, 16px radius, shadow/base 보정.
- `.modal[data-modal-size="360"]`: `sonar5.css`의 `min-width`가 360px width variant를 막지 않도록 width와 min-width gap 보정.
- `.modal[data-modal-shell] > .modal-title`: 56px header, 16px inset, accent bottom border 보정.
- `.modal[data-modal-shell] > .modal-content`: 16px inset, body-only scroll region, 16px stack gap 보정.
- `.modal[data-modal-shell] > .modal-footer`: 62px footer, 16px inset, top divider, leading/trailing split 보정.

## QA 기록

- exact component page: `site/component/supporting/modal.html`
- catalog route: `site/index.html#components`
- exact page에서 open/close interaction, `role="dialog"`, `aria-modal="true"`, width 360px, header 57px, footer 62px, radius 16px, shadow/base를 확인했다.
- theme computed value를 확인했다. light는 canvas `rgb(243, 245, 250)`, text `rgb(25, 25, 25)`, border `rgba(23, 39, 101, 0.16)`이고, dark는 canvas `rgb(11, 15, 21)`, text `rgb(235, 235, 235)`, border `rgba(126, 140, 222, 0.16)`이다.
- catalog route에서 `Modal` 카드와 `./component/supporting/modal.html` 링크를 확인했다.
- mismatch count: 0
