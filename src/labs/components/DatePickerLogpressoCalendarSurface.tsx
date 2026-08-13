import {useState, type ReactNode} from 'react';
import {getLocalTimeZone, today, Time} from '@internationalized/date';
import {CalendarIcon, ChevronLeft, ChevronRight} from 'lucide-react';
import {
  DatePicker as AriaDatePicker,
  type DatePickerProps as AriaDatePickerProps,
  type DateValue
} from 'react-aria-components/DatePicker';
import {Button, type ButtonProps} from 'react-aria-components/Button';
import {Group} from 'react-aria-components/Group';
import {Label} from 'react-aria-components/Label';
import {FieldError} from 'react-aria-components/FieldError';
import {
  Calendar as RACCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  type CalendarCellProps
} from 'react-aria-components/Calendar';
import {Heading} from 'react-aria-components/Heading';
import {
  DateInput as RACDateInput,
  DateSegment as RACDateSegment,
  TimeField as RACTimeField,
  type DateSegmentProps,
  type TimeValue
} from 'react-aria-components/TimeField';
import {Popover as AriaPopover} from 'react-aria-components/Popover';
import {composeRenderProps} from 'react-aria-components/composeRenderProps';
import {tv} from 'tailwind-variants';
import {DateInputLogpresso} from './DateInputLogpresso';
import {focusRing} from './utils';

export interface DatePickerLogpressoCalendarSurfaceProps
  extends Omit<AriaDatePickerProps<DateValue>, 'children' | 'label'> {
  /** @default 'dark' */
  theme?: 'dark' | 'light';
  /** @default 'medium' */
  size?: 'small' | 'medium';
  label?: string;
  errorMessage?: string;
  description?: string;
  /** 날짜 프리셋 목록. 기본값은 DEFAULT_PRESETS(오늘/7일/30일/60일/90일/커스텀). */
  presets?: CalendarSurfacePreset[];
}

const buttonStyles = tv({
  extend: focusRing,
  base: 'flex items-center justify-center shrink-0 transition cursor-default rounded-md outline-none [-webkit-tap-highlight-color:transparent]',
  variants: {
    theme: {
      dark: 'text-[#aeb8c5] hover:text-[#ebebeb]',
      light: 'text-[#111827]/70 hover:text-[#111827]'
    },
    isDisabled: {
      true: 'text-[#778293]'
    }
  },
  compoundVariants: [
    {
      theme: 'light',
      isDisabled: true,
      className: 'text-[#dce2ea]'
    }
  ]
});

function CalendarButton({
  theme,
  size
}: {
  theme: 'dark' | 'light';
  size: 'small' | 'medium';
}) {
  return (
    <Button
      className={(renderProps) =>
        buttonStyles({
          ...renderProps,
          theme,
          className: size === 'small' ? 'h-4 w-4' : 'h-5 w-5'
        })
      }>
      <CalendarIcon aria-hidden className="h-4 w-4" />
    </Button>
  );
}

const groupStyles = tv({
  base: 'flex items-center gap-1 overflow-hidden rounded-lg pr-1.5 transition outline-none [-webkit-tap-highlight-color:transparent]',
  variants: {
    size: {
      small: 'h-6 pl-1.5',
      medium: 'h-[30px] pl-2'
    },
    theme: {
      dark: '',
      light: ''
    },
    isHovered: {
      true: '',
      false: ''
    },
    isFocusWithin: {
      true: '',
      false: ''
    },
    isDisabled: {
      true: '',
      false: ''
    },
    isInvalid: {
      true: '',
      false: ''
    }
  },
  compoundVariants: [
    {
      theme: 'dark',
      isFocusWithin: false,
      isDisabled: false,
      isInvalid: false,
      className: 'border border-[#2a3340] bg-[#0e1322]'
    },
    {
      theme: 'dark',
      isHovered: true,
      isDisabled: false,
      isInvalid: false,
      className: 'border-[#3a4554] bg-[#151c33]'
    },
    {
      theme: 'dark',
      isFocusWithin: true,
      isDisabled: false,
      isInvalid: false,
      className: 'border-[#4c8dff] bg-[#0e1322]'
    },
    {
      theme: 'dark',
      isInvalid: true,
      isDisabled: false,
      className: 'border-[#ff454d] bg-[#0e1322]'
    },
    {
      theme: 'dark',
      isDisabled: true,
      className: 'border-[#2a3340] bg-[#111720]'
    },
    {
      theme: 'light',
      isFocusWithin: false,
      isDisabled: false,
      isInvalid: false,
      className: 'border border-[#dce2ea] bg-white'
    },
    {
      theme: 'light',
      isHovered: true,
      isDisabled: false,
      isInvalid: false,
      className: 'border-[#c7d0dd] bg-[#f1f3f7]'
    },
    {
      theme: 'light',
      isFocusWithin: true,
      isDisabled: false,
      isInvalid: false,
      className: 'border-[#2563eb] bg-white'
    },
    {
      theme: 'light',
      isInvalid: true,
      isDisabled: false,
      className: 'border-[#d50000] bg-white'
    },
    {
      theme: 'light',
      isDisabled: true,
      className: 'border-[#dce2ea] bg-[#f1f3f7]'
    }
  ]
});

const compactControlStyles = tv({
  base: 'inline-flex items-center justify-center rounded-md border outline-none transition [-webkit-tap-highlight-color:transparent]',
  variants: {
    theme: {
      dark: 'border-[rgba(126,140,222,0.16)] bg-[#070b13] text-[#ebebeb]',
      light: 'border-[#dce2ea] bg-white text-[#111827]'
    },
    isHovered: {
      true: '',
      false: ''
    },
    isPressed: {
      true: '',
      false: ''
    }
  },
  compoundVariants: [
    {
      theme: 'dark',
      isHovered: true,
      className: 'border-[rgba(126,140,222,0.3)] bg-[#0e1322]'
    },
    {
      theme: 'light',
      isHovered: true,
      className: 'bg-[#f1f3f7]'
    },
    {
      theme: 'dark',
      isPressed: true,
      className: 'ring-1 ring-inset ring-[#ff692a]/40'
    },
    {
      theme: 'light',
      isPressed: true,
      className: 'ring-1 ring-inset ring-[#ff692a]/40'
    }
  ]
});

function NavButton({theme, ...props}: ButtonProps & {theme: 'dark' | 'light'}) {
  return (
    <Button
      {...props}
      className={(renderProps) =>
        compactControlStyles({...renderProps, theme, className: 'h-6 w-6'})
      }>
      {props.children}
    </Button>
  );
}

const cellStyles = tv({
  base: 'flex h-6 w-6 items-center justify-center rounded-full text-xs leading-4 cursor-default transition [-webkit-tap-highlight-color:transparent]',
  variants: {
    theme: {
      dark: '',
      light: ''
    },
    isSelected: {
      true: '',
      false: ''
    },
    isOutsideMonth: {
      true: '',
      false: ''
    },
    isUnavailable: {
      true: '',
      false: ''
    },
    isDisabled: {
      true: '',
      false: ''
    }
  },
  compoundVariants: [
    {
      theme: 'dark',
      isSelected: true,
      isDisabled: false,
      className: 'bg-[#ff692a] text-[#ebebeb] font-semibold'
    },
    {
      theme: 'dark',
      isOutsideMonth: true,
      className: 'text-[#808080]'
    },
    {
      theme: 'dark',
      isUnavailable: true,
      className: 'text-[#808080] line-through'
    },
    {
      theme: 'dark',
      isDisabled: true,
      className: 'text-[#3a4554]'
    },
    {
      theme: 'dark',
      className: 'text-[#ebebeb] hover:bg-[#151c33]'
    },
    {
      theme: 'light',
      isSelected: true,
      isDisabled: false,
      className: 'bg-[#ff692a] text-[#ebebeb] font-semibold'
    },
    {
      theme: 'light',
      isOutsideMonth: true,
      className: 'text-[#c7d0dd]'
    },
    {
      theme: 'light',
      isUnavailable: true,
      className: 'text-[#aeb8c5] line-through'
    },
    {
      theme: 'light',
      isDisabled: true,
      className: 'text-[#c7d0dd]'
    },
    {
      theme: 'light',
      className: 'text-[#111827] hover:bg-[#f1f3f7]'
    }
  ]
});

function CalendarCellSurface({
  theme,
  date,
  ...props
}: CalendarCellProps & {theme: 'dark' | 'light'}) {
  return (
    <CalendarCell
      {...props}
      date={date}
      className={composeRenderProps(props.className, (className, renderProps) =>
        cellStyles({...renderProps, theme, className})
      )}
    />
  );
}

function CalendarSurface({theme}: {theme: 'dark' | 'light'}) {
  return (
    <RACCalendar className="font-sans">
      <header className="mb-2 flex h-6 items-center justify-between">
        <NavButton theme={theme} slot="previous">
          <ChevronLeft aria-hidden className="h-4 w-4" />
        </NavButton>
        <Heading
          className={`text-xs leading-4 font-medium ${
            theme === 'dark' ? 'text-[#ebebeb]' : 'text-[#111827]'
          }`}
        />
        <NavButton theme={theme} slot="next">
          <ChevronRight aria-hidden className="h-4 w-4" />
        </NavButton>
      </header>
      <CalendarGrid className="w-full">
        <CalendarGridHeader>
          {(day) => (
            <CalendarHeaderCell
              className={`py-1 text-center text-xs leading-4 ${
                theme === 'dark' ? 'text-[#ebebeb]' : 'text-[#111827]'
              }`}>
              {day}
            </CalendarHeaderCell>
          )}
        </CalendarGridHeader>
        <CalendarGridBody className="[&_td]:p-1">
          {(date) => <CalendarCellSurface theme={theme} date={date} />}
        </CalendarGridBody>
      </CalendarGrid>
    </RACCalendar>
  );
}

const presetButtonStyles = tv({
  base: 'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs leading-4 outline-none transition cursor-pointer [-webkit-tap-highlight-color:transparent]',
  variants: {
    theme: {
      dark: 'text-[#ebebeb]',
      light: 'text-[#111827]'
    },
    isActive: {
      true: '',
      false: ''
    }
  },
  compoundVariants: [
    {
      theme: 'dark',
      isActive: true,
      className: 'border-[#ff692a] bg-[#ff692a]/10 text-[#ff692a]'
    },
    {
      theme: 'dark',
      isActive: false,
      className: 'border-[rgba(126,140,222,0.16)] bg-[#070b13] hover:border-[rgba(126,140,222,0.3)] hover:bg-[#0e1322]'
    },
    {
      theme: 'light',
      isActive: true,
      className: 'border-[#ff692a] bg-[#ff692a]/10 text-[#ff692a]'
    },
    {
      theme: 'light',
      isActive: false,
      className: 'border-[#dce2ea] bg-white hover:bg-[#f1f3f7]'
    }
  ]
});

export interface CalendarSurfacePreset {
  id: string;
  label: string;
  /** 오늘 기준 더할 일 수. null이면 수동 선택(커스텀) */
  offset: number | null;
}

const DEFAULT_PRESETS: CalendarSurfacePreset[] = [{id: 'today', label: '오늘', offset: 0}];

/** 레인지(기간 선택) 모드용 프리셋 목록 */
export const RANGE_DEFAULT_PRESETS: CalendarSurfacePreset[] = [
  {id: 'today', label: '오늘', offset: 0},
  {id: '7', label: '7일', offset: 7},
  {id: '30', label: '30일', offset: 30},
  {id: '60', label: '60일', offset: 60},
  {id: '90', label: '90일', offset: 90},
  {id: 'custom', label: '커스텀', offset: null}
];

const timeSegmentStyles = tv({
  extend: focusRing,
  base: 'flex h-[30px] w-10 items-center justify-center rounded-lg border text-sm tabular-nums transition outline-none [-webkit-tap-highlight-color:transparent]',
  variants: {
    theme: {
      dark: 'border-[rgba(126,140,222,0.16)] bg-[#070b13] text-[#ebebeb]',
      light: 'border-[#dce2ea] bg-white text-[#111827]'
    },
    isPlaceholder: {
      true: '',
      false: ''
    },
    isDisabled: {
      true: '',
      false: ''
    }
  },
  compoundVariants: [
    {
      theme: 'dark',
      isPlaceholder: true,
      isDisabled: false,
      className: 'text-[#808080]'
    },
    {
      theme: 'dark',
      isDisabled: true,
      className: 'text-[#778293]'
    },
    {
      theme: 'light',
      isPlaceholder: true,
      isDisabled: false,
      className: 'text-[#111827]/60'
    },
    {
      theme: 'light',
      isDisabled: true,
      className: 'text-[#dce2ea]'
    }
  ]
});

function TimeSegmentSurface({
  theme,
  segment,
  ...props
}: DateSegmentProps & {theme: 'dark' | 'light'}) {
  return (
    <RACDateSegment
      {...props}
      segment={segment}
      className={composeRenderProps(props.className, (className, renderProps) =>
        timeSegmentStyles({...renderProps, theme, className})
      )}
    />
  );
}

function TimeFieldGroup({
  theme,
  hourCycle,
  value,
  onChange
}: {
  theme: 'dark' | 'light';
  hourCycle: 12 | 24;
  value: TimeValue | null;
  onChange: (time: TimeValue) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <RACTimeField
        aria-label="시간"
        value={value}
        onChange={(time) => time && onChange(time)}
        granularity="second"
        hourCycle={hourCycle}>
        <RACDateInput className="flex items-center gap-1.5">
          {(segment) =>
            segment.type === 'literal' ? (
              <span
                aria-hidden
                className={`shrink-0 text-sm ${
                  theme === 'dark' ? 'text-[#ebebeb]' : 'text-[#111827]'
                }`}>
                {segment.text}
              </span>
            ) : (
              <TimeSegmentSurface theme={theme} segment={segment} />
            )
          }
        </RACDateInput>
      </RACTimeField>
      <button
        type="button"
        onClick={() => {
          const now = new Date();
          onChange(new Time(now.getHours(), now.getMinutes(), now.getSeconds()));
        }}
        className={`cursor-pointer text-xs underline underline-offset-4 outline-none transition ${
          theme === 'dark' ? 'text-[#ff692a]' : 'text-[#ff692a]'
        }`}>
        현재 시각으로 설정
      </button>
    </div>
  );
}

const footerButtonStyles = tv({
  base: 'inline-flex items-center justify-center h-6 rounded-lg px-2 text-xs leading-4 font-medium outline-none transition cursor-default [-webkit-tap-highlight-color:transparent]',
  variants: {
    theme: {
      dark: '',
      light: ''
    },
    variant: {
      cancel: '',
      confirm: ''
    },
    isHovered: {
      true: '',
      false: ''
    },
    isPressed: {
      true: '',
      false: ''
    }
  },
  compoundVariants: [
    {
      theme: 'dark',
      variant: 'cancel',
      className: 'border border-[rgba(126,140,222,0.16)] bg-[#070b13] text-[#ebebeb]'
    },
    {
      theme: 'dark',
      variant: 'cancel',
      isHovered: true,
      className: 'border-[rgba(126,140,222,0.3)] bg-[#0e1322]'
    },
    {
      theme: 'light',
      variant: 'cancel',
      className: 'border border-[#dce2ea] bg-white text-[#111827]'
    },
    {
      theme: 'light',
      variant: 'cancel',
      isHovered: true,
      className: 'bg-[#f1f3f7]'
    },
    {
      theme: 'dark',
      variant: 'confirm',
      isHovered: false,
      className: 'border border-[#ff692a] bg-[#ff692a] text-[#ebebeb]'
    },
    {
      theme: 'dark',
      variant: 'confirm',
      isHovered: true,
      className: 'border-[#ff692a] bg-[#ff7a00] text-[#ebebeb]'
    },
    {
      theme: 'light',
      variant: 'confirm',
      isHovered: false,
      className: 'border border-[#ff692a] bg-[#ff692a] text-[#ebebeb]'
    },
    {
      theme: 'light',
      variant: 'confirm',
      isHovered: true,
      className: 'border-[#ff692a] bg-[#ff7a00] text-[#ebebeb]'
    }
  ]
});

function FooterButton({
  theme,
  variant,
  onPress,
  children
}: {
  theme: 'dark' | 'light';
  variant: 'cancel' | 'confirm';
  onPress: () => void;
  children: ReactNode;
}) {
  return (
    <Button
      onPress={onPress}
      className={(renderProps) =>
        footerButtonStyles({...renderProps, theme, variant})
      }>
      {children}
    </Button>
  );
}

export function DatePickerLogpressoCalendarSurface({
  theme = 'dark',
  size = 'medium',
  label,
  errorMessage,
  description,
  presets = DEFAULT_PRESETS,
  ...props
}: DatePickerLogpressoCalendarSurfaceProps) {
  const [activePreset, setActivePreset] = useState<string>(
    () => presets.find((p) => p.offset == null)?.id ?? 'custom'
  );

  return (
    <AriaDatePicker {...props}>
      {({state}) => (
        <>
          <div className="group flex flex-col gap-1 font-sans">
            {label && (
              <Label
                className={`w-fit cursor-default text-sm font-medium ${
                  theme === 'dark' ? 'text-[#ebebeb]' : 'text-[#111827]'
                }`}>
                {label}
              </Label>
            )}
            <Group
              className={(renderProps) =>
                groupStyles({...renderProps, size, theme})
              }>
              <DateInputLogpresso
                size={size}
                theme={theme}
                bordered={false}
                className="flex-1"
              />
              <CalendarButton theme={theme} size={size} />
            </Group>
            {description && (
              <span
                className={`text-xs ${
                  theme === 'dark' ? 'text-[#778293]' : 'text-[#111827]/60'
                }`}>
                {description}
              </span>
            )}
            {errorMessage && (
              <FieldError
                className={`text-xs ${theme === 'dark' ? 'text-[#ff454d]' : 'text-[#d50000]'}`}>
                {errorMessage}
              </FieldError>
            )}
          </div>
          <AriaPopover
            offset={6}
            className={`flex flex-col gap-2 rounded-lg border p-2 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_2px_3px_rgba(0,0,0,0.10)] ${
              theme === 'dark'
                ? 'border-[rgba(126,140,222,0.16)] bg-[#070b13]'
                : 'border-[#dce2ea] bg-white'
            }`}>
            <div className="flex items-center justify-between gap-2">
              <span
                className={`shrink-0 text-xs leading-4 font-bold ${
                  theme === 'dark' ? 'text-[#ebebeb]' : 'text-[#111827]'
                }`}>
                날짜 선택
              </span>
              <div className="flex flex-wrap items-center justify-end gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      setActivePreset(preset.id);
                      if (preset.offset != null) {
                        state.setDateValue(
                          today(getLocalTimeZone()).add({days: preset.offset})
                        );
                      }
                    }}
                    className={presetButtonStyles({
                      theme,
                      isActive: activePreset === preset.id
                    })}>
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
            <CalendarSurface theme={theme} />
            {state.hasTime && (
              <div className="flex justify-center py-1">
                <TimeFieldGroup
                  theme={theme}
                  hourCycle={props.hourCycle ?? 24}
                  value={state.timeValue}
                  onChange={(time) => state.setTimeValue(time)}
                />
              </div>
            )}
            <div className="flex items-center justify-end gap-2 pt-1">
              <FooterButton
                theme={theme}
                variant="cancel"
                onPress={() => state.setOpen(false)}>
                취소
              </FooterButton>
              <FooterButton
                theme={theme}
                variant="confirm"
                onPress={() => state.setOpen(false)}>
                확인
              </FooterButton>
            </div>
          </AriaPopover>
        </>
      )}
    </AriaDatePicker>
  );
}