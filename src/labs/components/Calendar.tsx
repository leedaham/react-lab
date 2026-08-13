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
import {focusRing} from './utils';

const cellStyles = tv({
  extend: focusRing,
  base: 'w-full h-full flex items-center justify-center text-sm font-medium rounded-full cursor-default hover:bg-neutral-100 dark:hover:bg-neutral-800 forced-colors:outline-0 forced-colors:bg-[ButtonFace] forced-color-adjust-none',
  variants: {
    isSelectionStart: {
      true: 'bg-blue-600 text-white hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-500 forced-colors:bg-[Highlight] forced-colors:outline-0 forced-colors:text-[HighlightText]'
    },
    isSelectionEnd: {
      true: 'bg-blue-600 text-white hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-500 forced-colors:bg-[Highlight] forced-colors:outline-0 forced-colors:text-[HighlightText]'
    },
    isSelected: {
      true: 'bg-blue-600 text-white hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-500 forced-colors:bg-[Highlight] forced-colors:outline-0 forced-colors:text-[HighlightText]'
    },
    isToday: {
      true: 'ring-1 ring-inset ring-blue-600 dark:ring-blue-500 forced-colors:ring-[Highlight]'
    },
    isUnavailable: {
      true: 'text-neutral-400 dark:text-neutral-500 line-through'
    },
    isOutsideMonth: {
      true: 'text-neutral-400 dark:text-neutral-500'
    },
    isDisabled: {
      true: 'text-neutral-300 dark:text-neutral-600 forced-colors:text-[GrayText]'
    }
  }
});

export function CalendarCellInner({date, ...props}: CalendarCellProps) {
  return (
    <CalendarCell
      {...props}
      date={date}
      className={composeRenderProps(props.className, (className, renderProps) =>
        cellStyles({...renderProps, className})
      )}
    />
  );
}

const navButtonStyles = tv({
  extend: focusRing,
  base: 'w-8 h-8 grid place-items-center rounded-lg cursor-default transition hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200'
});

function NavButton({children, ...props}: ButtonProps) {
  return (
    <Button
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        navButtonStyles({...renderProps, className})
      )}>
      {children}
    </Button>
  );
}

export function Calendar(props: CalendarProps<DateValue>) {
  return (
    <RACCalendar {...props}>
      <header className="flex items-center justify-between mb-2 px-1">
        <NavButton slot="previous">
          <ChevronLeft aria-hidden className="w-5 h-5" />
        </NavButton>
        <Heading className="text-sm font-semibold text-neutral-800 dark:text-neutral-200" />
        <NavButton slot="next">
          <ChevronRight aria-hidden className="w-5 h-5" />
        </NavButton>
      </header>
      <CalendarGrid className="w-full">
        <CalendarGridHeader>
          {(day) => (
            <CalendarHeaderCell className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              {day}
            </CalendarHeaderCell>
          )}
        </CalendarGridHeader>
        <CalendarGridBody>
          {(date) => <CalendarCellInner date={date} />}
        </CalendarGridBody>
      </CalendarGrid>
    </RACCalendar>
  );
}
