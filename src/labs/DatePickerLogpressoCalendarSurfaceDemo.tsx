import {useEffect} from 'react';
import {parseDateTime} from '@internationalized/date';
import {DatePickerLogpressoCalendarSurface} from './components/DatePickerLogpressoCalendarSurface';
import {ThemeToggle} from './components/ThemeToggle';
import {PropsInheritance} from './components/PropsInheritance';
import {useLogpressoTheme} from './components/utils';

const usageCode = `import { DatePickerLogpressoCalendarSurface } from './components/DatePickerLogpressoCalendarSurface';
import { parseDateTime } from '@internationalized/date';

// 테마는 <html data-theme="dark"> 값을 자동으로 감지합니다.
// CalendarSurface 스펙의 팝업(프리셋 행 + 캘린더 + 시분초 + 취소/확인)
<DatePickerLogpressoCalendarSurface
  size="medium"
  label="예약 시간"
  granularity="minute"
  hourCycle={24}
  defaultValue={parseDateTime('2025-02-03T09:30')}
/>`;

const surfaceChain = [
  {name: 'DatePickerLogpressoCalendarSurface (Lab)'},
  {name: 'RAC DatePickerProps'},
  {name: 'AriaDatePickerProps'},
  {name: 'react-stately DatePickerState'}
];

const surfaceGroups = [
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
  }
];

export default function DatePickerLogpressoCalendarSurfaceDemo() {
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
          DatePicker CalendarSurface (Logpresso)
        </h1>
        <ThemeToggle />
      </div>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          날짜 + 시·분 (granularity=&quot;minute&quot;)
        </h2>
        <div className="max-w-[300px]">
          <DatePickerLogpressoCalendarSurface
            size="medium"
            label="회의 시작"
            granularity="minute"
            shouldCloseOnSelect={false}
            defaultValue={parseDateTime('2025-02-03T09:30')}
            description="팝업에서 프리셋·날짜·시분초·확인까지 한 번에 조작합니다."
          />
        </div>
      </section>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          시·분·초 (granularity=&quot;second&quot;) / 12시간제
        </h2>
        <div className="flex flex-wrap items-end gap-6">
          <div className="max-w-[300px]">
            <DatePickerLogpressoCalendarSurface
              size="medium"
              label="시·분·초"
              granularity="second"
              shouldCloseOnSelect={false}
              defaultValue={parseDateTime('2025-02-03T09:30:45')}
            />
          </div>
          <div className="max-w-[300px]">
            <DatePickerLogpressoCalendarSurface
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
          커스텀 프리셋 (presets prop)
        </h2>
        <div className="max-w-[300px]">
          <DatePickerLogpressoCalendarSurface
            size="medium"
            label="보고 기간"
            granularity="day"
            presets={[
              {id: 'yesterday', label: '어제', offset: -1},
              {id: '14', label: '14일', offset: 14},
              {id: 'custom', label: '직접 선택', offset: null}
            ]}
            shouldCloseOnSelect={false}
            defaultValue={parseDateTime('2025-02-03T09:30')}
            description="presets prop으로 프리셋 목록을 교체할 수 있습니다."
          />
        </div>
      </section>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          크기 Small / 비활성 / 오류
        </h2>
        <div className="flex flex-wrap items-end gap-6">
          <div className="w-[240px]">
            <DatePickerLogpressoCalendarSurface
              size="small"
              label="Small"
              granularity="minute"
              defaultValue={parseDateTime('2025-02-03T09:30')}
            />
          </div>
          <div className="w-[240px]">
            <DatePickerLogpressoCalendarSurface
              size="medium"
              label="비활성"
              granularity="minute"
              isDisabled
              defaultValue={parseDateTime('2025-02-03T09:30')}
            />
          </div>
          <div className="w-[240px]">
            <DatePickerLogpressoCalendarSurface
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
            <tr className={isDark ? 'text-[#ebebeb]' : ''}>
              <td className="py-2 pr-4 font-mono text-xs">presets</td>
              <td className="py-2 pr-4">날짜 프리셋 목록 (id / label / offset)</td>
              <td className="py-2 font-mono text-xs">오늘 1개</td>
            </tr>
            <tr className={isDark ? 'text-[#ebebeb]' : ''}>
              <td className="py-2 pr-4 font-mono text-xs">isDisabled</td>
              <td className="py-2 pr-4">비활성 상태</td>
              <td className="py-2 font-mono text-xs">false</td>
            </tr>
          </tbody>
        </table>
        <p className={`mt-3 text-sm ${isDark ? 'text-[#778293]' : 'text-[#111827]/70'}`}>
          팝업은 CalendarSurface 스펙을 따릅니다. 상단 헤더(프리셋 행: 기본 오늘 1개),
          24x24 셀 캘린더, 시·분·초 TimeFieldGroup(&quot;현재 시각으로 설정&quot;),
          하단 취소/확인 푸터로 구성됩니다. 취소/확인은 팝업을 닫습니다(값은 날짜 선택 즉시
          확정). 기간(시작~끝) 선택이 필요하면 DateRangePicker CalendarSurface 데모를
          참고하세요. 테마는{' '}
          <code className="font-mono text-xs">&lt;html data-theme&gt;</code> 값을 자동 감지하며,
          우측 상단의 ThemeToggle로 바로 바꿔볼 수 있습니다.
        </p>
        <PropsInheritance
          chain={surfaceChain}
          groups={surfaceGroups}
          customProps={[
            {name: 'size', desc: 'small / medium', default: 'medium'},
            {name: 'label', desc: '상단 라벨 텍스트'},
            {name: 'description', desc: '하단 설명 텍스트'},
            {name: 'errorMessage', desc: '오류 메시지'},
            {name: 'presets', desc: '날짜 프리셋 목록 (id / label / offset)'}
          ]}
          docsUrl="https://react-aria.adobe.com/DatePicker#api"
        />
      </section>
    </div>
  );
}