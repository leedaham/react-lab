import {ChevronLeft, ChevronRight} from 'lucide-react';
import {
  Calendar as RACCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  type CalendarCellProps,
  type CalendarProps
} from 'react-aria-components/Calendar';
import {Button, type ButtonProps} from 'react-aria-components/Button';
import {Heading} from 'react-aria-components/Heading';
import type {DateValue} from 'react-aria-components/DatePicker';
import {composeRenderProps} from 'react-aria-components/composeRenderProps';
import {tv} from 'tailwind-variants';

export interface CalendarLogpressoProps extends CalendarProps<DateValue> {
  /** @default 'dark' */
  theme?: 'dark' | 'light';
}

const cellStyles = tv({
  base: 'w-full h-full flex items-center justify-center rounded-full text-xs leading-4 cursor-default transition [-webkit-tap-highlight-color:transparent] forced-color-adjust-none',
  variants: {
    isToday: {
      true: '',
      false: ''
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
    },
    theme: {
      dark: '',
      light: ''
    }
  },
  compoundVariants: [
    {
      theme: 'dark',
      isSelected: true,
      isDisabled: false,
      className: 'bg-[#ff7a00] text-[#ffffff] font-semibold'
    },
    {
      theme: 'dark',
      isToday: true,
      isSelected: false,
      className: 'text-[#ff7a00] font-semibold'
    },
    {
      theme: 'dark',
      isOutsideMonth: true,
      className: 'text-[#3a4554]'
    },
    {
      theme: 'dark',
      isUnavailable: true,
      className: 'text-[#778293] line-through'
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
      className: 'bg-[#ff692a] text-[#ffffff] font-semibold'
    },
    {
      theme: 'light',
      isToday: true,
      isSelected: false,
      className: 'text-[#ff692a] font-semibold'
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

function CalendarCellLogpresso({theme, date, ...props}: CalendarCellProps & {theme: 'dark' | 'light'}) {
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

const navButtonStyles = tv({
  base: 'flex items-center justify-center rounded-md border transition cursor-default outline-none [-webkit-tap-highlight-color:transparent]',
  variants: {
    theme: {
      dark: 'h-6 w-6 border-[#2a3340] bg-[#0e1322] text-[#ebebeb] hover:bg-[#151c33]',
      light: 'h-6 w-6 border-[#dce2ea] bg-white text-[#111827] hover:bg-[#f1f3f7]'
    }
  }
});

function NavButtonLogpresso({theme, children, ...props}: ButtonProps & {theme: 'dark' | 'light'}) {
  return (
    <Button
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        navButtonStyles({...renderProps, theme, className})
      )}>
      {children}
    </Button>
  );
}

export function CalendarLogpresso({theme = 'dark', ...props}: CalendarLogpressoProps) {
  return (
    <RACCalendar {...props} className="font-sans">
      <header className="mb-2 flex h-6 items-center justify-between">
        <NavButtonLogpresso theme={theme} slot="previous">
          <ChevronLeft aria-hidden className="h-4 w-4" />
        </NavButtonLogpresso>
        <Heading
          className={`text-xs leading-4 font-medium ${
            theme === 'dark' ? 'text-[#ebebeb]' : 'text-[#111827]'
          }`}
        />
        <NavButtonLogpresso theme={theme} slot="next">
          <ChevronRight aria-hidden className="h-4 w-4" />
        </NavButtonLogpresso>
      </header>
      <CalendarGrid className="w-full">
        <CalendarGridHeader>
          {(day) => (
            <CalendarHeaderCell
              className={`py-1 text-xs leading-4 ${
                theme === 'dark' ? 'text-[#aeb8c5]' : 'text-[#111827]/70'
              }`}>
              {day}
            </CalendarHeaderCell>
          )}
        </CalendarGridHeader>
        <CalendarGridBody className="[&_td]:p-0.5">
          {(date) => <CalendarCellLogpresso theme={theme} date={date} />}
        </CalendarGridBody>
      </CalendarGrid>
    </RACCalendar>
  );
}
