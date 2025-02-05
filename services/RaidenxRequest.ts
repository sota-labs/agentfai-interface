import config from '@/config';
import BaseRequest from './BaseRequest';

export default class RaidenxRequest extends BaseRequest {
  getUrlPrefix() {
    return config.appRaidenXApiUrl;
  }

  async initAccessToken() {
    const url = '/get-access-token';
    return this.post(url);
  }
}
