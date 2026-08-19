import { useEffect, useRef, useState } from "react";
import { useRestApi } from "./useRestApi";

export function useQuery<TRecord = Record<string, unknown>>(
  queryString: string | null,
  offset = 0,
  limit = 0,
  wait = false,
) {
  const { queryService, isReady, registerQueryId, unregisterQueryId } =
    useRestApi();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<TRecord[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [queryId, setQueryId] = useState<number | null>(null);
  const hasRun = useRef(false);
  useEffect(() => {
    if (!queryString || hasRun.current || wait || !queryService || !isReady) {
      return;
    }

    hasRun.current = true;
    setLoading(true);
    setError(undefined);

    let intervalId: number | null = null;
    let currentQueryId: number | null = null;
    let isCancelled = false;

    const run = async () => {
      try {
        const query = await queryService.query(queryString);
        currentQueryId = query.id;
        registerQueryId(query.id);
        setQueryId(query.id);

        let tryCount = 0;
        intervalId = window.setInterval(async () => {
          if (isCancelled || currentQueryId === null) {
            return;
          }

          if (tryCount > 10) {
            clearInterval(intervalId!);
            setError("Exceed maximum query run count");
            setLoading(false);
            hasRun.current = false;
            return;
          }

          tryCount += 1;

          try {
            const status = await queryService.getStatus(currentQueryId);
            if (!status.isFinished) {
              return;
            }

            clearInterval(intervalId!);
            setTotalCount(status.rows);

            const result =
              offset || limit
                ? await queryService.getResult<TRecord>(
                    currentQueryId,
                    offset,
                    limit,
                  )
                : await queryService.getResult<TRecord>(currentQueryId);

            if (!isCancelled) {
              setRecords(result.records);
            }

            const queryIdToCancel = currentQueryId;
            const cancelResult = await queryService.cancel(queryIdToCancel);
            if (cancelResult.settled) {
              unregisterQueryId(queryIdToCancel);
            }
            currentQueryId = null;
          } catch (runError) {
            const message =
              runError instanceof Error ? runError.message : "query failed";
            clearInterval(intervalId!);
            setError(message);
          } finally {
            if (!isCancelled) {
              hasRun.current = false;
              setLoading(false);
              setQueryId(null);
            }
          }
        }, 1000);
      } catch (createError) {
        const message =
          createError instanceof Error
            ? createError.message
            : "create query failed";
        setError(message);
        setLoading(false);
        hasRun.current = false;
      }
    };

    run();

    return () => {
      isCancelled = true;
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
      if (currentQueryId !== null) {
        const queryIdToCancel = currentQueryId;
        void queryService
          .cancel(queryIdToCancel, { silent: true })
          .then((cancelResult) => {
            if (cancelResult.settled) {
              unregisterQueryId(queryIdToCancel);
            }
          });
      }
      setQueryId(null);
    };
  }, [
    isReady,
    limit,
    offset,
    queryService,
    queryString,
    registerQueryId,
    unregisterQueryId,
    wait,
  ]);

  return { records, loading, error, totalCount, queryId };
}
