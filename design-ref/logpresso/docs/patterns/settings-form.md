# Settings / Policy Form

## 목적

- `Settings / Policy Form` pattern은 설정, 정책, 계정, 프로필, 수집 모델 같은 입력 중심 화면을 구성한다.
- 이 패턴은 section grouping, repeated fieldset, field order, validation summary, action placement를 소유한다.
- 각 input primitive의 exact recipe는 component 문서가 소유한다.

## source order

1. [Page Layout](../components/Page%20Layout.md)
2. [Form Layout](../components/Form%20Layout.md)
3. [Input](../components/Input.md)
4. [Select](../components/Select.md)
5. [Textarea](../components/Textarea.md)
6. [Checkbox Group](../components/Checkbox%20Group.md)
7. [Radio Group](../components/Radio%20Group.md)
8. [Switch Group](../components/Switch%20Group.md)
9. [InlineAlert](../components/InlineAlert.md)
10. [content](../foundation/content.md)
11. [accessibility](../foundation/accessibility.md)

## required composition

- 화면은 목적별 section으로 나눈다.
- 각 section은 title, optional description, repeated fieldset stack, optional supporting message를 가진다.
- fieldset은 하나의 field와 그 field에 종속된 helper/error message를 한 세트로 묶으며 같은 구조로 반복된다.
- field는 label, control, helper/error message relation을 fieldset 안에서 유지한다.
- form action은 저장/취소/삭제의 위험도를 분리한다.
- validation은 fieldset 내부의 field-level error와 screen-level summary를 함께 제공한다.

## state coverage

- pristine
- dirty
- repeated fieldsets
- saving
- saved
- field error
- screen-level validation error
- destructive confirmation required

## forbidden rule

- placeholder를 label 대신 사용하면 안 된다.
- helper text와 error text를 같은 위치에서 동시에 모호하게 표시하면 안 된다.
- 저장 action이 화면 밖에서만 보이면 안 된다.
- disabled field의 이유를 숨기면 안 된다.
