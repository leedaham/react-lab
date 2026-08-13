import type React from 'react';
import {
  CheckboxGroup as RACCheckboxGroup,
  type CheckboxGroupProps as RACCheckboxGroupProps
} from 'react-aria-components/CheckboxGroup';
import {composeRenderProps} from 'react-aria-components/composeRenderProps';
import {twMerge} from 'tailwind-merge';
import {Description, FieldError, Label} from './Field';

export interface CheckboxGroupProps extends Omit<RACCheckboxGroupProps, 'children'> {
  label?: string;
  description?: string;
  errorMessage?: string;
  children?: React.ReactNode;
}

export function CheckboxGroup({
  label,
  description,
  errorMessage,
  children,
  ...props
}: CheckboxGroupProps) {
  return (
    <RACCheckboxGroup
      {...props}
      className={composeRenderProps(props.className, (className) =>
        twMerge('group flex flex-col gap-2 font-sans', className)
      )}>
      {label && <Label>{label}</Label>}
      {children}
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </RACCheckboxGroup>
  );
}
