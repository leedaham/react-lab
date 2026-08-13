# 컴포넌트명

## AI Contract

- status: `ready`
- exactHtml: `site/component/inputs-search-selection/fieldlabel.html`
- catalogRoute: `site/index.html#components`
- rootSelector: `source required`
- figma: `UI-5.1 / fieldLabel 17122:16252`
- baseCss: `site/sonar5.css`
- gapCss: `site/component-css/component.css`
- sourcePointer: `ui/docs/components/fieldLabel.md`
- sonarLock: `site/sonar5.css` is read-only; do not add or mutate product CSS from this component doc.
- qaStatus: `readiness=ready, score=10/10`
- usage: Read this block first for AI screen generation. Expand detailed sections only when this contract is insufficient.

fieldLabel

## Figma evidence

- Figma file: `UI-5.1`
- Figma node: `fieldLabel` `17122:16252`
- Figma URL: `https://www.figma.com/design/dodpG7QVPyrxWI1uFjKYrC/UI-5.1?node-id=17122-16252`
- screenshot evidence: rendered `1024 x 381`, original `1449 x 538`
- confirmed scope: label primitive, size/fontWeight/disabled/variant/required/help/trailingicon property coverage

## 구현 기준

- exact page: `site/component/inputs-search-selection/fieldlabel.html`
- catalog route: `site/index.html#components`
- source owner: `site/app.js`
- source helper: `fieldLabelDemo()`, `fieldLabelPreview()`, `inputComponentMarkup("fieldLabel")`
- implemented HTML owner: `app.js` helper output and `generate-component-pages.mjs` generated exact page
- root selector contract: `.label`
- base CSS selector from `sonar5.css`: `.label`, `.label-required`, `.label-caption`
- gap CSS file: `component-css/component.css`, 이번 문서 계약 보강에서는 신규 보정 없음
- `sonar5.css`는 read-only reference이며 수정하지 않는다.

## QA status

- exact page와 catalog route가 존재한다.
- exact page는 `sonar5.css`와 `component-css/component.css`를 외부 stylesheet로 로드한다.
- QA mismatch count: `0`

## 목적

- `fieldLabel`은 field/control 문맥에서 재사용하는 shared label primitive다.
- `fieldLabel`은 control이 아니다.
- `fieldLabel`은 label text block과 required/help/trailing icon row만 소유한다.

## 구조 / anatomy

- `Root`
- `LabelRow`
- `LabelText`
- `CaptionText`
- `RequiredMark`
- `TrailingIcon`
- `HelpIcon`

## variant/property naming rule

- `size`: `lg | md | sm | xs`
- `fontWeight`: `Bold | Medium | Normal`
- `disabled`: `true | false`
- `variant`: `noCap | vertical | horizontal`
- `required`: `true | false`
- `help`: `true | false`
- `trailingicon`: `true | false`

## 실제 source truth

- `LabelRow` gap은 항상 `2`다.
- `TrailingIcon`, `HelpIcon`은 항상 `16 x 16`이다.
- `RequiredMark`는 항상 `*`이며 활성 상태에서는 `color/neutral/100`, disabled 상태에서는 `color/neutral/500`을 사용한다.
- `RequiredMark`의 typography는 항상 같은 size step의 `Bold`다.
- label text letter spacing은 항상 `0`이다.
- `fieldLabel`은 `LabelText`, `CaptionText`, `RequiredMark`, `HelpIcon`, `TrailingIcon`만 소유한다.
- `fieldLabel`은 `Checkbox`, `Radio`, `Switch`, `dropdown surface`, `search shell`을 소유하지 않는다.

## typography rule

- `size=lg`
  - `Bold`: `Pretendard Bold / 18 / 28 / letter-spacing 0`
  - `Medium`: `Pretendard Medium / 18 / 28 / letter-spacing 0`
  - `Normal`: `Pretendard Regular / 18 / 28 / letter-spacing 0`
- `size=md`
  - `Bold`: `Pretendard Bold / 16 / 24 / letter-spacing 0`
  - `Medium`: `Pretendard Medium / 16 / 24 / letter-spacing 0`
  - `Normal`: `Pretendard Regular / 16 / 24 / letter-spacing 0`
- `size=sm`
  - `Bold`: `Pretendard Bold / 14 / 20 / letter-spacing 0`
  - `Medium`: `Pretendard Medium / 14 / 20 / letter-spacing 0`
  - `Normal`: `Pretendard Regular / 14 / 20 / letter-spacing 0`
- `size=xs`
  - `Bold`: `Pretendard Bold / 12 / 18 / letter-spacing 0`
  - `Medium`: `Pretendard Medium / 12 / 18 / letter-spacing 0`
  - `Normal`: `Pretendard Regular / 12 / 18 / letter-spacing 0`

## variant recipe

- `variant=noCap`
  - single-line `LabelRow`만 사용한다.
  - root height는 size step의 line-height와 같다.
  - `lg`: `28`
  - `md`: `24`
  - `sm`: `20`
  - `xs`: `18`
- `variant=vertical`
  - `LabelRow` 아래에 caption/supporting line이 붙는 vertical label block이다.
  - root height는 size step별 source sample을 따른다.
  - `lg`: `56`
  - `md`: `48`
  - `sm`: `42`
  - `xs`: `40`
- `variant=horizontal`
  - `LabelRow`와 trailing label-side content가 같은 line에 배치되는 horizontal label block이다.
  - root height는 size step의 `noCap` height와 같다.

## color / token rule

- `LabelText`
  - 기본 foreground는 `semantic.color.text.primary`
- `RequiredMark`
  - 활성 상태는 `color/neutral/100`
  - disabled 상태는 `color/neutral/500`
- `disabled=true`
  - disabled foreground token을 사용한다.
- `HelpIcon`
  - help affordance icon family를 사용한다.
- `TrailingIcon`
  - settings affordance icon family를 사용한다.

## forbidden rule

- `fieldLabel`을 control shell로 재조립하는 것은 금지한다.
- `fieldLabel`에 checkbox/radio/switch/search surface를 넣는 것은 금지한다.
- label typography를 parent row가 다시 덮어쓰는 것은 금지한다.
- `RequiredMark`를 optional color variation으로 바꾸는 것은 금지한다.
- `TrailingIcon`, `HelpIcon` size를 `16`이 아닌 값으로 바꾸는 것은 금지한다.
- letter spacing을 임의 조정하는 것은 금지한다.

## usage boundary

- `Checkbox`, `Radio`, `Switch`는 `fieldLabel`을 child로 조합할 수 있다.
- `dropdownList`, `dropdownCheckboxList`, `dropdownRadioboxList`도 row label block으로 `fieldLabel`을 사용한다.
- `Input`, `Select`, `Textarea`의 `label?` axis는 external `fieldLabel` on/off가 아니다.
- 상위 container는 `fieldLabel`을 재사용할 뿐, typography truth를 다시 정의하지 않는다.
- latest source-visible `dropdownList label row`는 항상 `fieldLabel(size=sm, fontWeight=Medium, variant=noCap, required=false, help=false)`를 사용한다.
- latest source-visible `dropdownCheckboxListItem`도 항상 `fieldLabel(size=sm, fontWeight=Medium, variant=noCap, required=false, help=false)`를 사용한다.
- latest source-visible `dropdownRadioboxListItem`도 항상 `fieldLabel(size=sm, fontWeight=Medium, variant=noCap, required=false, help=false)`를 사용한다.
- source-visible `Checkbox Row`, `Radiobox Row`, `Switch Row`는 matching size step의 `fieldLabel(variant=vertical)`를 조합한다.
- `Horizontal Form Example`, `Vertical Form Example`는 composition/example truth일 뿐이고 `fieldLabel` primitive truth를 다시 쓰지 못한다.
- example layout의 label column width, row ratio, width assignment를 `fieldLabel` canonical truth로 승격하는 것은 금지한다.
- dropdown row shell이 `fieldLabel` typography나 text block ownership을 다시 쓰는 것은 금지한다.

## implementation / reconstruction proof rule

- 구현/재구성 완료를 주장하기 전 아래를 모두 확인한다.
- size step별 label typography가 source와 같은지 확인한다.
- `RequiredMark`가 같은 size의 bold typography를 유지하고, 활성 상태는 `color/neutral/100`, disabled 상태는 `color/neutral/500`을 사용하는지 확인한다.
- `HelpIcon`, `TrailingIcon`이 `16 x 16`인지 확인한다.
- row/container가 `fieldLabel` typography를 덮어쓰지 않았는지 확인한다.
- `fieldLabel`이 control shell로 재조립되지 않았는지 확인한다.
