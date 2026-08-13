import {
  DateInput as RACDateInput,
  DateSegment as RACDateSegment,
  type DateInputProps,
  type DateSegmentProps
} from 'react-aria-components/DateField';
import {
  TimeField as RACTimeField,
  type TimeFieldProps,
  type TimeValue
} from 'react-aria-components/TimeField';
import {composeRenderProps} from 'react-aria-components/composeRenderProps';
import {tv} from 'tailwind-variants';
import {focusRing} from './utils';

const segmentStyles = tv({
  extend: focusRing,
  base: 'box-border p-0.5 rounded-sm text-center tabular-nums text-neutral-800 dark:text-neutral-200 caret-transparent forced-colors:bg-[Highlight] forced-colors:border-[Highlight] outline-0 group-aria-[invalid]:text-red-600 dark:group-aria-[invalid]:text-red-400',
  variants: {
    isPlaceholder: {
      true: 'text-neutral-400 dark:text-neutral-600'
    },
    isDisabled: {
      true: 'text-neutral-200 dark:text-neutral-600'
    }
  }
});

export function DateSegment({segment, ...props}: DateSegmentProps) {
  return (
    <RACDateSegment
      {...props}
      segment={segment}
      className={composeRenderProps(props.className, (className, renderProps) =>
        segmentStyles({...renderProps, className})
      )}
    />
  );
}

const dateInputStyles = tv({
  extend: focusRing,
  base: 'inline-flex items-center bg-white dark:bg-neutral-900 forced-colors:bg-[Field] text-neutral-800 dark:text-neutral-100 rounded-lg overflow-hidden',
  variants: {
    isFocusWithin: {
      false: 'border border-black/10 dark:border-white/10',
      true: 'border border-blue-600 dark:border-blue-500'
    },
    isDisabled: {
      true: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-300 dark:text-neutral-600 forced-colors:text-[GrayText]'
    }
  }
});

export function DateInput(props: Omit<DateInputProps, 'children'>) {
  return (
    <RACDateInput
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        dateInputStyles({...renderProps, className})
      )}>
      {(segment) => <DateSegment segment={segment} />}
    </RACDateInput>
  );
}

const timeFieldStyles = tv({
  base: 'flex flex-col gap-1'
});

export function TimeField<T extends TimeValue>(props: TimeFieldProps<T>) {
  return (
    <RACTimeField
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        timeFieldStyles({...renderProps, className})
      )}>
      <DateInput />
    </RACTimeField>
  );
}
