import type { LogpressoConfig } from "../types";

export enum RestApiMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
}

export interface FetchError extends Error {
  code?: number | string;
  message: string;
}

export class RestapiService {
  isReady = false;
  token?: string;
  private readonly baseUrl: string;
  private readonly fetchImpl: typeof fetch;
  private readonly getToken?: LogpressoConfig["getToken"];

  constructor(config: LogpressoConfig = {}) {
    this.token = config.apiKey;
    this.baseUrl = config.baseUrl ?? "";
    this.fetchImpl = config.fetchImpl ?? globalThis.fetch.bind(globalThis);
    this.getToken = config.getToken;
  }

  async init() {
    try {
      const resolvedToken = await this.resolveToken();
      if (resolvedToken) {
        this.token = resolvedToken;
      }
    } finally {
      this.isReady = true;
    }
  }

  async fetch<T>(
    method: RestApiMethod,
    path: string,
    params: Record<string, unknown> = {},
    requestInit: RequestInit = {},
  ): Promise<T> {
    const headers = new Headers();
    const url = this.resolveUrl(path, method, params);
    const options: RequestInit = { ...requestInit, method, headers };

    if (this.token) {
      headers.append("Authorization", `Bearer ${this.token}`);
    }

    if (method === RestApiMethod.GET) {
      headers.append("Content-Type", "application/json");
    } else {
      const formData = new FormData();
      Object.entries(params).forEach(([key, value]) => {
        this.appendFormDataValue(formData, key, value);
      });
      options.body = formData;
    }

    const response = await this.fetchImpl(url, options);
    if (!response.ok) {
      throw await this.createFetchError(response);
    }

    return response.json() as Promise<T>;
  }

  getStorageNamespace() {
    return this.baseUrl || "default";
  }

  private async resolveToken(): Promise<string | undefined> {
    if (typeof this.getToken === "function") {
      const token = await this.getToken();
      return token ?? this.token;
    }

    if (typeof this.getToken === "string") {
      return this.getToken;
    }

    return this.token;
  }

  private resolveUrl(
    path: string,
    method: RestApiMethod,
    params: Record<string, unknown>,
  ) {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const url = new URL(`${this.baseUrl}${normalizedPath}`, "http://localhost");

    if (method === RestApiMethod.GET) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      });
    }

    if (!this.baseUrl) {
      return `${url.pathname}${url.search}`;
    }

    return url.toString();
  }

  private appendFormDataValue(
    formData: FormData,
    key: string,
    value: unknown,
  ) {
    if (Array.isArray(value)) {
      value.forEach((item) => this.appendFormDataValue(formData, key, item));
      return;
    }

    if (value === undefined || value === null) {
      return;
    }

    if (value instanceof Blob) {
      formData.append(key, value);
      return;
    }

    formData.append(key, String(value));
  }

  private async createFetchError(response: Response): Promise<FetchError> {
    let message = `${response.status} ${response.statusText}`;
    let code: number | string | undefined = response.status;

    try {
      const errorResponse = await response.json();
      message =
        errorResponse.error_msg ??
        errorResponse.message ??
        errorResponse.error ??
        message;
      code = errorResponse.error_code ?? errorResponse.code ?? code;
    } catch {
      // JSON 응답이 아닌 경우 기본 HTTP 메시지를 유지한다.
    }

    const error = new Error(message) as FetchError;
    error.code = code;
    return error;
  }
}
