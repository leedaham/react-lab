# publication policy

## 목적

- 이 문서는 Logpresso Design System을 공개 AI 에이전트가 읽을 때 어떤 산출물을 신뢰해야 하는지 정의한다.
- 실제 외부 호스팅 URL이 정해지기 전에도 repository-local public contract를 고정한다.

## 공개 단위

- Static catalog: `site/index.html`
- Machine manifest: `site/design-system.manifest.json`
- Human guide: `ui/docs/AI-AGENT-GUIDE.md`
- Component index: `ui/docs/components/components.md`
- Pattern index: `ui/docs/patterns/patterns.md`
- Token registry: `ui/docs/tokens/design-tokens.json`
- Accessibility matrix: `ui/docs/accessibility/component-accessibility-matrix.json`
- Accessibility coverage: `ui/docs/accessibility/component-accessibility-coverage.json`
- Reference screen examples: `ui/docs/patterns/reference-screen-examples.json`
- Output template: `ui/docs/ai/reference-design-output-template.md`
- Readiness report: `ui/docs/ai/public-readiness-report.md`

## 배포 정책

- `ui/docs/**/*.md`와 `site/*.json`은 public AI consumption source로 배포할 수 있다.
- `site/index.html`, `site/app.js`, `site/styles.css`, `ui/assets/fonts`는 static catalog bundle로 배포할 수 있다.
- `ui/docs/tokens/design-tokens.json`은 public preview token registry다. 제품 구현 package token registry 전체로 배포하지 않는다.
- Draft, deprecated/history, example-only 문서는 discovery에는 포함하되 current implementation truth로 배포하지 않는다.
- 외부 URL이 생기면 `site/index.html` 기준 relative link가 동일하게 동작해야 한다.
- Figma file key, node id, Figma URL은 컴포넌트 정합성 추적을 위한 내부/제한 공개 전용 evidence metadata다. unrestricted external publishing 대상에서는 해당 필드를 제거하거나 인증된 문서 영역으로 분리한다.
- 공개 카탈로그 UI는 Figma file key를 직접 표시하지 않는다. 원본 문서나 JSON에 남은 Figma evidence는 위 내부/제한 공개 정책을 따른다.

## 보안 헤더 권장값

정적 호스팅에 배포할 때 아래 헤더를 기본값으로 적용한다.

```http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

- 현재 카탈로그에는 theme bootstrap inline script가 있다. `script-src 'self'`를 엄격하게 적용하려면 해당 bootstrap을 로컬 JS 파일로 분리하거나 서버가 nonce/hash를 부여해야 한다.
- 외부 스크립트, 외부 stylesheet, runtime network request는 공개 bundle에 추가하지 않는다.

## 버전 정책

- 현재 버전은 `0.3.0-preview`다.
- manifest `version`과 웹 카탈로그 version pill이 공개 버전 표시를 소유한다.
- breaking documentation change가 있으면 manifest version을 갱신한다.

## 검증

공개 전 아래 명령이 모두 통과해야 한다.

```powershell
node .\design\site\generate-design-system-manifest.mjs --check
node .\design\site\extract-design-tokens.mjs --check
node .\design\site\generate-accessibility-coverage.mjs --check
node .\design\site\validate-public-design-system.mjs
node .\design\site\sync-component-index.mjs --check
node --check .\design\site\app.js
```
