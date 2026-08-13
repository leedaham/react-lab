import {CalendarIcon} from 'lucide-react';
import {
  DatePicker as AriaDatePicker,
  type DatePickerProps as AriaDatePickerProps,
  type DateValue,
  type ValidationResult
} from 'react-aria-components/DatePicker';
import {Button} from 'react-aria-components/Button';
import {Group} from 'react-aria-components/Group';
import {tv} from 'tailwind-variants';
import {Calendar} from './Calendar';
import {DateInput} from './DateField';
import {Description, FieldError, Label} from './Field';
import {Popover} from './Popover';
import {TimeSelect} from './TimeSelect';
import {composeTailwindRenderProps, focusRing} from './utils';

export interface DatePickerProps<T extends DateValue> extends Omit<AriaDatePickerProps<T>, 'children'> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

const buttonStyles = tv({
  extend: focusRing,
  base: 'flex items-center justify-center w-8 h-8 rounded-lg mx-1 cursor-default transition text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
});

export function DatePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  ...props
}: DatePickerProps<T>) {
  return (
    <AriaDatePicker
      {...props}
      className={composeTailwindRenderProps(props.className, 'group flex flex-col gap-1 font-sans')}>
      {({state}) => (
        <>
          {label && <Label>{label}</Label>}
          <Group className="flex items-center rounded-lg bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 hover:border-neutral-400 dark:hover:border-neutral-500 focus-within:border-blue-600 dark:focus-within:border-blue-500 transition h-9 overflow-hidden group-disabled:bg-neutral-100 dark:group-disabled:bg-neutral-800 group-disabled:border-transparent">
            <DateInput className="flex-1 min-w-[150px] px-3 text-sm" />
            <Button
              className={(renderProps) => buttonStyles({...renderProps, className: undefined})}>
              <CalendarIcon aria-hidden className="w-4 h-4" />
            </Button>
          </Group>
          {description && <Description>{description}</Description>}
          <FieldError>{errorMessage}</FieldError>
          <Popover className="p-2">
            <Calendar />
            {state.hasTime && (
              <div className="mt-2 border-t border-black/10 dark:border-white/10 pt-2">
                <TimeSelect
                  value={state.timeValue}
                  onChange={(time) => state.setTimeValue(time)}
                  hourCycle={props.hourCycle ?? 24}
                />
              </div>
            )}
          </Popover>
        </>
      )}
    </AriaDatePicker>
  );
}
