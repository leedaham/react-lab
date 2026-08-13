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
import {focusRing} from './utils';

export interface CheckboxProps extends Omit<CheckboxFieldProps, 'children'> {
  /** @default 'medium' */
  size?: 'medium' | 'small';
  children?: React.ReactNode;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

const labelStyles = tv({
  base: 'group flex items-center gap-2 font-sans text-sm transition relative cursor-default [-webkit-tap-highlight-color:transparent]',
  variants: {
    isDisabled: {
      false: 'text-neutral-800 dark:text-neutral-200',
      true: 'text-neutral-300 dark:text-neutral-600 forced-colors:text-[GrayText]'
    }
  }
});

const boxStyles = tv({
  extend: focusRing,
  base: 'box-border shrink-0 flex items-center justify-center rounded-sm border transition',
  variants: {
    size: {
      medium: 'w-4.5 h-4.5',
      small: 'w-4 h-4'
    },
    isSelected: {
      false:
        'bg-white dark:bg-neutral-900 border-neutral-400 dark:border-neutral-400 group-pressed:border-neutral-500 dark:group-pressed:border-neutral-300',
      true: 'bg-neutral-700 border-neutral-700 group-pressed:bg-neutral-800 group-pressed:border-neutral-800 dark:bg-neutral-300 dark:border-neutral-300 dark:group-pressed:bg-neutral-200 dark:group-pressed:border-neutral-200 forced-colors:bg-[Highlight] forced-colors:border-[Highlight]'
    },
    isInvalid: {
      true: 'border-red-700 group-pressed:border-red-800 dark:border-red-600 dark:group-pressed:border-red-700 forced-colors:border-[Mark]'
    },
    isDisabled: {
      true: 'border-neutral-200 dark:border-neutral-700 forced-colors:border-[GrayText]'
    }
  }
});

const iconStyles = tv({
  base: 'text-white dark:text-neutral-900 group-disabled:text-neutral-400 dark:group-disabled:text-neutral-600 forced-colors:text-[HighlightText] pointer-events-none',
  variants: {
    size: {
      medium: 'w-3.5 h-3.5',
      small: 'w-3 h-3'
    }
  }
});

export function Checkbox({
  size = 'medium',
  children,
  description,
  errorMessage,
  className,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxField {...props} className="group flex flex-col gap-1">
      <CheckboxButton
        className={composeRenderProps(className, (className, renderProps) =>
          labelStyles({...renderProps, className})
        )}>
        {composeRenderProps(
          children,
          (children, {isSelected, isIndeterminate, ...renderProps}) => (
            <>
              <div
                className={boxStyles({
                  size,
                  isSelected: isSelected || isIndeterminate,
                  ...renderProps
                })}>
                {isIndeterminate ? (
                  <Minus aria-hidden className={iconStyles({size})} />
                ) : isSelected ? (
                  <Check aria-hidden className={iconStyles({size})} />
                ) : null}
              </div>
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
