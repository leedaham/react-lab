# Sonar v5 디자인 가이드

## 문서 목적

- 이 문서는 Sonar v5 화면을 동일한 인상으로 구성하기 위한 디자인 가이드입니다.
- 이 문서만 보고도 목록 화면, 우측 디테일 패널, 폼, 테이블, 페이저를 어떤 구조와 예약어로 조합하는지 이해할 수 있어야 합니다.
- 초점은 빌드 방식이 아니라 실제 마크업 사용 규칙에 있습니다.

## 기본 관점

- Sonar v5는 개별 위젯을 독립적으로 꾸미는 방식보다 "레이아웃 틀 + 상태 색상 + 공용 컴포넌트 예약어"를 조합하는 방식에 가깝습니다.
- 따라서 단일 컴포넌트 모양보다 아래 세 가지를 먼저 맞추는 것이 중요합니다.
  - 화면 골격: 목록 화면인지, 우측 디테일 패널인지
  - 정보 위계: 제목, 라벨, 값, 보조 설명, 오류 문구
  - 상태 표현: 기본, hover, active, readonly, disabled, error

## 핵심 원칙

### 1. 텍스트는 "강조"보다 "위계"를 만든다

- 기본 본문은 `text-sm` 밀도를 기준으로 합니다.
- 큰 타이틀을 남발하지 않고, 섹션 안에서 라벨과 값의 대비로 위계를 만듭니다.
- 대표 규칙
  - 화면 제목: `font-semibold` 또는 컴포넌트 헤더 수준
  - 필드 라벨: `label`
  - 보조 설명/캡션: `label-caption`, `text-base-content-200`
  - 오류 문구: `help-text`, `text-form-error` 또는 `has-error` 컨텍스트

### 2. 색상은 장식이 아니라 상태를 표현한다

- `--color-primary`는 "주요 액션"과 "현재 활성 상태"에만 씁니다.
- `--color-base-content`는 본문 정보에서 사용하고, `--color-base-content-200`은 placeholder/보조 텍스트에서 사용합니다.
- `success`, `warning`, `error`, `info`, `system` 계열은 의미가 있는 경우에만 사용합니다.
- 그래서 Sonar 화면은 전체적으로 차분하고, 클릭 가능 상태나 오류만 선명하게 드러납니다.

### 3. 여백은 4, 8, 16, 24 단위 리듬을 따른다

- 내부 요소 간 작은 간격: `gap-1`, `gap-2`, `px-2`, `py-1`
- 필드/행 단위 간격: `gap-4`, `p-4`
- 액션 영역/푸터: `p-6`
- 즉, 여백은 임의값보다 다음 흐름을 반복한다고 보면 됩니다.
  - 작은 UI 내부: 4px, 8px
  - 카드/패널 내부: 16px
  - 하단 액션 영역: 24px

### 4. 모서리, 보더, 배경은 강하게 튀지 않는다

- 대부분의 인터랙션 컴포넌트는 `rounded-lg`
- border는 강한 실선보다 `neutral-alpha` 계열 반투명 선을 씁니다.
- 배경은 순백/순흑 대신 `base`, `neutral`, `neutral-100`, `neutral-200` 계열로 미세하게 층을 나눕니다.

## 기본 화면 패턴

### 1. 목록 화면 개념

- Sonar v5의 기본 목록 화면은 아래 구조를 반복합니다.
  - 바깥 프레임
  - 상단 toolbar
  - 본문 table
  - 하단 pager
- 즉 목록은 "검색과 액션이 위에 있고, 데이터가 가운데 있으며, 페이지 이동은 아래에 있는 구조"를 기본값으로 삼습니다.

```tsx
<section className="list-page">
  <div className="glass-container">
    <div className="list-page-item-list">
      <div className="list-page-toolbar">
        <div className="flex items-center gap-2">
          <form className="flex">
            <label className="input input-search">
              <span>🔍</span>
              <input type="text" placeholder="검색" />
            </label>
          </form>
        </div>

        <div className="flex gap-2">
          <button type="button" className="btn btn-primary">추가</button>
          <button type="button" className="btn btn-default btn-icon-only">↓</button>
          <button type="button" className="btn btn-default btn-icon-only">↻</button>
        </div>
      </div>

      <div className="list-page-table">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="table-cell-fit">
                  <input type="checkbox" className="checkbox" />
                </th>
                <th className="min-w-[200px]">이름</th>
                <th>설명</th>
                <th className="w-[150px]">수정일</th>
              </tr>
            </thead>
            <tbody>
              <tr className="selectable active">
                <td className="table-cell-fit">
                  <input type="checkbox" className="checkbox" defaultChecked />
                </td>
                <td className="font-medium">Admin</td>
                <td>기본 사용자 그룹</td>
                <td>2026-04-20 09:00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="list-page-pager">
        <div className="paginator w-full">
          <div className="paginator-container">
            <div className="paginator-page-size">
              <span className="label-md">15</span>
              <span>items per page</span>
            </div>
            <div className="paginator-action">
              <div className="paginator-range">총 100건 중 1-15</div>
              <div className="paginator-action-btn">
                <button type="button" className="btn btn-default btn-icon-only">
                  ‹
                </button>
                <label className="mx-2 flex items-center gap-1 text-xs">
                  <span className="text-base-content">1</span>
                  <span className="text-base-content-200">/</span>
                  <span className="text-base-content-200">7</span>
                </label>
                <button type="button" className="btn btn-default btn-icon-only">
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### 2. 디테일 화면 개념

- Sonar v5의 디테일은 전체 화면 전환보다 우측 패널을 여는 방식이 기본입니다.
- 구조는 항상 3단으로 봅니다.
  - 상단: 제목 + 닫기/저장
  - 중단: 폼 본문
  - 하단: 필요 시 별도 액션 또는 보조 영역

```tsx
<aside className="side-panel">
  <div className="side-panel-header">제목과 주요 액션</div>
  <div className="side-panel-content">입력 폼 또는 상세 정보</div>
  <div className="side-panel-footer">하단 액션</div>
</aside>
```

### 3. Glass 느낌은 "카드"가 아니라 "프레임"이다

- 이 효과는 카드 자체를 강조하려는 목적이 아니라, 우측 패널을 메인 화면과 분리된 작업 레이어로 보이게 만드는 장치입니다.
- glass 계열은 모든 곳에 반복하기보다 우측 패널이나 강조된 컨테이너에서 제한적으로 표현하는 편이 Sonar v5 인상에 가깝습니다.
- 구현 시 어떤 컴포넌트나 마크업으로 이 효과를 표현할지는 README에서 정의하고, 이 문서에서는 glass를 언제 써야 하는지만 다룹니다.

## 디자인 사용 규칙

### 텍스트 규칙

| 목적      | 추천 클래스/방식                         | 설명                                          |
| --------- | ---------------------------------------- | --------------------------------------------- |
| 화면 제목 | `font-semibold`, 헤더 영역               | 과장하지 않고 선명하게                        |
| 필드 라벨 | `label`                                  | 입력 항목명                                   |
| 필수 표시 | `label-required`                         | primary 색 강조는 여기처럼 정말 필요한 곳에만 |
| 보조 문구 | `label-caption`, `text-base-content-200` | 설명, 힌트, placeholder                       |
| 오류 문구 | `help-text`, `text-form-error`           | 입력 오류를 명시적으로 노출                   |
| 값 표시   | `label-value`                            | 상세 조회 값                                  |

### 색상 규칙

| 의미                        | 기준                                            |
| --------------------------- | ----------------------------------------------- |
| 기본 텍스트                 | `base-content` 계열                             |
| 약한 텍스트                 | `base-content-200` 계열                         |
| 주요 버튼/활성 탭/선택 상태 | `primary` 계열                                  |
| 성공/정상                   | `success` 계열                                  |
| 경고                        | `warning` 계열                                  |
| 오류/삭제                   | `error` 계열                                    |
| 일반 배경                   | `base`, `neutral` 계열                          |
| hover/active 배경           | `neutral-100`, `neutral-200`, `primary-alpha-*` |

### 아이콘 규칙

- 아이콘은 기본적으로 Material 아이콘 계열에서 표현합니다.
- React/TSX에서는 `logpresso`의 `AppIcon`으로 Sonar v5의 `app-icon` 개념을 표현합니다.
- 아이콘 색상은 별도 fill 값을 직접 주기보다 텍스트 색상 클래스로 제어합니다.
  - 기본 아이콘: `text-base-content`
  - 보조 아이콘: `text-base-content-200`
  - 주요 액션 아이콘: `text-primary`
  - 성공 상태 아이콘: `text-success-100`
  - 오류/경고 아이콘: `text-error-100`, `text-warning-200`
- 아이콘 크기는 작은 UI 밀도에 맞춰 16~24px 범위를 기본으로 봅니다.
  - `xs`: 16px
  - `sm`: 18px
  - `md`: 20px
  - `lg`: 24px
- 숫자 크기를 직접 주는 경우에도 14~24px 범위 안에서 표현하는 편이 Sonar v5 인상에 가깝습니다.

### Padding / Gap 규칙

| 위치                         | 대표 값                   | 사용 예               |
| ---------------------------- | ------------------------- | --------------------- |
| 버튼, badge 내부             | `px-2`, `py-0.5`, `px-3`  | 작은 조작 요소        |
| input, select, textarea 내부 | `px-3`, `py-1`            | 기본 폼 필드          |
| 섹션/카드 내부               | `p-4`                     | 목록 카드, 패널 본문  |
| 헤더/모달/패널 구획          | `p-4`                     | 제목 영역             |
| 푸터 액션 영역               | `p-6`                     | 하단 버튼 묶음        |
| 요소 간 간격                 | `gap-1`, `gap-2`, `gap-4` | 정보 위계에 따라 선택 |

## 목록 화면을 만들 때의 조합 규칙

### 구조

- 검색창, 액션 버튼, 다운로드, 새로고침은 상단 toolbar에 둡니다.
- 본문은 테이블 또는 카드 리스트로 둡니다.
- 페이징은 항상 하단에 분리합니다.

### toolbar 규칙

- 왼쪽에는 검색 또는 필터를 둡니다.
- 오른쪽에는 생성, 다운로드, 새로고침 같은 액션을 둡니다.
- 선택된 행이 있을 때는 일반 검색 toolbar 대신 "몇 개 선택됨 + 삭제 + 선택 해제" 같은 selection toolbar로 바뀌는 패턴을 권장합니다.

```tsx
<div className="list-page-toolbar">
  <div className="flex items-center gap-2">
    <form className="flex">
      <label className="input input-search">
        <span>🔍</span>
        <input type="text" placeholder="검색" />
      </label>
    </form>
  </div>

  <div className="flex gap-2">
    <button type="button" className="btn btn-primary">추가</button>
    <button type="button" className="btn btn-default btn-icon-only">↓</button>
    <button type="button" className="btn btn-default btn-icon-only">↻</button>
  </div>
</div>
```

```tsx
<div className="list-page-toolbar">
  <div className="list-page-toolbar-action">
    <span>3개 선택됨</span>
    <div className="flex items-center gap-2">
      <button type="button" className="btn btn-default">삭제</button>
      <button type="button" className="btn btn-default">선택 해제</button>
    </div>
  </div>
</div>
```

### 테이블 규칙

- `.table`을 기본으로 씁니다.
- 헤더는 정보 구조를 보여주고, 행 hover/active는 선택 상태를 보여줍니다.
- 선택 가능한 행은 `.selectable`
- 현재 선택/활성 행은 `.active`
- 헤더 고정이 필요하면 `.thead-sticky`

```tsx
<table className="table">
  <thead className="thead-sticky">
    <tr>
      <th className="table-cell-fit">#</th>
      <th>이름</th>
      <th>설명</th>
      <th>수정일</th>
    </tr>
  </thead>
  <tbody>
    <tr className="selectable active">
      <td>1</td>
      <td className="font-medium">Admin</td>
      <td>기본 사용자 그룹</td>
      <td>2026-04-20 09:00</td>
    </tr>
  </tbody>
</table>
```

### 목록 화면에서 버튼을 쓰는 방식

- 주요 생성 액션: `btn btn-primary`
- 일반 액션: `btn btn-default`
- 위험 액션: `btn btn-danger`
- 텍스트성 액션: `btn btn-text` 또는 `btn btn-link`

```tsx
<div className="flex items-center gap-2">
  <button type="button" className="btn btn-default btn-xs">새로고침</button>
  <button type="button" className="btn btn-default btn-xs">다운로드</button>
  <button type="button" className="btn btn-primary btn-xs">추가</button>
</div>
```

### 페이저 규칙

- 페이저는 항상 목록 하단에 분리합니다.
- 왼쪽에는 페이지 크기, 오른쪽에는 범위 정보와 이전/다음 버튼을 둡니다.
- 숫자는 크게 강조하지 않고 `text-xs` 밀도를 유지합니다.

```tsx
<div className="list-page-pager">
  <div className="paginator w-full">
    <div className="paginator-container">
      <div className="paginator-page-size">
        <span className="label-md">15</span>
        <span>items per page</span>
      </div>

      <div className="paginator-action">
        <div className="paginator-range">총 100건 중 1-15</div>
        <div className="paginator-action-btn">
          <button type="button" className="btn btn-default btn-icon-only">‹</button>
          <label className="mx-2 flex items-center gap-1 text-xs">
            <span className="text-base-content">1</span>
            <span className="text-base-content-200">/</span>
            <span className="text-base-content-200">7</span>
          </label>
          <button type="button" className="btn btn-default btn-icon-only">›</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

## 디테일 화면을 만들 때의 조합 규칙

### 기본 구조

- 패널 최상단은 닫기 버튼과 제목, 저장 버튼으로 끝냅니다.
- 본문은 `side-panel-form` 안에서 `control-group` 단위로 반복합니다.
- 각 필드는 "라벨 → 입력 → 오류문구" 순서를 유지합니다.

```tsx
<div className={["side-panel", !editable ? "readonly" : ""].filter(Boolean).join(" ")}>
  <div className="side-panel-header">
    <div className="flex items-center gap-2">
      <button type="button" className="btn btn-default btn-xs btn-icon-only">
        X
      </button>
      <h2 className="font-semibold">사용자 그룹 수정</h2>
    </div>
    <button type="button" className="btn btn-primary btn-xs">저장</button>
  </div>

  <div className="side-panel-content">
    <form className="side-panel-form">
      <div className="control-group">
        <label className="label">
          이름 <span className="label-required">*</span>
        </label>
        <input type="text" className="input input-md" />
      </div>
    </form>
  </div>
</div>
```

### Form 규칙

- wrapper는 `control-group`
- 입력 필드는 `input`, `textarea`, `select-trigger` 예약어를 그대로 사용
- 오류는 `has-error`를 wrapper에 주고, 하단에 `help-text`를 둔다
- readonly는 개별 필드보다 상위 컨테이너에 `.readonly`를 주는 방식이 우선

```tsx
<div className="control-group has-error">
  <label className="label"> 이름 <span className="label-required">*</span> </label>
  <input type="text" className="input input-md" defaultValue="중복 이름" />
  <div className="help-text">이미 사용 중인 이름입니다.</div>
</div>
```

### 상세 하위 섹션

- 이때는 `side-panel-divider`로 폼과 보조 리스트를 나눕니다.
- 즉 "한 패널 안에 기본 정보 + 연결 데이터"를 이어 붙이는 방식이 자연스럽습니다.

```tsx
<div className="side-panel-content">
  <form className="side-panel-form">기본 정보 폼</form>

  <div className="side-panel-divider"></div>

  <div className="p-4">연관 목록 또는 보조 정보</div>
</div>
```

## 예약어와 짧은 사용 예시

### badge

```tsx
<span className="badge badge-rounded badge-solid-green">정상</span>
<span className="badge badge-outline-red">오류</span>
```

### input

```tsx
<input type="text" className="input input-md" placeholder="이름 입력" />
```

### textarea

```tsx
<textarea className="textarea textarea-md" rows={3}></textarea>
```

### select trigger

```tsx
<button type="button" className="select-trigger select-trigger-md">
  <span className="select-trigger__label">선택값</span>
</button>
```

### alert

```tsx
<div className="alert alert-info">안내 메시지</div>
<div className="alert alert-error">오류 메시지</div>
```

### toggle

```tsx
<input type="checkbox" className="toggle toggle-sm" defaultChecked />
```

### breadcrumbs

```tsx
<ul className="breadcrumbs">
  <li>Home <span className="breadcrumbs-caret">/</span></li>
  <li>Groups</li>
</ul>
```

### icon

```tsx
<AppIcon
  name="search"
  size="sm"
  className="text-base-content-200"
/>
<AppIcon
  name="refresh"
  size={18}
  className="text-base-content"
/>
<AppIcon
  name="error"
  size={16}
  className="text-error-100"
/>
<AppIcon
  name="check_circle"
  size={16}
  className="text-success-100"
/>
```

## 예약어와 대표 사용 예

### layout

- 목록 화면의 바깥 틀, 우측 상세 패널, 패널 내부 섹션 구분에서 사용
- 예약어
  - `list-page`, `list-page-item-list`, `list-page-toolbar`, `list-page-table`, `list-page-pager`
  - `workspace-page`
  - `side-panel`, `side-panel-header`, `side-panel-content`, `side-panel-footer`, `side-panel-divider`
- 대표 사용 예

```tsx
<section className="list-page">
  <div className="list-page-item-list">
    <div className="list-page-toolbar">...</div>
    <div className="list-page-table">...</div>
    <div className="list-page-pager">...</div>
  </div>
</section>
```

### button

- 목록 toolbar, 저장/삭제 액션, 아이콘 버튼, 페이지 이동 버튼에서 사용
- 유형
  - 종류: `btn-default`, `btn-primary`, `btn-danger`, `btn-text`, `btn-link`, `btn-outline`
  - 크기: `btn-xs`, `btn-md`, `btn-lg`
  - 형태: `btn-icon`, `btn-icon-only`, `btn-group`
- 대표 사용 예

```tsx
<div className="flex gap-2">
  <button type="button" className="btn btn-default btn-xs">취소</button>
  <button type="button" className="btn btn-primary btn-xs">저장</button>
  <button type="button" className="btn btn-default btn-icon-only">↻</button>
</div>
```

### icon

- 검색 입력, 버튼 내부, 안내/오류 메시지, 탭, 페이지 이동, 보조 설명 영역에서 사용
- 유형
  - Material Symbols 이름: `search`, `refresh`, `info`, `error`, `check_circle`
  - round 계열은 강조 목적에서 제한적으로 사용
  - 크기: `xs`, `sm`, `md`, `lg` 또는 `16`, `18`, `20`, `24`
  - 색상: `text-base-content`, `text-base-content-200`, `text-primary`, `text-success-100`, `text-error-100`
- 대표 사용 예

```tsx
<label className="input input-search">
  <AppIcon
    name="search"
    size="sm"
    className="text-base-content-200"
  />
  <input type="text" placeholder="검색" />
</label>

<button type="button" className="btn btn-default btn-icon-only">
  <AppIcon name="refresh" size={18} />
</button>

<div className="flex items-center gap-1">
  <AppIcon
    name="info"
    size="sm"
    className="text-base-content-200"
  />
  <span className="text-base-content-200 text-xs">보조 설명</span>
</div>
```

### badge

- 상태 표시, 태그, 분류 라벨, 작은 강조 텍스트에서 사용
- 유형
  - 크기: `badge-xs`, `badge-sm`
  - 형태: `badge-rounded`, `badge-bold`
  - outline: `badge-outline-default`, `badge-outline-red`, `badge-outline-green`, `badge-outline-blue`
  - solid: `badge-solid-default`, `badge-solid-red`, `badge-solid-green`, `badge-solid-blue`, `badge-solid-purple`
- 대표 사용 예

```tsx
<span className="badge badge-rounded badge-solid-green">정상</span>
<span className="badge badge-outline-red">오류</span>
```

### input / select / textarea

- 검색창, 상세 폼 입력, 선택 필드, 다중 행 텍스트 입력에서 사용
- 유형
  - input: `input-xs`, `input-md`, `input-lg`, `input-search`, `danger`, `active`
  - select: `select-trigger-xs`, `select-trigger-sm`, `select-trigger-md`, `open`, `not-selected`
  - textarea: `textarea-xs`, `textarea-md`, `textarea-lg`, `danger`, `active`
- 대표 사용 예

```tsx
<label className="input input-search">
  <span>🔍</span>
  <input type="text" placeholder="검색" />
</label>

<button type="button" className="select-trigger select-trigger-md not-selected">
  <span className="select-trigger__label placeholder">선택하세요</span>
</button>

<textarea
  className="textarea textarea-md"
  rows={3}
  placeholder="설명을 입력하세요"
></textarea>
```

### form

- 상세 패널 폼, 수정 화면, 조회형 상세 정보 묶음에서 사용
- 유형
  - wrapper: `control-group`, `control-group-wrapper`, `has-error`
  - label: `label`, `label-required`, `label-caption`, `label-title`, `label-value`
  - 상태: `readonly`
- 대표 사용 예

```tsx
<div className="control-group has-error">
  <label className="label"> 이름 <span className="label-required">*</span> </label>
  <input type="text" className="input input-md" defaultValue="중복 이름" />
  <div className="help-text">이미 사용 중인 이름입니다.</div>
</div>
```

### table

- 목록 화면의 기본 데이터 표현, 상세 패널 안의 보조 목록, 선택 가능한 리스트에서 사용
- 유형
  - 상태: `selectable`, `active`
  - 셀/헤더: `table-cell-fit`, `thead-sticky`
  - 상태 셀: `data-empty`, `data-error`
- 대표 사용 예

```tsx
<table className="table">
  <thead className="thead-sticky">
    <tr>
      <th className="table-cell-fit">
        <input type="checkbox" className="checkbox" />
      </th>
      <th>이름</th>
      <th>설명</th>
    </tr>
  </thead>
  <tbody>
    <tr className="selectable active">
      <td className="table-cell-fit">
        <input type="checkbox" className="checkbox" defaultChecked />
      </td>
      <td className="font-medium">Admin</td>
      <td>기본 그룹</td>
    </tr>
  </tbody>
</table>
```

### paginator

- 목록 화면 하단, 패널 내부 보조 목록 하단에서 사용
- 예약어
  - `paginator`, `paginator-container`, `paginator-page-size`, `paginator-action`, `paginator-range`, `paginator-action-btn`
- 대표 사용 예

```tsx
<div className="list-page-pager">
  <div className="paginator">
    <div className="paginator-container">
      <div className="paginator-page-size">
        <span className="label-md">15</span>
        <span>items per page</span>
      </div>
      <div className="paginator-action">
        <div className="paginator-range">총 100건 중 1-15</div>
        <div className="paginator-action-btn">
          <button type="button" className="btn btn-default btn-icon-only">‹</button>
          <button type="button" className="btn btn-default btn-icon-only">›</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

### selection controls

- 테이블 선택, 단일 선택, ON/OFF 설정에서 사용
- 유형
  - checkbox: `checkbox`, `checkbox-xs`, `checkbox-md`
  - radio: `radio`
  - toggle: `toggle`, `toggle-xs`, `toggle-sm`, `toggle-lg`
- 대표 사용 예

```tsx
<label className="checkbox-item">
  <input type="checkbox" className="checkbox checkbox-md" defaultChecked />
  <span>활성화</span>
</label>

<input type="checkbox" className="toggle toggle-sm" defaultChecked />
```

### message / state

- 인라인 안내, 저장 결과, 경고, 오류 상태 강조에서 표현
- 유형
  - alert: `alert-general`, `alert-error`, `alert-warning`, `alert-info`, `alert-success`, `alert-system`
  - text: `text-danger`, `text-success`, `text-form-error`, `text-empty`
- 대표 사용 예

```tsx
<div className="alert alert-info">안내 메시지입니다.</div>
<div className="alert alert-error">오류가 발생했습니다.</div>
<p className="text-form-error">필수 입력 항목입니다.</p>
```

### navigation

- 상단 경로 표시, 섹션 탭 전환, 패널 내부 폼 탭에서 사용
- 유형
  - breadcrumb: `breadcrumbs`, `breadcrumbs-caret`
  - tab nav: `tab-nav`, `tab-nav-item`, `tab-nav-item-text`, `tab-nav-add`, `active`
  - form tab: `form-tab-container`, `form-tab-btn`, `form-tab-btn-active`
- 대표 사용 예

```tsx
<ul className="breadcrumbs">
  <li>Home <span className="breadcrumbs-caret">/</span></li>
  <li>Groups</li>
</ul>

<div className="tab-nav">
  <div className="tab-nav-item active">
    <span className="tab-nav-item-text">기본 정보</span>
  </div>
  <div className="tab-nav-item">
    <span className="tab-nav-item-text">이력</span>
  </div>
</div>
```

### popup / dropdown

- 옵션 선택, 액션 메뉴, 간단 모달 레이어에서 사용
- 유형
  - dropdown: `dropdown`, `dropdown-list`, `dropdown-option`, `dropdown-header`, `menu-divider`, `open`, `selected`, `disabled`, `active`
  - modal: `modal`, `modal-xs`, `modal-md`, `modal-lg`, `modal-title`, `modal-content`, `modal-footer`
- 대표 사용 예

```tsx
<div className="dropdown open">
  상태 선택
  <input type="checkbox" defaultChecked />
</div>
<ul className="dropdown-list">
  <li className="dropdown-option selected">전체</li>
  <li className="dropdown-option">정상</li>
  <li className="dropdown-option disabled">비활성</li>
</ul>

<section className="modal modal-md">
  <header className="modal-title">설정</header>
  <div className="modal-content">내용</div>
  <footer className="modal-footer">버튼 영역</footer>
</section>
```

### chips

- 태그 입력, 로딩 placeholder, 시각적 프레임 강조에서 사용
- 유형
  - chips: `chips-container`, `chips-xs`, `chips-small`, `chips-medium`, `chips-large`
  - skeleton: `skeleton-input`, `skeleton-textarea`, `skeleton-checkbox`, `skeleton-label`, `skeleton-table-cell`, `table-skeleton`
  - glass: `glass-container`, `glass-card-container`
- 대표 사용 예

```tsx
<div className="chips-container chips-medium">
  <span className="badge badge-solid-blue">tag:value</span>
</div>

<div className="glass-card-container p-4">강조된 요약 정보</div>
```
