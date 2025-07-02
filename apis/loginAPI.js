class LoginAPI {
  constructor(request) {
    this.request = request;
    this.base = '/auth';
  }

  async login(data) {
    return this.request.post(`${this.base}/login`, { data });
  }

   async currentLogin(token) {
    return this.request.get(`${this.base}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async refresh(data) {
    return this.request.post(`${this.base}/refresh`, { data });
  }
}

module.exports = { LoginAPI };