import {Check, ChevronDown, ChevronRight, Minus} from 'lucide-react';
import type React from 'react';
import {Children, useContext, useEffect, useRef} from 'react';
import {
  Tree as AriaTree,
  TreeItem as AriaTreeItem,
  TreeItemContent,
  Button,
  Checkbox,
  TreeStateContext,
  type TreeProps as AriaTreeProps,
  type TreeItemProps as AriaTreeItemProps
} from 'react-aria-components/Tree';
import {composeRenderProps} from 'react-aria-components/composeRenderProps';
import {tv} from 'tailwind-variants';
import {composeTailwindRenderProps, focusRing, useLogpressoTheme} from './utils';

export interface AutoTreeLogpressoProps extends Omit<AriaTreeProps<object>, 'children'> {
  children?: React.ReactNode;
}

export interface AutoTreeItemLogpressoProps
  extends Omit<AriaTreeItemProps, 'children' | 'textValue'> {
  /** 행에 표시할 라벨 텍스트 (typeahead용 textValue로도 사용됨) */
  label: string;
  /** 노드 앞에 표시할 아이콘 */
  icon?: React.ReactNode;
  /** 중첩 자식 AutoTreeItemLogpresso */
  children?: React.ReactNode;
  /** 자식이 추가되면 자동으로 펼칠지 여부 */
  autoExpand?: boolean;
}

const treeStyles = tv({
  extend: focusRing,
  base: 'flex flex-col overflow-y-auto rounded-lg border font-sans outline-none [-webkit-tap-highlight-color:transparent]',
  variants: {
    theme: {
      dark: 'border-[#2a3340] bg-[#0e1322] text-[#f2f5f8]',
      light: 'border-[#dce2ea] bg-white text-[#111827]'
    },
    isFocused: {
      true: ''
    }
  },
  compoundVariants: [
    {
      theme: 'dark',
      isFocused: true,
      className: 'border-[#4c8dff]'
    },
    {
      theme: 'light',
      isFocused: true,
      className: 'border-[#2563eb]'
    }
  ]
});

const itemStyles = tv({
  base: 'flex min-w-full items-center gap-1.5 cursor-default select-none py-1.5 pr-2 outline-none forced-color-adjust-none',
  variants: {
    theme: {
      dark: 'text-[#f2f5f8]',
      light: 'text-[#111827]'
    },
    isSelected: {
      true: 'font-semibold'
    },
    isHovered: {
      true: ''
    },
    isFocused: {
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
      className: 'bg-[#151c33]'
    },
    {
      theme: 'light',
      isHovered: true,
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

const chevronStyles = tv({
  base: 'flex h-4 w-4 shrink-0 items-center justify-center rounded outline-none transition [-webkit-tap-highlight-color:transparent]',
  variants: {
    theme: {
      dark: 'text-[#778293]',
      light: 'text-[#aeb8c5]'
    },
    isHovered: {
      true: ''
    }
  },
  compoundVariants: [
    {
      theme: 'dark',
      isHovered: true,
      className: 'text-[#aeb8c5]'
    },
    {
      theme: 'light',
      isHovered: true,
      className: 'text-[#111827]'
    }
  ]
});

const boxStyles = tv({
  base: 'flex shrink-0 items-center justify-center rounded-[4px] border transition',
  variants: {
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

function TreeRow({
  theme,
  label,
  icon,
  className
}: {
  theme: 'dark' | 'light';
  label: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <TreeItemContent>
      {({isExpanded, hasChildItems, level, isSelected, isHovered, isDisabled}) => (
        <div
          className={itemStyles({theme, isSelected, isHovered, isDisabled})}
          style={{paddingLeft: (level - 1) * 16}}>
          {hasChildItems ? (
            <Button
              slot="chevron"
              className={composeRenderProps(className, (className, {isHovered}) =>
                chevronStyles({theme, isHovered, className})
              )}>
              {isExpanded ? (
                <ChevronDown aria-hidden className="h-3.5 w-3.5" />
              ) : (
                <ChevronRight aria-hidden className="h-3.5 w-3.5" />
              )}
            </Button>
          ) : (
            <span aria-hidden className="h-4 w-4 shrink-0" />
          )}
          <Checkbox slot="selection" className="flex shrink-0">
            {({isSelected: isChecked, isIndeterminate, isHovered, isDisabled: isCheckDisabled}) => (
              <span
                className={boxStyles({
                  theme,
                  isChecked: isChecked || isIndeterminate,
                  isHovered,
                  isDisabled: isCheckDisabled
                })}>
                {isIndeterminate ? (
                  <Minus aria-hidden className="h-3 w-3" />
                ) : isChecked ? (
                  <Check aria-hidden className="h-3 w-3" />
                ) : null}
              </span>
            )}
          </Checkbox>
          {icon && <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
          <span className="truncate text-sm leading-5">{label}</span>
        </div>
      )}
    </TreeItemContent>
  );
}

export function AutoTreeLogpresso({className, children, ...props}: AutoTreeLogpressoProps) {
  const theme = useLogpressoTheme();
  return (
    <AriaTree
      {...props}
      className={composeRenderProps(className, (className, {isFocused}) =>
        treeStyles({theme, isFocused, className})
      )}>
      {children}
    </AriaTree>
  );
}

export function AutoTreeItemLogpresso({
  label,
  icon,
  children,
  className,
  autoExpand = true,
  ...props
}: AutoTreeItemLogpressoProps) {
  const theme = useLogpressoTheme();
  const state = useContext(TreeStateContext);
  const childCount = Children.count(children);
  const prevChildCountRef = useRef(childCount);

  useEffect(() => {
    const id = props.id;
    if (
      autoExpand &&
      id != null &&
      state &&
      !state.expandedKeys.has(id) &&
      prevChildCountRef.current === 0 &&
      childCount > 0
    ) {
      state.toggleKey(id);
    }
    prevChildCountRef.current = childCount;
  }, [autoExpand, childCount, props.id, state]);

  const hasChildItems = props.hasChildItems ?? (autoExpand && childCount === 0 ? true : undefined);

  return (
    <AriaTreeItem
      {...props}
      hasChildItems={hasChildItems}
      textValue={label}
      className={composeTailwindRenderProps(className, 'outline-none')}>
      <TreeRow theme={theme} label={label} icon={icon} />
      {children}
    </AriaTreeItem>
  );
}
