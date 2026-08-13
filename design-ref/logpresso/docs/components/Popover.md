# Popover

## AI Contract

- status: `blocked`
- exactHtml: `source required`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `source required`
- baseCss: `source required`
- gapCss: `none documented`
- sourcePointer: `ui/docs/components/Popover.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=blocked`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

## 목적

- `Popover`는 trigger에 붙는 floating panel parent composition이다.
- `Popover`는 short text helper인 `Tooltip`, selection surface인 dropdown, blocking shell인 `Modal`과 다르다.
- 이 문서는 anchored floating surface, optional header/body/footer region, placement boundary만 소유한다.

## 문서화 대상 범위

- trigger와 anchored surface 관계
- popover surface shell
- optional header/body/footer
- placement and alignment naming
- dismiss boundary

## core anatomy

- `PopoverTrigger`
- `PopoverAnchor`
- `PopoverSurface`
- optional `PopoverHeader`
- `PopoverBody`
- optional `PopoverFooter`
- optional `CloseAction`

## variant / property naming rule

- `placement`
  - `top`
  - `right`
  - `bottom`
  - `left`
- `align`
  - `start`
  - `center`
  - `end`
- `size`
  - `sm`
  - `md`
  - `lg`
- `open`
  - `true`
  - `false`

## visual / layout 규칙

- `PopoverSurface`는 floating panel이므로 `radius 8`, `border 1`, `shadow/base`를 사용한다.
- surface width는 content와 `size` variant가 소유한다.
- `PopoverBody`는 필수 region이다.
- header와 footer는 optional이다.
- close action이 필요한 경우 [iconButton.md](iconButton.md)를 child로 사용한다.
- trigger button visual은 [Button.md](Button.md) 또는 [iconButton.md](iconButton.md)가 소유한다.
- arrow/tail은 current required anatomy가 아니다.

## state / interaction boundary

- `open=false`에서는 surface가 렌더링되지 않거나 hidden 상태다.
- `open=true`에서는 trigger와 surface의 anchor relation이 유지된다.
- outside click, escape dismiss, focus return은 behavior boundary로 기록하되 visual recipe는 이 문서가 소유하지 않는다.
- focus trap이 필요한 blocking panel은 `Popover`가 아니라 [Modal.md](Modal.md)을 사용한다.

## 사용해야 하는 경우

- 작은 보조 설정 패널
- inline detail panel
- quick action editor
- trigger 주변의 non-blocking rich content

## 사용하지 말아야 하는 경우

- 짧은 한 줄 도움말
- selection dropdown
- blocking dialog
- full-height drawer
- date picker calendar surface

## child family reference

- trigger는 [Button.md](Button.md) 또는 [iconButton.md](iconButton.md)가 소유한다.
- body 안의 form은 [Form Layout.md](Form%20Layout.md)를 참조한다.
- footer action은 [Button.md](Button.md), [buttonGroup.md](buttonGroup.md)를 참조한다.
- short helper는 [Tooltip.md](Tooltip.md)를 사용한다.
- selection list는 dropdown family를 사용한다.

## current spec에서 제외하는 것

- collision detection algorithm
- portal/root mounting policy
- animation curve
- focus trap
- arrow/tail exact geometry
- nested popover behavior

## implementation / reconstruction 시 반드시 지켜야 하는 규칙

- `Popover`를 Modal처럼 화면 중앙 blocking surface로 배치하면 안 된다.
- trigger와 surface의 anchor 관계를 보존한다.
- selection-only content이면 dropdown family를 사용한다.
- plain short text이면 Tooltip을 사용한다.
- body content의 child component visual truth를 Popover가 바꾸면 안 된다.

## pending / later decision log

- arrow/tail을 canonical slot으로 승격할지 여부
- collision-aware placement token naming
- nested popover 허용 여부

## 라이트 테마 추가 해석

- light theme에서는 white/light surface, subtle border, soft shadow로 floating hierarchy를 만든다.
- dark fallback surface를 light theme에 강제하지 않는다.
- body text는 primary/helper semantic hierarchy를 따른다.
