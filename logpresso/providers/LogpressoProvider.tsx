import {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Context,
  type ReactNode,
} from "react";
import { QueryService } from "../services/QueryService";
import { RestapiService } from "../services/RestapiService";
import type {
  LogpressoConfig,
  LogpressoContextValue,
  QueryRegistryContextValue,
  RestApiContextValue,
} from "../types";

interface LogpressoProviderProps {
  children: ReactNode;
  config?: LogpressoConfig;
  loadingFallback?: ReactNode;
}

type ProviderContextValue = LogpressoContextValue & {
  restApiService: RestapiService | null;
  queryService: QueryService | null;
} & QueryRegistryContextValue;

export const LogpressoContext = createContext<ProviderContextValue | null>(
  null,
);
export const RestApiContext = LogpressoContext as Context<
  | (RestApiContextValue & {
      restApiService: RestapiService | null;
      queryService: QueryService | null;
    })
  | null
>;

export function LogpressoProvider({
  children,
  config = {},
  loadingFallback = null,
}: LogpressoProviderProps) {
  const [restApiService, setRestApiService] = useState<RestapiService | null>(
    null,
  );
  const [queryService, setQueryService] = useState<QueryService | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const trackedQueryIdsRef = useRef<Set<number>>(new Set());

  const normalizedConfig = useMemo(
    () => ({
      apiKey: config.apiKey,
      baseUrl: config.baseUrl,
      getToken: config.getToken,
      fetchImpl: config.fetchImpl,
    }),
    [config.apiKey, config.baseUrl, config.getToken, config.fetchImpl],
  );
  const storageKey = useMemo(
    () => `logpresso:active-queries:${normalizedConfig.baseUrl || "default"}`,
    [normalizedConfig.baseUrl],
  );

  const persistTrackedQueryIds = () => {
    if (typeof window === "undefined") {
      return;
    }

    const queryIds = Array.from(trackedQueryIdsRef.current).filter((id) =>
      Number.isFinite(id),
    );

    if (queryIds.length === 0) {
      window.localStorage.removeItem(storageKey);
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(queryIds));
  };

  const readPersistedQueryIds = () => {
    if (typeof window === "undefined") {
      return [];
    }

    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed
        .map((value) => Number(value))
        .filter((value) => Number.isFinite(value) && value > 0);
    } catch {
      return [];
    }
  };

  const registerQueryId = (id: number) => {
    if (!Number.isFinite(id) || id <= 0) {
      return;
    }

    trackedQueryIdsRef.current.add(id);
    persistTrackedQueryIds();
  };

  const unregisterQueryId = (id: number) => {
    if (!Number.isFinite(id) || id <= 0) {
      return;
    }

    trackedQueryIdsRef.current.delete(id);
    persistTrackedQueryIds();
  };

  useEffect(() => {
    let isMounted = true;
    const service = new RestapiService(normalizedConfig);
    const nextQueryService = new QueryService(service);
    const cleanupPersistedQueries = async () => {
      const queryIds = readPersistedQueryIds();
      if (queryIds.length === 0) {
        return;
      }

      trackedQueryIdsRef.current = new Set(queryIds);
      await Promise.allSettled(
        queryIds.map(async (id) => {
          const cancelResult = await nextQueryService.cancel(id, {
            silent: true,
          });
          if (cancelResult.settled) {
            trackedQueryIdsRef.current.delete(id);
            persistTrackedQueryIds();
          }
        }),
      );
    };

    setLoading(true);
    setIsReady(false);
    setRestApiService(null);
    setQueryService(nextQueryService);

    service
      .init()
      .then(async () => {
        if (!isMounted) {
          return;
        }

        await cleanupPersistedQueries();
        setRestApiService(service);
        setIsReady(true);
      })
      .finally(() => {
        if (!isMounted) {
          return;
        }

        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [normalizedConfig, storageKey]);

  return (
    <LogpressoContext.Provider
      value={{
        restApiService,
        queryService,
        config: normalizedConfig,
        isReady,
        loading,
        registerQueryId,
        unregisterQueryId,
      }}
    >
      {loading ? loadingFallback : children}
    </LogpressoContext.Provider>
  );
}
