/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AccountRead {
  /** @format int32 */
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
}

export interface AccountCreate {
  firstName: string;
  lastName?: string | null;
  email: string;
  password: string;
}

export interface Login {
  /** @format date-time */
  createdDate: string;

  /** @format date-time */
  updatedDate: string;
  email: string;
  password: string;
}

export interface UserRegistrationRequest {
  /** @format email */
  email?: string | null;
  password?: string | null;
}

export interface AuthSuccessResponse {
  token?: string | null;
}

export interface AuthFailResponse {
  errors?: string[] | null;
}

export interface UserLoginRequest {
  email?: string | null;
  password?: string | null;
}

export interface Measure {
  /** @format date-time */
  createdDate: string;

  /** @format date-time */
  updatedDate: string;

  /** @format int32 */
  id?: number;
  name: string;
  symbol: string;
}

export interface IngredientRead {
  /** @format int32 */
  id?: number;
  name?: string | null;

  /** @format int32 */
  amount?: number;
  measure?: Measure;
}

export interface IngredientCreate {
  name: string;

  /** @format int32 */
  amount: number;

  /** @format int32 */
  measureId: number;

  /** @format int32 */
  recipeGroupId: number;
}

export interface InstructionRead {
  /** @format int32 */
  id?: number;

  /** @format int32 */
  order?: number;
  text?: string | null;
}

export interface InstructionCreate {
  /** @format int32 */
  order: number;
  text?: string | null;

  /** @format int32 */
  recipeId: number;
}

export interface MeasureRead {
  /** @format int32 */
  id?: number;
  name?: string | null;
  symbol?: string | null;
}

export interface MeasureCreate {
  name: string;
  symbol: string;
}

export interface RecipeRead {
  /** @format int32 */
  id?: number;
  name?: string | null;
  favorite?: boolean;
  description?: string | null;
}

export interface RecipeCreate {
  name: string;
  favorite: boolean;
  description?: string | null;

  /** @format int32 */
  accountId: number;
}

export interface IngredientReadWithMeasure {
  /** @format int32 */
  id?: number;
  name?: string | null;

  /** @format int32 */
  amount?: number;
  measure?: MeasureRead;
}

export interface RecipeGroupReadWithIngredientRead {
  /** @format int32 */
  id?: number;
  name?: string | null;
  ingredients?: IngredientReadWithMeasure[] | null;
}

export interface RecipeReadWithRecipeGroups {
  /** @format int32 */
  id?: number;
  name?: string | null;
  favorite?: boolean;
  description?: string | null;
  recipeGroups?: RecipeGroupReadWithIngredientRead[] | null;
  measures?: MeasureRead[] | null;
  instructions?: InstructionRead[] | null;
}

export interface Account {
  /** @format date-time */
  createdDate: string;

  /** @format date-time */
  updatedDate: string;

  /** @format int32 */
  id?: number;
  firstName: string;
  lastName?: string | null;
  email: string;
  password: string;
  recipes?: Recipe[] | null;
}

export interface Instruction {
  /** @format date-time */
  createdDate: string;

  /** @format date-time */
  updatedDate: string;

  /** @format int32 */
  id?: number;

  /** @format int32 */
  order: number;
  text?: string | null;

  /** @format int32 */
  recipeId: number;
  recipe?: Recipe;
}

export interface Recipe {
  /** @format date-time */
  createdDate: string;

  /** @format date-time */
  updatedDate: string;

  /** @format int32 */
  id?: number;
  name: string;
  favorite: boolean;
  description?: string | null;

  /** @format int32 */
  accountId: number;
  account?: Account;
  recipeGroups?: RecipeGroup[] | null;
  instructions?: Instruction[] | null;
}

export interface RecipeGroup {
  /** @format date-time */
  createdDate: string;

  /** @format date-time */
  updatedDate: string;

  /** @format int32 */
  id?: number;
  name: string;

  /** @format int32 */
  recipeId: number;
  recipe?: Recipe;
  ingredients?: Ingredient[] | null;
}

export interface Ingredient {
  /** @format date-time */
  createdDate: string;

  /** @format date-time */
  updatedDate: string;

  /** @format int32 */
  id?: number;
  name: string;

  /** @format int32 */
  amount: number;

  /** @format int32 */
  measureId: number;
  measure?: Measure;

  /** @format int32 */
  recipeGroupId: number;
  recipeGroup?: RecipeGroup;
}

export interface RecipeGroupRead {
  /** @format int32 */
  id?: number;
  name?: string | null;
  ingredients?: Ingredient[] | null;
}

export interface RecipeGroupCreate {
  name: string;

  /** @format int32 */
  recipeId: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title fahlen_dev_webapi
 * @version v1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Account
     * @name AccountList
     * @request GET:/api/account
     * @secure
     */
    accountList: (params: RequestParams = {}) =>
      this.request<AccountRead[], any>({
        path: `/api/account`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name AccountCreate
     * @request POST:/api/account
     * @secure
     */
    accountCreate: (data: AccountCreate, params: RequestParams = {}) =>
      this.request<AccountRead, any>({
        path: `/api/account`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name GetAccountById
     * @request GET:/api/account/{id}
     * @secure
     */
    getAccountById: (id: number, params: RequestParams = {}) =>
      this.request<AccountRead, any>({
        path: `/api/account/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name AccountLoginList
     * @request GET:/api/account/login
     * @secure
     */
    accountLoginList: (data: Login, params: RequestParams = {}) =>
      this.request<AccountRead, any>({
        path: `/api/account/login`,
        method: "GET",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Identity
     * @name IdentityRegisterCreate
     * @request POST:/api/identity/register
     * @secure
     */
    identityRegisterCreate: (data: UserRegistrationRequest, params: RequestParams = {}) =>
      this.request<AuthSuccessResponse, AuthFailResponse>({
        path: `/api/identity/register`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Identity
     * @name IdentityLoginCreate
     * @request POST:/api/identity/login
     * @secure
     */
    identityLoginCreate: (data: UserLoginRequest, params: RequestParams = {}) =>
      this.request<AuthSuccessResponse, AuthFailResponse>({
        path: `/api/identity/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Identity
     * @name IdentityRefreshCreate
     * @request POST:/api/identity/refresh
     * @secure
     */
    identityRefreshCreate: (params: RequestParams = {}) =>
      this.request<AuthSuccessResponse, AuthFailResponse>({
        path: `/api/identity/refresh`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ingredient
     * @name IngredientList
     * @request GET:/api/ingredient
     * @secure
     */
    ingredientList: (params: RequestParams = {}) =>
      this.request<IngredientRead[], any>({
        path: `/api/ingredient`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ingredient
     * @name IngredientCreate
     * @request POST:/api/ingredient
     * @secure
     */
    ingredientCreate: (data: IngredientCreate, params: RequestParams = {}) =>
      this.request<IngredientRead, any>({
        path: `/api/ingredient`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ingredient
     * @name GetIngredientById
     * @request GET:/api/ingredient/{id}
     * @secure
     */
    getIngredientById: (id: number, params: RequestParams = {}) =>
      this.request<IngredientRead, any>({
        path: `/api/ingredient/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ingredient
     * @name IngredientDelete
     * @request DELETE:/api/ingredient/{id}
     * @secure
     */
    ingredientDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/ingredient/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Instruction
     * @name InstructionList
     * @request GET:/api/instruction
     * @secure
     */
    instructionList: (params: RequestParams = {}) =>
      this.request<InstructionRead[], any>({
        path: `/api/instruction`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Instruction
     * @name InstructionCreate
     * @request POST:/api/instruction
     * @secure
     */
    instructionCreate: (data: InstructionCreate, params: RequestParams = {}) =>
      this.request<InstructionRead, any>({
        path: `/api/instruction`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Instruction
     * @name GetInstructionById
     * @request GET:/api/instruction/{id}
     * @secure
     */
    getInstructionById: (id: number, params: RequestParams = {}) =>
      this.request<InstructionRead, any>({
        path: `/api/instruction/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Instruction
     * @name InstructionDelete
     * @request DELETE:/api/instruction/{id}
     * @secure
     */
    instructionDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/instruction/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Measure
     * @name MeasureList
     * @request GET:/api/measure
     * @secure
     */
    measureList: (params: RequestParams = {}) =>
      this.request<MeasureRead[], any>({
        path: `/api/measure`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Measure
     * @name MeasureCreate
     * @request POST:/api/measure
     * @secure
     */
    measureCreate: (data: MeasureCreate, params: RequestParams = {}) =>
      this.request<MeasureRead, any>({
        path: `/api/measure`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Measure
     * @name GetMeasureById
     * @request GET:/api/measure/{id}
     * @secure
     */
    getMeasureById: (id: number, params: RequestParams = {}) =>
      this.request<MeasureRead, any>({
        path: `/api/measure/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Measure
     * @name MeasureDelete
     * @request DELETE:/api/measure/{id}
     * @secure
     */
    measureDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/measure/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Recipe
     * @name RecipeList
     * @request GET:/api/recipe
     * @secure
     */
    recipeList: (params: RequestParams = {}) =>
      this.request<RecipeRead[], any>({
        path: `/api/recipe`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Recipe
     * @name RecipeCreate
     * @request POST:/api/recipe
     * @secure
     */
    recipeCreate: (data: RecipeCreate, params: RequestParams = {}) =>
      this.request<RecipeRead, any>({
        path: `/api/recipe`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Recipe
     * @name GetRecipeById
     * @request GET:/api/recipe/{id}
     * @secure
     */
    getRecipeById: (id: number, params: RequestParams = {}) =>
      this.request<RecipeRead, any>({
        path: `/api/recipe/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Recipe
     * @name RecipeDelete
     * @request DELETE:/api/recipe/{id}
     * @secure
     */
    recipeDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/recipe/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Recipe
     * @name GetRecipeEditById
     * @request GET:/api/recipe/all/{id}
     * @secure
     */
    getRecipeEditById: (id: number, params: RequestParams = {}) =>
      this.request<RecipeReadWithRecipeGroups, any>({
        path: `/api/recipe/all/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RecipeGroup
     * @name RecipegroupList
     * @request GET:/api/recipegroup
     * @secure
     */
    recipegroupList: (params: RequestParams = {}) =>
      this.request<RecipeGroupRead[], any>({
        path: `/api/recipegroup`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RecipeGroup
     * @name RecipegroupCreate
     * @request POST:/api/recipegroup
     * @secure
     */
    recipegroupCreate: (data: RecipeGroupCreate, params: RequestParams = {}) =>
      this.request<RecipeGroupRead, any>({
        path: `/api/recipegroup`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RecipeGroup
     * @name GetRecipeGroupById
     * @request GET:/api/recipegroup/{id}
     * @secure
     */
    getRecipeGroupById: (id: number, params: RequestParams = {}) =>
      this.request<RecipeGroupRead, any>({
        path: `/api/recipegroup/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RecipeGroup
     * @name RecipegroupDelete
     * @request DELETE:/api/recipegroup/{id}
     * @secure
     */
    recipegroupDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/recipegroup/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags RecipeGroup
     * @name GetRecipeGroupsByRecipeId
     * @request GET:/api/recipegroup/recipe/{id}
     * @secure
     */
    getRecipeGroupsByRecipeId: (id: number, params: RequestParams = {}) =>
      this.request<RecipeGroupRead[], any>({
        path: `/api/recipegroup/recipe/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
