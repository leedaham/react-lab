import {useState} from 'react';
import {
  getLocalTimeZone,
  now,
  parseDateTime,
  today,
  type ZonedDateTime
} from '@internationalized/date';
import {DatePicker} from './components/DatePicker';
import {PropsInheritance} from './components/PropsInheritance';

const usageCode = `import { DatePicker } from './components/DatePicker';
import { parseDateTime } from '@internationalized/date';

// 날짜만 (기본: granularity="day")
<DatePicker label="날짜" defaultValue={parseDateTime('2025-02-03T00:00')} />

// 시·분까지 (granularity="minute")
<DatePicker
  label="일정 시작"
  granularity="minute"
  hourCycle={24}
  defaultValue={parseDateTime('2025-02-03T08:45')}
  onChange={setValue}
/>`;

const datePickerChain = [
  {name: 'DatePicker (Lab)'},
  {name: 'RAC DatePickerProps'},
  {name: 'AriaDatePickerProps'},
  {name: 'react-stately DatePickerState'}
];

const datePickerGroups = [
  {
    source: 'ValueBase / DateValueBase',
    props: [
      {name: 'value / defaultValue', desc: '@internationalized/date 값 (DateTime/ZonedDateTime)'},
      {name: 'onChange', desc: '값 변경 시 호출'},
      {name: 'placeholderValue', desc: '빈 값일 때 표시 기준 값'}
    ]
  },
  {
    source: 'DatePickerProps (자체)',
    props: [
      {name: 'granularity', desc: '표시 최소 단위 (day / hour / minute / second)'},
      {name: 'hourCycle', desc: '12 / 24 시간제 (기본: 로케일 자동)'},
      {name: 'hideTimeZone', desc: '타임존 표시 여부'},
      {name: 'isDateUnavailable', desc: '선택 불가 날짜 검사'},
      {name: 'minValue / maxValue', desc: '최소/최대 허용 날짜'},
      {name: 'isOpen / defaultOpen', desc: '팝업 열림 상태'},
      {name: 'shouldCloseOnSelect', desc: '날짜 선택 시 팝업 닫힘 여부'}
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
      {name: 'onBlur', desc: '포커스 이탈 시 호출'},
      {name: 'autoFocus', desc: '초기 포커스 여부'}
    ]
  },
  {
    source: 'AriaLabelingProps / HelpTextProps',
    props: [
      {name: 'aria-label', desc: '스크린리더용 라벨'},
      {name: 'label', desc: '상단 라벨 (데모에서 직접 정의)'},
      {name: 'description', desc: '설명 텍스트 (데모에서 직접 정의)'},
      {name: 'errorMessage', desc: '오류 메시지 (데모에서 직접 정의)'}
    ]
  }
];

export default function DatePickerDemo() {
  const [meeting, setMeeting] = useState<ZonedDateTime>(() =>
    now(getLocalTimeZone()).set({hour: 14, minute: 30, second: 0, millisecond: 0})
  );
  const todayValue = today(getLocalTimeZone());

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="mb-3 text-lg font-semibold">날짜만 (기본)</h2>
        <div className="max-w-[260px]">
          <DatePicker
            label="출근 날짜"
            defaultValue={parseDateTime('2025-02-03T00:00')}
            description="기본 granularity는 day입니다."
          />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">시·분까지 (granularity=&quot;minute&quot;)</h2>
        <div className="max-w-[300px]">
          <DatePicker
            label="회의 시작"
            granularity="minute"
            shouldCloseOnSelect={false}
            value={meeting}
            onChange={(value) => value && setMeeting(value)}
            description="연/월/일/시/분 세그먼트를 각각 편집할 수 있습니다."
          />
        </div>
        <p className="mt-2 text-sm text-gray-600">
          선택된 시간: {meeting.toDate().toLocaleString('ko-KR')}
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">24시간 / 12시간 (hourCycle)</h2>
        <div className="flex flex-wrap items-end gap-6">
          <div className="max-w-[280px]">
            <DatePicker
              label="24시간제"
              granularity="minute"
              hourCycle={24}
              shouldCloseOnSelect={false}
              defaultValue={parseDateTime('2025-02-03T20:15')}
            />
          </div>
          <div className="max-w-[280px]">
            <DatePicker
              label="12시간제"
              granularity="minute"
              hourCycle={12}
              shouldCloseOnSelect={false}
              defaultValue={parseDateTime('2025-02-03T20:15')}
            />
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          명시하지 않으면 사용자 로케일(한국: 24시간제)을 따릅니다.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">최소 날짜 / 오류 / 비활성</h2>
        <div className="flex flex-wrap items-end gap-6">
          <div className="max-w-[280px]">
            <DatePicker
              label="오늘 이후부터 선택 가능"
              granularity="minute"
              minValue={todayValue}
              shouldCloseOnSelect={false}
              defaultValue={parseDateTime('2025-02-03T10:00')}
            />
          </div>
          <div className="max-w-[280px]">
            <DatePicker
              label="오류 상태"
              granularity="minute"
              isInvalid
              errorMessage="시작일이 종료일보다 늦습니다."
              defaultValue={parseDateTime('2025-02-03T10:00')}
            />
          </div>
          <div className="max-w-[280px]">
            <DatePicker
              label="비활성"
              granularity="minute"
              isDisabled
              defaultValue={parseDateTime('2025-02-03T10:00')}
            />
          </div>
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
              <td className="py-2 pr-4 font-mono text-xs">granularity</td>
              <td className="py-2 pr-4">day / hour / minute / second</td>
              <td className="py-2 font-mono text-xs">자동</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2 pr-4 font-mono text-xs">hourCycle</td>
              <td className="py-2 pr-4">12 또는 24 시간제</td>
              <td className="py-2 font-mono text-xs">로케일</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2 pr-4 font-mono text-xs">label</td>
              <td className="py-2 pr-4">상단 라벨 텍스트</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2 pr-4 font-mono text-xs">defaultValue</td>
              <td className="py-2 pr-4">초기 날짜/시간 (비제어)</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2 pr-4 font-mono text-xs">value / onChange</td>
              <td className="py-2 pr-4">날짜/시간 제어</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2 pr-4 font-mono text-xs">minValue / maxValue</td>
              <td className="py-2 pr-4">선택 가능 범위 제한</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2 pr-4 font-mono text-xs">isDisabled</td>
              <td className="py-2 pr-4">비활성 상태</td>
              <td className="py-2 font-mono text-xs">false</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-mono text-xs">description</td>
              <td className="py-2 pr-4">하단 설명 텍스트</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-3 text-sm text-gray-600">
          시·분이 있는 값을 쓰면 캘린더 팝업 아래에 시·분 드롭다운이 나타납니다. 캘린더에서
          날짜를 고르고, 시·분 드롭다운에서 시간을 선택합니다. 날짜 선택 후에도 팝업이 닫히지
          않아 시간을 이어서 고를 수 있습니다.
        </p>
        <PropsInheritance
          chain={datePickerChain}
          groups={datePickerGroups}
          customProps={[
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
