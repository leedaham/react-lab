import {composeRenderProps} from 'react-aria-components/composeRenderProps';
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps
} from 'react-aria-components/Button';
import {tv} from 'tailwind-variants';
import {focusRing} from './utils';

export interface LogpressoButtonProps extends RACButtonProps {
  /** @default 'primary' */
  variant?: 'default' | 'primary' | 'text' | 'danger';
  /** @default 'medium' */
  size?: 'large' | 'medium' | 'small' | 'xsmall';
  /** @default false */
  hasDropdown?: boolean;
}

let button = tv({
  extend: focusRing,
  base: 'relative inline-flex items-center justify-center whitespace-nowrap border font-medium text-center select-none rounded-lg cursor-default disabled:pointer-events-none [-webkit-tap-highlight-color:transparent]',
  variants: {
    size: {
      large: 'h-[42px] px-[17px] py-[11px] gap-2 rounded-lg text-sm leading-5',
      medium: 'h-[30px] px-[13px] py-[5px] gap-2 rounded-lg text-sm leading-5',
      small: 'h-6 px-[9px] py-[3px] gap-1 rounded-lg text-xs leading-4',
      xsmall: 'h-5 px-[7px] py-px gap-1 rounded-md text-xs leading-4'
    },
    variant: {
      default:
        'bg-[#0e1322] border-[#151c33] text-[#ffffff] hover:bg-[#151c33] hover:border-[#1d2544] hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)] pressed:bg-[#1d2544] pressed:border-[#ff692a] disabled:bg-[#070b13] disabled:border-[#151c33] disabled:text-[#808080]',
      primary:
        'bg-[#ff692a] border-[#ff692a] text-[#ffffff] hover:bg-[#f46226] hover:border-[#f46226] hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)] pressed:bg-[#e65b22] pressed:border-[#e65b22] disabled:bg-[#bf4716] disabled:border-[#d8541e] disabled:text-[#808080]',
      text: 'bg-transparent border-transparent text-[#ebebeb] hover:bg-[#0e1322] hover:border-[#0e1322] hover:text-[#ffffff] pressed:bg-[#151c33] pressed:border-[#151c33] pressed:text-[#ffffff] disabled:bg-transparent disabled:border-transparent disabled:text-[#808080]',
      danger:
        'bg-[#f71c32] border-[#f71c32] text-[#ffffff] hover:bg-[#e4062c] hover:border-[#e4062c] hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)] pressed:bg-[#d80024] pressed:border-[#d80024] disabled:bg-[#c80017] disabled:border-[#d80024] disabled:text-[#808080]'
    },
    isPending: {
      true: 'text-transparent'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium'
  }
});

const contentStroke = (variant?: LogpressoButtonProps['variant']) =>
  variant === 'text' ? '#ebebeb' : '#ffffff';

function DropdownIndicator() {
  return (
    <svg aria-hidden className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 10l5 5 5-5z" />
    </svg>
  );
}

export function LogpressoButton({
  variant,
  size,
  hasDropdown,
  children,
  ...props
}: LogpressoButtonProps) {
  const stroke = contentStroke(variant);
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({...renderProps, variant, size, className})
      )}>
      {composeRenderProps(children, (children) => (
        <>
          {children}
          {hasDropdown && !props.isPending && <DropdownIndicator />}
          {props.isPending && (
            <span aria-hidden className="flex absolute inset-0 justify-center items-center">
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                stroke={stroke}>
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="4"
                  fill="none"
                  className="opacity-25"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  pathLength="100"
                  strokeDasharray="60 140"
                  strokeDashoffset="0"
                />
              </svg>
            </span>
          )}
        </>
      ))}
    </RACButton>
  );
}
