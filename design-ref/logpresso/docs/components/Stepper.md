# Stepper

## AI Contract

- status: `blocked`
- exactHtml: `source required`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `source required`
- baseCss: `source required`
- gapCss: `none documented`
- sourcePointer: `ui/docs/components/Stepper.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=blocked`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

## 목적

- `Stepper`는 wizard, setup flow, multi-step task의 현재 단계와 진행 순서를 보여주는 process navigation component다.
- `Stepper`는 tab navigation, pagination, progress bar와 다르다.
- 화면설계에서는 단계형 form, onboarding, setup wizard의 정보 구조를 표현하기 위해 사용한다.

## 문서화 대상 범위

- stepper root
- repeated step item
- step indicator
- step label
- optional description
- connector line
- current/completed/error state

## core anatomy

- `StepperRoot`
- repeated `StepItem`
- `StepIndicator`
- `StepLabel`
- optional `StepDescription`
- optional `StepConnector`

## variant / property naming rule

- `orientation`
  - `horizontal`
  - `vertical`
- `state`
  - `pending`
  - `current`
  - `completed`
  - `error`
- `labelVisibility`
  - `label`
  - `label-description`
  - `indicator-only`

## layout / visual 규칙

- horizontal stepper는 step item을 좌우로 배치하고 connector line으로 순서를 표시한다.
- vertical stepper는 step item을 위아래로 배치한다.
- current step은 visual emphasis를 가진다.
- completed step은 check 또는 completed indicator를 사용할 수 있다.
- error step은 semantic error token을 사용한다.
- step indicator의 icon source는 [icon.md](../foundation/icon.md)를 따른다.

## 사용해야 하는 경우

- multi-step setup wizard
- 단계형 form
- onboarding progress
- sequential task flow

## 사용하지 말아야 하는 경우

- 같은 depth의 view switching
- table pagination
- continuous progress value
- breadcrumb path display

## child family reference

- view switching은 [tab.md](tab.md), [tabNav.md](tabNav.md), [pillTabs.md](pillTabs.md)를 사용한다.
- continuous value progress는 [ProgressBar.md](ProgressBar.md)를 사용한다.
- page navigation은 [Pagination.md](Pagination.md)를 사용한다.
- form content는 [Form Layout.md](Form%20Layout.md)를 참조한다.

## current spec에서 제외하는 것

- wizard routing policy
- step validation lifecycle
- optional/skipped step semantics
- responsive overflow policy
- clickability policy

## implementation / reconstruction 시 반드시 지켜야 하는 규칙

- Stepper를 tab처럼 같은 depth 화면 전환에 사용하지 않는다.
- current/completed/pending/error state를 indicator와 label hierarchy에 함께 반영한다.
- connector line을 progress bar로 해석하지 않는다.
- step content의 form layout은 Stepper가 아니라 Form Layout이 소유한다.

## pending / later decision log

- skipped/optional state naming
- clickable step navigation 허용 여부
- compact mobile stepper variant

## 라이트 테마 추가 해석

- light theme에서는 connector line을 subtle divider로 읽고 current step만 brand accent를 사용한다.
- completed indicator는 dark fill보다 semantic success/brand state로 표현한다.
