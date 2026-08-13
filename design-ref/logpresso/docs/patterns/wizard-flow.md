# Workflow / Guided Setup

## 목적

- `Workflow / Guided Setup` pattern은 수집기 생성, 대시보드 위젯 추가, 플레이북 구성처럼 순서와 선행 조건이 중요한 task flow를 구성한다.
- 이 패턴은 설정 패널, 선택/조회 패널, 구성 캔버스 또는 preview, 저장 action placement를 소유한다.
- form, action bar, tree panel, button, alert의 exact recipe는 각 component 문서가 소유한다.

## source order

1. [Page Layout](../components/Page%20Layout.md)
2. [Action Bar](../components/Action%20Bar.md)
3. [Form Layout](../components/Form%20Layout.md)
4. [Tree Panel Composition](../components/Tree%20Panel%20Composition.md)
5. [Button](../components/Button.md)
6. [InlineAlert](../components/InlineAlert.md)
7. [content](../foundation/content.md)
8. [accessibility](../foundation/accessibility.md)

## required composition

- 상단 action bar는 작업 추가, 정렬/편집 도구, 저장/취소 action을 화면 맥락에서 분리한다.
- 좌측 또는 첫 번째 패널은 이름, 설명, 실행 주기, 매개변수처럼 작업 속성을 입력한다.
- 선택/조회 패널은 데이터 유형, 조회 대상, 범위, tree selection처럼 workspace를 구성하는 대상을 고른다.
- canvas 또는 preview 영역은 구성 결과, 빈 상태, 불러오기 요청, 선택 결과를 표시한다.
- validation은 필요한 패널 또는 필드 근처에 노출하고 저장 action과 연결한다.

## state coverage

- empty workspace
- target selected
- preview loaded
- validation error
- saving
- save success
- cancel confirmation

## forbidden rule

- stepper가 없는 builder 화면을 억지로 단계형 wizard로 표현하면 안 된다.
- 속성 패널, 선택 패널, canvas/preview 영역의 소유 역할을 섞으면 안 된다.
- validation 실패 시 어떤 패널 또는 필드를 수정해야 하는지 알려 주지 않으면 안 된다.
- 저장, 저장 후 나가기, 취소 action의 결과 차이를 같은 weight로 숨기면 안 된다.
