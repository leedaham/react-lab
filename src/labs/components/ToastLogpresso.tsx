import {createContext, useContext, useRef, useState} from 'react';
import {useToast, useToastRegion} from '@react-aria/toast';
import {ToastQueue, useToastQueue} from '@react-stately/toast';
import type {QueuedToast, ToastState} from '@react-stately/toast';
import {Button as RACButton} from 'react-aria-components/Button';
import {tv} from 'tailwind-variants';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  Settings2,
  Bell,
  X,
  type LucideIcon
} from 'lucide-react';

export type ToastLogpressoState = 'error' | 'warning' | 'success' | 'info' | 'system' | 'neutral';

export interface ToastLogpressoContent {
  title: string;
  message: string;
  state?: ToastLogpressoState;
}

export interface ToastLogpressoProviderProps {
  children: React.ReactNode;
}

export interface ToastLogpressoProps {
  toast: QueuedToast<ToastLogpressoContent>;
  state: ToastState<ToastLogpressoContent>;
}

const ToastQueueContext = createContext<ToastQueue<ToastLogpressoContent> | null>(null);

export function ToastLogpressoProvider({children}: ToastLogpressoProviderProps) {
  const [queue] = useState(() => new ToastQueue<ToastLogpressoContent>());
  return <ToastQueueContext.Provider value={queue}>{children}</ToastQueueContext.Provider>;
}

export function useToastLogpressoQueue() {
  const queue = useContext(ToastQueueContext);
  if (!queue) {
    throw new Error('useToastLogpressoQueue는 ToastLogpressoProvider 내부에서 사용해야 합니다.');
  }
  return queue;
}

export function useToastLogpressoState() {
  const queue = useToastLogpressoQueue();
  return useToastQueue(queue);
}

const shell = tv({
  base: [
    'flex items-center',
    'w-[600px] h-[64px]',
    'px-4 py-2',
    'gap-4',
    'rounded-lg',
    'shadow-[0_1px_2px_rgba(0,0,0,0.06),0_2px_3px_rgba(0,0,0,0.10)]',
    'border',
    'font-sans'
  ],
  variants: {
    state: {
      error: 'bg-[#ffebef] border-[#d50000] text-[#191919]',
      warning: 'bg-[#fff8e4] border-[#ffca48] text-[#191919]',
      success: 'bg-[#e3f2ff] border-[#00cc88] text-[#191919]',
      info: 'bg-[#e3f2ff] border-[#36a4ff] text-[#191919]',
      system: 'bg-[#f2e9ff] border-[#915cff] text-[#191919]',
      neutral: 'bg-[#070b13] border-[rgba(126,140,222,0.16)] text-[#ebebeb]'
    }
  },
  defaultVariants: {
    state: 'info'
  }
});

const iconColor: Record<ToastLogpressoState, string> = {
  error: '#d50000',
  warning: '#ffca48',
  success: '#00cc88',
  info: '#36a4ff',
  system: '#915cff',
  neutral: '#ebebeb'
};

const leadingIcon: Record<ToastLogpressoState, LucideIcon> = {
  error: AlertCircle,
  warning: AlertTriangle,
  success: CheckCircle2,
  info: Info,
  system: Settings2,
  neutral: Bell
};

export function ToastLogpresso({toast, state}: ToastLogpressoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const {toastProps, contentProps, titleProps, descriptionProps, closeButtonProps} = useToast(
    {toast},
    state,
    ref
  );

  const content = toast.content;
  const stateType = content.state ?? 'info';
  const LeadingIcon = leadingIcon[stateType];
  const iconFill = iconColor[stateType];
  const isNeutral = stateType === 'neutral';

  return (
    <div {...toastProps} ref={ref} className={shell({state: stateType})}>
      <LeadingIcon size={16} color={iconFill} aria-hidden="true" />
      <div {...contentProps} className="flex flex-1 flex-col gap-2 overflow-hidden">
        <div {...titleProps} className="truncate text-sm font-normal leading-5">
          {content.title}
        </div>
        <div {...descriptionProps} className="truncate text-sm font-normal leading-5">
          {content.message}
        </div>
      </div>
      <RACButton
        {...closeButtonProps}
        className={[
          'flex h-6 w-6 shrink-0 items-center justify-center',
          'rounded-full',
          'bg-transparent',
          'outline-none',
          'transition-opacity',
          'opacity-80 hover:opacity-100',
          'focus-visible:ring-2 focus-visible:ring-blue-500',
          isNeutral ? 'focus-visible:ring-white/50' : ''
        ].join(' ')}>
        <X size={16} color={iconFill} aria-hidden="true" />
      </RACButton>
    </div>
  );
}

export function ToastLogpressoRegion() {
  const state = useToastLogpressoState();
  const regionRef = useRef<HTMLDivElement>(null);
  const {regionProps} = useToastRegion({
    'aria-label': '알림'
  }, state, regionRef);

  return (
    <div
      ref={regionRef}
      {...regionProps}
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {state.visibleToasts.map((toast) => (
        <ToastLogpresso key={toast.key} toast={toast} state={state} />
      ))}
    </div>
  );
}
