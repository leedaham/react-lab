# Disclosure

## AI Contract

- status: `blocked`
- exactHtml: `source required`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `source required`
- baseCss: `source required`
- gapCss: `none documented`
- sourcePointer: `ui/docs/components/Disclosure.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=blocked`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

## 목적

- `Disclosure`는 제목 행과 접히는 content region을 조합하는 collapsible content parent composition이다.
- `Disclosure`는 navigation tree, modal, dropdown, popover를 대체하지 않는다.
- FAQ, advanced settings, filter section, detail block처럼 같은 화면 안에서 content density를 조절할 때 사용한다.

## 문서화 대상 범위

- disclosure root
- trigger row
- leading/trailing disclosure indicator
- expanded/collapsed content region
- repeated accordion stack boundary

## core anatomy

- `DisclosureRoot`
- `DisclosureTrigger`
- `TriggerLabel`
- optional `TriggerMeta`
- `DisclosureIndicator`
- `DisclosurePanel`
- optional `DisclosureStack`

## variant / property naming rule

- `open`
  - `true`
  - `false`
- `indicatorPlacement`
  - `leading`
  - `trailing`
- `density`
  - `default`
  - `compact`
- `surface`
  - `plain`
  - `contained`

## layout / visual 규칙

- trigger row는 one-line horizontal layout이다.
- `DisclosureIndicator`는 open 상태에서 expanded glyph로, closed 상태에서 collapsed glyph로 읽힌다.
- current icon source는 [icon.md](../foundation/icon.md)의 Material Symbols root를 따른다.
- `DisclosurePanel`은 trigger 아래에 붙는 content region이다.
- `contained` surface는 `radius 8`, `border 1`을 사용할 수 있지만 child content의 card/surface recipe를 다시 쓰지 않는다.
- repeated accordion stack에서는 sibling 간 divider 또는 gap 중 하나를 선택한다.

## state 규칙

- `open=false`에서는 panel이 숨겨진다.
- `open=true`에서는 panel이 표시되고 trigger indicator가 expanded 상태를 반영한다.
- disabled disclosure가 필요하면 trigger row만 disabled 상태를 가진다.
- panel 내부 child의 focus/state는 child component가 소유한다.

## 사용해야 하는 경우

- 고급 설정 접기/펼치기
- FAQ 또는 설명 block
- filter section group
- detail section의 optional content

## 사용하지 말아야 하는 경우

- 주요 화면 전환 navigation
- tree indentation과 parent/child selection이 필요한 경우
- command menu
- selection dropdown
- blocking dialog

## child family reference

- trigger에 button visual이 필요하면 [Button.md](Button.md) 또는 [iconButton.md](iconButton.md)를 참조한다.
- section content surface는 [Section-Container.md](Section-Container.md) 또는 [Surface-Foundation.md](Surface-Foundation.md)를 참조한다.
- tree 구조는 [Tree Panel Composition.md](Tree%20Panel%20Composition.md)를 참조한다.

## current spec에서 제외하는 것

- animation duration/curve
- nested disclosure depth limit
- keyboard roving tabindex policy
- URL hash/history synchronization
- lazy loading behavior

## implementation / reconstruction 시 반드시 지켜야 하는 규칙

- trigger와 panel의 ownership을 분리한다.
- `open` state를 visual style만으로 처리하지 말고 panel visibility와 indicator를 함께 바꾼다.
- panel 내부 child component의 padding/radius/state를 Disclosure가 바꾸면 안 된다.
- navigation tree나 dropdown을 Disclosure로 대체하지 않는다.

## pending / later decision log

- accordion single-open behavior를 별도 prop으로 둘지 여부
- contained surface의 exact spacing token
- nested disclosure 허용 여부

## 라이트 테마 추가 해석

- light theme에서는 trigger row를 white/light surface와 subtle divider로 읽는다.
- expanded surface는 dark panel이 아니라 semantic light surface와 divider hierarchy로 구분한다.
