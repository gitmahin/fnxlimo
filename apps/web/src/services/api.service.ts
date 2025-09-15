import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";

export abstract class ApiService {
  baseURL: string;
  private axiosInstance: AxiosInstance;
  constructor(baseURL: string, headers?: AxiosRequestHeaders) {
    this.baseURL = baseURL;
    this.axiosInstance = axios.create({
      baseURL,
      withCredentials: true,
      headers,
    });
  }

  protected get(url: string, params?: {}, config: AxiosRequestConfig = {}) {
    return this.axiosInstance.get(url, {
      ...params,
      ...config,
    });
  }

  protected post(url: string, data: {}, params?: {}, config: AxiosRequestConfig = {}) {
    return this.axiosInstance.post(url, data, {
      ...params,
      ...config,
    });
  }

  protected put(url: string, data: {}, config: AxiosRequestConfig = {}) {
    return this.axiosInstance.put(url, data, config);
  }

  protected patch(url: string, data: {}, config: AxiosRequestConfig = {}) {
    return this.axiosInstance.patch(url, data, config);
  }
}
