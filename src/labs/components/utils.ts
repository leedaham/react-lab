import {useEffect, useState} from 'react';
import {composeRenderProps} from 'react-aria-components/composeRenderProps';
import {twMerge} from 'tailwind-merge';
import {tv} from 'tailwind-variants';

export type LogpressoTheme = 'dark' | 'light';

function readTheme(): LogpressoTheme {
  return typeof document !== 'undefined' &&
    document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'dark'
    : 'light';
}

/**
 * `<html data-theme="dark">` 값을 읽어 dark/light를 판단한다.
 * data-theme 속성이 변경되면 MutationObserver가 감지해 re-render한다.
 */
export function useLogpressoTheme(): LogpressoTheme {
  const [theme, setTheme] = useState<LogpressoTheme>(readTheme);

  useEffect(() => {
    const el = document.documentElement;
    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(el, {attributes: true, attributeFilter: ['data-theme']});
    setTheme(readTheme());
    return () => observer.disconnect();
  }, []);

  return theme;
}

export const focusRing = tv({
  base: 'outline outline-blue-600 dark:outline-blue-500 forced-colors:outline-[Highlight] outline-offset-2',
  variants: {
    isFocusVisible: {
      false: 'outline-0',
      true: 'outline-2'
    }
  }
});

export function composeTailwindRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tw: string
): string | ((v: T) => string) {
  return composeRenderProps(className, className => twMerge(tw, className));
}
