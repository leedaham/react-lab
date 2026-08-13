import {Select, SelectItem} from './components/Select';
import {PropsInheritance} from './components/PropsInheritance';

const usageCode = `import { Select, SelectItem } from './components/Select';

interface Country {
  id: string;
  name: string;
}

const countries: Country[] = [
  {id: 'kr', name: '대한민국'},
  {id: 'us', name: '미국'},
  {id: 'jp', name: '일본'},
  {id: 'cn', name: '중국'},
  {id: 'de', name: '독일'}
];

<Select label="국가" items={countries}>
  {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
</Select>`;

const selectChain = [
  {name: 'Select (Lab)'},
  {name: 'RAC SelectProps'},
  {name: 'AriaSelectProps'},
  {name: 'react-stately SelectProps'}
];

const selectGroups = [
  {
    source: 'react-stately SelectProps (자체)',
    props: [
      {name: 'isOpen / defaultOpen', desc: '열림 상태 제어'},
      {name: 'onOpenChange', desc: '열림 상태 변경 시 호출'},
      {name: 'selectionMode', desc: 'single / multiple'},
      {name: 'shouldCloseOnSelect', desc: '선택 시 닫힘 여부'},
      {name: 'allowsEmptyCollection', desc: '빈 목록 허용 여부'}
    ]
  },
  {
    source: 'CollectionBase',
    props: [
      {name: 'items', desc: '옵션 배열 (데모에서 직접 정의)'},
      {name: 'disabledKeys', desc: '비활성화할 옵션 키 목록'},
      {name: 'selectedKeys', desc: '선택된 키 목록 (제어)'}
    ]
  },
  {
    source: 'InputBase / ValueBase',
    props: [
      {name: 'isDisabled', desc: '비활성 상태'},
      {name: 'value / onChange', desc: '값 제어 (select는 selectedKey 사용 권장)'}
    ]
  },
  {
    source: 'Validation',
    props: [
      {name: 'isRequired', desc: '필수 항목 여부'},
      {name: 'isInvalid', desc: '오류 상태'},
      {name: 'validationBehavior', desc: 'aria / native 검증 방식'}
    ]
  },
  {
    source: 'HelpTextProps / LabelableProps',
    props: [
      {name: 'label', desc: '라벨 (데모에서 직접 정의)'},
      {name: 'description', desc: '설명 텍스트 (데모에서 직접 정의)'},
      {name: 'errorMessage', desc: '오류 메시지 (데모에서 직접 정의)'}
    ]
  },
  {
    source: 'FocusableProps',
    props: [
      {name: 'onFocus', desc: '포커스 진입 시 호출'},
      {name: 'onBlur', desc: '포커스 이탈 시 호출'},
      {name: 'onKeyDown/Up', desc: '키 입력 시 호출'}
    ]
  },
  {
    source: 'AriaLabelingProps',
    props: [
      {name: 'aria-label', desc: '스크린리더용 라벨'},
      {name: 'aria-labelledby', desc: '라벨 요소 연결'},
      {name: 'aria-describedby', desc: '설명 요소 연결'}
    ]
  },
  {
    source: 'AriaSelectProps (자체)',
    props: [
      {name: 'name', desc: 'HTML 폼 제출용 이름'},
      {name: 'form', desc: '연결할 폼 id'},
      {name: 'autoComplete', desc: '자동완성 힌트'}
    ]
  }
];

interface Country {
  id: string;
  name: string;
}

const countries: Country[] = [
  {id: 'kr', name: '대한민국'},
  {id: 'us', name: '미국'},
  {id: 'jp', name: '일본'},
  {id: 'cn', name: '중국'},
  {id: 'de', name: '독일'}
];

export default function SelectDemo() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="mb-3 text-lg font-semibold">국가 선택</h2>
        <div className="max-w-[220px]">
          <Select label="국가" items={countries}>
            {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
          </Select>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">사용 방법</h2>
        <pre className="overflow-x-auto rounded-xl border border-gray-200 bg-neutral-900 p-4 text-sm text-neutral-100">
          <code>{usageCode}</code>
        </pre>
        <table className="mt-3 w-full max-w-xl text-sm">
          <thead>
            <tr className="border-b border-gray-300 text-left">
              <th className="py-2 pr-4 font-semibold">props</th>
              <th className="py-2 pr-4 font-semibold">설명</th>
              <th className="py-2 font-semibold">기본값</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-2 pr-4 font-mono text-xs">label</td>
              <td className="py-2 pr-4">상단 라벨 텍스트</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2 pr-4 font-mono text-xs">items</td>
              <td className="py-2 pr-4">선택 옵션 목록 (배열)</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2 pr-4 font-mono text-xs">description</td>
              <td className="py-2 pr-4">하단 설명 텍스트</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2 pr-4 font-mono text-xs">isDisabled</td>
              <td className="py-2 pr-4">비활성 상태</td>
              <td className="py-2 font-mono text-xs">false</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2 pr-4 font-mono text-xs">selectedKey</td>
              <td className="py-2 pr-4">선택된 옵션 id (제어)</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-mono text-xs">onSelectionChange</td>
              <td className="py-2 pr-4">선택 변경 시 호출</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-3 text-sm text-gray-600">
          버튼을 클릭하면 옵션 목록이 열립니다. Tab 키로 이동 후 Enter로 열고 화살표 키로 선택할
          수 있습니다.
        </p>
        <PropsInheritance
          chain={selectChain}
          groups={selectGroups}
          customProps={[
            {name: 'label', desc: '상단 라벨 텍스트'},
            {name: 'items', desc: '선택 옵션 목록 (배열)'},
            {name: 'description', desc: '하단 설명 텍스트'},
            {name: 'errorMessage', desc: '오류 메시지'},
            {name: 'children', desc: '옵션 렌더 함수'}
          ]}
          docsUrl="https://react-aria.adobe.com/Select#api"
        />
      </section>
    </div>
  );
}
