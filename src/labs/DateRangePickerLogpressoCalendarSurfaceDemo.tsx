import {useState} from 'react';
import {parseDate} from '@internationalized/date';
import {DateRangePickerLogpressoCalendarSurface} from './components/DateRangePickerLogpressoCalendarSurface';
import {PropsInheritance} from './components/PropsInheritance';

const usageCode = `import { DateRangePickerLogpressoCalendarSurface } from './components/DateRangePickerLogpressoCalendarSurface';
import { parseDate } from '@internationalized/date';

// 기간 선택: 프리셋(오늘/7일/30일/60일/90일/커스텀) + 두 달 달력 + 취소/확인
<DateRangePickerLogpressoCalendarSurface
  theme="dark"
  size="medium"
  label="조회 기간"
  granularity="day"
  defaultValue={{
    start: parseDate('2025-02-01'),
    end: parseDate('2025-02-07')
  }}
/>`;

const rangeChain = [
  {name: 'DateRangePickerLogpressoCalendarSurface (Lab)'},
  {name: 'RAC DateRangePickerProps'},
  {name: 'AriaDateRangePickerProps'},
  {name: 'react-stately DateRangePickerState'}
];

const rangeGroups = [
  {
    source: 'ValueBase / DateRangeValueBase',
    props: [
      {name: 'value / defaultValue', desc: '시작·끝 날짜 객체 {start, end}'},
      {name: 'onChange', desc: '범위 변경 시 호출'}
    ]
  },
  {
    source: 'DateRangePickerProps (자체)',
    props: [
      {name: 'granularity', desc: '표시 최소 단위 (day / hour / minute / second)'},
      {name: 'minValue / maxValue', desc: '최소/최대 허용 날짜'},
      {name: 'isDateUnavailable', desc: '선택 불가 날짜 검사'}
    ]
  },
  {
    source: 'InputBase / Validation',
    props: [
      {name: 'isDisabled', desc: '비활성 상태'},
      {name: 'isReadOnly', desc: '읽기 전용'},
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
  }
];

export default function DateRangePickerLogpressoCalendarSurfaceDemo() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const isDark = theme === 'dark';

  return (
    <div className={`flex flex-col gap-8 p-6 font-sans ${isDark ? 'bg-[#0b0f15]' : 'bg-white'}`}>
      <div className="flex items-center justify-between">
        <h1 className={`text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          DateRangePicker CalendarSurface (Logpresso)
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
          기간 선택 (granularity=&quot;day&quot;)
        </h2>
        <div className="max-w-[320px]">
          <DateRangePickerLogpressoCalendarSurface
            theme={theme}
            size="medium"
            label="조회 기간"
            granularity="day"
            shouldCloseOnSelect={false}
            defaultValue={{
              start: parseDate('2025-02-03'),
              end: parseDate('2025-02-09')
            }}
            description="프리셋을 누르면 오늘 기준 기간이 자동 적용됩니다. 두 달 달력에서 시작·끝을 직접 골라도 됩니다."
          />
        </div>
      </section>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          커스텀 프리셋 (presets prop)
        </h2>
        <div className="max-w-[320px]">
          <DateRangePickerLogpressoCalendarSurface
            theme={theme}
            size="medium"
            label="보고 기간"
            granularity="day"
            presets={[
              {id: 'yesterday', label: '어제~오늘', offset: 1},
              {id: '14', label: '14일', offset: 14},
              {id: 'custom', label: '직접 선택', offset: null}
            ]}
            shouldCloseOnSelect={false}
            defaultValue={{
              start: parseDate('2025-02-03'),
              end: parseDate('2025-02-04')
            }}
            description="presets prop으로 프리셋 목록을 교체할 수 있습니다."
          />
        </div>
      </section>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          Small / 비활성 / 오류
        </h2>
        <div className="flex flex-wrap items-end gap-6">
          <div className="w-[260px]">
            <DateRangePickerLogpressoCalendarSurface
              theme={theme}
              size="small"
              label="Small"
              granularity="day"
              defaultValue={{
                start: parseDate('2025-02-03'),
                end: parseDate('2025-02-09')
              }}
            />
          </div>
          <div className="w-[260px]">
            <DateRangePickerLogpressoCalendarSurface
              theme={theme}
              size="medium"
              label="비활성"
              granularity="day"
              isDisabled
              defaultValue={{
                start: parseDate('2025-02-03'),
                end: parseDate('2025-02-09')
              }}
            />
          </div>
          <div className="w-[260px]">
            <DateRangePickerLogpressoCalendarSurface
              theme={theme}
              size="medium"
              label="오류"
              granularity="day"
              isInvalid
              errorMessage="시작일이 종료일보다 늦습니다."
              defaultValue={{
                start: parseDate('2025-02-10'),
                end: parseDate('2025-02-03')
              }}
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
              <td className="py-2 pr-4 font-mono text-xs">presets</td>
              <td className="py-2 pr-4">날짜 프리셋 목록 (id / label / offset)</td>
              <td className="py-2 font-mono text-xs">기본 6개</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">label</td>
              <td className="py-2 pr-4">상단 라벨 텍스트</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr className={isDark ? 'text-[#ebebeb]' : ''}>
              <td className="py-2 pr-4 font-mono text-xs">defaultValue</td>
              <td className="py-2 pr-4">{'{start, end}'} 범위 (비제어)</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
          </tbody>
        </table>
        <p className={`mt-3 text-sm ${isDark ? 'text-[#778293]' : 'text-[#111827]/70'}`}>
          팝업은 CalendarSurface 스펙의 monthLayout=double 구조를 따릅니다. 두 달 달력(232px x 2)에서
          시작일·종료일을 연속으로 선택하면 오렌지 범위 밴드와 양 끝 점이 표시됩니다. 기본 프리셋은
          오늘 / 7일 / 30일 / 60일 / 90일 / 커스텀이며, 오늘 기준 기간이 시작일~끝 일까지 적용됩니다.
          우측 상단 버튼으로 라이트/다크 테마를 전환할 수 있습니다.
        </p>
        <PropsInheritance
          chain={rangeChain}
          groups={rangeGroups}
          customProps={[
            {name: 'theme', desc: 'dark / light', default: 'dark'},
            {name: 'size', desc: 'small / medium', default: 'medium'},
            {name: 'label', desc: '상단 라벨 텍스트'},
            {name: 'description', desc: '하단 설명 텍스트'},
            {name: 'errorMessage', desc: '오류 메시지'},
            {name: 'presets', desc: '날짜 프리셋 목록 (id / label / offset)'}
          ]}
          docsUrl="https://react-aria.adobe.com/DateRangePicker#api"
        />
      </section>
    </div>
  );
}
