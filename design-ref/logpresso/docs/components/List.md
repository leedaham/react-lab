# List

## AI Contract

- status: `blocked`
- exactHtml: `source required`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `source required`
- baseCss: `source required`
- gapCss: `none documented`
- sourcePointer: `ui/docs/components/List.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=blocked`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

## 목적

- `List`는 같은 종류의 item을 세로로 반복하는 generic content list parent composition이다.
- `List`는 command action surface인 `Menu`, selection surface인 dropdown family, column schema 기반 `Table`과 다르다.
- 알림 목록, 최근 항목, 검색 결과, simple entity list처럼 column 비교보다 item hierarchy가 중요한 경우에 사용한다.

## 문서화 대상 범위

- list root
- repeated list item
- leading visual slot
- primary/secondary text stack
- trailing meta/action slot
- divider or item gap

## core anatomy

- `ListRoot`
- repeated `ListItem`
- optional `LeadingSlot`
- `PrimaryText`
- optional `SecondaryText`
- optional `MetaText`
- optional `TrailingSlot`
- optional `ListSectionLabel`

## variant / property naming rule

- `density`
  - `default`
  - `compact`
- `selection`
  - `none`
  - `single`
  - `multi`
- `itemState`
  - `default`
  - `hover`
  - `active`
  - `disabled`
- `divider`
  - `none`
  - `inset`
  - `full`

## layout / visual 규칙

- list item은 horizontal row이며 content text stack은 vertical이다.
- primary text는 필수다.
- leading slot과 trailing slot은 optional이다.
- divider는 item boundary를 표시할 때만 사용하고 item border를 과하게 반복하지 않는다.
- selectable list에서는 active item surface를 row 전체에 적용한다.
- item height는 content density가 소유하지만, repeated rhythm은 list parent가 유지한다.

## 사용해야 하는 경우

- notification list
- activity feed
- search result list
- recent item list
- entity picker에서 item detail을 함께 보여야 하는 경우

## 사용하지 말아야 하는 경우

- column 비교가 핵심인 data table
- command menu
- checkbox/radio dropdown
- tree indentation이 필요한 hierarchy list
- dashboard card grid

## child family reference

- leading user visual은 [Avatar.md](Avatar.md)를 참조한다.
- trailing action은 [iconButton.md](iconButton.md)를 참조한다.
- status marker는 [StatusDot.md](StatusDot.md) 또는 [Badge.md](Badge.md)를 참조한다.
- command list는 [Menu.md](Menu.md)를 사용한다.
- tabular data는 [Table.md](Table.md)를 사용한다.

## current spec에서 제외하는 것

- virtualization
- infinite scroll
- drag reorder
- swipe action
- nested tree behavior
- item business schema

## implementation / reconstruction 시 반드시 지켜야 하는 규칙

- list item 전체 row alignment를 유지한다.
- primary/secondary text hierarchy를 뒤집으면 안 된다.
- leading/trailing optional slot을 item마다 임의 폭으로 흔들지 않는다.
- column 비교가 필요하면 `Table`로 승격한다.
- command-only item이면 `Menu`를 사용한다.

## pending / later decision log

- selectable list의 keyboard model
- sectioned list heading typography
- virtualized list와 static list를 분리할지 여부

## 라이트 테마 추가 해석

- light theme에서는 white/light item surface와 subtle divider로 hierarchy를 만든다.
- hover/active는 semantic neutral/brand alpha surface로 표현한다.
