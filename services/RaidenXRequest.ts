import config from '@/config';
import BaseRequest from './BaseRequest';

export default class RaidenXRequest extends BaseRequest {
  getUrlPrefix() {
    return config.authApiUrl;
  }

  async getWallets() {
    const url = '/api/v1/raidenx/wallets';
    return this.get(url);
  }
}
