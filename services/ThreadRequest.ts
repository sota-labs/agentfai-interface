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

  getThread(threadId: any) {
    const url = `/api/v1/thread/${threadId}`;
    return this.get(url, { id: threadId });
  }

  getMessages(threadId: any, params: any) {
    const url = `/api/v1/thread/${threadId}/messages`;
    return this.get(url, params);
  }

  deleteThread(threadId: any) {
    const url = `/api/v1/thread/${threadId}`;
    return this.delete(url, { id: threadId });
  }
}
