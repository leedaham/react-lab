import {Sun, Moon} from 'lucide-react';
import {useLogpressoTheme, type LogpressoTheme} from './utils';

export interface ThemeToggleProps {
  /** 토글할 테마 값 (기본 dark/light) */
  themes?: LogpressoTheme[];
}

const buttonBase =
  'flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition outline-none';

function themeLabel(theme: LogpressoTheme) {
  if (theme === 'dark') {
    return (
      <>
        <Moon aria-hidden className="h-3.5 w-3.5" />
        다크
      </>
    );
  }
  return (
    <>
      <Sun aria-hidden className="h-3.5 w-3.5" />
      라이트
    </>
  );
}

export function ThemeToggle({themes = ['dark', 'light']}: ThemeToggleProps) {
  const theme = useLogpressoTheme();

  return (
    <div className="inline-flex items-center gap-0.5 rounded-lg border border-[#2a3340] bg-[#0e1322] p-0.5">
      {themes.map((value) => {
        const isActive = theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={isActive}
            onClick={() => document.documentElement.setAttribute('data-theme', value)}
            className={`${buttonBase} ${
              isActive
                ? 'bg-[#151c33] text-[#ebebeb] shadow-sm'
                : 'text-[#778293] hover:bg-[#111720] hover:text-[#aeb8c5]'
            }`}>
            {themeLabel(value)}
          </button>
        );
      })}
    </div>
  );
}