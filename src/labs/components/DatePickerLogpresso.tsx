import {CalendarIcon} from 'lucide-react';
import {
  DatePicker as AriaDatePicker,
  type DatePickerProps as AriaDatePickerProps,
  type DateValue
} from 'react-aria-components/DatePicker';
import {Button} from 'react-aria-components/Button';
import {Group} from 'react-aria-components/Group';
import {Label} from 'react-aria-components/Label';
import {FieldError} from 'react-aria-components/FieldError';
import {tv} from 'tailwind-variants';
import {CalendarLogpresso} from './CalendarLogpresso';
import {DateInputLogpresso} from './DateInputLogpresso';
import {Popover as AriaPopover} from 'react-aria-components/Popover';
import {TimeSelectLogpresso} from './TimeSelectLogpresso';
import {focusRing} from './utils';

export interface DatePickerLogpressoProps
  extends Omit<AriaDatePickerProps<DateValue>, 'children' | 'label'> {
  /** @default 'dark' */
  theme?: 'dark' | 'light';
  /** @default 'medium' */
  size?: 'small' | 'medium';
  label?: string;
  errorMessage?: string;
  description?: string;
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

export function DatePickerLogpresso({
  theme = 'dark',
  size = 'medium',
  label,
  errorMessage,
  description,
  ...props
}: DatePickerLogpressoProps) {
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
              <DateInputLogpresso size={size} theme={theme} bordered={false} className="flex-1" />
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
            offset={4}
            className={`rounded-lg border shadow-[0_8px_24px_rgba(0,0,0,0.4)] p-2 ${
              theme === 'dark'
                ? 'border-[#2a3340] bg-[#171c24]'
                : 'border-[#dce2ea] bg-white shadow-[0_8px_24px_rgba(17,24,39,0.12)]'
            }`}>
            <CalendarLogpresso theme={theme} />
            {state.hasTime && (
              <div className="mt-2">
                <TimeSelectLogpresso
                  theme={theme}
                  size={size}
                  value={state.timeValue}
                  onChange={(time) => state.setTimeValue(time)}
                  hourCycle={props.hourCycle ?? 24}
                />
              </div>
            )}
          </AriaPopover>
        </>
      )}
    </AriaDatePicker>
  );
}
