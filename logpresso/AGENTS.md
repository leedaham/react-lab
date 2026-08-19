# logpresso 작업 가이드

이 문서는 `logpresso/` 폴더 내부 작업에만 적용합니다.
상위 저장소 규칙보다 더 구체적인 이 폴더 전용 규칙만 간략히 적습니다.

## 목적

- `logpresso/`는 Sonar 연동용 React 공통 모듈입니다.
- 다른 프로젝트가 이 폴더만 subtree 또는 복사 방식으로 가져가서 사용합니다.
- 전체 앱 템플릿이 아니라, 기존 React 앱에 붙는 독립 모듈로 유지해야 합니다.

## 현재 구조

- `services/`: Sonar REST API 호출과 query 실행 로직
- `providers/`: `LogpressoProvider`
- `hooks/`: React hook과 부모 셸 라우팅 연동
- `components/`: 공통 UI 보조 컴포넌트
- `utils/`: 부모 window locale 등 공통 유틸
- `types/`: 외부 공개 타입
- `index.ts`: 외부 공개 export 진입점

## 디자인 문서 기준

- `DESIGN.md`는 항상 존재한다고 가정하고 `logpresso/` 내부 작업의 우선 설계 기준으로 사용합니다.
- 에이전트는 `README.md`와 `DESIGN.md`를 함께 확인합니다.
- public API와 라우팅 규약 및 Sonar 셸 연동 방식은 `README.md`, 공통 UI 구조와 디자인 패턴은 `DESIGN.md` 기준으로 해석합니다.
- 각 문서와 현재 코드 또는 README 예시가 충돌하면 임의로 설계를 바꾸지 않고 차이를 먼저 문서화합니다.

## 작업 원칙

- 이 폴더는 다른 저장소로 그대로 배포되므로 앱 전역 의존을 만들지 않습니다.
- 특정 앱의 라우터, 상태관리, 디자인 시스템에 강하게 결합하지 않습니다.
- 공통 기능을 추가할 때는 가능한 한 `services`, `hooks`, `utils`, `types` 단위로 분리합니다.
- 외부에서 import 해야 하는 기능을 추가하거나 이동했다면 `index.ts` export도 같이 갱신합니다.
- 문서 예시는 실제 복사 사용 시 바로 적용 가능해야 합니다. 데모 전용 하드코딩은 피합니다.

## locale 규칙

- 부모 또는 현재 window의 `SONAR.locale`이 있으면 이를 우선 사용합니다.
- locale 조회는 `utils/getSonarLocale.ts`를 기준으로 유지합니다.
- i18n 초기화 예시를 추가할 때는 부모 window locale 우선, fallback locale 보조 순서를 유지합니다.

## 변경 시 체크 포인트

- public API가 바뀌면 `index.ts` export를 확인합니다.
- README, `DESIGN.md` 예시가 실제 코드와 어긋나지 않는지 확인합니다.
- Sonar 셸 환경에서 필요한 env 이름과 경로 규칙이 통합 문서에 반영되어 있는지 확인합니다.
- 다른 프로젝트로 복사될 수 있으므로 import 경로와 파일 경계가 과도하게 앱 전용으로 변하지 않았는지 확인합니다.
