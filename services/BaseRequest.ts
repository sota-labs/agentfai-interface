/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
// import { load } from 'recaptcha-v3';
import config from "@/config";
// import retry from 'async-retry';

export const setAuthorizationToRequest = (token: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default class BaseRequest {
  protected accessToken = '';
  constructor(accessToken?: string | undefined) {
    if (accessToken) {
      this.accessToken = accessToken;
      setAuthorizationToRequest(accessToken);
    }
  }

  getUrlPrefix() {
    return config.authApiUrl;
  }

  async buildCustomHeaders() {
    return {
      'x-request-id': uuidv4(),
    };
  }

  async _handleRequest(requestFn: () => Promise<any>) {
    try {
      const response = await requestFn();
      return this._responseHandler(response);
    } catch (error) {
      return this._errorHandler(error);
    }
  }

  async get(url: string, params?: any) {
    const config = {
      params,
      headers: await this.buildCustomHeaders(),
    };
    return this._handleRequest(() => axios.get(this.getUrlPrefix() + url, config));
  }

  async getWithoutEncode(url: string, params?: any) {
    const config = {
      params,
      headers: await this.buildCustomHeaders(),
      paramsSerializer: (params: any) => {
        return Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join('&');
      },
    };
    return this._handleRequest(() => axios.get(this.getUrlPrefix() + url, config));
  }

  async put(url: any, data?: any) {
    const config = {
      headers: await this.buildCustomHeaders(),
    };
    return this._handleRequest(() => axios.put(this.getUrlPrefix() + url, data, config));
  }

  async patch(url: any, data?: any) {
    const config = {
      headers: await this.buildCustomHeaders(),
    };
    return this._handleRequest(() => axios.patch(
      this.getUrlPrefix() + url,
      data,
      config,
    ));
  }

  async post(url: any, data = {}) {
    const config = {
      headers: await this.buildCustomHeaders(),
    };
    return this._handleRequest(() => axios.post(
      this.getUrlPrefix() + url,
      data,
      config,
    ));
  }

  async delete(url: any, data?: any) {
    const config = {
      data,
      headers: await this.buildCustomHeaders(),
    };
    return this._handleRequest(() => axios.delete(this.getUrlPrefix() + url, config));
  }

  async download(url: any, data?: any) {
    const config = {
      ...data,
      headers: await this.buildCustomHeaders(),
      responseType: 'blob',
    };
    return this._handleRequest(() => axios.get(this.getUrlPrefix() + url, config));
  }

  async _responseHandler(response: any) {
    return response.data;
  }

  async _error401Handler() {
    // TODO: make broadcast event
  }

  _error403Handler() {
    // TODO: make broadcast event
  }

  async _errorHandler(err: any) {
    if (err.response?.status === 401) {
      return this._error401Handler();
    }

    if (err.response?.status === 403) {
      return this._error403Handler();
    }

    if (err.response && err.response.data && err.response.data.data) {
      if (typeof err.response.data.data.message === 'string') {
        throw new Error(err.response.data.data.message);
      }
    }

    if (err.response && err.response.data && err.response.data.message) {
      if (typeof err.response.data.message === 'string') {
        throw new Error(err.response.data.message);
      }
      throw new Error(err.response.data.message[0]);
    }

    if (err.response && err.response.data && err.response.data.error) {
      throw new Error(err.response.data.error);
    }

    if (
      err.response &&
      err.response.data &&
      typeof err.response.data === 'string'
    ) {
      throw new Error(err.response.data);
    }

    throw err;
  }
}
