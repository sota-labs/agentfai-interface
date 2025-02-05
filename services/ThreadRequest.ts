import config from '@/config';
import BaseRootRequest from './BaseRequest';

export default class ThreadRequest extends BaseRootRequest {
  getUrlPrefix() {
    return config.authApiUrl;
  }

  getThreads(params: any) {
    const url = `/api/v1/thread`;
    return this.get(url, params);
  }
}
