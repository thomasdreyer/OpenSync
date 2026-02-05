export type OpenSyncClientConfig = {
  baseUrl: string;
  endpoints?: Partial<OpenSyncEndpoints>;
  getUserId?: () => string;
  fetchImpl?: typeof fetch;
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
  private readonly fetchImpl: typeof fetch;

  constructor(baseUrlOrConfig: string | OpenSyncClientConfig) {
    const config =
      typeof baseUrlOrConfig === 'string'
        ? { baseUrl: baseUrlOrConfig }
        : baseUrlOrConfig;

    this.baseUrl = config.baseUrl;
    this.endpoints = { ...DEFAULT_ENDPOINTS, ...(config.endpoints ?? {}) };
    this.getUserId = config.getUserId ?? (() => 'me');
    this.fetchImpl = config.fetchImpl ?? fetch;
  }

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await this.fetchImpl(url, init);

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`OpenSync request failed (${response.status}): ${body}`);
    }

    return response.json() as Promise<T>;
  }

  async register(email: string, password: string) {
    const data = await this.request<{ token: string }>(
      resolveUrl(this.baseUrl, this.endpoints.register),
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      }
    );

    this.token = data.token;
    return data;
  }

  async login(email: string, password: string) {
    const data = await this.request<{ token: string }>(
      resolveUrl(this.baseUrl, this.endpoints.login),
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      }
    );

    this.token = data.token;
    return data;
  }

  async push(changes: unknown[]) {
    return this.request(resolveUrl(this.baseUrl, this.endpoints.push), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      },
      body: JSON.stringify({ userId: this.getUserId(), changes })
    });
  }

  async pull(since: number) {
    const url = new URL(resolveUrl(this.baseUrl, this.endpoints.pull));
    url.searchParams.set('since', String(since));
    url.searchParams.set('userId', this.getUserId());

    return this.request(url.toString(), {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }
}
