# List Detail

## 목적

- `List Detail` pattern은 목록에서 항목을 선택하고 상세 정보를 오른쪽 drawer 또는 adjacent panel에서 확인하는 화면 조합이다.
- 이 패턴은 list region, detail region, selection relation을 소유한다.
- row, card, drawer 내부 field recipe는 각 component 문서가 소유한다.

## source order

1. [Page Layout](../components/Page%20Layout.md)
2. [Action Bar](../components/Action%20Bar.md)
3. [List With Detail Drawer](../composition/list-with-detail-drawer.md)
4. [List](../components/List.md)
5. [Table](../components/Table.md)
6. [Drawer Container](../components/Drawer-Container.md)
7. [Card Item](../components/Card-Item.md)
8. [Tag](../components/Tag.md)
9. [layer](../foundation/layer.md)
10. [accessibility](../foundation/accessibility.md)

## required composition

- left/main region은 list, table, card grid 중 하나를 사용한다.
- selected item은 visual selected state와 accessible selected/current meaning을 함께 가져야 한다.
- detail region은 drawer, side panel, popover 중 하나를 사용하되 modality를 명시한다.
- detail region은 summary, primary metadata, secondary detail, action/supporting region 순서로 읽히는 것이 기본이다.
- 목록의 filter/sort/search는 `Action Bar` 또는 local workflow pattern이 소유한다.

## required output trace

- List Detail 화면이 detail drawer, side panel, popover 중 하나를 렌더링하면 output trace에 아래 필드를 남긴다.
  - `drawerModality`: `modal`, `non-modal`, `adjacent-panel` 중 하나.
  - `backgroundInteraction`: detail open 상태에서 list/table/background가 `blocked`, `read-only`, `interactive` 중 무엇인지.
  - `focusReturnTarget`: detail close/back 동작 후 focus를 되돌릴 trigger selector 또는 row selector.
- 위 세 필드 중 하나라도 없으면 smoke test에서도 `complete`로 보고하지 않는다.
- product copy, permission policy, API response가 deferred일 수는 있지만 drawer interaction trace는 deferred로 넘기지 않는다.

## state coverage

- no selection
- selected item
- item loading
- item not found
- item permission denied
- detail save failed

## forbidden rule

- selected, active, current를 같은 의미로 섞으면 안 된다.
- detail drawer가 열렸는데 focus return 기준이 없으면 안 된다.
- list row recipe를 detail pattern에서 다시 만들면 안 된다.
- drawer를 modal처럼 쓰면서 background interaction 정책을 숨기면 안 된다.
