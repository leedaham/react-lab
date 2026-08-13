# 컴포넌트명

Action Bar

## AI Contract

component: `Action Bar`
status: `ready`
source status: `Figma N/A, approved parent composition`
approval evidence: `2026-06-02 사용자 승인으로 기존 exact page와 문서화된 parent composition contract를 canonical screen-generation source로 사용한다. Figma exact node가 확정되기 전까지 이 승인은 parent layout/orchestration에만 적용하며 child visual recipe에는 적용하지 않는다.`
figmaNode: `N/A`
exactHtml: `site/component/navigation-shell/action-bar.html`
catalogRoute: `site/index.html#components`
sourcePointer: `site/app.js`의 `componentMeta["Action Bar"]`, `codeSamples["Action Bar"]`, `previewRenderers["Action Bar"]`, `actionBarDropdownPreview()`
rootSelector: `[data-action-bar]`
clusterSelectors: `[data-action-bar-discovery-cluster]`, `[data-action-bar-command-cluster]`
baseCss: `sonar5.css` child selectors only; parent composition layout is screen/output-owned until product CSS selector exists.
gapCss: `component-css/component.css`에는 Action Bar parent root gap을 추가하지 않는다. Child control gap은 각 child component 문서가 소유한다.
screenUsage: `List`, `Dashboard`, `Workflow`, `Settings` 등에서 search/filter/action cluster parent로 사용 가능.
warnings: exact item label, trigger count, business action identity는 screen/product spec이 소유한다.

## Figma evidence

- Figma file: `UI-5.1`
- Figma node: `N/A`
- approval status: `approved parent composition`
- approval date: `2026-06-02`
- confirmed scope: `Root`, `Discovery Cluster`, `Command Cluster`, single-row layout, cluster gap, `SearchInput` trailing placement, command divider placement, overflow policy, source trace requirement
- not confirmed: exact trigger count, exact label text, exact business action identity, opened child surface internals

## 구현 기준

- exact page: `site/component/navigation-shell/action-bar.html`
- catalog route: `site/index.html#components`
- source helper: `site/app.js`의 `componentMeta["Action Bar"]`, `codeSamples["Action Bar"]`, `previewRenderers["Action Bar"]`, `actionBarDropdownPreview()`
- implemented HTML owner: screen generator 또는 product screen owner가 `Action Bar` parent slots를 조립한다.
- root selector / data attribute: `[data-action-bar]`
- cluster selector / data attribute: `[data-action-bar-discovery-cluster]`, `[data-action-bar-command-cluster]`
- base CSS selector from `sonar5.css`: child selectors only. Parent root product selector가 생기기 전까지 `Action Bar`는 screen-owned layout wrapper를 사용한다.
- gap CSS selector from `component-css/component.css`: 없음. `component-css/component.css`에는 Action Bar parent root gap을 새로 추가하지 않는다.
- HTML handoff policy: exact page와 `app.js` preview는 source evidence다. 제품 화면은 `demo-actionbar`, `demo-actionbar-cluster`, `demo-button`, `demo-divider` 같은 catalog preview class를 사용하지 않는다.

## QA status

- QA scope: parent composition contract readiness unblock
- exact page checked: `site/component/navigation-shell/action-bar.html`
- catalog route checked: `site/index.html#components`
- source helper checked: `site/app.js`
- Figma-to-HTML mismatch count: `N/A` because Figma exact node is not used for this approved parent composition scope.
- CSS lock: `sonar5.css`는 수정하지 않는다. Parent layout은 generated screen CSS 또는 product screen CSS가 소유하고, child visual은 각 child component selector를 재사용한다.
- remaining uncertainty: Figma exact node가 확정되면 visual/current-spec QA를 다시 수행하고 이 문서를 갱신한다.

## 목적

- `Action Bar`는 primitive family가 아니라 reusable parent composition pattern이다.
- 현재 문서는 child family를 다시 정의하지 않고, parent-level 구조, cluster, ordering, open-state orchestration만 implementation/reconstruction-grade 기준으로 잠근다.
- `Action Bar`는 `Button`, `iconButton`, `SearchInput`, `dropdownList`, `dropdownCheckboxList`, `Divider`를 배치하는 parent composition truth만 소유한다.

## current source 읽는 법

- current source는 `user action` composition이다.
- source raw layer 이름 `Left`, `Right`는 active current spec naming으로 사용하지 않는다.
- left-positioned cluster는 항상 `Discovery Cluster`로 읽는다.
- right-positioned cluster는 항상 `Command Cluster`로 읽는다.
- `Action Bar`는 single-row parent composition으로 읽는다.
- `Action Bar`는 cluster 구조, cluster ordering principle, cluster gap, divider placement, open-state anchor/orchestration만 소유한다.
- child trigger의 내부 slot, surface 내부 row recipe, primitive size/token은 각 child family 문서가 소유한다.
- opened dropdown surface의 내부 recipe는 child trigger usage가 소유한다.
- opened dropdown surface의 x/y anchor와 single-open orchestration은 `Action Bar` usage truth로 읽는다.

## 구조 / anatomy

- `Root`
- `Discovery Cluster`
- `Command Cluster`
- opened surface는 `Action Bar` anatomy가 아니다.
- opened surface는 active trigger usage에 attach되는 child surface다.

## Root UI recipe

- current visible source sample frame은 항상 `1654 x 24`다.
- current visible source sample width `1654`는 sample observation이다.
- reusable implementation baseline은 항상 `w-full` single-row다.
- content row height는 항상 `24`다.
- `Root`는 항상 `flex items-center justify-between`이다.
- `Root`의 direct child는 항상 `Discovery Cluster`, `Command Cluster` 두 개뿐이다.
- screen implementation root는 `[data-action-bar]`를 사용한다.
- `Root`는 multi-row wrapping을 active truth로 승격하지 않는다.
- multi-row behavior를 canonical truth로 기록하는 것은 금지한다.

## cluster shared rule

- `Discovery Cluster`, `Command Cluster`는 둘 다 항상 `flex items-center gap 8`이다.
- screen implementation cluster는 `[data-action-bar-discovery-cluster]`, `[data-action-bar-command-cluster]`를 사용한다.
- 두 cluster의 direct child는 항상 content-hug / `shrink-0` control이다.
- cluster gap은 child가 아니라 `Action Bar`가 직접 소유한다.
- cluster 내부 child order는 cluster-owned composition truth다.
- screen CSS에서 `Root`, `Discovery Cluster`, `Command Cluster`에 `flex-wrap: wrap`을 적용하지 않는다.
- 화면 폭이 부족하면 wrapping으로 해결하지 않고 explicit overflow, control priority, 별도 summary row 중 하나를 product spec으로 정한다.

## Discovery Cluster

- `Discovery Cluster`는 항상 left-positioned cluster다.
- `SearchInput`은 항상 `Discovery Cluster`에만 배치한다.
- `SearchInput`은 항상 cluster의 trailing item이다.
- discovery/filter/sort/query control은 `SearchInput` 앞에만 배치한다.
- `SearchInput`을 `Command Cluster`로 이동하는 것은 금지한다.
- current visible source sample의 `Discovery Cluster`는 항상 `compact dropdown-capable control x6 -> SearchInput` 순서다.
- current visible sample의 exact label text와 exact trigger count `6`은 sample truth다.
- reusable parent composition truth는 항상 `query-refinement block -> SearchInput` ordering principle이다.
- discovery-side trigger가 dropdown을 여는 경우에도 `Discovery Cluster` single-row baseline은 유지한다.

## Command Cluster

- `Command Cluster`는 항상 right-positioned cluster다.
- current visible source sample의 `Command Cluster`는 항상 `PrimaryAction Button -> Text Dropdown Command -> Divider -> Icon Action -> Icon Dropdown Command` 순서다.
- reusable parent composition truth는 항상 `text command block -> Divider -> utility/icon command block` ordering principle이다.
- `Divider` placement ownership은 `Action Bar`가 직접 소유한다.
- `Divider`는 항상 text command block과 trailing utility/icon command block 사이에만 둔다.
- rightmost `2~3`개 trailing action은 utility/icon command block으로 읽는다.
- trailing utility/icon command block의 exact business identity는 `Action Bar`가 소유하지 않는다.
- trailing utility/icon command block에 고정 canonical action identity를 부여하는 것은 금지한다.
- `Divider`에 destructive meaning을 canonical semantic으로 부여하는 것은 금지한다.
- current source가 직접 확인해 주는 것은 structural split placement뿐이다.

## open-state orchestration

- dropdown-capable trigger가 열린 상태가 되면 active trigger는 항상 row 안에 남는다.
- opened surface는 항상 active trigger 아래에 attach된다.
- `Action Bar`는 열린 상태에서도 single-row parent layout을 유지한다.
- 한 시점에는 하나의 dropdown만 열린 상태로 유지한다.
- 하나의 dropdown이 열리면 다른 열린 dropdown은 닫힌다.
- `Discovery Cluster` dropdown trigger의 opened surface anchor는 항상 `left 0`이다.
- `Command Cluster` dropdown trigger의 opened surface anchor는 항상 `right 0`이다.
- opened surface vertical position은 항상 trigger bottom 기준 `4px below`다.
- trigger width와 opened surface width는 항상 분리해서 읽는다.
- opened surface width는 trigger width를 따라가지 않는다.
- current visible source sample의 opened surface width는 항상 `300`이다.
- surface width `300`의 source-of-truth는 child surface family 문서다.
- `Action Bar`가 소유하는 것은 `trigger width와 surface width를 결합하지 않는다`는 orchestration rule뿐이다.

## current visible sample pairings

- 아래 pairings는 current visible source sample truth다.
- `Command Cluster`의 text dropdown command는 `dropdownCheckboxList(hasFooter=true, handle=true)` sample과 짝을 이룬다.
- `Discovery Cluster`의 한 dropdown trigger는 `dropdownList(rowType=label, hasFooter=false)` sample과 짝을 이룬다.
- `Discovery Cluster`의 다른 dropdown trigger는 local search row가 포함된 checkbox-list sample과 짝을 이룬다.
- exact trigger label, exact pairing, exact surface content는 example-only truth다.
- local search row가 포함된 opened surface sample을 `dropdownList` family canonical truth로 승격하는 것은 금지한다.

## child family reference

- `Button` truth는 [Button.md](Button.md)가 소유한다.
- `iconButton` truth는 [iconButton.md](iconButton.md)가 소유한다.
- `SearchInput` truth는 [Search.md](Search.md)가 소유한다.
- `dropdownList` surface truth는 [dropdownList.md](dropdownList.md)가 소유한다.
- `dropdownCheckboxList` surface truth는 [dropdownCheckboxList.md](dropdownCheckboxList.md)가 소유한다.
- `Divider` primitive truth는 [Divider.md](Divider.md)가 소유한다.
- `Action Bar`는 child family의 slot, icon, typography, primitive truth를 다시 쓰지 않는다.

## forbidden rule

- source raw layer 이름 `Left`, `Right`를 active current spec cluster naming으로 유지하는 것은 금지한다.
- `Action Bar`를 primitive family component로 승격하는 것은 금지한다.
- `Action Bar`가 child family의 size, typography, icon identity, primitive recipe를 다시 정의하는 것은 금지한다.
- `SearchInput`을 `Command Cluster`에 배치하는 것은 금지한다.
- `Command Cluster`의 trailing utility/icon block 앞에서 `Divider`를 제거하는 것은 금지한다.
- `Divider` semantic을 destructive split으로 단정하는 것은 금지한다.
- exact sample action identity를 reusable canonical truth로 승격하는 것은 금지한다.
- example-only opened surface pairing을 family canonical truth로 승격하는 것은 금지한다.
- absolute sample coordinate를 universal canonical truth로 승격하는 것은 금지한다.
- `Discovery Cluster` dropdown surface를 `right 0`으로 강제하는 것은 금지한다.
- `Command Cluster` dropdown surface를 `left 0`으로 강제하는 것은 금지한다.
- opened surface width를 trigger width와 결합하는 것은 금지한다.
- opened surface를 cluster 전체 기준으로 중앙 정렬하거나 임의 offset으로 재해석하는 것은 금지한다.
- multi-row behavior를 active current spec으로 승격하는 것은 금지한다.
- screen CSS에서 `Discovery Cluster` 또는 `Command Cluster`에 `flex-wrap: wrap`을 넣어 single-row contract를 우회하는 것은 금지한다.

## usage boundary

- `Action Bar`는 parent composition truth다.
- `Discovery Cluster`, `Command Cluster`의 naming, ordering principle, divider placement, single-open orchestration은 reusable parent composition truth다.
- child trigger와 child surface의 내부 recipe는 child family truth다.
- current visible source sample의 exact label text, exact trigger count, exact business action identity는 example-only truth다.
- local search row가 포함된 opened checkbox surface는 example-only truth다.
- parent composition truth가 child family truth를 덮어쓰는 것은 금지한다.
- example-only truth가 reusable parent composition truth를 덮어쓰는 것은 금지한다.

## implementation / reconstruction proof rule

- 구현/재구성 완료를 주장하기 전에는 반드시 [implementation-checklist.md](../rules/implementation-checklist.md)를 통과해야 한다.
- current-spec visual verification을 요구받은 경우에만 [current-spec-checklist.md](../rules/current-spec-checklist.md)의 `Action Bar` 항목을 추가 final gate로 적용한다.
- 시각적 유사성만으로 완료를 주장하는 것은 금지한다.
- 다음 항목 중 하나라도 빠지면 `Action Bar` implementation/reconstruction은 실패로 본다.
  - direct child cluster가 정확히 `Discovery Cluster`, `Command Cluster` 두 개인지
  - `Discovery Cluster`가 left-positioned, `Command Cluster`가 right-positioned인지
  - 두 cluster가 모두 `gap 8` single-row content-hug cluster인지
  - `SearchInput`이 `Discovery Cluster` trailing item으로만 남아 있는지
  - `Command Cluster`가 `text command block -> Divider -> utility/icon command block` 순서를 유지하는지
  - 열린 dropdown이 하나만 유지되는지
  - `Discovery Cluster` opened surface가 `left 0` anchor를 유지하는지
  - `Command Cluster` opened surface가 `right 0` anchor를 유지하는지
  - opened surface vertical offset이 trigger bottom 기준 `4px below`인지
  - opened surface width가 trigger width와 결합되지 않았는지
