# React Lab

Github Actions:  `https://leedaham.github.io/react-lab/`

React 컴포넌트를 `src/labs/` 폴더에 .tsx 파일로 넣으면, 웹 브라우저에서 바로 목록으로 노출하고 화면에서 확인할 수 있는 실험실입니다. React + TypeScript + Tailwind CSS 환경입니다.

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

## 컴포넌트 추가하기 (기여자용)

`src/labs/` 안에서 두 종류의 파일을 만듭니다.

| 구분 | 위치 | 내보내기 방식 | 화면 목록 |
| --- | --- | --- | --- |
| **데모 파일** | `src/labs/` 루트 | `export default` | 표시됨 |
| **재사용 컴포넌트** | `src/labs/components/` | named export (`export function`) | 숨김 |

1. `src/labs/` 루트에 `파스칼케이스` 이름으로 `.tsx` 파일 생성 (예: `ShoppingCart.tsx`)
2. 컴포넌트를 `export default`로 내보내기
3. 저장하면 목록에 자동으로 나타난다

예시:

```tsx
export default function ShoppingCart() {
  return (
    <div>
      <h1 className="text-lg font-bold">장바구니</h1>
    </div>
  );
}
```

- 화면 목록에서 클릭해 보여주는 데모 파일은 **props를 받지 않습니다** (예: `ShoppingCart` → 화면에 "Shopping Cart"로 표시).
- 재사용할 컴포넌트는 `src/labs/components/`에 두면 목록에 노출되지 않습니다. 데모 파일에서 `import`해 시연하고, "사용 방법" 섹션에 import 예시와 props 표를 넣습니다.
- React Aria Components(RAC) props를 상속받는 컴포넌트의 데모에는 `PropsInheritance`로 상속 구조를 문서화합니다.
- Logpresso 스타일로 만들 때는 `design-ref/logpresso/` 문서의 variant·size·토큰을 그대로 사용합니다.

> 자세한 규칙은 [AGENTS.md](./AGENTS.md)를 참고하세요.

## 컴포넌트를 내 프로젝트로 가져가기 (재사용자용)

`src/labs/components/`의 컴포넌트는 **단일 파일**이라 복사해 쓰기 쉽지만, 몇 가지 필수 조건이 있습니다.

**1. 필요한 패키지 설치**

```bash
npm install react-aria-components tailwind-variants tailwind-merge lucide-react
```

컴포넌트마다 필요한 것이 다르므로, 해당 파일의 import 문을 확인하세요.

**2. `style.css`에 한 줄 추가 (중요)**

```css
@import "tailwindcss";
@plugin "tailwindcss-react-aria-components";
```

- 이 플러그인이 없으면 `pressed:`, `disabled:` 같은 **상태 스타일이 조용히 적용되지 않습니다**. 화면이 이상해 보여도 원인을 찾기 어렵기 때문에 반드시 추가해야 합니다.
- 플러그인 패키지도 함께 설치해야 합니다: `npm install -D tailwindcss-react-aria-components`

**3. `components/utils.ts` 함께 복사**

컴포넌트가 `./utils`(또는 `./components/utils`)를 import하고 있다면 `focusRing`/`composeTailwindRenderProps`가 정의된 `utils.ts`도 같은 위치에 복사해야 합니다.

**4. 스타일 확인**

컴포넌트는 Tailwind CSS 유틸리티 클래스로 스타일링되어 있습니다. Tailwind가 적용되는 환경에서만 정상 표시됩니다.

## 폴더 구조

```
react-lab/
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.js   # React + Tailwind 플러그인
└─ src/
   ├─ main.tsx
   ├─ App.tsx          # Lab 화면 (목록 + 미리보기)
   ├─ style.css        # Tailwind 진입점 (@import "tailwindcss")
   ├─ vite-env.d.ts
   └─ labs/            # ★ 데모 파일을 추가하는 곳
      ├─ index.tsx     # 자동 감지 (수정 금지)
      ├─ ExampleCard.tsx
      └─ components/   # ★ 재사용 컴포넌트 (목록에 노출 안 됨)
         ├─ Button.tsx
         ├─ Select.tsx
         └─ ...
```