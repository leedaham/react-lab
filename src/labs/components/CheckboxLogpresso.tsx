import {Check, Minus} from 'lucide-react';
import type React from 'react';
import {
  CheckboxField,
  CheckboxButton,
  type CheckboxFieldProps,
  type ValidationResult
} from 'react-aria-components/Checkbox';
import {composeRenderProps} from 'react-aria-components/composeRenderProps';
import {tv} from 'tailwind-variants';
import {Description, FieldError} from './Field';
import {useLogpressoTheme} from './utils';

export interface CheckboxLogpressoProps extends Omit<CheckboxFieldProps, 'children'> {
  /** @default 'md' */
  size?: 'md' | 'sm' | 'xs';
  children?: React.ReactNode;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

const buttonStyles = tv({
  base: 'group inline-flex items-center gap-2 rounded font-sans text-sm leading-5 font-medium cursor-default select-none transition [-webkit-tap-highlight-color:transparent]',
  variants: {
    theme: {
      dark: 'text-[#ebebeb]',
      light: 'text-[#111827]'
    },
    isDisabled: {
      true: ''
    },
    isFocusVisible: {
      false: 'outline-0',
      true: 'outline-2 outline-offset-2'
    }
  },
  compoundVariants: [
    {
      theme: 'dark',
      isDisabled: true,
      className: 'text-[#778293]'
    },
    {
      theme: 'light',
      isDisabled: true,
      className: 'text-[#aeb8c5]'
    },
    {
      theme: 'dark',
      isFocusVisible: true,
      className: 'outline-[#4c8dff]'
    },
    {
      theme: 'light',
      isFocusVisible: true,
      className: 'outline-[#2563eb]'
    }
  ]
});

const boxStyles = tv({
  base: 'flex shrink-0 items-center justify-center rounded-[4px] border transition',
  variants: {
    size: {
      md: 'h-[18px] w-[18px]',
      sm: 'h-4 w-4',
      xs: 'h-3.5 w-3.5'
    },
    isChecked: {
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
    theme: {
      dark: '',
      light: ''
    }
  },
  compoundVariants: [
    {
      theme: 'dark',
      isChecked: false,
      isHovered: false,
      isDisabled: false,
      className: 'border-[#2a3340] bg-transparent'
    },
    {
      theme: 'dark',
      isChecked: false,
      isHovered: true,
      isDisabled: false,
      className: 'border-[#3a4554] bg-[#0e1322]'
    },
    {
      theme: 'dark',
      isChecked: true,
      isDisabled: false,
      className: 'border-[#ff7a00] bg-[#ff7a00] text-white'
    },
    {
      theme: 'dark',
      isDisabled: true,
      className: 'border-[#2a3340] bg-[#111720] text-[#778293]'
    },
    {
      theme: 'light',
      isChecked: false,
      isHovered: false,
      isDisabled: false,
      className: 'border-[#dce2ea] bg-white'
    },
    {
      theme: 'light',
      isChecked: false,
      isHovered: true,
      isDisabled: false,
      className: 'border-[#c7d0dd] bg-[#f1f3f7]'
    },
    {
      theme: 'light',
      isChecked: true,
      isDisabled: false,
      className: 'border-[#ff692a] bg-[#ff692a] text-white'
    },
    {
      theme: 'light',
      isDisabled: true,
      className: 'border-[#dce2ea] bg-[#f1f3f7] text-[#aeb8c5]'
    }
  ]
});

const iconStyles = tv({
  base: 'pointer-events-none',
  variants: {
    size: {
      md: 'h-3.5 w-3.5',
      sm: 'h-3 w-3',
      xs: 'h-3 w-3'
    }
  }
});

export function CheckboxLogpresso({
  size = 'md',
  children,
  description,
  errorMessage,
  className,
  ...props
}: CheckboxLogpressoProps) {
  const theme = useLogpressoTheme();
  return (
    <CheckboxField {...props} className="group flex flex-col gap-1">
      <CheckboxButton
        className={composeRenderProps(className, (className, renderProps) =>
          buttonStyles({...renderProps, theme, className})
        )}>
        {composeRenderProps(
          children,
          (children, {isSelected, isIndeterminate, isHovered, isDisabled}) => (
            <>
              <span
                className={boxStyles({
                  size,
                  theme,
                  isChecked: isSelected || isIndeterminate,
                  isHovered,
                  isDisabled
                })}>
                {isIndeterminate ? (
                  <Minus aria-hidden className={iconStyles({size})} />
                ) : isSelected ? (
                  <Check aria-hidden className={iconStyles({size})} />
                ) : null}
              </span>
              {children}
            </>
          )
        )}
      </CheckboxButton>
      {description && <Description className="ms-6.5">{description}</Description>}
      <FieldError className="ms-6.5">{errorMessage}</FieldError>
    </CheckboxField>
  );
}
