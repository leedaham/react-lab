import type {TimeValue} from 'react-aria-components/TimeField';
import {Time} from '@internationalized/date';
import {
  SelectLogpresso,
  type SelectLogpressoOption
} from './SelectLogpresso';
import {useLogpressoTheme} from './utils';

export interface TimeSelectLogpressoProps {
  value: TimeValue | null;
  onChange: (time: Time) => void;
  /** @default 24 */
  hourCycle?: 12 | 24;
  /** @default 'medium' */
  size?: 'small' | 'medium';
}

const hours24: SelectLogpressoOption[] = Array.from({length: 24}, (_, h) => ({
  id: String(h).padStart(2, '0'),
  name: String(h).padStart(2, '0')
}));
const hours12: SelectLogpressoOption[] = Array.from({length: 12}, (_, i) => ({
  id: String(i + 1).padStart(2, '0'),
  name: String(i + 1).padStart(2, '0')
}));
const minutes: SelectLogpressoOption[] = Array.from({length: 60}, (_, m) => ({
  id: String(m).padStart(2, '0'),
  name: String(m).padStart(2, '0')
}));
const periods: SelectLogpressoOption[] = [
  {id: '오전', name: '오전'},
  {id: '오후', name: '오후'}
];

export function TimeSelectLogpresso({
  value,
  onChange,
  hourCycle = 24,
  size = 'medium'
}: TimeSelectLogpressoProps) {
  const theme = useLogpressoTheme();
  const isNull = value == null;
  const hour = value?.hour ?? 0;
  const minute = value?.minute ?? 0;
  const is12h = hourCycle === 12;
  const period = hour < 12 ? '오전' : '오후';
  const displayHour = is12h ? (hour % 12 === 0 ? 12 : hour % 12) : hour;
  const hourLabel = isNull
    ? null
    : is12h
      ? String(displayHour).padStart(2, '0')
      : String(hour).padStart(2, '0');
  const minuteLabel = isNull ? null : String(minute).padStart(2, '0');

  const to24Hour = (period: string, h: number) => {
    if (period === '오전') return h === 12 ? 0 : h;
    return h === 12 ? 12 : h + 12;
  };

  const selectProps = {
    size
  };

  return (
    <div className="flex items-center gap-1.5">
      {is12h && (
        <div className="w-[74px]">
          <SelectLogpresso
            {...selectProps}
            items={periods}
            placeholder="오전"
            selectedKey={isNull ? null : period}
            onSelectionChange={(key) => key != null && onChange(new Time(to24Hour(String(key), displayHour), minute))}
          />
        </div>
      )}
      <div className="w-[74px]">
        <SelectLogpresso
          {...selectProps}
          items={is12h ? hours12 : hours24}
          placeholder="시"
          selectedKey={hourLabel}
          onSelectionChange={(key) => {
            if (key == null) return;
            const hour24 = is12h ? to24Hour(period, Number(key)) : Number(key);
            onChange(new Time(hour24, minute));
          }}
        />
      </div>
      <span
        className={`shrink-0 text-sm ${theme === 'dark' ? 'text-[#778293]' : 'text-[#111827]/60'}`}>
        :
      </span>
      <div className="w-[74px]">
        <SelectLogpresso
          {...selectProps}
          items={minutes}
          placeholder="분"
          selectedKey={minuteLabel}
          onSelectionChange={(key) => key != null && onChange(new Time(hour, Number(key)))}
        />
      </div>
    </div>
  );
}
