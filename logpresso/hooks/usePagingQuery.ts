import {
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import { Query } from "../services/QueryService";
import { useRestApi } from "./useRestApi";

export function usePagingQuery<TRecord = Record<string, unknown>>(
  queryString: string | null,
  offset = 0,
  limit = 10000,
  subQuery?: string | null,
  wait = false,
) {
  const { queryService, isReady, registerQueryId, unregisterQueryId } =
    useRestApi();
  const [error, setError] = useState<string>();
  const [queryLoading, setQueryLoading] = useState(false);
  const [subQueryLoading, setSubQueryLoading] = useState(false);
  const [records, setRecords] = useState<TRecord[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const queryIdRef = useRef<number | null>(null);
  const subQueryIdRef = useRef<number | null>(null);
  const intervalIdRef = useRef<number | null>(null);
  const originalTotalCount = useRef(0);
  const queriedStringRef = useRef<string | null>(null);
  const queriedSubqueryRef = useRef<string | null>(null);
  const statusRef = useRef<Query | null>(null);
  const resetInterval = () => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  const cancelQuery = (queryIdRefTarget: MutableRefObject<number | null>) => {
    const currentId = queryIdRefTarget.current;
    if (currentId === null || !queryService) {
      return;
    }

    void queryService.cancel(currentId, { silent: true }).then((cancelResult) => {
      if (cancelResult.settled) {
        unregisterQueryId(currentId);
      }
    });
    queryIdRefTarget.current = null;
  };

  const getResult = async (queryId: number | null) => {
    if (!queryId || !queryService) {
      return;
    }

    try {
      const result =
        offset || limit
          ? await queryService.getResult<TRecord>(queryId, offset, limit)
          : await queryService.getResult<TRecord>(queryId);
      setRecords(result.records);
    } catch {
      setError("getResult failed");
    }
  };

  const startSubQuery = async () => {
    if (!subQuery || !queryIdRef.current || !queryService) {
      return;
    }

    cancelQuery(subQueryIdRef);
    queriedSubqueryRef.current = null;
    setSubQueryLoading(true);

    try {
      const fullQuery = `result ${queryIdRef.current}${subQuery}`;
      const query = await queryService.query(fullQuery);
      subQueryIdRef.current = query.id;
      registerQueryId(query.id);

      let tryCount = 0;
      const subIntervalId = window.setInterval(async () => {
        if (tryCount > 10000) {
          clearInterval(subIntervalId);
          cancelQuery(subQueryIdRef);
          setError("Exceed maximum subQuery run count");
          setSubQueryLoading(false);
          return;
        }

        tryCount += 1;

        try {
          const status = await queryService.getStatus(query.id);
          if (!status.isFinished) {
            return;
          }

          clearInterval(subIntervalId);
          await getResult(query.id);
          setSubQueryLoading(false);
          setTotalCount(status.rows);
        } catch {
          clearInterval(subIntervalId);
          cancelQuery(subQueryIdRef);
          setError("get subQuery status failed");
          setSubQueryLoading(false);
        }
      }, 1000);
    } catch {
      setError("subQuery execution failed");
      setSubQueryLoading(false);
    }
  };

  const startMainQuery = async () => {
    if (!queryString || !queryService) {
      return;
    }

    cancelQuery(queryIdRef);
    resetInterval();
    setQueryLoading(true);
    setError(undefined);
    setRecords([]);
    setTotalCount(0);
    statusRef.current = null;

    try {
      const query = await queryService.query(queryString);
      queryIdRef.current = query.id;
      registerQueryId(query.id);

      let tryCount = 0;
      intervalIdRef.current = window.setInterval(async () => {
        if (statusRef.current?.isFinished) {
          return;
        }

        if (tryCount > 10000) {
          resetInterval();
          cancelQuery(queryIdRef);
          setError("Exceed maximum query run count");
          setQueryLoading(false);
          return;
        }

        tryCount += 1;

        try {
          const status = await queryService.getStatus(query.id);
          statusRef.current = status;

          if (!status.isFinished) {
            return;
          }

          setTotalCount(status.rows);
          originalTotalCount.current = status.rows;
          resetInterval();

          if (subQuery) {
            setQueryLoading(false);
            void startSubQuery();
            return;
          }

          await getResult(query.id);
          setQueryLoading(false);
        } catch {
          resetInterval();
          cancelQuery(queryIdRef);
          setRecords([]);
          setTotalCount(0);
          setError("create query failed");
          setQueryLoading(false);
          statusRef.current = null;
        }
      }, 1000);
    } catch {
      resetInterval();
      setRecords([]);
      setTotalCount(0);
      setError("create query failed");
      setQueryLoading(false);
      statusRef.current = null;
    }
  };

  useEffect(() => {
    if (!queryString || queriedStringRef.current === queryString || wait) {
      return;
    }

    if (!isReady || !queryService) {
      return;
    }

    queriedStringRef.current = queryString;
    statusRef.current = null;
    void startMainQuery();
  }, [
    isReady,
    queryService,
    queryString,
    registerQueryId,
    unregisterQueryId,
    wait,
  ]);

  useEffect(() => {
    if (!queryService) {
      return;
    }

    if (subQuery !== queriedSubqueryRef.current && subQuery === "") {
      cancelQuery(subQueryIdRef);
      queriedSubqueryRef.current = null;
      void getResult(queryIdRef.current);
      setTotalCount(originalTotalCount.current);
      return;
    }

    if (!subQuery || queriedSubqueryRef.current === subQuery) {
      return;
    }

    queriedSubqueryRef.current = subQuery;
    void startSubQuery();
  }, [queryService, subQuery, registerQueryId, unregisterQueryId]);

  useEffect(() => {
    if (!queryService) {
      return;
    }

    if (subQueryIdRef.current) {
      void getResult(subQueryIdRef.current).then(() => setSubQueryLoading(false));
      return;
    }

    if (queryIdRef.current) {
      void getResult(queryIdRef.current).then(() => setQueryLoading(false));
    }
  }, [limit, offset, queryService]);

  useEffect(() => {
    return () => {
      cancelQuery(queryIdRef);
      cancelQuery(subQueryIdRef);
      resetInterval();
    };
  }, [queryService, unregisterQueryId]);

  return {
    records,
    loading: queryLoading || subQueryLoading,
    error,
    totalCount,
    refresh: startMainQuery,
    queryId: subQueryIdRef.current || queryIdRef.current,
  };
}
