import config from '@/config';
import BaseRootRequest from './BaseRequest';

export default class MessageRequest extends BaseRootRequest {
  getUrlPrefix() {
    return config.authApiUrl;
  }

  createMessage(params: any) {
    const url = `/api/v1/message`;
    return this.post(url, params);
  }

  getSSEMessage(messageID: string) {
    const url = `/api/v1/message/sse/${messageID}`;

    return this.getSse(url);
  }
}
