# Data Table Workflow

## 목적

- `Data Table Workflow` pattern은 검색, 필터, 정렬, 테이블, 페이지네이션을 묶는 데이터 탐색 화면이다.
- 이 패턴은 workflow order와 state coverage를 소유한다.
- table cell, filter chip, pagination control의 exact recipe는 각 component 문서가 소유한다.

## source order

1. [Page Layout](../components/Page%20Layout.md)
2. [Action Bar](../components/Action%20Bar.md)
3. [Filter & Multi Sort](../components/Filter%20%26%20Multi%20Sort.md)
4. [Table](../components/Table.md)
5. [Table Cell](../components/Table%20Cell.md)
6. [Pagination](../components/Pagination.md)
7. [Tag](../components/Tag.md)
8. [Badge](../components/Badge.md)
9. [content](../foundation/content.md)

## required composition

- action/search region은 table보다 먼저 읽힌다.
- applied filter/sort summary는 table 결과에 인접해야 한다.
- table은 header, body row, optional footer/pagination relation을 유지한다.
- bulk action이 있으면 selected row count와 available action을 분리한다.
- pagination은 result count, page size, page navigation을 함께 보여야 한다.

## state coverage

- populated
- loading
- no results
- filter no results
- query error
- partial row error
- selected rows
- permission-limited rows

## forbidden rule

- filter와 sort를 시각적으로만 붙이고 실제 적용 상태를 생략하면 안 된다.
- table row를 button처럼 만들면서 row selection/focus semantics를 숨기면 안 된다.
- no results와 empty data를 같은 문구로 처리하면 안 된다.
- pagination count와 visible row range가 충돌하면 안 된다.
