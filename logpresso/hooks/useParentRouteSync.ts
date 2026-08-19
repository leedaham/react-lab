import { useEffect } from "react";

export type ParentNavigateOptions = {
  replace?: boolean;
};

export type ParentNavigateFn = (
  to: string,
  options?: ParentNavigateOptions,
) => void;

export type UseParentRouteSyncOptions = {
  navigate?: ParentNavigateFn;
  onSync?: (relativePath: string, targetUrl: string, event: MessageEvent) => void;
  appBase?: string;
  syncMessageType?: string;
};

const trimTrailingSlash = (value?: string) =>
  value ? value.replace(/\/+$/, "") : "";

export function useParentRouteSync({
  navigate,
  onSync,
  appBase = "",
  syncMessageType = "SYNC_URL",
}: UseParentRouteSyncOptions) {
  const normalizedBase = trimTrailingSlash(appBase);

  useEffect(() => {
    if (!navigate && !onSync) {
      return;
    }

    const handleParentSync = (event: MessageEvent) => {
      if (event.data?.type !== syncMessageType) {
        return;
      }

      const targetUrl = typeof event.data?.url === "string" ? event.data.url : "";
      const relativePath = targetUrl.startsWith(normalizedBase)
        ? targetUrl.slice(normalizedBase.length) || "/"
        : targetUrl || "/";

      onSync?.(relativePath, targetUrl, event);
      navigate?.(relativePath, { replace: true });
    };

    window.addEventListener("message", handleParentSync);
    return () => window.removeEventListener("message", handleParentSync);
  }, [navigate, normalizedBase, onSync, syncMessageType]);
}
