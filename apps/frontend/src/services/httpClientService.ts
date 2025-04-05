import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class HttpClientService {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.client.get<T>(url, config);
    } catch (error: any) {
      if (error.response?.status === 404) {
        return { data: null } as AxiosResponse<T>;
      }
      throw error;
    }
  }

  async post<T, TData = unknown>(
    url: string,
    data: TData,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  async put<T, TData = unknown>(
    url: string,
    data: TData,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }

  async patch<T, TData = unknown>(
    url: string,
    data: TData,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(url, data, config);
  }
}

export default HttpClientService;
