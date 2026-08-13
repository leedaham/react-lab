import {ChevronDown} from 'lucide-react';
import {
  Button,
  ListBox,
  Select as AriaSelect,
  SelectValue
} from 'react-aria-components/Select';
import type {TimeValue} from 'react-aria-components/TimeField';
import {Time} from '@internationalized/date';
import {tv} from 'tailwind-variants';
import {DropdownItem} from './ListBox';
import {Popover} from './Popover';
import {focusRing} from './utils';

export interface TimeSelectProps {
  value: TimeValue | null;
  onChange: (time: Time) => void;
  /** @default 24 */
  hourCycle?: 12 | 24;
}

interface Option {
  id: string;
  name: string;
}

const hours24: Option[] = Array.from({length: 24}, (_, h) => ({
  id: String(h).padStart(2, '0'),
  name: String(h).padStart(2, '0')
}));
const hours12: Option[] = Array.from({length: 12}, (_, i) => ({
  id: String(i + 1).padStart(2, '0'),
  name: String(i + 1).padStart(2, '0')
}));
const minutes: Option[] = Array.from({length: 60}, (_, m) => ({
  id: String(m).padStart(2, '0'),
  name: String(m).padStart(2, '0')
}));
const periods: Option[] = [
  {id: '오전', name: '오전'},
  {id: '오후', name: '오후'}
];

const triggerStyles = tv({
  extend: focusRing,
  base: 'flex items-center gap-1 cursor-default rounded-md border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 px-2 py-1 text-sm text-neutral-800 dark:text-neutral-200 transition hover:bg-neutral-100 dark:hover:bg-neutral-800 pressed:bg-neutral-200 dark:pressed:bg-neutral-700'
});

function TimeDropdown({
  ariaLabel,
  selected,
  items,
  placeholder,
  onSelect
}: {
  ariaLabel: string;
  selected: string | null;
  items: Option[];
  placeholder: string;
  onSelect: (id: string) => void;
}) {
  return (
    <AriaSelect
      aria-label={ariaLabel}
      selectedKey={selected}
      onSelectionChange={(key) => key != null && onSelect(String(key))}>
      <Button
        className={(renderProps) => triggerStyles({...renderProps, className: undefined})}>
        <SelectValue className="flex items-center gap-1 tabular-nums">
          {({selectedText}) => (
            <span className={selectedText ? undefined : 'text-neutral-400 dark:text-neutral-500'}>
              {selectedText || placeholder}
            </span>
          )}
        </SelectValue>
        <ChevronDown aria-hidden className="h-3 w-3 text-neutral-500 dark:text-neutral-400" />
      </Button>
      <Popover className="p-1">
        <ListBox
          items={items}
          className="outline-none max-h-[220px] overflow-auto p-1">
          {(item) => (
            <DropdownItem id={item.id} textValue={item.name}>
              {item.name}
            </DropdownItem>
          )}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}

export function TimeSelect({value, onChange, hourCycle = 24}: TimeSelectProps) {
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

  return (
    <div className="flex items-center gap-1.5">
      {is12h && (
        <TimeDropdown
          ariaLabel="오전/오후"
          selected={isNull ? null : period}
          items={periods}
          placeholder="오전"
          onSelect={(p) => onChange(new Time(to24Hour(p, displayHour), minute))}
        />
      )}
      <TimeDropdown
        ariaLabel="시"
        selected={hourLabel}
        items={is12h ? hours12 : hours24}
        placeholder="시"
        onSelect={(h) => {
          const hour24 = is12h ? to24Hour(period, Number(h)) : Number(h);
          onChange(new Time(hour24, minute));
        }}
      />
      <span className="text-sm text-neutral-500 dark:text-neutral-400">:</span>
      <TimeDropdown
        ariaLabel="분"
        selected={minuteLabel}
        items={minutes}
        placeholder="분"
        onSelect={(m) => onChange(new Time(hour, Number(m)))}
      />
    </div>
  );
}
