# content

## 목적

- 이 문서는 current spec 문서 체계에서 shared content, terminology, message pattern boundary를 정의한다.
- 이 문서는 제품별 실제 문구 전체를 새로 작성하지 않는다.
- 이 문서는 AI 에이전트가 목업이나 화면설계를 만들 때 label, helper, error, empty, loading 문구를 임의로 만들지 않도록 공통 기준을 잠근다.

## source of truth

- 제품 도메인 용어집이나 화면별 문구가 별도로 잠겨 있으면 해당 문서를 우선한다.
- component 문서가 slot별 content rule을 잠그면 component 문서를 우선한다.
- 이 문서는 공통 문장 구조, 상태 메시지 hierarchy, i18n formatting boundary를 소유한다.
- 문구는 UI 구조를 설명하기 위한 placeholder가 아니라 사용자의 다음 행동을 명확히 안내해야 한다.

## 소유하는 truth

- label은 짧고 명사형 또는 명사구를 우선한다.
- button text는 사용자가 실행하는 동작을 동사형으로 표현한다.
- destructive action은 대상과 결과를 문구에서 숨기지 않는다.
- helper text는 입력 전 이해를 돕고, error text는 실패 원인과 수정 방법을 알려야 한다.
- empty state는 빈 이유, 사용자가 할 수 있는 다음 행동, 필요 시 primary action을 포함한다.
- loading text는 완료를 약속하지 않고 현재 처리 중인 범위를 설명한다.
- toast는 결과 요약을 짧게 전달하고, 자세한 복구가 필요한 오류는 inline alert 또는 modal로 승격한다.
- table/list cell은 축약이 필요하면 full value를 접근 가능한 방식으로 확인할 수 있어야 한다.
- placeholder는 label을 대체하지 않는다.
- 날짜, 시간, 숫자, 파일 크기, 비율은 locale-aware formatting을 우선한다.
- 한국어와 영어가 섞일 때 제품 고유명사와 코드 식별자는 원문을 유지한다.
- technical term은 처음 등장하거나 문맥이 불명확할 때 설명을 붙인다.
- AI가 예시 데이터를 만들 때 실제 고객명, 계정, IP, 보안 이벤트처럼 오해될 수 있는 값을 사용하지 않는다.

## usage boundary

- content foundation은 shared wording rule, message hierarchy, terminology boundary를 소유한다.
- component 문서는 slot별 text placement와 required/optional content slot을 소유한다.
- product screen spec은 실제 문구, 도메인 용어, 법적 고지, 정책 문구를 소유한다.
- accessibility foundation은 accessible name, aria label, screen reader relation을 소유한다.
- example-only sample은 content canonical truth를 만들지 못한다.

## forbidden rule

- placeholder를 label 대신 사용하는 것은 금지한다.
- `확인`, `처리`, `적용`처럼 대상과 결과가 불분명한 action label을 반복 사용하는 것은 금지한다.
- error message에서 실패 원인 없이 `오류가 발생했습니다`만 쓰는 것은 금지한다.
- 빈 화면에 다음 행동 없이 장식 문구만 두는 것은 금지한다.
- loading state를 성공 또는 완료 상태처럼 표현하는 것은 금지한다.
- 제품에서 확인되지 않은 도메인 용어를 임의로 canonical term처럼 쓰는 것은 금지한다.
- 화면설계 예시에서 실제 개인정보 또는 보안 민감정보처럼 보이는 값을 사용하는 것은 금지한다.

## 관련 문서

- [components.md](../components/components.md)
- [accessibility.md](accessibility.md)
- [typography.md](typography.md)
- [fieldLabel.md](../components/fieldLabel.md)
- [Input.md](../components/Input.md)
- [Textarea.md](../components/Textarea.md)
- [Button.md](../components/Button.md)
- [InlineAlert.md](../components/InlineAlert.md)
- [Toast.md](../components/Toast.md)
- [Blankslate.md](../components/Blankslate.md)
- [Table.md](../components/Table.md)

## 이 문서가 소유하지 않는 것

- 제품별 실제 카피 전체
- 마케팅 문구 톤앤매너
- 법무 검토가 필요한 고지문
- 다국어 번역문 전체
- 도메인별 공식 용어집 전체
