# reference design output template

## 목적

- AI 에이전트가 이 디자인시스템을 읽고 참고 디자인 또는 화면설계를 만들 때 사용하는 산출물 템플릿이다.
- 이 템플릿은 디자인 결과의 근거와 추정 범위를 명확히 남기기 위한 것이다.

## Template

### 1. Screen Intent

- Screen name:
- Product context:
- Primary user goal:
- Secondary user goals:

### 2. Source Documents

- Pattern:
- Parent components:
- Child components:
- Foundations:
- Token registry:
- Accessibility matrix:

### 3. Layout Composition

- Shell:
- Header/action area:
- Main content region:
- Supporting region:
- Overlay/drawer/modal usage:

### 4. State Coverage

- Default:
- Loading:
- Empty:
- Error:
- Permission denied:
- Disabled:
- Selected/current:
- Success/complete:

### 5. Component Usage

| Region | Component | Source doc | State | Notes |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

### 6. Accessibility Contract

- Landmarks/regions:
- Keyboard path:
- Focus-visible:
- Focus trap/return:
- Accessible names:
- Color-independent status communication:

### 7. Content Contract

- Required labels:
- Helper text:
- Empty/error/loading copy:
- Terminology assumptions:
- Product-specific copy deferred:

### 8. Deferred / Do Not Infer

- Missing product data:
- Missing token:
- Missing component exact recipe:
- Open questions:

### 9. Validation

- Manifest read:
- Component index read:
- Pattern read:
- Foundation read:
- Accessibility matrix read:
