import type React from 'react';
import {
  CheckboxGroup as RACCheckboxGroup,
  type CheckboxGroupProps as RACCheckboxGroupProps
} from 'react-aria-components/CheckboxGroup';
import {composeRenderProps} from 'react-aria-components/composeRenderProps';
import {Label} from 'react-aria-components/Label';
import {twMerge} from 'tailwind-merge';
import {useLogpressoTheme} from './utils';

export interface CheckboxGroupLogpressoProps extends Omit<RACCheckboxGroupProps, 'children'> {
  label?: string;
  children?: React.ReactNode;
}

export function CheckboxGroupLogpresso({label, children, ...props}: CheckboxGroupLogpressoProps) {
  const theme = useLogpressoTheme();
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
