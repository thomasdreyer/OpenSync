import axios, { AxiosInstance } from 'axios';

export type OpenSyncClientConfig = {
  baseUrl: string;
  endpoints?: Partial<OpenSyncEndpoints>;
  getUserId?: () => string;
  axiosInstance?: AxiosInstance;
};

export type OpenSyncEndpoints = {
  register: string;
  login: string;
  push: string;
  pull: string;
};

const DEFAULT_ENDPOINTS: OpenSyncEndpoints = {
  register: '/auth/register',
  login: '/auth/login',
  push: '/sync/push',
  pull: '/sync/pull'
};

function normalizeBaseUrl(baseUrl: string) {
  return baseUrl.replace(/\/+$/, '');
}

function resolveUrl(baseUrl: string, path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizeBaseUrl(baseUrl)}${normalizedPath}`;
}

export class OpenSyncClient {
  private token?: string;
  private readonly baseUrl: string;
  private readonly endpoints: OpenSyncEndpoints;
  private readonly getUserId: () => string;
  private readonly http: AxiosInstance;

  constructor(baseUrlOrConfig: string | OpenSyncClientConfig) {
    const config =
      typeof baseUrlOrConfig === 'string'
        ? { baseUrl: baseUrlOrConfig }
        : baseUrlOrConfig;

    this.baseUrl = config.baseUrl;
    this.endpoints = { ...DEFAULT_ENDPOINTS, ...(config.endpoints ?? {}) };
    this.getUserId = config.getUserId ?? (() => 'me');
    this.http = config.axiosInstance ?? axios;
  }

  setToken(token: string) {
    this.token = token;
  }

  async register(email: string, password: string) {
    const res = await this.http.post(resolveUrl(this.baseUrl, this.endpoints.register), {
      email,
      password
    });
    this.token = res.data.token;
    return res.data;
  }

  async login(email: string, password: string) {
    const res = await this.http.post(resolveUrl(this.baseUrl, this.endpoints.login), {
      email,
      password
    });
    this.token = res.data.token;
    return res.data;
  }

  async push(changes: any[]) {
    const res = await this.http.post(
      resolveUrl(this.baseUrl, this.endpoints.push),
      { userId: this.getUserId(), changes },
      { headers: { Authorization: `Bearer ${this.token}` } }
    );
    return res.data;
  }

  async pull(since: number) {
    const res = await this.http.get(resolveUrl(this.baseUrl, this.endpoints.pull), {
      params: { userId: this.getUserId(), since },
      headers: { Authorization: `Bearer ${this.token}` }
    });
    return res.data;
  }
}
