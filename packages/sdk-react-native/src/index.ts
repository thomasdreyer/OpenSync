import axios from 'axios';

export class OpenSyncClient {
  private token?: string;

  constructor(private baseUrl: string) {}

  setToken(token: string) {
    this.token = token;
  }

  async register(email: string, password: string) {
    const res = await axios.post(`${this.baseUrl}/auth/register`, {
      email,
      password
    });
    this.token = res.data.token;
    return res.data;
  }

  async login(email: string, password: string) {
    const res = await axios.post(`${this.baseUrl}/auth/login`, {
      email,
      password
    });
    this.token = res.data.token;
    return res.data;
  }

  async push(changes: any[]) {
    const res = await axios.post(
      `${this.baseUrl}/sync/push`,
      { userId: 'me', changes },
      { headers: { Authorization: `Bearer ${this.token}` } }
    );
    return res.data;
  }

  async pull(since: number) {
    const res = await axios.get(`${this.baseUrl}/sync/pull`, {
      params: { userId: 'me', since },
      headers: { Authorization: `Bearer ${this.token}` }
    });
    return res.data;
  }
}
