export type TokenResolver =
  | string
  | null
  | undefined
  | (() => Promise<string | null | undefined> | string | null | undefined);

export interface LogpressoConfig {
  apiKey?: string;
  baseUrl?: string;
  getToken?: TokenResolver;
  fetchImpl?: typeof fetch;
}

export interface RestApiContextValue {
  config: LogpressoConfig;
  isReady: boolean;
  loading: boolean;
}

export interface LogpressoContextValue extends RestApiContextValue {}

export interface QueryRegistryContextValue {
  registerQueryId: (id: number) => void;
  unregisterQueryId: (id: number) => void;
}

export interface QueryResult<TRecord = Record<string, unknown>> {
  records: TRecord[];
  count: number;
  fieldOrder?: string[];
  fieldTypes?: { [key: string]: string };
  ipTags?: { [ip: string]: unknown };
}
