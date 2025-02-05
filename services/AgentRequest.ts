import config from '@/config';
import BaseRequest from './BaseRequest';

export default class AgentRequest extends BaseRequest {
  getUrlPrefix() {
    return config.authApiUrl;
  }

  async getConnectedAgents() {
    const url = '/agent/connected';
    return this.get(url);
  }
}
