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

export interface DateInputLogpressoProps extends Omit<DateInputProps, 'children'> {
  /** @default 'medium' */
  size?: 'small' | 'medium';
  /** @default 'dark' */
  theme?: 'dark' | 'light';
}

const segmentStyles = tv({
  base: 'box-border rounded-sm p-0.5 text-center tabular-nums caret-transparent outline-0 [-webkit-tap-highlight-color:transparent]',
  variants: {
    theme: {
      dark: '',
      light: ''
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
      isPlaceholder: false,
      isDisabled: false,
      className: 'text-[#f2f5f8]'
    },
    {
      theme: 'dark',
      isPlaceholder: true,
      isDisabled: false,
      className: 'text-[#778293]'
    },
    {
      theme: 'dark',
      isDisabled: true,
      className: 'text-[#778293]'
    },
    {
      theme: 'light',
      isPlaceholder: false,
      isDisabled: false,
      className: 'text-[#111827]'
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

export function DateSegmentLogpresso({
  theme,
  segment,
  ...props
}: DateSegmentProps & {theme: 'dark' | 'light'}) {
  return (
    <RACDateSegment
      {...props}
      segment={segment}
      className={composeRenderProps(props.className, (className, renderProps) =>
        segmentStyles({...renderProps, theme, className})
      )}
    />
  );
}

const inputStyles = tv({
  base: 'inline-flex items-center overflow-hidden rounded-lg border transition outline-none [-webkit-tap-highlight-color:transparent]',
  variants: {
    size: {
      small: 'h-6 text-xs leading-4',
      medium: 'h-[30px] text-sm leading-5'
    },
    isFocusWithin: {
      true: '',
      false: ''
    },
    isHovered: {
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
    },
    theme: {
      dark: '',
      light: ''
    }
  },
  compoundVariants: [
    {
      theme: 'dark',
      isFocusWithin: false,
      isDisabled: false,
      isInvalid: false,
      className: 'border-[#2a3340] bg-[#0e1322]'
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
      className: 'border-[#dce2ea] bg-white'
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

export function DateInputLogpresso({size = 'medium', theme = 'dark', ...props}: DateInputLogpressoProps) {
  return (
    <RACDateInput
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        inputStyles({...renderProps, size, theme, className})
      )}>
      {(segment) => <DateSegmentLogpresso theme={theme} segment={segment} />}
    </RACDateInput>
  );
}

export interface TimeFieldLogpressoProps<T extends TimeValue> extends TimeFieldProps<T> {
  /** @default 'dark' */
  theme?: 'dark' | 'light';
}

export function TimeFieldLogpresso<T extends TimeValue>({
  theme = 'dark',
  ...props
}: TimeFieldLogpressoProps<T>) {
  return (
    <RACTimeField {...props}>
      <DateInputLogpresso theme={theme} />
    </RACTimeField>
  );
}
