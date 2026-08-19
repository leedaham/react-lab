import { RestApiMethod, RestapiService } from "./RestapiService";
import type { QueryResult as QueryResultShape } from "../types";

export type SubQuery = {
  id: number;
  commands: QueryCommand[];
};

export class QueryCommand {
  name?: string;
  command = "";
  status = "";
  pushCount = 0;

  static parseQueryCommand(json: Record<string, any>): QueryCommand {
    const queryCommand = new QueryCommand();
    queryCommand.name = json.name;
    queryCommand.command = json.command;
    queryCommand.status = json.status;
    queryCommand.pushCount = json.push_count;

    return queryCommand;
  }
}

export class Query {
  id = 0;
  queryString = "";
  background = false;
  elapsed = 0;
  isFinished = false;
  isCancelled = false;
  isEof = false;
  isScheduledQuery = false;
  lastStarted: Date | null = null;
  finishTime = 0;
  startTime = 0;
  stamp = 0;
  commands: QueryCommand[] = [];
  subQueries: SubQuery[] = [];
  tags: Map<string, unknown> = new Map();
  rows = 0;
  status?: string;
  loadedCount?: number;
  totalCount?: number;
  errorCode?: string;
  errorDetail?: string;
  cancelReason?: string;

  static parse(json: Record<string, any>): Query {
    const query = new Query();
    query.background = json.background;
    query.elapsed = json.elapsed;
    query.id = json.id;
    query.isFinished = json.is_finished;
    query.isCancelled = json.is_cancelled;
    query.isEof = json.is_eof;
    query.isScheduledQuery = json.is_scheduled_query;
    query.lastStarted = json.last_started ? new Date(json.last_started) : null;
    query.finishTime = json.finish_time;
    query.startTime = json.start_time;
    query.queryString = json.query_string;
    query.stamp = json.stamp;
    query.rows = json.rows;
    query.status = json.status;
    query.loadedCount = json.loaded_count;
    query.totalCount = json.total_count;
    query.errorCode = json.error_code;
    query.errorDetail = json.error_detail;
    query.cancelReason = json.cancel_reason;

    const tags = new Map<string, unknown>();
    Object.entries(json.tags ?? {}).forEach(([key, value]) => {
      tags.set(key, value);
    });
    query.tags = tags;

    query.commands = (json.commands ?? []).map((command: Record<string, any>) =>
      QueryCommand.parseQueryCommand(command),
    );

    query.subQueries = (json.sub_queries ?? []).map(
      (subQuery: Record<string, any>) => ({
        id: subQuery.id,
        commands: (subQuery.commands ?? []).map(
          (command: Record<string, any>) =>
            QueryCommand.parseQueryCommand(command),
        ),
      }),
    );

    return query;
  }
}

export class QueryService {
  private readonly queries: { [id: number]: Query } = {};
  private readonly restApiService: RestapiService;
  private readonly cancellingIds = new Set<number>();

  constructor(restapiService: RestapiService) {
    this.restApiService = restapiService;
  }

  async query(queryString: string): Promise<Query> {
    if (!queryString) {
      throw new Error("query string not found");
    }

    const queryId = await this.createCursor(queryString);
    const query = new Query();
    query.id = queryId;
    query.queryString = queryString;
    this.queries[queryId] = query;

    return query;
  }

  async getResult<TRecord = Record<string, unknown>>(
    id: number,
    offset = 0,
    limit = 10000,
    format: "json" | "html" | "xml" | "csv" | "json-single" = "json-single",
  ): Promise<QueryResultShape<TRecord>> {
    const response = await this.restApiService.fetch<{
      rows: TRecord[];
      total: number;
      field_order?: string[];
      field_types?: { [key: string]: string };
      ip_tags?: { [ip: string]: unknown };
    }>(RestApiMethod.GET, `/api/sonar/cursors/${id}`, {
      id,
      offset,
      limit,
      format,
    });

    return {
      records: response.rows,
      count: response.total,
      fieldOrder: response.field_order,
      fieldTypes: response.field_types,
      ipTags: response.ip_tags,
    };
  }

  async cancel(
    id: number,
    options?: { keepalive?: boolean; silent?: boolean },
  ): Promise<{ settled: boolean; status?: string }> {
    if (!id) {
      throw new Error("query id not found");
    }

    if (this.cancellingIds.has(id)) {
      return { settled: false };
    }

    this.cancellingIds.add(id);

    try {
      const response = await this.restApiService.fetch<{ status: string }>(
        RestApiMethod.DELETE,
        `/api/sonar/cursors/${id}`,
        {},
        options?.keepalive ? { keepalive: true } : {},
      );

      delete this.queries[id];

      return { settled: true, status: response.status };
    } catch (error) {
      if (!options?.silent) {
        throw error;
      }

      const hasResponse =
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code !== undefined;

      return { settled: hasResponse };
    } finally {
      this.cancellingIds.delete(id);
    }
  }

  async getStatus(id: number): Promise<Query> {
    if (!id) {
      throw new Error("query id not found");
    }

    const response = await this.restApiService.fetch<Record<string, any>>(
      RestApiMethod.GET,
      `/api/sonar/queries/${id}`,
      {},
    );

    return Query.parse(response);
  }

  async cancelAll(options?: { keepalive?: boolean; silent?: boolean }) {
    const queryIds = Object.keys(this.queries).map((id) => Number(id));
    await Promise.allSettled(queryIds.map((id) => this.cancel(id, options)));
  }

  private async createCursor(queryString: string): Promise<number> {
    const response = await this.restApiService.fetch<{ id: number }>(
      RestApiMethod.POST,
      "/api/sonar/cursors",
      { q: queryString },
    );

    return response.id;
  }
}
