# icon

## 목적

- 이 문서는 current spec 문서 체계에서 공통으로 참조하는 icon foundation을 정의한다.
- 이 문서는 icon source-of-truth, 기본 size system, family usage boundary, placeholder handling만 소유한다.

## source of truth

- icon asset source of truth는 항상 `../../../../../material-design-icons`다.
- Logpresso CI는 component가 아니라 brand SVG asset이며, 현재 site reference는 `design/site/CI-Light.svg`와 `design/site/CI-Dark.svg`다.
- current spec에서 exact icon identity가 잠긴 경우에는 해당 component 문서의 identity contract를 우선한다.
- foundation은 asset root와 공통 사용 원칙만 소유하고, component별 exact icon recipe는 소유하지 않는다.
- icon source/path는 항상 위 source root를 기준으로 한 상대 경로 체계를 따른다.
- CI SVG는 Material Icons source root에 편입하지 않고, foundation icon page에서 brand asset reference로만 노출한다.

## 소유하는 truth

- icon source root는 항상 `../../../../../material-design-icons`다.
- 현재 문서 체계의 기본 icon direction은 항상 Material Icons 계열을 따른다.
- current spec에서 component가 exact icon family를 잠그지 않은 경우, foundation baseline family는 Material Icons 계열 SVG다.
- current spec에서 exact icon family 또는 exact icon path가 잠기지 않았더라도, arbitrary glyph나 arbitrary icon library로 대체하면 안 된다.
- 기본 size system은 current spec 반복값을 우선 기준으로 둔다.
  - `16`
  - `18`
  - `20`
  - `24`
- icon size는 component doc가 exact value를 잠그면 그 값을 따른다.
- component doc가 exact value를 잠그지 않은 경우에만 foundation size system 안에서 선택한다.
- filled / outlined의 exact 선택은 component doc가 소유한다.
- exact icon identity가 문서에 잠기지 않은 경우, 테스트 단계에서는 placeholder icon을 사용할 수 있다.
- placeholder icon은 test-only handling이다.
- placeholder icon은 canonical truth가 아니다.
- placeholder icon이 필요해도 source root 밖의 임의 asset family를 사용하면 안 된다.

## usage boundary

- foundation은 icon source root, 기본 size system, unresolved icon handling만 소유한다.
- component 문서는 exact icon identity, icon family, icon placement, icon slot size를 소유한다.
- parent composition 문서는 icon-bearing child를 어디에 배치하는지만 소유한다.
- local usage 문서는 해당 문맥 안에서만 허용되는 icon override를 소유할 수 있다.
- example-only sample은 icon canonical truth를 만들지 못한다.
- CI는 button, iconButton, navigation item 같은 일반 component glyph로 재사용하지 않는다.

## forbidden rule

- foundation이 component의 exact icon placement recipe를 다시 정의하는 것은 금지한다.
- foundation이 component의 exact icon identity를 추정해서 canonical truth로 쓰는 것은 금지한다.
- documented icon source/path를 무시하고 임의 glyph, 임의 icon library, 임의 text symbol로 대체하는 것은 금지한다.
- imported asset file name을 canonical naming으로 승격하는 것은 금지한다.
- raw icon asset 이름을 slot 이름으로 승격하는 것은 금지한다.
- example-only sample의 icon appearance를 family canonical truth로 승격하는 것은 금지한다.
- exact icon identity 미정을 이유로 required icon slot을 생략하는 것은 금지한다.
- placeholder icon을 final canonical identity처럼 보고하는 것은 금지한다.

## 관련 문서

- [components.md](../components/components.md)
- [assembly-protocol.md](../assembly-protocol.md)
- [Button.md](../components/Button.md)
- [iconButton.md](../components/iconButton.md)
- [Search.md](../components/Search.md)
- [Divider.md](../components/Divider.md)

## 이 문서가 소유하지 않는 것

- 각 component family의 exact icon identity
- 각 component family의 exact icon slot order
- 각 component family의 exact icon placement recipe
- 각 component family의 exact icon state rendering
- parent composition의 icon-bearing child ordering
- CI SVG의 내부 path 편집 및 brand redesign
