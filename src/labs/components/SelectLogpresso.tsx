import {ChevronDown} from 'lucide-react';
import type React from 'react';
import {
  Select as AriaSelect,
  Button,
  ListBox,
  ListBoxItem,
  type ListBoxItemProps,
  SelectValue,
  type SelectProps as AriaSelectProps
} from 'react-aria-components/Select';
import {Popover as AriaPopover} from 'react-aria-components/Popover';
import {Label} from 'react-aria-components/Label';
import {FieldError} from 'react-aria-components/FieldError';
import {composeRenderProps} from 'react-aria-components/composeRenderProps';
import {tv} from 'tailwind-variants';
import {focusRing} from './utils';

export interface SelectLogpressoOption {
  id: string;
  name: string;
}

export interface SelectLogpressoProps extends Omit<
  AriaSelectProps<SelectLogpressoOption>,
  'children' | 'items' | 'label' | 'description' | 'errorMessage'
> {
  /** @default 'dark' */
  theme?: 'dark' | 'light';
  /** @default 'medium' */
  size?: 'small' | 'medium';
  label?: string;
  items: SelectLogpressoOption[];
  errorMessage?: string;
  /** 로딩 스피너 표시 (SelectLogpresso 전용) */
  isPending?: boolean;
}

const triggerStyles = tv({
  extend: focusRing,
  base: 'flex items-center gap-2 w-full text-start font-sans cursor-default border rounded-lg transition outline-none px-3 [-webkit-tap-highlight-color:transparent]',
  variants: {
    size: {
      small: 'h-6 pl-2.5 pr-2 text-xs leading-4',
      medium: 'h-[30px] pl-3 pr-2 text-sm leading-5'
    },
    theme: {
      dark: 'bg-[#0e1322] border-[#2a3340] text-[#f2f5f8]',
      light: 'bg-white border-[#dce2ea] text-[#111827]'
    },
    isHovered: {
      true: ''
    },
    isPressed: {
      true: ''
    },
    isFocused: {
      true: ''
    },
    isInvalid: {
      true: ''
    },
    isDisabled: {
      true: ''
    }
  },
  compoundVariants: [
    {
      theme: 'dark',
      isHovered: true,
      className: 'bg-[#151c33] border-[#3a4554]'
    },
    {
      theme: 'light',
      isHovered: true,
      className: 'bg-[#f1f3f7] border-[#dce2ea]'
    },
    {
      theme: 'dark',
      isPressed: true,
      className: 'bg-[#151c33]'
    },
    {
      theme: 'light',
      isPressed: true,
      className: 'bg-[#f1f3f7]'
    },
    {
      theme: 'dark',
      isFocused: true,
      className: 'border-[#4c8dff]'
    },
    {
      theme: 'light',
      isFocused: true,
      className: 'border-[#2563eb]'
    },
    {
      theme: 'dark',
      isInvalid: true,
      className: 'border-[#ff454d]'
    },
    {
      theme: 'light',
      isInvalid: true,
      className: 'border-[#d50000]'
    },
    {
      theme: 'dark',
      isDisabled: true,
      className: 'bg-[#111720] border-[#2a3340] text-[#778293]'
    },
    {
      theme: 'light',
      isDisabled: true,
      className: 'bg-[#f1f3f7] border-[#dce2ea] text-[#dce2ea]'
    }
  ]
});

const itemStyles = tv({
  extend: focusRing,
  base: 'group relative flex items-center gap-3 cursor-default select-none py-2 pl-3 pr-2 rounded-lg text-sm forced-color-adjust-none outline-none [-webkit-tap-highlight-color:transparent]',
  variants: {
    theme: {
      dark: 'text-[#f2f5f8]',
      light: 'text-[#111827]'
    },
    isSelected: {
      true: 'font-semibold'
    }
  },
  compoundVariants: [
    {
      theme: 'dark',
      isFocused: true,
      className: 'bg-[#0e1322]'
    },
    {
      theme: 'light',
      isFocused: true,
      className: 'bg-[#f1f3f7]'
    },
    {
      theme: 'dark',
      isSelected: true,
      className: 'bg-[#151c33]'
    },
    {
      theme: 'light',
      isSelected: true,
      className: 'bg-[#f1f3f7]'
    },
    {
      theme: 'dark',
      isDisabled: true,
      className: 'text-[#778293]'
    },
    {
      theme: 'light',
      isDisabled: true,
      className: 'text-[#dce2ea]'
    }
  ]
});

function SelectItem({
  theme,
  className,
  children,
  ...props
}: ListBoxItemProps & {theme: 'dark' | 'light'}) {
  let textValue = props.textValue || (typeof children === 'string' ? children : undefined);
  return (
    <ListBoxItem
      {...props}
      textValue={textValue}
      className={composeRenderProps(className, (className, renderProps) =>
        itemStyles({...renderProps, theme, className})
      )}>
      {composeRenderProps(children, (children, {isSelected}) => (
        <>
          <span className="flex-1 truncate">{children}</span>
          <span className="flex w-4 shrink-0 items-center justify-center">
            {isSelected && (
              <svg
                aria-hidden
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill={theme === 'dark' ? '#ff7a00' : '#ff692a'}>
                <path d="M9.55 18l-5.7-5.7 1.4-1.4 4.3 4.3 9.2-9.2 1.4 1.4z" />
              </svg>
            )}
          </span>
        </>
      ))}
    </ListBoxItem>
  );
}

function SelectTrigger({
  theme,
  size,
  placeholder,
  isPending
}: {
  theme: 'dark' | 'light';
  size: 'small' | 'medium';
  placeholder: string;
  isPending?: boolean;
}) {
  return (
    <Button
      className={(renderProps) =>
        triggerStyles({...renderProps, size, theme, className: undefined})
      }>
      <SelectValue className="flex-1 truncate">
        {({selectedText}) => (
          <span
            className={
              selectedText
                ? undefined
                : theme === 'dark'
                  ? 'text-[#778293]'
                  : 'text-[#111827]/60'
            }>
            {selectedText || placeholder}
          </span>
        )}
      </SelectValue>
      {isPending ? (
        <svg aria-hidden className="h-4 w-4 shrink-0 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="10"
            strokeWidth="4"
            stroke={theme === 'dark' ? '#aeb8c5' : '#111827'}
            className="opacity-25"
          />
          <path
            d="M22 12a10 10 0 0 0-10-10"
            stroke={theme === 'dark' ? '#aeb8c5' : '#111827'}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      ) : (
        <ChevronDown
          aria-hidden
          className="h-4 w-4 shrink-0"
          style={{color: theme === 'dark' ? '#aeb8c5' : '#111827'}}
        />
      )}
    </Button>
  );
}

function SelectPopover({theme, children}: {theme: 'dark' | 'light'; children: React.ReactNode}) {
  return (
    <AriaPopover
      offset={4}
      className={`min-w-(--trigger-width) rounded-xl border shadow-[0_8px_24px_rgba(0,0,0,0.4)] ${
        theme === 'dark'
          ? 'border-[#2a3340] bg-[#171c24]'
          : 'border-[#dce2ea] bg-white shadow-[0_8px_24px_rgba(17,24,39,0.12)]'
      }`}>
      {children}
    </AriaPopover>
  );
}

export function SelectLogpresso({
  theme = 'dark',
  size = 'medium',
  label,
  placeholder = '선택하세요',
  items,
  errorMessage,
  ...props
}: SelectLogpressoProps) {
  return (
    <AriaSelect
      {...props}
      className="group flex flex-col gap-1 relative">
      {label && (
        <Label
          className={`w-fit cursor-default font-sans text-sm font-medium ${
            theme === 'dark' ? 'text-[#ebebeb]' : 'text-[#111827]'
          }`}>
          {label}
        </Label>
      )}
      <SelectTrigger theme={theme} size={size} placeholder={placeholder} isPending={props.isPending} />
      <SelectPopover theme={theme}>
        <ListBox
          items={items}
          className="max-h-[inherit] overflow-auto p-1 outline-hidden [clip-path:inset(0_0_0_0_round_.75rem)]">
          {(item: SelectLogpressoOption) => (
            <SelectItem theme={theme} id={item.id}>
              {item.name}
            </SelectItem>
          )}
        </ListBox>
      </SelectPopover>
      {errorMessage && (
        <FieldError
          className={`text-xs ${theme === 'dark' ? 'text-[#ff454d]' : 'text-[#d50000]'}`}>
          {errorMessage}
        </FieldError>
      )}
    </AriaSelect>
  );
}
