import AuthRequest from './AuthRequest';
import ThreadRequest from './ThreadRequest';
import MessageRequest from './MessageRequest';

const requestMap = {
  AuthRequest,
  ThreadRequest,
  MessageRequest,
};

const instances = {} as any;

type RequestMap = typeof requestMap;

type RequestKey = keyof RequestMap;

export default class RequestFactory {
  static getRequest<T extends RequestKey>(
    classname: T,
  ): InstanceType<RequestMap[T]> {
    const RequestClass = requestMap[classname];
    if (!RequestClass) {
      throw new Error(`Invalid request class name: ${classname}`);
    }

    let requestInstance = instances[classname];
    if (!requestInstance) {
      requestInstance = new RequestClass();
      instances[classname] = requestInstance;
    }

    return requestInstance;
  }
}
