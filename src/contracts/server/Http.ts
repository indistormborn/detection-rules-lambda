export interface Query {
  [key: string]: undefined | string | string[] | Query | Query[];
}

export interface HttpRequest {
  headers?: Record<string, string | string[] | undefined>;
  params?: Record<string, string>;
  query?: Query;
  body?: any;
}

export interface CategorizeRequest extends HttpRequest {
  body: CategorizeBody;
}

export type CategorizeBody = {
  id?: string;
  username?: string;
  force?: boolean;
};

export interface CreateProfileAnalyticRequest extends HttpRequest {
  params: {
    username: string;
  };
  query: {
    force?: string;
  };
}

export interface CreateProfileDataRequest extends HttpRequest {
  body: CreateProfileDataBody;
}

export type CreateProfileDataBody = {
  id?: string;
  username?: string;
  force?: boolean;
};

export interface HttpResponse {
  status: number;
  body?: unknown;
}

export interface IHttpError {
  status: number;
  message: string;
}
