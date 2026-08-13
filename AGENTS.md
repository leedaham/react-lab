# AGENTS.md — React Lab 에이전트 작업 지침

이 문서는 **AI 에이전트(코드 생성 도구)** 가 이 저장소에서 작업할 때 반드시 따라야 하는 참고 문서입니다.

## 1. 프로젝트 개요

- **목표**: "React 컴포넌트를 넣으면 화면에서 바로 확인할 수 있는 실험실(Lab)"
- **사용자**: React를 모르는 비전문가. 에이전트가 만든 컴포넌트를 웹 브라우저에서 직접 보고 테스트한다.
- **기술 스택**: Vite + React + TypeScript (`.tsx`), **Tailwind CSS v4** 기본 내장, 추가 라이브러리 최소화

## 2. 핵심 규칙 (지키지 않으면 안 되는 것)

1. **컴포넌트 등록 = 파일 만들기**
   - 사용자에게 컴포넌트를 요청받으면 `src/labs/` 루트에 `.tsx` **데모 파일**을 만든다.
   - `default export`가 있는 파일만 화면 목록의 아이템이 된다. 서포트 파일(`default export` 없음)은 자동으로 목록에서 숨겨진다. 별도 등록 코드/설정이 필요 없다.
   - `ExampleCard.tsx`(인사말 카드)는 항상 목록 맨 위에 배치된다(index.tsx의 정렬 규칙).
2. **절대 손대지 말 것**: `src/labs/index.tsx`(자동 감지), `src/main.tsx`, `src/App.tsx`, `src/style.css`(Tailwind 진입점), `vite.config.js`(Tailwind Vite 플러그인 설정), `package.json`(의존성 제외)은 임의로 수정하지 않는다.
3. **컴포넌트는 `src/labs/components/` 에 둔다**:
   - `components/` 아래 파일은 `default export`가 없어 목록에 노출되지 않는다. 재사용 컴포넌트(`Button`, `ButtonLogpresso`, `Select`, `SelectLogpresso` 등)만 `components/`에 만든다.
   - 데모 파일은 `./components/*` 를 `import` 해서 화면에 표시한다. 사용자는 `components/`에서 컴포넌트를 꺼내 쓰고, 데모를 사용 예시로 참고한다.
   - `components/` 내부 파일끼리의 `import`는 허용한다: `utils.ts`(스타일 프리미티브: `focusRing`, `composeTailwindRenderProps`)와 RAC 번들 서포트 파일(`Field.tsx`, `ListBox.tsx`, `Popover.tsx`)을 공용 `import`할 수 있다.
4. **외부 데이터/네트워크 금지**: API 호출, 이미지 URL 등 외부 의존성은 기본적으로 사용하지 않는다. 꼭 필요하면 에이전트가 샘플 데이터를 하드코딩한다.
5. **단일 파일 셀프컨테인먼트**: 컴포넌트의 상태·스타일·데이터는 그 파일 하나 안에 모두 들어 있어야 한다.

## 3. 컴포넌트 작성 규칙

- **파일명**: `파스칼케이스` (예: `ShoppingCart.tsx`, `SignupForm.tsx`). 데모는 `XxxDemo.tsx` 형식.
- **내보내기**: 데모 파일은 반드시 `export default` 로 내보낸다. 재사용 컴포넌트(`components/`)는 `export function`(named export)으로 내보낸다.
- **구조 (데모 파일)**:
  ```tsx
  import { Button } from './components/Button';

  const usageCode = `import { Button } from './components/Button';

  <Button variant="primary">저장</Button>`;

  export default function ButtonDemo() {
    const data = [ /* 샘플 데이터 고정 */ ];
    return (
      <div>
        {/* 시연 UI */}
        {/* 사용 방법 섹션: import 문 예시 + 주요 props 표 */}
      </div>
    );
  }
  ```
- **사용 방법 섹션**: 데모 파일에는 컴포넌트 사용 예시(`<pre><code>` 블록)와 주요 props 표(이름·설명·기본값)를 포함한다. 사용자가 `components/`에서 꺼내 쓰는 법을 참고할 수 있게 한다.
- **테마 토글 (Logpresso 데모)**: Logpresso 스타일 데모(`*Logpresso*Demo.tsx`)에는 우측 상단에 **라이트/다크 모드 토글**이 항상 있어야 한다. 데모 배경·텍스트·표 색상이 테마에 따라 바뀌고, 컴포넌트에는 `theme` prop(`dark`/`light`)을 전달한다. `SelectLogpressoDemo.tsx`/`ButtonLogpressoDemo.tsx`를 참고한다.
- **상속 문서**: RAC props를 상속받는 컴포넌트의 데모에는 `PropsInheritance`(`components/PropsInheritance.tsx`)로 상속 체인·그룹별 상속 props·공식 문서 링크를 표시한다. 상속 데이터는 데모 파일 안에 하드코딩한다.
- **props 사용 금지 (데모만)**: `export default` 데모는 화면 목록에서 클릭해 띄우는 구조이므로 props를 받지 않는다. `components/`의 재사용 컴포넌트는 props를 받는다.
- **타입 작성**: 샘플 데이터는 타입을 명확히 한다. 컴포넌트에 필요한 타입은 해당 파일 안에 직접 선언한다.
- **스타일**: **Tailwind CSS** 유틸리티 클래스를 기본적으로 사용한다. `className="flex gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white"` 형태. 간단한 개별 속성은 인라인 `style={{ }}` 도 허용하지만, Tailwind 클래스를 우선한다. 부득이한 경우 `style.css` 에 별도 클래스를 추가할 수 있다.
  - React Aria Components 사용 시 `pressed:`, `disabled:` 등 RAC 상태 변형은 `tailwindcss-react-aria-components` 플러그인(`style.css`에 `@plugin` 등록됨)이 제공한다. RAC 컴포넌트(generic `Button` 등)는 props를 받아도 되지만, Lab 데모로 표시하려면 별도 `export default` 데모가 파일 안에 있어야 한다.
- **표시 이름**: 목록에는 `파일명`을 사람이 읽기 좋게 변환해 보여준다 (`ShoppingCart` → `Shopping Cart`).

## 4. 작업 절차 (에이전트 워크플로우)

### Step 1 — 상태 확인
```bash
npm run dev
```
서버가 뜨면 `http://localhost:5173` 에서 Lab 화면을 확인한다.

### Step 2 — 컴포넌트 생성
1. `src/labs/` 아래 새 파일 작성 (규칙 3 준수)
2. 파일 저장 → Vite HMR로 화면 목록에 즉시 반영되는지 확인

### Step 3 — 확인 및 보고
- 콘솔 에러가 없는지 확인한다.
- 완료 보고 시 **"어떤 파일에 어떤 컴포넌트를 만들었는지"** 와 **"화면에서 어디를 보면 되는지"** 를 간결히 알려준다. 사용자는 React를 모르므로 기술 용어를 줄인다.

## 5. 실행 명령어

| 명령어 | 용도 |
| --- | --- |
| `npm install` | 의존성 설치 (최초 1회) |
| `npm run dev` | 개발 서버 실행 (HMR) |
| `npm run typecheck` | 타입 검사 (빌드 전 실행 권장) |
| `npm run build` | 타입 검사 후 프로덕션 빌드 |
| `npm run preview` | 빌드 결과 미리보기 |

## 6. 주의사항

- **한국어 소통**: 보고·안내는 한국어로, 초보자가 이해하기 쉬운 표현을 쓴다.
- **과도한 기능 금지**: 요청받은 것만 구현한다. 화려한 애니메이션·복잡한 상태관리 라이브러리 추가 금지.
- **의존성 추가 신중**: 라이브러리를 추가할 때는 그 이유를 사용자에게 먼저 설명하고 동의를 받는다.
- **테스트**: 별도 테스트 프레임워크가 없다. 동작 확인은 브라우저 화면으로 한다.

## 7. Logpresso 디자인 레퍼런스 (로컬 문서)

Logpresso Design System 문서가 `design-ref/logpresso/` 에 로컬로 미러링되어 있다. 사용자가 "Logpresso 디자인(스타일)대로 만들어달라"고 하면 아래 문서를 먼저 읽고 컴포넌트를 만든다.

- **진입점**: `design-ref/logpresso/design-system.manifest.json` (컴포넌트 65개 목록·상태·경로), `design-ref/logpresso/docs/AI-AGENT-GUIDE.md` (필수 읽기 순서)
- **컴포넌트**: `design-ref/logpresso/docs/components/*.md` — `Button.md`, `Input.md`, `Table.md` 등. 각 문서에 목적, anatomy, state, **Tailwind 권장 클래스**가 있음.
- **패턴**: `design-ref/logpresso/docs/patterns/` (화면 구성), `docs/patterns/ux-baseline/` (상태·행동 기준선)
- **Foundation**: `design-ref/logpresso/docs/foundation/*.md` — color, typography, spacing, radius, state, accessibility 등
- **토큰**: `design-ref/logpresso/docs/tokens/design-tokens.json` (semantic 색상·타이포·모션 값)
- **읽는 순서**: 목표 컴포넌트 문서 → 필요한 경우 패턴 → foundation → 토큰 순. 문서에 적힌 `variant`, `size`, `state` 이름과 Tailwind 클래스를 그대로 따른다.
- **금지**: 문서에 없는 색상·간격·상태를 임의로 만들지 않는다. 토큰 값은 문서에 있는 것만 쓴다. `site/...` 참조 경로(비공개)는 로컬에 없으므로 무시한다.
- **갱신**: `powershell -ExecutionPolicy Bypass -File .\design-ref\sync-logpresso-docs.ps1` 로 다시 받아 최신화할 수 있다.
