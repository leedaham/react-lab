import { useMemo } from "react";
import type { ParentNavigateFn, ParentNavigateOptions } from "./useParentRouteSync";

type SonarWindow = Window & {
  postMessage: (
    message: {
      type: string;
      url: string;
      replace: boolean;
    },
    targetOrigin: string,
  ) => void;
};

export type UseParentRouterOptions = {
  navigate: ParentNavigateFn;
  loaderBase?: string;
  isProduction?: boolean;
  navigateMessageType?: string;
  targetOrigin?: string;
};

const trimTrailingSlash = (value?: string) =>
  value ? value.replace(/\/+$/, "") : "";

export function useParentRouter({
  navigate,
  loaderBase = "",
  isProduction = false,
  navigateMessageType = "NAVIGATE_URL",
  targetOrigin = "*",
}: UseParentRouterOptions) {
  const normalizedBase = trimTrailingSlash(loaderBase);

  return useMemo(() => {
    return (to: string, options?: ParentNavigateOptions) => {
      if (!isProduction) {
        navigate(to, options);
        return;
      }

      const replace = options?.replace ?? false;
      const fullUrl = `${normalizedBase}${to}`;
      const parentWindow = window.parent as SonarWindow | undefined;

      parentWindow?.postMessage(
        {
          type: navigateMessageType,
          url: fullUrl,
          replace,
        },
        targetOrigin,
      );

      navigate(to, { ...options, replace: true });
    };
  }, [navigate, isProduction, navigateMessageType, normalizedBase, targetOrigin]);
}
