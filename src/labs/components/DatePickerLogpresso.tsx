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
import {DateInputLogpresso, TimeFieldLogpresso} from './DateInputLogpresso';
import {Popover as AriaPopover} from 'react-aria-components/Popover';
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
              className={`flex items-center overflow-hidden rounded-lg border pr-1.5 transition ${
                size === 'small' ? 'h-6 pl-1.5' : 'h-[30px] pl-2'
              } ${theme === 'dark' ? 'gap-1' : 'gap-1'}`}>
              <DateInputLogpresso size={size} theme={theme} className="flex-1" />
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
              <div
                className={`mt-2 border-t pt-2 ${
                  theme === 'dark' ? 'border-[#2a3340]' : 'border-[#dce2ea]'
                }`}>
                <TimeFieldLogpresso
                  theme={theme}
                  aria-label="시간"
                  value={state.timeValue}
                  onChange={(time) => time && state.setTimeValue(time)}
                  granularity="minute"
                />
              </div>
            )}
          </AriaPopover>
        </>
      )}
    </AriaDatePicker>
  );
}
