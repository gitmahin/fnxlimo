import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export abstract class ApiService {
  baseUrl: string;
  private axiosInstance: AxiosInstance;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      withCredentials: true
    });
  }

  get(url: string, params?: {}, config: AxiosRequestConfig = {} ){
    return this.axiosInstance.get(url, {
        ...params,
        ...config
    })
  }

  post(url: string, data: {}, params: {}, config: AxiosRequestConfig = {}) {
    return this.axiosInstance.post(url, data, {
        ...params,
        ...config
    })
  }

  put(url: string, data: {}, config: AxiosRequestConfig = {}) {
    return this.axiosInstance.put(url, data, config)
  }

  patch(url: string, data: {}, config: AxiosRequestConfig = {}) {
    return this.axiosInstance.patch(url, data, config)
  }
}
