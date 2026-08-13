# Form Layout

## AI Contract

- status: `blocked`
- exactHtml: `source required`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `source required`
- baseCss: `source required`
- gapCss: `none documented`
- sourcePointer: `ui/docs/components/Form Layout.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=blocked`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

## 목적

- `Form Layout`은 label, control, help/error message, action row를 화면 단위로 배치하는 form parent composition이다.
- 이 문서는 `Input`, `Select`, `Textarea`, `DateInput`, `DateRangeInput`, `Checkbox Group`, `Radio Group`, `Switch Group`의 visual truth를 다시 정의하지 않는다.
- 다른 AI 에이전트가 설정 화면, 생성/수정 화면, modal form을 재구성할 때 먼저 `Form Layout`을 읽고 child control 문서를 추가로 읽는다.

## 문서화 대상 범위

- form root와 field stack
- field row / field group 배치
- label column과 control column 관계
- help/error message slot placement
- action row placement

## core anatomy

- `FormRoot`
- repeated `FieldGroup`
- `FieldLabelSlot`
- `ControlSlot`
- optional `HelpTextSlot`
- optional `ErrorTextSlot`
- optional `FieldDescriptionSlot`
- optional `FormSectionTitle`
- optional `ActionRow`

## variant / property naming rule

- `layout`
  - `vertical`
  - `horizontal`
- `density`
  - `default`
  - `compact`
- `actionPlacement`
  - `bottom`
  - `inline-end`
- `validationMode`
  - `none`
  - `field`
  - `summary`

## layout 규칙

- `FormRoot`는 field를 위에서 아래로 누적한다.
- `vertical` layout은 label이 control 위에 온다.
- `horizontal` layout은 label column과 control column을 같은 row에 둔다.
- `horizontal` layout에서 label column width는 parent form이 소유한다.
- control width는 각 child family의 min/max 또는 parent container가 소유한다.
- help/error message는 control column 아래에 붙는다.
- required marker는 [fieldLabel.md](fieldLabel.md)의 label grammar를 따른다.
- field 사이 gap은 `8px` 이상으로 유지하되, exact field 내부 padding은 child control 문서가 소유한다.
- section이 여러 개면 section 간 gap은 field gap보다 커야 한다.

## state 규칙

- field-level `error`는 child control의 `status=error`와 message slot 조합으로 표현한다.
- form-level `disabled`가 필요하면 child control의 disabled state를 일괄 적용한다.
- loading 상태에서 field skeleton을 쓸 수 있지만 skeleton visual recipe는 이 문서가 소유하지 않는다.
- validation summary는 optional region이며, `InlineAlert` 또는 `InlineMessage`를 참조한다.

## 사용해야 하는 경우

- 설정 화면
- 생성/수정 form
- modal 또는 drawer 안의 form
- 검색 조건 편집 form
- label/control/message가 반복되는 화면

## 사용하지 말아야 하는 경우

- 단일 검색창 또는 단일 입력 컨트롤만 배치할 때
- table cell 안의 embedded edit field
- dropdown 내부 search/filter field
- wizard step orchestration 전체

## child family reference

- label primitive는 [fieldLabel.md](fieldLabel.md)가 소유한다.
- text field는 [Input.md](Input.md), [Textarea.md](Textarea.md)가 소유한다.
- selection field는 [Select.md](Select.md)가 소유한다.
- date field는 [DateInput.md](DateInput.md), [DateRangeInput.md](DateRangeInput.md)가 소유한다.
- action row button은 [Button.md](Button.md), [buttonGroup.md](buttonGroup.md)가 소유한다.
- field-level status message는 child control 문서와 [InlineAlert.md](InlineAlert.md)를 함께 참조한다.

## current spec에서 제외하는 것

- backend validation policy
- submit lifecycle
- wizard step state
- schema-driven form engine
- responsive breakpoint exact value
- all controls의 exact width 통합 규칙

## implementation / reconstruction 시 반드시 지켜야 하는 규칙

- label, control, message를 하나의 field group으로 묶는다.
- message slot을 label column 아래에 두면 안 된다.
- horizontal layout에서는 모든 control start edge가 같은 x축에 정렬되어야 한다.
- child control의 height, radius, border, typography를 Form Layout에서 바꾸면 안 된다.
- action row는 field stack과 분리된 마지막 region으로 둔다.

## pending / later decision log

- responsive breakpoint를 token으로 둘지 여부
- validation summary component를 독립 문서로 승격할지 여부
- wizard/stepper form과 일반 form을 분리할지 여부

## 라이트 테마 추가 해석

- light theme에서는 form background를 강한 dark panel로 만들지 않는다.
- label은 dark primary/helper hierarchy를 유지하고, control은 white/light surface와 subtle border로 읽는다.
- error message는 child control의 semantic error token을 따른다.
