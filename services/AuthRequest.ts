import config from '@/config';
import BaseRootRequest from './BaseRequest';

export default class AuthRequest extends BaseRootRequest {
  getUrlPrefix() {
    return config.appApiUrl;
  }

  connectToRaidenX(code: string) {
    const url = '/api/raidenx/connect';

    return this.post(url, { code });
  }

  login(idToken: string): Promise<{
    accessToken: string;
    salt: string;
  }> {
    const url = `/api/auth/login`;
    return this.post(url, { idToken: idToken });
  }

  logout() {
    const url = `/api/auth/logout`;
    return this.post(url);
  }
}
