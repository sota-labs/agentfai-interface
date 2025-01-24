import BaseRequest from "./BaseRequest";

export default class ExampleRequest extends BaseRequest {
  async getExample() {
    return this.get('/example');
  }
}
