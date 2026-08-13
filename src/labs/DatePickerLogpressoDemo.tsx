import {useState} from 'react';
import {parseDateTime} from '@internationalized/date';
import {DatePickerLogpresso} from './components/DatePickerLogpresso';
import {PropsInheritance} from './components/PropsInheritance';

const usageCode = `import { DatePickerLogpresso } from './components/DatePickerLogpresso';
import { parseDateTime } from '@internationalized/date';

// 날짜 + 시·분
<DatePickerLogpresso
  theme="dark"
  size="medium"
  label="예약 시간"
  granularity="minute"
  hourCycle={24}
  defaultValue={parseDateTime('2025-02-03T09:30')}
/>`;

const datePickerChain = [
  {name: 'DatePickerLogpresso (Lab)'},
  {name: 'RAC DatePickerProps'},
  {name: 'AriaDatePickerProps'},
  {name: 'react-stately DatePickerState'}
];

const datePickerGroups = [
  {
    source: 'ValueBase / DateValueBase',
    props: [
      {name: 'value / defaultValue', desc: '@internationalized/date 값 (DateTime/ZonedDateTime)'},
      {name: 'onChange', desc: '값 변경 시 호출'}
    ]
  },
  {
    source: 'DatePickerProps (자체)',
    props: [
      {name: 'granularity', desc: '표시 최소 단위 (day / hour / minute / second)'},
      {name: 'hourCycle', desc: '12 / 24 시간제 (기본: 로케일 자동)'},
      {name: 'minValue / maxValue', desc: '최소/최대 허용 날짜'},
      {name: 'isDateUnavailable', desc: '선택 불가 날짜 검사'}
    ]
  },
  {
    source: 'InputBase / Validation',
    props: [
      {name: 'isDisabled', desc: '비활성 상태'},
      {name: 'isReadOnly', desc: '읽기 전용'},
      {name: 'isRequired', desc: '필수 항목 여부'},
      {name: 'isInvalid', desc: '오류 상태'},
      {name: 'name', desc: '폼 제출용 이름 (ISO 문자열)'}
    ]
  },
  {
    source: 'FocusableProps / OverlayTriggerProps',
    props: [
      {name: 'onOpenChange', desc: '팝업 열림 상태 변경 시 호출'},
      {name: 'onFocus', desc: '포커스 진입 시 호출'},
      {name: 'onBlur', desc: '포커스 이탈 시 호출'}
    ]
  },
  {
    source: 'AriaLabelingProps / HelpTextProps',
    props: [
      {name: 'aria-label', desc: '스크린리더용 라벨'},
      {name: 'label', desc: '상단 라벨 (데모에서 직접 정의)'},
      {name: 'errorMessage', desc: '오류 메시지 (데모에서 직접 정의)'}
    ]
  }
];

export default function DatePickerLogpressoDemo() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const isDark = theme === 'dark';

  return (
    <div className={`flex flex-col gap-8 p-6 font-sans ${isDark ? 'bg-[#0b0f15]' : 'bg-white'}`}>
      <div className="flex items-center justify-between">
        <h1 className={`text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          DatePicker Logpresso
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
          날짜 + 시·분 (granularity=&quot;minute&quot;)
        </h2>
        <div className="max-w-[300px]">
          <DatePickerLogpresso
            theme={theme}
            size="medium"
            label="회의 시작"
            granularity="minute"
            shouldCloseOnSelect={false}
            defaultValue={parseDateTime('2025-02-03T09:30')}
            description="연/월/일/시/분을 각각 편집할 수 있습니다."
          />
        </div>
      </section>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          24시간 / 12시간 (hourCycle)
        </h2>
        <div className="flex flex-wrap items-end gap-6">
          <div className="max-w-[280px]">
            <DatePickerLogpresso
              theme={theme}
              size="medium"
              label="24시간제"
              granularity="minute"
              hourCycle={24}
              shouldCloseOnSelect={false}
              defaultValue={parseDateTime('2025-02-03T20:15')}
            />
          </div>
          <div className="max-w-[280px]">
            <DatePickerLogpresso
              theme={theme}
              size="medium"
              label="12시간제"
              granularity="minute"
              hourCycle={12}
              shouldCloseOnSelect={false}
              defaultValue={parseDateTime('2025-02-03T20:15')}
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          크기 Small / 비활성 / 오류
        </h2>
        <div className="flex flex-wrap items-end gap-6">
          <div className="w-[240px]">
            <DatePickerLogpresso
              theme={theme}
              size="small"
              label="Small"
              granularity="minute"
              defaultValue={parseDateTime('2025-02-03T09:30')}
            />
          </div>
          <div className="w-[240px]">
            <DatePickerLogpresso
              theme={theme}
              size="medium"
              label="비활성"
              granularity="minute"
              isDisabled
              defaultValue={parseDateTime('2025-02-03T09:30')}
            />
          </div>
          <div className="w-[240px]">
            <DatePickerLogpresso
              theme={theme}
              size="medium"
              label="오류"
              granularity="minute"
              isInvalid
              errorMessage="시작일이 종료일보다 늦습니다."
              defaultValue={parseDateTime('2025-02-03T09:30')}
            />
          </div>
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
              <td className="py-2 pr-4">small (24px) / medium (30px)</td>
              <td className="py-2 font-mono text-xs">medium</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">granularity</td>
              <td className="py-2 pr-4">day / hour / minute / second</td>
              <td className="py-2 font-mono text-xs">자동</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">hourCycle</td>
              <td className="py-2 pr-4">12 또는 24 시간제</td>
              <td className="py-2 font-mono text-xs">로케일</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">label</td>
              <td className="py-2 pr-4">상단 라벨 텍스트</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">defaultValue</td>
              <td className="py-2 pr-4">초기 날짜/시간 (비제어)</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">isDisabled</td>
              <td className="py-2 pr-4">비활성 상태</td>
              <td className="py-2 font-mono text-xs">false</td>
            </tr>
            <tr className={isDark ? 'text-[#ebebeb]' : ''}>
              <td className="py-2 pr-4 font-mono text-xs">errorMessage</td>
              <td className="py-2 pr-4">오류 메시지</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
          </tbody>
        </table>
        <p className={`mt-3 text-sm ${isDark ? 'text-[#778293]' : 'text-[#111827]/70'}`}>
          트리거 높이는 Logpresso control height(Small 24px / Medium 30px)를 따르고, 캘린더
          아이콘은 16x16입니다. 열린 캘린더는 CalendarSurface 규칙(accent 원형 선택 pill,
          24x24 셀)을 따르며 overlay 표면은 트리거와 분리해 스타일링했습니다. 시·분은 캘린더
          아래의 시간 입력 칸에서도 고를 수 있습니다. 우측 상단 버튼으로 라이트/다크 테마를
          전환할 수 있습니다.
        </p>
        <PropsInheritance
          chain={datePickerChain}
          groups={datePickerGroups}
          customProps={[
            {name: 'theme', desc: 'dark / light', default: 'dark'},
            {name: 'size', desc: 'small / medium', default: 'medium'},
            {name: 'label', desc: '상단 라벨 텍스트'},
            {name: 'description', desc: '하단 설명 텍스트'},
            {name: 'errorMessage', desc: '오류 메시지'}
          ]}
          docsUrl="https://react-aria.adobe.com/DatePicker#api"
        />
      </section>
    </div>
  );
}
