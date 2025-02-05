import AgentRequest from './AgentRequest';
import AuthRequest from './AuthRequest';
import RaidenxRequest from './RaidenxRequest';

const requestMap = {
  AuthRequest,
  AgentRequest,
  RaidenxRequest,
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
