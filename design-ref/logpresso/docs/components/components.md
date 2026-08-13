<!-- ds-locale:ko -->
# components.md

## AI Contract

- status: `source required`
- exactHtml: `source required`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `source required`
- baseCss: `source required`
- gapCss: `none documented`
- sourcePointer: `ui/docs/components/components.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `source required`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

## 목적

- 이 문서는 `docs/components` 폴더의 master index이자 component documentation entrypoint다.
- 이 문서는 component 문서 진입점이지만, lower foundation layer가 필요할 때는 `docs/foundation`을 함께 가리킨다.
- parent composition 문서는 structure, composition, cluster, placement, orchestration 같은 parent-owned rule만 소유한다.
- child component 문서는 primitive, family, slot, state, size, typography, token 같은 child-owned spec만 소유한다.
- foundation 문서는 shared principle, token boundary, system rule만 소유한다.
- example-only 문서나 example-only naming은 canonical truth로 승격하면 안 된다.
- 앞으로 component 문서가 새로 만들어지거나, 이름이 바뀌거나, 분리되거나, 병합되거나, 승격되거나, 강등되거나, deprecated 되면 `components.md`를 반드시 같은 라운드에서 함께 갱신해야 한다.

## foundation layer entrypoint

- foundation lower layer는 component 문서보다 아래에서 shared principle과 boundary를 제공한다.
- foundation 문서는 component 문서보다 먼저 component recipe를 결정하지 않는다.
- 항상 component/parent 소유 문서를 먼저 읽고, 필요한 foundation만 추가로 읽는다.
- foundation 문서 위치는 아래다.
  - [icon.md](../foundation/icon.md)
  - [color.md](../foundation/color.md)
  - [spacing.md](../foundation/spacing.md)
  - [typography.md](../foundation/typography.md)
  - [radius.md](../foundation/radius.md)
  - [border.md](../foundation/border.md)
  - [shadow.md](../foundation/shadow.md)
  - [state.md](../foundation/state.md)
  - [accessibility.md](../foundation/accessibility.md)
  - [motion.md](../foundation/motion.md)
  - [layer.md](../foundation/layer.md)
  - [content.md](../foundation/content.md)

## 이 문서를 읽는 법

- parent composition을 구현하거나 재구성할 때는 parent 문서를 먼저 읽는다.
- 그 다음 child 문서로 내려가서 exact size, spacing, typography, icon, primitive를 확인한다.
- child 문서가 foundation reference를 요구할 때만 필요한 foundation 문서를 추가로 읽는다.
- parent 문서가 child family truth를 덮어쓰면 안 된다.
- foundation 문서가 child family truth를 덮어쓰면 안 된다.
- example-only truth를 family canonical truth로 승격하면 안 된다.
- local usage naming과 example naming은 canonical property/state naming처럼 취급하면 안 된다.
- 아래 인덱스에서 `removed`, `merged`, `deprecated/history`, `draft`로 표시된 항목은 파일이 남아 있어도 active current source가 아니다.
- 파일이 남아 있는 inactive 문서는 과거 trace 호환, migration history, blocked evidence, template reference로만 사용한다.

## 컴포넌트 인덱스

### Navigation / Shell

| 컴포넌트명 | 문서 경로 | 분류 | 성격 | 비고 |
| --- | --- | --- | --- | --- |
| GNB | [GNB.md](GNB.md) | Navigation / Shell | reusable composition pattern | top-level shared shell, child placement와 shell rule 소유 |
| SNB | [SNB.md](SNB.md) | Navigation / Shell | reusable composition pattern | left-side navigation rail, `appNav area`와 `navList` 구조 소유 |
| Page Layout | [Page Layout.md](Page%20Layout.md) | Navigation / Shell | reusable composition pattern | GNB/SNB/Main/ActionBar/Content region을 배치하는 page-level composition |
| Action Bar | [Action Bar.md](Action%20Bar.md) | Navigation / Shell | reusable composition pattern | parent composition only, child truth 재정의 금지 |
| SNBToggle | [SNBToggle.md](SNBToggle.md) | Navigation / Shell | local usage | `GNB` 안 usage-level icon-only control |
| UserConsole | [UserConsole.md](UserConsole.md) | Navigation / Shell | local usage | current scope는 entry trigger와 GNB 내 배치만 소유, 구현 전까지 iconButton CSS fallback 사용 |
| breadcrumb | [breadcrumb.md](breadcrumb.md) | Navigation / Shell | family canonical | path display family |
| tab | [tab.md](tab.md) | Navigation / Shell | family canonical | panel/view switching top-tab family |
| tabNav | [tabNav.md](tabNav.md) | Navigation / Shell | family canonical | content/modal/drawer strip navigation family |
| pillTabs | [pillTabs.md](pillTabs.md) | Navigation / Shell | family canonical | compact segmented tab family, `direction` variant 포함 |
| tabAdd | [tabAdd.md](tabAdd.md) | Navigation / Shell | reusable composition pattern | horizontal overflow controls + add shared accessory pattern |
| Stepper | [Stepper.md](Stepper.md) | Navigation / Shell | reusable composition pattern | wizard/process step navigation component |

### Actions

| 컴포넌트명 | 문서 경로 | 분류 | 성격 | 비고 |
| --- | --- | --- | --- | --- |
| Button | [Button.md](Button.md) | Actions | family canonical | text button family canonical truth |
| iconButton | [iconButton.md](iconButton.md) | Actions | family canonical | icon-centered sibling family canonical truth |
| buttonGroup | [buttonGroup.md](buttonGroup.md) | Actions | reusable composition pattern | `Button` child만 반복하는 same-family group |
| iconButtonGroup | [iconButtonGroup.md](iconButtonGroup.md) | Actions | reusable composition pattern | `iconButton` child만 반복하는 same-family group |

### Inputs / Search / Selection

| 컴포넌트명 | 문서 경로 | 분류 | 성격 | 비고 |
| --- | --- | --- | --- | --- |
| Input | [Input.md](Input.md) | Inputs / Search / Selection | family canonical | single-line text entry specialization, `Form Field Foundation`의 historical field boundary를 Input 계열로 분산 편입 |
| DateInput | [DateInput.md](DateInput.md) | Inputs / Search / Selection | family canonical | single-date field shell family |
| DateRangeInput | [DateRangeInput.md](DateRangeInput.md) | Inputs / Search / Selection | family canonical | paired date range field shell family |
| Search | [Search.md](Search.md) | Inputs / Search / Selection | family canonical | `SearchInput` family truth + local usage boundary 포함 |
| Select | [Select.md](Select.md) | Inputs / Search / Selection | family canonical | selection field specialization, attached-actions는 deprecated |
| Textarea | [Textarea.md](Textarea.md) | Inputs / Search / Selection | family canonical | multiline text entry specialization |
| fieldLabel | [fieldLabel.md](fieldLabel.md) | Inputs / Search / Selection | family canonical | control이 아니라 shared label primitive |
| Field Item | [Field Item.md](Field%20Item.md) | Inputs / Search / Selection | family canonical | compact selected/applied field row |
| Form Layout | [Form Layout.md](Form%20Layout.md) | Inputs / Search / Selection | reusable composition pattern | label/control/message/action row를 묶는 form parent composition |
| Checkbox | [Checkbox.md](Checkbox.md) | Inputs / Search / Selection | family canonical | multi-select primitive control |
| Radio | [Radio.md](Radio.md) | Inputs / Search / Selection | family canonical | single-select primitive control |
| Switch | [Switch.md](Switch.md) | Inputs / Search / Selection | family canonical | on/off primitive control |
| Checkbox Group | [Checkbox Group.md](Checkbox%20Group.md) | Inputs / Search / Selection | reusable composition pattern | repeated checkbox row stack |
| Radio Group | [Radio Group.md](Radio%20Group.md) | Inputs / Search / Selection | reusable composition pattern | repeated radio row stack |
| Switch Group | [Switch Group.md](Switch%20Group.md) | Inputs / Search / Selection | reusable composition pattern | repeated switch row stack |

### Dropdown / List

| 컴포넌트명 | 문서 경로 | 분류 | 성격 | 비고 |
| --- | --- | --- | --- | --- |
| dropdownList | [dropdownList.md](dropdownList.md) | Dropdown / List | family canonical | overlay surface family, `rowType`/`hasFooter` canonical naming 사용 |
| dropdownCheckboxList | [dropdownCheckboxList.md](dropdownCheckboxList.md) | Dropdown / List | family canonical | checkbox selection-row surface family |
| dropdownRadioboxList | [dropdownRadioboxList.md](dropdownRadioboxList.md) | Dropdown / List | family canonical | radiobox selection-row surface family |
| Menu | [Menu.md](Menu.md) | Dropdown / List | superseded | use `Action Menu` + `Overlay Row / Command`; trigger/open examples live in `17A Components - Overlay Panels` |
| List | [List.md](List.md) | Dropdown / List | reusable composition pattern | repeated content item list, table/menu/dropdown과 구분 |

### Supporting

| 컴포넌트명 | 문서 경로 | 분류 | 성격 | 비고 |
| --- | --- | --- | --- | --- |
| Divider | [Divider.md](Divider.md) | Supporting | family canonical | exact primitive truth 소유 |
| Modal | [Modal.md](Modal.md) | Supporting | family canonical | width variant를 가진 modal shell family, footer close-capable region 포함 |
| Popover | [Popover.md](Popover.md) | Supporting | reusable composition pattern | trigger에 붙는 non-blocking floating panel parent |
| Disclosure | [Disclosure.md](Disclosure.md) | Supporting | reusable composition pattern | trigger row와 collapsible panel을 조합하는 content parent |
| Skeleton | [Skeleton.md](Skeleton.md) | Supporting | family canonical | loading placeholder primitive, final layout rhythm 보존 |
| Badge | [Badge.md](Badge.md) | Supporting | family canonical | leading marker와 label을 가진 compact display marker family |
| Tag | [Tag.md](Tag.md) | Supporting | family canonical | item-identity chip family, optional trailing remove affordance 포함 |
| Pagination | [Pagination.md](Pagination.md) | Supporting | reusable composition pattern | parent composition + supporting child control boundary 소유 |
| Table | [Table.md](Table.md) | Supporting | reusable composition pattern | column schema, header/body row stack, optional footer를 소유하는 table parent |
| Table Cell | [Table Cell.md](Table%20Cell.md) | Supporting | family canonical | `tableGrid` cell shell과 tableGrid specialized/domain sample 소유 |
| Data Table Cell | [Data Table Cell.md](Data%20Table%20Cell.md) | Supporting | family canonical | `dataGrid` compact cell shell, editable proof, mode sample 소유 |
| Sheet Table Cell | [Sheet Table Cell.md](Sheet%20Table%20Cell.md) | Supporting | family canonical | `sheetsGrid` compact cell shell과 sheet mode sample 소유 |
| Toast | [Toast.md](Toast.md) | Supporting | family canonical | large dismissible status message family |
| InlineAlert | [InlineAlert.md](InlineAlert.md) | Supporting | family canonical | compact one-line status message family |
| StatusDot | [StatusDot.md](StatusDot.md) | Supporting | family canonical | single-dot status indicator family |
| PriorityIndicator | [PriorityIndicator.md](PriorityIndicator.md) | Supporting | family canonical | three-dot level indicator family |
| ProgressBar | [ProgressBar.md](ProgressBar.md) | Supporting | family canonical | compact horizontal progress indicator family |
| Slider | [Slider.md](Slider.md) | Supporting | family canonical | compact horizontal slider family |
| Tooltip | [Tooltip.md](Tooltip.md) | Supporting | family canonical | floating helper surface family, text tooltip current truth와 rich-content proof 포함 |
| CalendarSurface | [CalendarSurface.md](CalendarSurface.md) | Supporting | reusable composition pattern | date picker overlay surface와 source-confirmed interior region geometry 소유 |
| Tree Panel Composition | [Tree Panel Composition.md](Tree%20Panel%20Composition.md) | Supporting | reusable composition pattern | `SearchInput + dropdownCheckboxListItem`를 담는 collapsible panel composition |
| Filter & Multi Sort | [Filter & Multi Sort.md](Filter%20%26%20Multi%20Sort.md) | Supporting | local usage | `Action Bar` 위 local filter/sort system, query logic은 제외 |
| InlineMessage | [InlineMessage.md](InlineMessage.md) | Supporting | family canonical | inline message + inline code supporting proof |
| Blankslate | [Blankslate.md](Blankslate.md) | Supporting | reusable composition pattern | centered empty-state composition pattern, title/description/action ordering 소유 |

### Surface

| 컴포넌트명 | 문서 경로 | 분류 | 성격 | 비고 |
| --- | --- | --- | --- | --- |
| Surface Foundation | [Surface-Foundation.md](Surface-Foundation.md) | Surface | supporting boundary | container/item pattern의 narrow shared surface grammar만 소유 |
| Card Item | [Card-Item.md](Card-Item.md) | Surface | reusable composition pattern | repeated item card shell pattern |
| Widget Container | [Widget-Container.md](Widget-Container.md) | Surface | reusable composition pattern | dashboard widget/module shell pattern |
| Section Container | [Section-Container.md](Section-Container.md) | Surface | reusable composition pattern | section-wide parent surface pattern |
| Drawer Container | [Drawer-Container.md](Drawer-Container.md) | Surface | reusable composition pattern | drawer detail parent surface pattern |

## Foundation / Shared System

| 문서명 | 문서 경로 | 분류 | 성격 | 비고 |
| --- | --- | --- | --- | --- |
| icon | [icon.md](../foundation/icon.md) | Foundation / Shared System | family canonical | icon source root, size system, placeholder boundary |
| color | [color.md](../foundation/color.md) | Foundation / Shared System | family canonical | semantic color principle과 fallback boundary |
| spacing | [spacing.md](../foundation/spacing.md) | Foundation / Shared System | family canonical | Tailwind baseline spacing system |
| typography | [typography.md](../foundation/typography.md) | Foundation / Shared System | family canonical | Pretendard source-of-truth와 fallback handling |
| radius | [radius.md](../foundation/radius.md) | Foundation / Shared System | family canonical | Tailwind baseline radius system |
| border | [border.md](../foundation/border.md) | Foundation / Shared System | family canonical | border/divider/container boundary |
| shadow | [shadow.md](../foundation/shadow.md) | Foundation / Shared System | family canonical | shared shadow token/system boundary |
| state | [state.md](../foundation/state.md) | Foundation / Shared System | family canonical | shared state model과 naming boundary |
| accessibility | [accessibility.md](../foundation/accessibility.md) | Foundation / Shared System | family canonical | keyboard, focus-visible, ARIA, contrast, reduced motion boundary |
| motion | [motion.md](../foundation/motion.md) | Foundation / Shared System | family canonical | duration, easing, transition, reduced motion boundary |
| layer | [layer.md](../foundation/layer.md) | Foundation / Shared System | family canonical | overlay stack, z-index role, portal, focus return boundary |
| content | [content.md](../foundation/content.md) | Foundation / Shared System | family canonical | label, helper, error, empty, terminology, i18n boundary |

## 현재 구조상 별도 문서가 없지만 자주 참조되는 항목

| 항목 | 현재 상태 | 비고 |
| --- | --- | --- |
| Header | missing | active current spec에서는 canonical component명이 아니고, 현재 상단 조합 문서는 `GNB.md`가 소유 |
| CI | local asset reference | 파일은 남아 있지만 독립 화면 component가 아니다. SVG brand asset rule은 [CI.md](CI.md)가 보존하고, GNB 안 배치와 shell rule은 [GNB.md](GNB.md)가 소유 |
| Avatar | inactive blocked reference | 파일은 남아 있지만 current catalog component가 아니다. exact source/Figma 근거 확정 전까지 제품 화면 source로 사용하지 않는다 |
| 컴포넌트 문서 템플릿 | template reference | 파일은 남아 있지만 component source가 아니다. 문서 작성 형식 참고용이다 |
| Button Visual Draft | draft reference | [draft/Button.md](draft/Button.md)는 active source가 아니며 [Button.md](Button.md)를 대체하지 않는다 |
| Form Field Foundation | deprecated/history | 파일은 남아 있지만 active owner가 아니다. Input/DateInput/DateRangeInput/Select/Textarea/fieldLabel 계열의 historical boundary만 기록한다 |
| SearchInput | missing | 별도 `SearchInput.md`는 없고 [Search.md](Search.md) 내부 family section이 소유 |
| AppNavButton | missing | 별도 문서는 없고 [SNB.md](SNB.md) subsection이 소유 |
| dropdownCheckboxListItem | missing | 별도 문서는 없고 [dropdownCheckboxList.md](dropdownCheckboxList.md) local row truth가 소유 |
| dropdownRadioboxListItem | missing | 별도 문서는 없고 [dropdownRadioboxList.md](dropdownRadioboxList.md) local row truth가 소유 |
| SearchSection / SearchEntryRow | missing | 별도 문서는 없고 [Search.md](Search.md) local composition section이 소유 |
| CalendarGrid / YearMonthNavigation / TimeFieldGroup / DateSelectorHeader / CalendarFooterActionRow | missing | 별도 문서는 없고 [CalendarSurface.md](CalendarSurface.md) supporting/composition boundary section이 소유 |

## 성격 라벨 기준

- `family canonical`: primitive 또는 family의 canonical truth를 직접 소유하는 문서
- `reusable composition pattern`: parent composition, group, stack, shell처럼 child를 조합하는 재사용 패턴 문서
- `supporting boundary`: giant family owner가 아니라 여러 family가 공통으로 참조하는 narrow shared boundary 문서
- `local usage`: 특정 parent나 특정 문맥 안에서만 유효한 usage-level truth를 다루는 문서
- `example-only`: canonical truth가 아니라 template, example, sample, history에 가까운 문서
- `deprecated/history`: active current-spec owner가 아니고, 과거 해석이나 migration history를 보존하는 문서
- `draft`: active current-spec owner가 아니고, 승격 전 exploration / draft spec 문서

## index maintenance rule

- `components.md`는 `docs/components` 폴더의 master table of contents다.
- 앞으로 생성되는 모든 component markdown 파일은 반드시 이 파일에 추가해야 한다.
- 앞으로 일어나는 모든 component-doc rename, split, merge, promotion, demotion, deprecation은 반드시 같은 라운드에서 이 파일에 반영해야 한다.
- `components.md` 업데이트가 빠진 상태는 documentation incompleteness로 취급한다.
- active current spec 분류, 성격, 비고가 바뀌면 이 파일의 표도 같은 라운드에서 같이 바꿔야 한다.
<!-- /ds-locale -->

<!-- ds-locale:en -->
# components.md

## AI Contract

- status: `source required`
- exactHtml: `source required`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `source required`
- baseCss: `source required`
- gapCss: `none documented`
- sourcePointer: `ui/docs/components/components.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `source required`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

## Purpose

- This document is the master index and component documentation entrypoint for the `docs/components` folder.
- It can point to `docs/foundation` when a lower foundation layer is required.
- Parent composition documents own parent-owned rules such as structure, composition, cluster, placement, orchestration, and order.
- Child component documents own child-owned specs such as primitive, family, slot, state, size, typography, and token.
- Foundation documents own shared principles, token boundaries, and system rules only.
- Do not promote example-only documents or example-only naming to canonical truth.
- When component documents are created, renamed, split, merged, promoted, demoted, or deprecated, update `components.md` in the same round.

## Foundation Layer Entrypoint

- The lower foundation layer provides shared principles and boundaries beneath component documents.
- Foundation documents do not decide component recipes before component documents.
- Always read the component or parent owner document first, then add only the required foundation documents.
- Foundation document locations:
  - [icon.md](../foundation/icon.md)
  - [color.md](../foundation/color.md)
  - [spacing.md](../foundation/spacing.md)
  - [typography.md](../foundation/typography.md)
  - [radius.md](../foundation/radius.md)
  - [border.md](../foundation/border.md)
  - [shadow.md](../foundation/shadow.md)
  - [state.md](../foundation/state.md)
  - [accessibility.md](../foundation/accessibility.md)
  - [motion.md](../foundation/motion.md)
  - [layer.md](../foundation/layer.md)
  - [content.md](../foundation/content.md)

## How To Read

- Read the parent document first when implementing or recomposing parent composition.
- Then read child documents for exact size, spacing, typography, icon, and primitive rules.
- Add foundation documents only when a child document requires them.
- Parent documents must not override child family truth.
- Foundation documents must not override child family truth.
- Example-only truth must not be promoted to family canonical truth.
- Local usage naming and example naming are not canonical property or state naming.
- Items marked `removed`, `merged`, `deprecated/history`, or `draft` are not active current source even if files remain.
- Inactive files are retained only for trace compatibility, migration history, blocked evidence, or template reference.

## Component Index

### Navigation / Shell

| Component | Document path | Category | Status | Note |
| --- | --- | --- | --- | --- |
| GNB | [GNB.md](GNB.md) | Navigation / Shell | reusable composition pattern | Owns top-level shared shell rules, child placement, and shell rules. |
| SNB | [SNB.md](SNB.md) | Navigation / Shell | reusable composition pattern | Owns the left-side navigation rail, `appNav area`, and `navList` structure. |
| Page Layout | [Page Layout.md](Page%20Layout.md) | Navigation / Shell | reusable composition pattern | Places GNB, SNB, main, ActionBar, and content regions. |
| Action Bar | [Action Bar.md](Action%20Bar.md) | Navigation / Shell | reusable composition pattern | Parent composition only; child truth must not be redefined. |
| SNBToggle | [SNBToggle.md](SNBToggle.md) | Navigation / Shell | local usage | Usage-level icon-only control inside `GNB`. |
| UserConsole | [UserConsole.md](UserConsole.md) | Navigation / Shell | local usage | Current scope owns only the entry trigger and GNB placement; use iconButton CSS fallback until implementation is confirmed. |
| breadcrumb | [breadcrumb.md](breadcrumb.md) | Navigation / Shell | family canonical | Path display family. |
| tab | [tab.md](tab.md) | Navigation / Shell | family canonical | Panel or view switching top-tab family. |
| tabNav | [tabNav.md](tabNav.md) | Navigation / Shell | family canonical | Content, modal, and drawer strip navigation family. |
| pillTabs | [pillTabs.md](pillTabs.md) | Navigation / Shell | family canonical | Compact segmented tab family, including the `direction` variant. |
| tabAdd | [tabAdd.md](tabAdd.md) | Navigation / Shell | reusable composition pattern | Shared horizontal overflow controls and add accessory pattern. |
| Stepper | [Stepper.md](Stepper.md) | Navigation / Shell | reusable composition pattern | Wizard and process step navigation component. |

### Actions

| Component | Document path | Category | Status | Note |
| --- | --- | --- | --- | --- |
| Button | [Button.md](Button.md) | Actions | family canonical | Canonical truth for the text button family. |
| iconButton | [iconButton.md](iconButton.md) | Actions | family canonical | Canonical truth for the icon-centered sibling family. |
| buttonGroup | [buttonGroup.md](buttonGroup.md) | Actions | reusable composition pattern | Same-family group that repeats only `Button` children. |
| iconButtonGroup | [iconButtonGroup.md](iconButtonGroup.md) | Actions | reusable composition pattern | Same-family group that repeats only `iconButton` children. |

### Inputs / Search / Selection

| Component | Document path | Category | Status | Note |
| --- | --- | --- | --- | --- |
| Input | [Input.md](Input.md) | Inputs / Search / Selection | family canonical | Single-line text entry specialization; the historical `Form Field Foundation` boundary is distributed into Input-family documents. |
| DateInput | [DateInput.md](DateInput.md) | Inputs / Search / Selection | family canonical | Single-date field shell family. |
| DateRangeInput | [DateRangeInput.md](DateRangeInput.md) | Inputs / Search / Selection | family canonical | Paired date range field shell family. |
| Search | [Search.md](Search.md) | Inputs / Search / Selection | family canonical | Owns `SearchInput` family truth and local usage boundaries. |
| Select | [Select.md](Select.md) | Inputs / Search / Selection | family canonical | Selection field specialization; attached-actions are deprecated. |
| Textarea | [Textarea.md](Textarea.md) | Inputs / Search / Selection | family canonical | Multiline text entry specialization. |
| fieldLabel | [fieldLabel.md](fieldLabel.md) | Inputs / Search / Selection | family canonical | Shared label primitive, not a control. |
| Field Item | [Field Item.md](Field%20Item.md) | Inputs / Search / Selection | family canonical | Compact selected or applied field row. |
| Form Layout | [Form Layout.md](Form%20Layout.md) | Inputs / Search / Selection | reusable composition pattern | Form parent composition for label, control, message, and action row. |
| Checkbox | [Checkbox.md](Checkbox.md) | Inputs / Search / Selection | family canonical | Multi-select primitive control. |
| Radio | [Radio.md](Radio.md) | Inputs / Search / Selection | family canonical | Single-select primitive control. |
| Switch | [Switch.md](Switch.md) | Inputs / Search / Selection | family canonical | On/off primitive control. |
| Checkbox Group | [Checkbox Group.md](Checkbox%20Group.md) | Inputs / Search / Selection | reusable composition pattern | Repeated checkbox row stack. |
| Radio Group | [Radio Group.md](Radio%20Group.md) | Inputs / Search / Selection | reusable composition pattern | Repeated radio row stack. |
| Switch Group | [Switch Group.md](Switch%20Group.md) | Inputs / Search / Selection | reusable composition pattern | Repeated switch row stack. |

### Dropdown / List

| Component | Document path | Category | Status | Note |
| --- | --- | --- | --- | --- |
| dropdownList | [dropdownList.md](dropdownList.md) | Dropdown / List | family canonical | Overlay surface family that uses canonical `rowType` and `hasFooter` naming. |
| dropdownCheckboxList | [dropdownCheckboxList.md](dropdownCheckboxList.md) | Dropdown / List | family canonical | Checkbox selection-row surface family. |
| dropdownRadioboxList | [dropdownRadioboxList.md](dropdownRadioboxList.md) | Dropdown / List | family canonical | Radiobox selection-row surface family. |
| Menu | [Menu.md](Menu.md) | Dropdown / List | superseded | Use `Action Menu` and `Overlay Row / Command`; trigger and open examples live in `17A Components - Overlay Panels`. |
| List | [List.md](List.md) | Dropdown / List | reusable composition pattern | Repeated content item list, distinct from table, menu, and dropdown. |

### Supporting

| Component | Document path | Category | Status | Note |
| --- | --- | --- | --- | --- |
| Divider | [Divider.md](Divider.md) | Supporting | family canonical | Owns exact primitive truth. |
| Modal | [Modal.md](Modal.md) | Supporting | family canonical | Modal shell family with width variants and a footer close-capable region. |
| Popover | [Popover.md](Popover.md) | Supporting | reusable composition pattern | Non-blocking floating panel parent attached to a trigger. |
| Disclosure | [Disclosure.md](Disclosure.md) | Supporting | reusable composition pattern | Content parent that combines a trigger row and collapsible panel. |
| Skeleton | [Skeleton.md](Skeleton.md) | Supporting | family canonical | Loading placeholder primitive that preserves final layout rhythm. |
| Badge | [Badge.md](Badge.md) | Supporting | family canonical | Compact display marker family with a leading marker and label. |
| Tag | [Tag.md](Tag.md) | Supporting | family canonical | Item-identity chip family with optional trailing remove affordance. |
| Pagination | [Pagination.md](Pagination.md) | Supporting | reusable composition pattern | Parent composition plus supporting child control boundary. |
| Table | [Table.md](Table.md) | Supporting | reusable composition pattern | Table parent that owns column schema, header/body row stack, and optional footer. |
| Table Cell | [Table Cell.md](Table%20Cell.md) | Supporting | family canonical | Owns `tableGrid` cell shell and tableGrid specialized/domain samples. |
| Data Table Cell | [Data Table Cell.md](Data%20Table%20Cell.md) | Supporting | family canonical | Owns `dataGrid` compact cell shell, editable proof, and mode samples. |
| Sheet Table Cell | [Sheet Table Cell.md](Sheet%20Table%20Cell.md) | Supporting | family canonical | Owns `sheetsGrid` compact cell shell and sheet mode samples. |
| Toast | [Toast.md](Toast.md) | Supporting | family canonical | Large dismissible status message family. |
| InlineAlert | [InlineAlert.md](InlineAlert.md) | Supporting | family canonical | Compact one-line status message family. |
| StatusDot | [StatusDot.md](StatusDot.md) | Supporting | family canonical | Single-dot status indicator family. |
| PriorityIndicator | [PriorityIndicator.md](PriorityIndicator.md) | Supporting | family canonical | Three-dot level indicator family. |
| ProgressBar | [ProgressBar.md](ProgressBar.md) | Supporting | family canonical | Compact horizontal progress indicator family. |
| Slider | [Slider.md](Slider.md) | Supporting | family canonical | Compact horizontal slider family. |
| Tooltip | [Tooltip.md](Tooltip.md) | Supporting | family canonical | Floating helper surface family with text tooltip current truth and rich-content proof. |
| CalendarSurface | [CalendarSurface.md](CalendarSurface.md) | Supporting | reusable composition pattern | Owns date picker overlay surface and source-confirmed interior region geometry. |
| Tree Panel Composition | [Tree Panel Composition.md](Tree%20Panel%20Composition.md) | Supporting | reusable composition pattern | Collapsible panel composition containing `SearchInput + dropdownCheckboxListItem`. |
| Filter & Multi Sort | [Filter & Multi Sort.md](Filter%20%26%20Multi%20Sort.md) | Supporting | local usage | Local filter/sort system above `Action Bar`; query logic is excluded. |
| InlineMessage | [InlineMessage.md](InlineMessage.md) | Supporting | family canonical | Inline message and inline code supporting proof. |
| Blankslate | [Blankslate.md](Blankslate.md) | Supporting | reusable composition pattern | Centered empty-state composition pattern, including title, description, and action ordering. |

### Surface

| Component | Document path | Category | Status | Note |
| --- | --- | --- | --- | --- |
| Surface Foundation | [Surface-Foundation.md](Surface-Foundation.md) | Surface | supporting boundary | Owns only the narrow shared surface grammar for container and item patterns. |
| Card Item | [Card-Item.md](Card-Item.md) | Surface | reusable composition pattern | Repeated item card shell pattern. |
| Widget Container | [Widget-Container.md](Widget-Container.md) | Surface | reusable composition pattern | Dashboard widget/module shell pattern. |
| Section Container | [Section-Container.md](Section-Container.md) | Surface | reusable composition pattern | Section-wide parent surface pattern. |
| Drawer Container | [Drawer-Container.md](Drawer-Container.md) | Surface | reusable composition pattern | Drawer detail parent surface pattern. |

## Foundation / Shared System

| Document | Document path | Category | Status | Note |
| --- | --- | --- | --- | --- |
| icon | [icon.md](../foundation/icon.md) | Foundation / Shared System | family canonical | Icon source root, size system, and placeholder boundary. |
| color | [color.md](../foundation/color.md) | Foundation / Shared System | family canonical | Semantic color principle and fallback boundary. |
| spacing | [spacing.md](../foundation/spacing.md) | Foundation / Shared System | family canonical | Tailwind baseline spacing system. |
| typography | [typography.md](../foundation/typography.md) | Foundation / Shared System | family canonical | Pretendard source of truth and fallback handling. |
| radius | [radius.md](../foundation/radius.md) | Foundation / Shared System | family canonical | Tailwind baseline radius system. |
| border | [border.md](../foundation/border.md) | Foundation / Shared System | family canonical | Border, divider, and container boundary. |
| shadow | [shadow.md](../foundation/shadow.md) | Foundation / Shared System | family canonical | Shared shadow token and system boundary. |
| state | [state.md](../foundation/state.md) | Foundation / Shared System | family canonical | Shared state model and naming boundary. |
| accessibility | [accessibility.md](../foundation/accessibility.md) | Foundation / Shared System | family canonical | Keyboard, focus-visible, ARIA, contrast, and reduced motion boundary. |
| motion | [motion.md](../foundation/motion.md) | Foundation / Shared System | family canonical | Duration, easing, transition, and reduced motion boundary. |
| layer | [layer.md](../foundation/layer.md) | Foundation / Shared System | family canonical | Overlay stack, z-index role, portal, and focus return boundary. |
| content | [content.md](../foundation/content.md) | Foundation / Shared System | family canonical | Label, helper, error, empty, terminology, and i18n boundary. |

## Frequently Referenced Items Without Separate Active Documents

| Item | Current status | Note |
| --- | --- | --- |
| Header | missing | Not a canonical component name in the active current spec; the current top composition is owned by `GNB.md`. |
| CI | local asset reference | The file remains, but it is not an independent screen component. SVG brand asset rules are preserved in [CI.md](CI.md), while GNB placement and shell rules are owned by [GNB.md](GNB.md). |
| Avatar | inactive blocked reference | The file remains, but it is not a current catalog component until exact source and Figma evidence are confirmed. |
| Component documentation template | template reference | Kept only as a documentation format reference. |
| Button Visual Draft | draft reference | [draft/Button.md](draft/Button.md) is not active source and does not replace [Button.md](Button.md). |
| Form Field Foundation | deprecated/history | Kept only as historical boundary now distributed into Input, DateInput, DateRangeInput, Select, Textarea, and fieldLabel families. |
| SearchInput | missing | No separate `SearchInput.md`; the family section inside [Search.md](Search.md) owns it. |
| AppNavButton | missing | No separate document; [SNB.md](SNB.md) owns the subsection. |
| dropdownCheckboxListItem | missing | No separate document; [dropdownCheckboxList.md](dropdownCheckboxList.md) owns the local row truth. |
| dropdownRadioboxListItem | missing | No separate document; [dropdownRadioboxList.md](dropdownRadioboxList.md) owns the local row truth. |
| SearchSection / SearchEntryRow | missing | No separate document; [Search.md](Search.md) owns the local composition section. |
| CalendarGrid / YearMonthNavigation / TimeFieldGroup / DateSelectorHeader / CalendarFooterActionRow | missing | No separate document; [CalendarSurface.md](CalendarSurface.md) owns the supporting/composition boundary section. |

## Status Label Criteria

- `family canonical`: directly owns primitive or family canonical truth.
- `reusable composition pattern`: reusable parent composition, group, stack, or shell pattern.
- `supporting boundary`: narrow shared boundary referenced by multiple families, not a giant family owner.
- `local usage`: usage-level truth valid only inside a specific parent or context.
- `example-only`: template, example, sample, or historical reference rather than canonical truth.
- `deprecated/history`: not an active current-spec owner; preserved for past interpretation or migration history.
- `draft`: exploration or draft spec before promotion, not active current-spec owner.

## Index Maintenance Rule

- `components.md` is the master table of contents for the `docs/components` folder.
- Every new component Markdown file must be added to this file.
- Every component-doc rename, split, merge, promotion, demotion, and deprecation must be reflected here in the same round.
- Missing `components.md` updates are treated as documentation incompleteness.
- If active current spec category, status, or notes change, update this table in the same round.
<!-- /ds-locale -->
