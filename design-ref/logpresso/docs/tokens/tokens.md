# tokens

## 목적

- 이 문서는 공개용 AI 에이전트가 사용할 수 있는 machine-readable token registry의 위치와 한계를 설명한다.
- JSON registry는 [design-tokens.json](design-tokens.json)에 있다.
- JSON registry는 `site/styles.css`의 light/dark CSS variables에서 생성되는 source-confirmed public preview token entrypoint다.
- 생성/검증 스크립트는 `site/extract-design-tokens.mjs`다.

## 사용 규칙

- component의 exact foreground, background, border, spacing, typography는 component 문서를 우선한다.
- `design-tokens.json`은 화면설계 초기 후보와 semantic role 확인에 사용한다.
- raw hex 값은 source-confirmed fallback 또는 preview value로만 사용한다.
- token이 없으면 새 값을 발명하지 않고 deferred로 기록한다.
- `cssVariables.themeResolved`는 공개 웹 카탈로그 기준 light/dark resolved value를 제공한다.

## 금지 규칙

- `design-tokens.json`을 제품 구현 전체의 package token registry로 보고하면 안 된다.
- preview theme value를 모든 component의 exact recipe로 적용하면 안 된다.
- semantic role 없이 raw value만 복제하면 안 된다.

## 검증

- `site/design-system.manifest.json`에서 token registry 경로가 공개된다.
- `site/extract-design-tokens.mjs --check`가 CSS 변수 기반 registry 최신 여부를 확인한다.
- `site/generate-design-system-manifest.mjs --check`가 파일 존재 여부를 확인한다.
