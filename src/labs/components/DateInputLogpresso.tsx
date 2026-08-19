import {
  DateInput as RACDateInput,
  DateSegment as RACDateSegment,
  type DateInputProps,
  type DateSegmentProps
} from 'react-aria-components/DateField';
import {composeRenderProps} from 'react-aria-components/composeRenderProps';
import {tv} from 'tailwind-variants';
import {useLogpressoTheme} from './utils';

export interface DateInputLogpressoProps extends Omit<DateInputProps, 'children'> {
  /** @default 'medium' */
  size?: 'small' | 'medium';
  /** 표면(테두리/배경) 없이 세그먼트만 렌더링 (DatePicker 안에서 Group이 표면 담당 시 사용) @default true */
  bordered?: boolean;
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
  base: 'inline-flex items-center overflow-hidden rounded-lg transition outline-none [-webkit-tap-highlight-color:transparent]',
  variants: {
    size: {
      small: 'h-6 text-xs leading-4',
      medium: 'h-[30px] text-sm leading-5'
    },
    bordered: {
      true: '',
      false: 'bg-transparent'
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
      bordered: true,
      isFocusWithin: false,
      isDisabled: false,
      isInvalid: false,
      className: 'border border-[#2a3340] bg-[#0e1322]'
    },
    {
      theme: 'dark',
      bordered: true,
      isHovered: true,
      isDisabled: false,
      isInvalid: false,
      className: 'border-[#3a4554] bg-[#151c33]'
    },
    {
      theme: 'dark',
      bordered: true,
      isFocusWithin: true,
      isDisabled: false,
      isInvalid: false,
      className: 'border-[#4c8dff] bg-[#0e1322]'
    },
    {
      theme: 'dark',
      bordered: true,
      isInvalid: true,
      isDisabled: false,
      className: 'border-[#ff454d] bg-[#0e1322]'
    },
    {
      theme: 'dark',
      bordered: true,
      isDisabled: true,
      className: 'border-[#2a3340] bg-[#111720]'
    },
    {
      theme: 'light',
      bordered: true,
      isFocusWithin: false,
      isDisabled: false,
      isInvalid: false,
      className: 'border border-[#dce2ea] bg-white'
    },
    {
      theme: 'light',
      bordered: true,
      isHovered: true,
      isDisabled: false,
      isInvalid: false,
      className: 'border-[#c7d0dd] bg-[#f1f3f7]'
    },
    {
      theme: 'light',
      bordered: true,
      isFocusWithin: true,
      isDisabled: false,
      isInvalid: false,
      className: 'border-[#2563eb] bg-white'
    },
    {
      theme: 'light',
      bordered: true,
      isInvalid: true,
      isDisabled: false,
      className: 'border-[#d50000] bg-white'
    },
    {
      theme: 'light',
      bordered: true,
      isDisabled: true,
      className: 'border-[#dce2ea] bg-[#f1f3f7]'
    }
  ]
});

export function DateInputLogpresso({size = 'medium', bordered = true, ...props}: DateInputLogpressoProps) {
  const theme = useLogpressoTheme();
  return (
    <RACDateInput
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        inputStyles({...renderProps, size, theme, bordered, className})
      )}>
      {(segment) => <DateSegmentLogpresso theme={theme} segment={segment} />}
    </RACDateInput>
  );
}
