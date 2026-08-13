# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/supporting/tree-panel-composition.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 / 13663:6329 treePanelComposition / expanded=true, 13663:6343 treePanelComposition / expanded=false`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/Tree Panel Composition.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, mismatch=0, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

Tree Panel Composition

## 목적

- `Tree Panel Composition`은 `Tree` primitive family가 아니라 collapsible panel composition pattern이다.
- 이 문서는 `treePanelShell`, `treePanelBody`, `treePanelToggle`, `itemList`의 parent-owned 구조와 상태 경계만 소유한다.
- child truth는 기존 family를 재사용한다.
  - `SearchInput` truth는 [Search.md](Search.md)가 소유한다.
  - row truth는 [dropdownCheckboxList.md](dropdownCheckboxList.md)가 소유한다.
  - collapse trigger primitive truth는 [iconButton.md](iconButton.md)가 소유한다.

## Figma evidence

- Figma file: `UI-5.1`
- expanded node: `13663:6329` `treePanelComposition / expanded=true`
- collapsed node: `13663:6343` `treePanelComposition / expanded=false`
- standalone body proof: `17502:2463` `treePanelBody / standalone`
- confirmed anatomy: `treePanelShell`, `treePanelHeaderActions`, `treePanelBody`, `SearchInput`, `itemList`, repeated `dropdownCheckboxListItem`, `treePanelToggle`
- confirmed states: `expanded=true`, `expanded=false`
- not confirmed: transition animation, `Tree` primitive family 승격, fixed header action set, canonical tree depth grammar

## 구현 기준

- exact page: `../../../site/component/supporting/tree-panel-composition.html`
- catalog route: `../../../site/index.html#components`
- source helper: `../../../site/app.js`의 `treePanelCompositionHtmlExample()`, `treePreview()`, `setTreePanelExpanded()`
- generated owner: `../../../site/generate-component-pages.mjs`
- root selector / data attribute: `[data-tree-panel-composition]`, `data-expanded="true|false"`
- base CSS selector from `sonar5.css`: `.glass-container`, `.btn`, `.btn-default`, `.btn-icon-only`, `.input`, `.input-search`, `.dropdown-list`, `.dropdown-option`, `.checkbox`, `.checkbox-md`, `.label`
- gap CSS selector from `component-css/component.css`: `[data-tree-panel-composition]`, `.glass-container[data-tree-panel-shell]`, `[data-tree-panel-content]`, `[data-tree-panel-header-actions]`, `[data-tree-panel-action]`, `[data-tree-panel-body]`, `[data-tree-panel-item-list]`, `[data-tree-panel-row]`, `[data-tree-panel-toggle]`
- HTML handoff policy: 긴 HTML snippet은 이 문서에 복사하지 않는다. 실제 DOM, class, data attribute는 exact page에서 확인한다.
- screen composition owner: `../composition/section-with-tree-panel.md`

## QA status

- QA issue: `../../../site/issue-20260518-1116-tree-panel-composition-sync/REVIEW.md`
- exact page checked: `../../../site/component/supporting/tree-panel-composition.html`
- catalog route checked: `../../../site/index.html#components`
- light/dark render checked: `tree-panel-exact-light.png`, `tree-panel-exact-dark.png`, `tree-panel-catalog.png`
- Figma-to-HTML mismatch count: `0`
- page error count: `0`
- CSS lock: `sonar5.css`는 수정하지 않았고 제품 selector를 읽기 전용 base로 재사용한다.
- remaining uncertainty: `file://` font resource failure는 `sonar5.css` absolute font URL의 기존 현상이며 Tree Panel Composition 본체 mismatch가 아니다.

## Current QA refresh

- QA issue: `../../../site/issue-20260519-1421-composition-current-qa-refresh`
- Figma evidence: expanded `13663:6329`, collapsed `13663:6343`
- exact page result: light/dark theme 모두 `[data-tree-panel-composition]` root, `data-expanded="true"`, shell `300 x 1000`, row count `6`, selected row count `1`, search input, `keyboard_double_arrow_left` toggle 확인
- interaction result: toggle click 후 collapsed state `data-expanded="false"`, body/header hidden, root width `24`, shell width `1`; 재클릭 후 expanded state와 width 복구 확인
- catalog route result: `Tree Panel Composition` link resolves to `component/supporting/tree-panel-composition.html`
- mismatch count: `0`
- documentation gate: `allowed`
- `sonar5.css`는 읽기 전용 reference로만 사용했고 수정하지 않았다.

## current source 읽는 법

- current source는 `Tree family`보다는 `collapsible panel composition`으로 읽는다.
- current source는 Tree Panel component specimen이다. 제품 route의 전체 two-column screen root로 읽지 않는다.
- expanded / collapsed 두 상태가 source에서 직접 확인된다.
- expanded 상태에서는 `SearchInput + repeated dropdownCheckboxListItem` 조합이 보인다.
- collapsed 상태에서는 body가 접히고 `treePanelToggle`만 남는다.
- 내부 반복 row는 새 `treeItem` family가 아니라 기존 `dropdownCheckboxListItem` 재사용으로 읽는다.

## 구조 / anatomy

- `treePanelComposition / expanded=true`
  - `treePanelShell`
    - `treePanelHeaderActions?`
    - `treePanelBody`
      - `SearchInput`
      - `itemList`
        - repeated `dropdownCheckboxListItem`
  - `treePanelToggle`
- `treePanelComposition / expanded=false`
  - `treePanelShell`
    - hidden `treePanelHeaderActions`
    - hidden `treePanelBody`
  - `treePanelToggle`
- `treePanelBody / standalone`
  - `SearchInput`
  - `itemList`
    - repeated `dropdownCheckboxListItem`

## current truth

- `Tree Panel Composition`은 parent composition truth만 소유한다.
- `Tree Panel Composition`은 left panel component truth만 소유한다. `leftPanelRegion + mainContentRegion` 관계는 [../composition/section-with-tree-panel.md](../composition/section-with-tree-panel.md)가 소유한다.
- expanded / collapsed 상태 naming은 현재 `expanded=true`, `expanded=false`로 읽는다.
- `treePanelShell`은 panel 외곽 shell과 highlight layer를 함께 가진다.
- highlight layer는 `treePanelShell` current truth로 기록한다.
- `treePanelBody`는 `SearchInput + itemList`를 담는 body region이다.
- `treePanelToggle`은 expand / collapse를 여는 local usage trigger다.
- `itemList`는 repeated row stack이며, row family를 다시 정의하지 않는다.
- `treePanelBody / standalone`은 body-only proof로 읽고, canonical full composition과 동일한 위상을 부여하지 않는다.

## composition 규칙

- `Tree Panel Composition`은 shell / body / toggle ownership만 소유한다.
- `Section With Tree Panel` product-route usage에서는 이 shell root가 left `Section Container` surface와 같은 root가 된다. 즉 `section.glass-container[data-list-section-container][data-left-tree-section-container][data-tree-panel-shell]`가 Tree Panel shell과 left Section Container surface를 동시에 표현한다.
- 이 usage에서 Tree Panel content는 `.glass-container-content[data-list-section-container-content][data-tree-panel-content]` 안에 들어간다.
- 이 usage에서 Tree Panel shell 바깥에 또 다른 nested `Section Container`를 추가하지 않는다.
- `treePanelShell`이 child row recipe를 다시 쓰면 안 된다.
- `treePanelHeaderActions`는 optional region이다.
- `treePanelHeaderActions`의 exact button identity와 exact button count는 상황별 local usage다.
- `treePanelHeaderActions`를 고정 action set으로 current truth에 승격하면 안 된다.
- `treePanelBody` 안의 exact row label, exact business text, exact row count는 sample truth다.
- body 안에서 보이는 indentation 차이는 current sample 배치다.
- indentation 차이를 tree depth canonical truth로 승격하면 안 된다.
- `itemList`는 repeated stack truth만 소유하고, row primitive를 새 family로 승격하지 않는다.
- collapsed 상태는 body가 hidden 되는 composition truth까지만 잠근다.
- collapsed 상태에서 hidden layer의 exact resize 방식과 animation은 current truth로 승격하지 않는다.

## generated screen row grammar

- Generated Tree Panel body must use `div.dropdown-list[role="listbox"][data-tree-panel-item-list]` for the item list root.
- Generated rows must use `label.dropdown-option.has-icon[data-tree-panel-row]`.
- Each generated row records `data-tree-node`, `data-tree-node-kind`, and `data-depth`.
- A source-faithful generated example must include hierarchy depth, not only depth `0`. Use depth `0` root, depth `1` parent/leaf, and depth `2` child where the screen has nested scope evidence.
- Parent/root rows with children expose `aria-expanded="true|false"` and a `data-tree-panel-expander` icon slot.
- Leaf rows preserve alignment with `data-tree-panel-expander-placeholder`.
- Every row has `data-tree-panel-node-icon` and `data-tree-panel-label`.
- Checkbox value uses native `input.checkbox[data-ui-choice]` with `checked` and `aria-checked`.
- Selected scope uses `aria-selected="true"` on the tree row.
- Do not use `aria-current` as a substitute for selected, checked, or expanded state.
- Flat checkbox-only lists, rows without icons, and mixed `checked/selected/current/expanded` state markers are invalid generated screen usage.

## child family reference

- `SearchInput` primitive truth는 [Search.md](Search.md)가 소유한다.
- `dropdownCheckboxListItem` row truth는 [dropdownCheckboxList.md](dropdownCheckboxList.md)가 소유한다.
- `iconButton` primitive truth는 [iconButton.md](iconButton.md)가 소유한다.
- panel 안 `Button` action truth는 [Button.md](Button.md)가 소유한다.

## current spec에서 제외하는 것

- 이 자산을 즉시 `Tree` canonical family로 승격하는 해석
- `dropdownCheckboxListItem`을 `treeItem`으로 포크하는 해석
- indentation sample을 곧바로 tree depth canonical truth로 승격하는 해석
- highlight layer를 모든 consumer context의 필수 truth로 승격하는 해석
- `treePanelHeaderActions`를 항상 존재하는 필수 region이나 고정 action set으로 승격하는 해석
- collapsed/expanded transition animation을 current truth로 기록하는 해석

## implementation / reconstruction 시 반드시 지켜야 하는 규칙

- `Tree Panel Composition`을 새 `Tree family`로 구현하면 안 된다.
- `Tree Panel Composition` exact page root를 제품 화면의 outer two-column root로 승격하면 안 된다.
- `treePanelShell`, `treePanelBody`, `treePanelToggle`의 ownership을 섞으면 안 된다.
- `dropdownCheckboxListItem`을 새 row primitive로 다시 만들면 안 된다.
- body 내부 row count와 exact indentation sample을 canonical truth로 일반화하면 안 된다.
- `treePanelHeaderActions`를 모든 상황에서 같은 버튼 세트로 고정하면 안 된다.
- collapsed 상태는 body hidden truth까지만 유지하고, hidden layer의 exact motion을 임의로 추가하면 안 된다.
- `treePanelBody / standalone`을 full composition canonical root로 승격하면 안 된다.

## 구현 / HTML 기준

- Figma 기준 node는 `13663:6329` `treePanelComposition / expanded=true`, `13663:6343` `treePanelComposition / expanded=false`다.
- exact page는 `component/supporting/tree-panel-composition.html`이다.
- HTML root는 `data-tree-panel-composition`과 `data-expanded="true|false"`를 사용한다.
- shell은 기존 제품 selector `.glass-container`를 재사용하고, body/toggle/header/action 영역은 `data-tree-panel-*` 의미 속성으로 구분한다.
- `.glass-container[data-tree-panel-shell]`은 Tree Panel shell source다. `Section With Tree Panel` product-route usage에서는 이 root가 `data-list-section-container`와 `data-left-tree-section-container`를 함께 가져 왼쪽 Section Container surface를 겸한다.
- `.glass-container[data-tree-panel-shell]`로 `Section With Tree Panel` 전체, `mainContentRegion`, 또는 오른쪽 table/list surface를 감싸면 안 된다.
- child control은 새 family로 만들지 않는다.
  - header action은 `.btn .btn-default`를 사용한다.
  - search field는 `.input .input-search`를 사용한다.
  - row stack은 `.dropdown-list`와 `.dropdown-option.has-icon` grammar를 사용한다.
  - row control은 `.checkbox.checkbox-md`와 `.label`을 사용한다.
- `component-css/component.css`는 `sonar5.css`에 없는 shell/body/toggle 배치 gap만 보정한다.
- `sonar5.css`는 read-only reference이며 이 구현에서 수정하지 않는다.
- code tab HTML은 component body markup만 제공하고 docs shell, preview wrapper, legacy `.demo-tree` markup을 포함하지 않는다.

## product route consumption

Connector-like product screens consume this component through a screen composition layer, not as the page root.

Observed product route evidence:

```text
app-resizable-sidebar-layout
  sidebar slot
    left Section Container surface
      connector-tree or selected Tree Panel source
  main slot
    main Section Container surface
      table-list
side-panel drawer opens from right table/list row click
```

For this route family, the resizable sidebar layout owns the two-column relation and route-specific width bounds. This component still owns the left panel shell/body/toggle grammar, and that shell is consumed as the left Section Container glass surface in `Section With Tree Panel`.

## pending / later decision log

- `treePanelHeaderActions`의 optional region 범위를 더 세분화할지 여부
- 향후 `treeItem` 또는 `Tree family`로 승격할지 여부

## 라이트 테마 추가 해석

- 본 섹션은 2026-05-04에 확인한 제품 light theme screenshot 기준 보강이다.
- light theme screenshot 기준 expanded `treePanelShell`은 밝은 panel surface, subtle border, soft highlight/shadow로 읽고 dark card fill로 고정하지 않는다.
- `treePanelHeaderActions`가 보이는 경우에도 optional region이라는 계약은 유지한다. light theme에서는 small boxed utility control처럼 읽되, 고정 action set으로 승격하지 않는다.
- `treePanelBody`의 핵심 조합은 그대로 `SearchInput + itemList`다. search field는 밝은 field surface로, repeated row stack은 text-first list로 읽는다.
- body 안의 current row는 pale accent surface + accent foreground 조합을 사용할 수 있고, non-current row는 dark neutral text로 읽는다.
- floating `treePanelToggle`은 light theme에서도 별도 usage trigger로 남고, dark badge가 아니라 light surface compact handle로 읽는다.
