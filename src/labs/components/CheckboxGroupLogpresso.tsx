import type React from 'react';
import {
  CheckboxGroup as RACCheckboxGroup,
  type CheckboxGroupProps as RACCheckboxGroupProps
} from 'react-aria-components/CheckboxGroup';
import {composeRenderProps} from 'react-aria-components/composeRenderProps';
import {Label} from 'react-aria-components/Label';
import {twMerge} from 'tailwind-merge';

export interface CheckboxGroupLogpressoProps extends Omit<RACCheckboxGroupProps, 'children'> {
  /** @default 'dark' */
  theme?: 'dark' | 'light';
  label?: string;
  children?: React.ReactNode;
}

export function CheckboxGroupLogpresso({
  theme = 'dark',
  label,
  children,
  ...props
}: CheckboxGroupLogpressoProps) {
  return (
    <RACCheckboxGroup
      {...props}
      className={composeRenderProps(props.className, (className) =>
        twMerge('flex flex-col gap-2 font-sans', className)
      )}>
      {label && (
        <Label
          className={`w-fit cursor-default text-sm font-medium ${
            theme === 'dark' ? 'text-[#ebebeb]' : 'text-[#111827]'
          }`}>
          {label}
        </Label>
      )}
      {children}
    </RACCheckboxGroup>
  );
}
