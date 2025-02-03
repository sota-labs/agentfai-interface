import config from '@/config';
import BaseRootRequest from './BaseRequest';

export default class AuthRequest extends BaseRootRequest {
  getUrlPrefix() {
    return config.appApiUrl;
  }

  login(idToken: string): Promise<{
    accessToken: string;
    salt: string;
  }> {
    const url = `/api/auth/login`;
    return this.post(url, { idToken: idToken });
  }
}
