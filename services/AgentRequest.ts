import config from '@/config';
import BaseRequest from './BaseRequest';

export default class AgentRequest extends BaseRequest {
  getUrlPrefix() {
    return config.authApiUrl;
  }

  async getListAgents() {
    const url = '/api/v1/agent';
    return this.get(url);
  }

  async getConnectedAgents() {
    const url = '/api/v1/agent/connected';
    return this.get(url);
  }
}
