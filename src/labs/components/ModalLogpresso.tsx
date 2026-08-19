import type React from 'react';
import {X} from 'lucide-react';
import {composeRenderProps} from 'react-aria-components/composeRenderProps';
import {
  Dialog,
  DialogTrigger,
  Heading,
  Modal as RACModal,
  ModalOverlay,
  type DialogTriggerProps,
  type ModalOverlayProps
} from 'react-aria-components/Modal';
import {tv} from 'tailwind-variants';
import {ButtonLogpresso} from './ButtonLogpresso';
import {useLogpressoTheme} from './utils';

export interface ModalLogpressoProps extends Omit<DialogTriggerProps, 'children'> {
  /** @default '600' */
  size?: '360' | '600' | '880' | '1120';
  /** 모달 header 제목 */
  title: string;
  /** 모달 header 보조 설명 */
  caption?: string;
  /** 열기 트리거 (ButtonLogpresso 등) */
  trigger: React.ReactNode;
  /** modal body 콘텐츠 */
  children: React.ReactNode;
  /** footer를 직접 제공하지 않으면 취소/확인 기본 footer가 표시됩니다. */
  footer?: React.ReactNode;
  /** 기본 footer 취소 버튼 레이블 */
  cancelLabel?: string;
  /** 기본 footer 확인 버튼 레이블 */
  confirmLabel?: string;
  /** 확인 버튼 클릭 시 호출 (자동으로 닫힙니다) */
  onConfirm?: () => void;
  /** 취소 버튼 클릭 시 호출 (자동으로 닫힙니다) */
  onCancel?: () => void;
  /** @default false */
  isDismissable?: ModalOverlayProps['isDismissable'];
  /** @default false */
  isKeyboardDismissDisabled?: ModalOverlayProps['isKeyboardDismissDisabled'];
  className?: string;
}

const overlayStyles = tv({
  base: 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60',
  variants: {
    isEntering: {
      true: 'animate-in fade-in'
    },
    isExiting: {
      true: 'animate-out fade-out'
    }
  }
});

const modalStyles = tv({
  base: 'flex flex-col overflow-hidden rounded-2xl shadow-[0_2px_3px_rgba(0,0,0,0.10),0_1px_2px_rgba(0,0,0,0.06)] max-w-[calc(100vw-2rem)] max-h-[85vh]',
  variants: {
    theme: {
      dark: 'bg-[#0b0f15] border border-[rgba(126,140,222,0.16)]',
      light: 'bg-[#f3f5fa] border border-[rgba(23,39,101,0.16)]'
    },
    size: {
      '360': 'w-[360px]',
      '600': 'w-[600px]',
      '880': 'w-[880px]',
      '1120': 'w-[1120px]'
    }
  },
  defaultVariants: {
    theme: 'dark',
    size: '600'
  }
});

export function ModalLogpresso({
  size = '600',
  title,
  caption,
  trigger,
  children,
  footer,
  cancelLabel = '취소',
  confirmLabel = '확인',
  onConfirm,
  onCancel,
  isDismissable = false,
  isKeyboardDismissDisabled = false,
  className,
  ...dialogTriggerProps
}: ModalLogpressoProps) {
  const theme = useLogpressoTheme();
  const isDark = theme === 'dark';

  return (
    <DialogTrigger {...dialogTriggerProps}>
      {trigger}
      <ModalOverlay
        isDismissable={isDismissable}
        isKeyboardDismissDisabled={isKeyboardDismissDisabled}
        className={(renderProps) => overlayStyles({...renderProps})}>
        <RACModal
          className={composeRenderProps(className, (className) =>
            modalStyles({theme, size, className})
          )}>
          <Dialog className="flex flex-col h-full outline-none">
            {({close}) => (
              <>
                <header className="flex min-h-14 shrink-0 items-start justify-between gap-4 border-b-2 border-[#ff692a] p-4">
                  <div className="flex min-w-0 flex-col gap-1">
                    <Heading
                      slot="title"
                      className={`text-base font-semibold leading-6 ${
                        isDark ? 'text-[#ebebeb]' : 'text-[#191919]'
                      }`}>
                      {title}
                    </Heading>
                    {caption && (
                      <p className="text-sm leading-5 text-[#808080] line-clamp-1">
                        {caption}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    aria-label="닫기"
                    onClick={close}
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition ${
                      isDark
                        ? 'text-[#778293] hover:bg-[#151c33] hover:text-[#ebebeb]'
                        : 'text-[#6b7280] hover:bg-[#f1f3f7] hover:text-[#111827]'
                    }`}>
                    <X aria-hidden className="h-4 w-4" />
                  </button>
                </header>

                <div className="flex-1 overflow-y-auto p-4">
                  <div className="flex flex-col gap-4">{children}</div>
                </div>

                <footer
                  className={`flex min-h-[62px] shrink-0 items-center border-t p-4 ${
                    isDark
                      ? 'border-[rgba(126,140,222,0.16)]'
                      : 'border-[rgba(23,39,101,0.16)]'
                  }`}>
                  {footer ? (
                    footer
                  ) : (
                    <div className="ml-auto flex items-center gap-2">
                      <ButtonLogpresso
                        variant="default"
                        size="small"
                        onPress={() => {
                          onCancel?.();
                          close();
                        }}>
                        {cancelLabel}
                      </ButtonLogpresso>
                      <ButtonLogpresso
                        variant="primary"
                        size="small"
                        onPress={() => {
                          onConfirm?.();
                          close();
                        }}>
                        {confirmLabel}
                      </ButtonLogpresso>
                    </div>
                  )}
                </footer>
              </>
            )}
          </Dialog>
        </RACModal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
