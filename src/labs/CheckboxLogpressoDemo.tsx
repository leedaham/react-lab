import {useState} from 'react';
import {CheckboxLogpresso} from './components/CheckboxLogpresso';
import {CheckboxGroupLogpresso} from './components/CheckboxGroupLogpresso';
import {PropsInheritance} from './components/PropsInheritance';

const usageCode = `import { CheckboxLogpresso } from './components/CheckboxLogpresso';
import { CheckboxGroupLogpresso } from './components/CheckboxGroupLogpresso';

// 단일 체크박스 (Logpresso)
<CheckboxLogpresso theme="dark" size="md" defaultSelected>
  중요 알림
</CheckboxLogpresso>

// 그룹 (다중 선택)
<CheckboxGroupLogpresso theme="dark" label="분석 대상">
  <CheckboxLogpresso theme="dark" value="cpu">CPU</CheckboxLogpresso>
  <CheckboxLogpresso theme="dark" value="mem">메모리</CheckboxLogpresso>
  <CheckboxLogpresso theme="dark" value="disk">디스크</CheckboxLogpresso>
</CheckboxGroupLogpresso>`;

const checkboxChain = [
  {name: 'CheckboxLogpresso (Lab)'},
  {name: 'RAC CheckboxFieldProps'},
  {name: 'AriaCheckboxProps'},
  {name: 'react-stately ToggleState'}
];

const checkboxGroups = [
  {
    source: 'ToggleProps (react-stately)',
    props: [
      {name: 'isSelected', desc: '선택 상태 (제어)'},
      {name: 'defaultSelected', desc: '초기 선택 여부 (비제어)'},
      {name: 'onChange', desc: '선택 변경 시 호출 (boolean)'}
    ]
  },
  {
    source: 'AriaCheckboxProps (자체)',
    props: [
      {name: 'isIndeterminate', desc: '중간 상태 (일부 선택)'},
      {name: 'value', desc: '폼 제출용 값'},
      {name: 'name', desc: '폼 필드 이름'}
    ]
  },
  {
    source: 'InputBase / ValueBase',
    props: [
      {name: 'isDisabled', desc: '비활성 상태'},
      {name: 'isReadOnly', desc: '읽기 전용'},
      {name: 'isRequired', desc: '필수 항목 여부'}
    ]
  },
  {
    source: 'Validation',
    props: [
      {name: 'isInvalid', desc: '오류 상태'},
      {name: 'validate', desc: '사용자 정의 검증 함수'},
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
  }
];

const targets = [
  {id: 'cpu', name: 'CPU'},
  {id: 'mem', name: '메모리'},
  {id: 'disk', name: '디스크'},
  {id: 'network', name: '네트워크'}
];

export default function CheckboxLogpressoDemo() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selected, setSelected] = useState<string[]>(['cpu']);
  const isDark = theme === 'dark';

  return (
    <div className={`flex flex-col gap-8 p-6 font-sans ${isDark ? 'bg-[#0b0f15]' : 'bg-white'}`}>
      <div className="flex items-center justify-between">
        <h1 className={`text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          Checkbox Logpresso
        </h1>
        <button
          type="button"
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className={`w-fit rounded-lg border px-3 py-1 text-xs font-medium transition ${
            isDark
              ? 'border-[#151c33] bg-[#0e1322] text-[#ebebeb] hover:bg-[#151c33]'
              : 'border-[#dce2ea] bg-[#f1f3f7] text-[#111827] hover:bg-white'
          }`}>
          {isDark ? '라이트 모드' : '다크 모드'}
        </button>
      </div>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          크기 &amp; 상태
        </h2>
        <div className="flex flex-wrap items-start gap-8">
          {(['md', 'sm', 'xs'] as const).map((size) => (
            <div key={size} className="flex flex-col gap-3">
              <span className={`text-xs ${isDark ? 'text-[#778293]' : 'text-[#111827]/70'}`}>
                {size} ({size === 'md' ? 24 : size === 'sm' ? 20 : 18}px)
              </span>
              <CheckboxLogpresso theme={theme} size={size}>
                선택
              </CheckboxLogpresso>
              <CheckboxLogpresso theme={theme} size={size} defaultSelected>
                선택됨
              </CheckboxLogpresso>
              <CheckboxLogpresso theme={theme} size={size} isIndeterminate>
                일부 선택
              </CheckboxLogpresso>
              <CheckboxLogpresso theme={theme} size={size} isDisabled>
                비활성
              </CheckboxLogpresso>
            </div>
          ))}
        </div>
        <p className={`mt-2 text-xs ${isDark ? 'text-[#778293]' : 'text-[#111827]/70'}`}>
          마우스를 올리면 hover 표면이 나타납니다. Tab 키로 이동하면 키보드 포커스 링이 보입니다.
        </p>
      </section>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          체크박스 그룹 (다중 선택)
        </h2>
        <CheckboxGroupLogpresso
          theme={theme}
          label="분석 대상"
          value={selected}
          onChange={setSelected}>
          {targets.map((target) => (
            <CheckboxLogpresso key={target.id} theme={theme} value={target.id}>
              {target.name}
            </CheckboxLogpresso>
          ))}
        </CheckboxGroupLogpresso>
        <p className={`mt-2 text-xs ${isDark ? 'text-[#778293]' : 'text-[#111827]/70'}`}>
          선택된 항목: {selected.length > 0 ? selected.join(', ') : '없음'}
        </p>
      </section>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          설명 / 오류
        </h2>
        <div className="flex flex-col gap-4">
          <CheckboxLogpresso
            theme={theme}
            description="보안 관련 알림을 실시간으로 받아봅니다.">
            중요 알림
          </CheckboxLogpresso>
          <CheckboxLogpresso theme={theme} errorMessage="약관 동의가 필요합니다." isInvalid>
            서비스 약관 동의
          </CheckboxLogpresso>
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
            <tr
              className={`border-b text-left ${
                isDark ? 'border-[#2a3340] text-[#aeb8c5]' : 'border-gray-300'
              }`}>
              <th className="py-2 pr-4 font-semibold">props</th>
              <th className="py-2 pr-4 font-semibold">설명</th>
              <th className="py-2 font-semibold">기본값</th>
            </tr>
          </thead>
          <tbody>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">theme</td>
              <td className="py-2 pr-4">dark / light</td>
              <td className="py-2 font-mono text-xs">dark</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">size</td>
              <td className="py-2 pr-4">md (24px) / sm (20px) / xs (18px)</td>
              <td className="py-2 font-mono text-xs">md</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">defaultSelected</td>
              <td className="py-2 pr-4">초기 선택 여부</td>
              <td className="py-2 font-mono text-xs">false</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">isIndeterminate</td>
              <td className="py-2 pr-4">중간 상태 (일부 선택)</td>
              <td className="py-2 font-mono text-xs">false</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">isDisabled</td>
              <td className="py-2 pr-4">비활성 상태</td>
              <td className="py-2 font-mono text-xs">false</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">onChange</td>
              <td className="py-2 pr-4">선택 변경 시 호출</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr className={isDark ? 'text-[#ebebeb]' : ''}>
              <td className="py-2 pr-4 font-mono text-xs">value</td>
              <td className="py-2 pr-4">그룹 안에서 항목 구분용 값</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
          </tbody>
        </table>
        <p className={`mt-3 text-sm ${isDark ? 'text-[#778293]' : 'text-[#111827]/70'}`}>
          Checkbox.md recipe를 따릅니다. outer 크기는 md 24 / sm 20 / xs 18이고, indicator 박스는
          각각 18 / 16 / 14입니다. checked·indeterminate는 accent 계열 표면에 중앙 정렬된 check
          vector를 표시하며, disabled는 surface를 줄여 비활성임을 나타냅니다. 우측 상단 버튼으로
          라이트/다크 테마를 전환할 수 있습니다.
        </p>
        <PropsInheritance
          chain={checkboxChain}
          groups={checkboxGroups}
          customProps={[
            {name: 'theme', desc: 'dark / light', default: 'dark'},
            {name: 'size', desc: 'md / sm / xs', default: 'md'},
            {name: 'children', desc: '라벨 텍스트'},
            {name: 'description', desc: '하단 설명 텍스트'},
            {name: 'errorMessage', desc: '오류 메시지'}
          ]}
          docsUrl="https://react-aria.adobe.com/Checkbox#api"
        />
      </section>
    </div>
  );
}
