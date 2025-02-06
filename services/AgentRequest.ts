import config from '@/config';
import BaseRequest from './BaseRequest';

export default class AgentRequest extends BaseRequest {
  getUrlPrefix() {
    return config.authApiUrl;
  }

  async getConnectedAgents() {
    const url = '/api/v1/agent/connected';
    return this.get(url);
  }
}
