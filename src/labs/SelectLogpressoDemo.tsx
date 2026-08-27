import {useEffect, useState} from 'react';
import {SelectLogpresso, type SelectLogpressoOption} from './components/SelectLogpresso';
import {ThemeToggle} from './components/ThemeToggle';
import {PropsInheritance} from './components/PropsInheritance';
import {useLogpressoTheme} from './components/utils';

const usageCode = `import { SelectLogpresso } from './components/SelectLogpresso';

const items = [
  {id: 'kr', name: '대한민국'},
  {id: 'us', name: '미국'},
  {id: 'jp', name: '일본'}
];

const [selected, setSelected] = useState<string>();

// 테마는 <html data-theme="dark"> 값을 자동으로 감지합니다.
<SelectLogpresso
  size="medium"
  label="국가"
  placeholder="국가를 선택하세요"
  items={items}
  selectedKey={selected}
  onSelectionChange={setSelected}
  isPending={false}
/>`;

const selectChain = [
  {name: 'SelectLogpresso (Lab)'},
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

const countries: SelectLogpressoOption[] = [
  {id: 'kr', name: '대한민국'},
  {id: 'us', name: '미국'},
  {id: 'jp', name: '일본'},
  {id: 'cn', name: '중국'},
  {id: 'de', name: '독일'}
];

const severities: SelectLogpressoOption[] = [
  {id: 'critical', name: 'Critical'},
  {id: 'high', name: 'High'},
  {id: 'medium', name: 'Medium'},
  {id: 'low', name: 'Low'},
  {id: 'info', name: 'Info'}
];

export default function SelectLogpressoDemo() {
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [severity, setSeverity] = useState<string | undefined>('high');
  const theme = useLogpressoTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!document.documentElement.getAttribute('data-theme')) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  return (
    <div className={`flex flex-col gap-8 p-6 font-sans ${isDark ? 'bg-[#0b0f15]' : 'bg-white'}`}>
      <div className="flex items-center justify-between">
        <h1 className={`text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          Select Logpresso
        </h1>
        <ThemeToggle />
      </div>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          기본 / Placeholder
        </h2>
        <div className="max-w-[220px]">
          <SelectLogpresso
            size="medium"
            placeholder="국가를 선택하세요"
            items={countries}
            selectedKey={country}
            onSelectionChange={(key) => setCountry(key ? String(key) : undefined)}
          />
        </div>
        <p className={`mt-2 text-xs ${isDark ? 'text-[#778293]' : 'text-[#111827]/70'}`}>
          선택한 값: <span className={isDark ? 'text-[#aeb8c5]' : 'text-[#111827]'}>
            {country ?? '없음'}
          </span>
        </p>
      </section>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          라벨 포함 / 기본 선택값
        </h2>
        <div className="max-w-[220px]">
          <SelectLogpresso
            size="medium"
            label="심각도"
            items={severities}
            selectedKey={severity}
            onSelectionChange={(key) => setSeverity(key ? String(key) : undefined)}
          />
        </div>
      </section>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          크기 Small / Medium / Large / XLarge
        </h2>
        <div className="flex flex-wrap items-end gap-4">
          <div className="w-[160px]">
            <SelectLogpresso
              size="small"
              label="Small (24px)"
              placeholder="Small"
              items={severities}
            />
          </div>
          <div className="w-[160px]">
            <SelectLogpresso
              size="medium"
              label="Medium (30px)"
              placeholder="Medium"
              items={severities}
            />
          </div>
          <div className="w-[160px]">
            <SelectLogpresso
              size="large"
              label="Large (36px)"
              placeholder="Large"
              items={severities}
            />
          </div>
          <div className="w-[160px]">
            <SelectLogpresso
              size="xlarge"
              label="XLarge (40px)"
              placeholder="XLarge"
              items={severities}
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          비활성 / 오류
        </h2>
        <div className="flex flex-wrap items-end gap-4">
          <div className="w-[180px]">
            <SelectLogpresso
              size="medium"
              label="비활성"
              items={severities}
              selectedKey="high"
              isDisabled
            />
          </div>
          <div className="w-[180px]">
            <SelectLogpresso
              size="medium"
              label="오류"
              items={severities}
              isInvalid
              errorMessage="필수 항목입니다"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          로딩 표시
        </h2>
        <div className="w-[220px]">
          <SelectLogpresso
            size="medium"
            label="조회 상태"
            placeholder="불러오는 중..."
            items={severities}
            isPending
          />
        </div>
      </section>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          사용 방법
        </h2>
        <pre
          className={`overflow-x-auto rounded-lg border p-4 text-sm ${
            isDark
              ? 'border-[#151c33] bg-[#0e1322] text-neutral-100'
              : 'border-gray-200 bg-neutral-900 text-neutral-100'
          }`}>
          <code>{usageCode}</code>
        </pre>
        <table className="mt-3 w-full max-w-xl text-sm">
          <thead>
            <tr className={`border-b text-left ${isDark ? 'border-[#2a3340] text-[#aeb8c5]' : 'border-gray-300'}`}>
              <th className="py-2 pr-4 font-semibold">props</th>
              <th className="py-2 pr-4 font-semibold">설명</th>
              <th className="py-2 font-semibold">기본값</th>
            </tr>
          </thead>
          <tbody>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">size</td>
              <td className="py-2 pr-4">small (24px) / medium (30px) / large (36px) / xlarge (40px)</td>
              <td className="py-2 font-mono text-xs">medium</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">label</td>
              <td className="py-2 pr-4">상단 라벨 텍스트</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">placeholder</td>
              <td className="py-2 pr-4">미선택 시 표시 텍스트</td>
              <td className="py-2 font-mono text-xs">선택하세요</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">items</td>
              <td className="py-2 pr-4">{'{id, name}'} 형태의 옵션 배열</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">selectedKey</td>
              <td className="py-2 pr-4">선택된 옵션 id (제어)</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">onSelectionChange</td>
              <td className="py-2 pr-4">선택 변경 시 호출</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">isDisabled</td>
              <td className="py-2 pr-4">비활성 상태</td>
              <td className="py-2 font-mono text-xs">false</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">isInvalid</td>
              <td className="py-2 pr-4">오류 상태 (빨간 테두리)</td>
              <td className="py-2 font-mono text-xs">false</td>
            </tr>
            <tr className={isDark ? 'text-[#ebebeb]' : ''}>
              <td className="py-2 pr-4 font-mono text-xs">isPending</td>
              <td className="py-2 pr-4">로딩 스피너 표시</td>
              <td className="py-2 font-mono text-xs">false</td>
            </tr>
          </tbody>
        </table>
        <p className={`mt-3 text-sm ${isDark ? 'text-[#778293]' : 'text-[#111827]/70'}`}>
          트리거 높이는 Logpresso control height(Small 24px / Medium 30px / Large 36px / XLarge 40px)를 따릅니다. 열린 옵션
          패널은 별도 소유권(Overlay Panel)이므로 트리거와 분리해 표면·border를 다르게
          스타일링했습니다. 테마는{' '}
          <code className="font-mono text-xs">&lt;html data-theme&gt;</code> 값을 자동 감지하며,
          우측 상단의 ThemeToggle로 바로 바꿔볼 수 있습니다.
        </p>
        <PropsInheritance
          chain={selectChain}
          groups={selectGroups}
          customProps={[
            {name: 'size', desc: 'small / medium / large / xlarge', default: 'medium'},
            {name: 'label', desc: '상단 라벨 텍스트'},
            {name: 'items', desc: '{id, name} 형태의 옵션 배열'},
            {name: 'errorMessage', desc: '오류 메시지'},
            {name: 'isPending', desc: '로딩 스피너 표시', default: 'false'}
          ]}
          docsUrl="https://react-aria.adobe.com/Select#api"
        />
      </section>
    </div>
  );
}
