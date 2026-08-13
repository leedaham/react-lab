# Audit / Event History

## 목적

- `Audit / Event History` pattern은 보안/운영 이벤트, 감사 로그, 티켓 이력, 자동 대응 내역을 시간순으로 읽는 화면 조합이다.
- 이 패턴은 event grouping, severity/status display, time ordering, detail expansion을 소유한다.
- severity badge, table cell, disclosure, list item recipe는 각 component 문서가 소유한다.

## source order

1. [Page Layout](../components/Page%20Layout.md)
2. [List](../components/List.md)
3. [Disclosure](../components/Disclosure.md)
4. [Badge](../components/Badge.md)
5. [StatusDot](../components/StatusDot.md)
6. [PriorityIndicator](../components/PriorityIndicator.md)
7. [Table Cell](../components/Table%20Cell.md)
8. [content](../foundation/content.md)

## required composition

- event는 time, actor/source, action, target, severity/status를 가져야 한다.
- time ordering은 최신순 또는 오래된순을 명시한다.
- 같은 시간대 또는 같은 entity의 이벤트는 group heading을 가질 수 있다.
- 상세 payload는 disclosure 또는 drawer로 확장한다.
- severity color는 text/icon/status label과 함께 사용한다.

## state coverage

- populated timeline
- grouped timeline
- event detail expanded
- no events
- timeline loading
- partial event parse error

## forbidden rule

- color만으로 severity를 전달하면 안 된다.
- 실제 시간과 정렬 방향을 숨기면 안 된다.
- 이벤트 원문 payload를 table cell에 무제한 노출하면 안 된다.
- audit event sample에 실제 민감정보처럼 보이는 값을 넣으면 안 된다.
