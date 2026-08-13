# Menu

## AI Contract

- status: `superseded`
- exactHtml: `source required`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `source required`
- baseCss: `source required`
- gapCss: `none documented`
- sourcePointer: `ui/docs/components/Menu.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=superseded`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

## Current Status

`Menu` is no longer an active standalone component source.

Current canonical ownership:

- menu floating panel source: `Action Menu`
- menu row source: `Overlay Row / Command`
- trigger source: `Button` or `Icon Button`
- trigger + opened panel examples: `17A Components - Overlay Panels`

Do not create new `Menu`, `Menu Item`, `Dropdown Menu`, or `Context Menu` source component sets without a fresh user-approved source contract.

## 목적

- `Menu`는 command 또는 navigation action을 세로 목록으로 제공하는 action list surface다.
- `Menu`는 value selection용 `dropdownList`와 다르다.
- `Menu`는 trigger ownership, action identity, item row structure를 소유하고 child icon/source truth는 foundation에 위임한다.
- This historical definition is superseded by `Action Menu` and `Overlay Row / Command`.

## 문서화 대상 범위

- menu surface
- menu item row
- optional leading icon
- optional shortcut/meta text
- divider group
- disabled/danger item state

## core anatomy

- `MenuRoot`
- `MenuSurface`
- repeated `MenuItem`
- optional `LeadingIconSlot`
- `MenuItemLabel`
- optional `ShortcutSlot`
- optional `MenuDivider`
- optional `MenuSectionLabel`

## variant / property naming rule

- `trigger`
  - `button`
  - `context`
  - `overflow`
- `itemIntent`
  - `default`
  - `danger`
- `itemState`
  - `default`
  - `hover`
  - `active`
  - `disabled`
- `density`
  - `default`
  - `compact`

## visual / layout 규칙

- `MenuSurface`는 floating surface이며 `radius 8`, `border 1`, `shadow/base`를 사용한다.
- item row는 one-line horizontal layout이다.
- item row는 label을 필수로 가진다.
- leading icon과 shortcut/meta text는 optional slot이다.
- item row height는 compact action list로 읽되, exact button height를 상속하지 않는다.
- divider는 group boundary로만 사용하고 item border로 반복하지 않는다.
- `danger` item은 destructive action intent를 표시하지만 confirm/delete flow 자체는 소유하지 않는다.

## 사용해야 하는 경우

- overflow action menu
- row action menu
- user/account menu의 command list
- context menu
- small navigation/action list

## 사용하지 말아야 하는 경우

- value selection dropdown
- checkbox/radio selection list
- long searchable list
- modal body content
- tooltip 또는 rich popover 설명

## child family reference

- trigger button은 [Button.md](Button.md) 또는 [iconButton.md](iconButton.md)가 소유한다.
- icon source와 size root는 [icon.md](../foundation/icon.md)가 소유한다.
- divider primitive는 [Divider.md](Divider.md)가 소유한다.
- selection list는 [dropdownList.md](dropdownList.md), [dropdownCheckboxList.md](dropdownCheckboxList.md), [dropdownRadioboxList.md](dropdownRadioboxList.md)를 사용한다.

## current spec에서 제외하는 것

- keyboard command registry
- nested submenu
- typeahead search
- command execution lifecycle
- permission-based item visibility
- OS-native context menu behavior

## implementation / reconstruction 시 반드시 지켜야 하는 규칙

- `Menu`를 새 active component source로 재구성하지 않는다.
- command/action menu가 필요하면 `Action Menu`를 사용한다.
- menu item row가 필요하면 `Overlay Row / Command`를 사용한다.
- trigger가 필요하면 `Button` 또는 `Icon Button`을 사용하고, trigger + opened panel composition은 `17A Components - Overlay Panels` example로 둔다.
- `Menu Item`을 별도 source component set으로 만들지 않는다.
- `Dropdown Menu`와 `Context Menu`를 active source component로 되살리지 않는다.

## pending / later decision log

- submenu를 별도 `Submenu` pattern으로 둘지 여부
- keyboard shortcut slot의 exact typography token
- account profile summary가 Menu 내부 slot인지 별도 UserConsole panel인지 여부

## 라이트 테마 추가 해석

- light theme에서는 white/light floating surface, subtle border, small shadow를 사용한다.
- hover/active는 dark fill이 아니라 semantic neutral/brand alpha surface로 표현한다.
- danger item은 red/orange semantic text 또는 surface tint로만 표시하고 전체 menu를 danger surface로 바꾸지 않는다.
