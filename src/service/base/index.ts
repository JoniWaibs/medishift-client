import axios, { AxiosHeaders, AxiosInstance, AxiosResponse } from 'axios'


export class BaseService {
     #baseaUrl: string = `${process.env.REACT_APP_API_URL}`
     #buildRequest(customHeaders?: AxiosHeaders): AxiosInstance {

      const axiosInstance = axios.create({
        baseURL: this.#baseaUrl, // Your base URL
        withCredentials: true, // This enables sending cookies and other credentials
        headers: {
          ...(customHeaders && { customHeaders }),
          'Content-Type': 'application/json', // You can customize this based on your API needs
        },
      });

      // Optional: Add request/response interceptors if needed
      axiosInstance.interceptors.request.use(
        (config) => {
          // Modify config if needed before request is sent
          // No need to handle tokens, as cookies handle the JWT
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      axiosInstance.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          // Handle errors globally if necessary (e.g., log out on 401 Unauthorized)
          if (error.response && error.response.status === 401) {
            // Handle unauthorized access
            console.log('Unauthorized access, maybe log out the user or redirect.');
          }
          return Promise.reject(error);
        }
      );
      
      return axiosInstance;
    }

    protected async post(url: string, payload: Record<string, any>): Promise<AxiosResponse> {
        return await this.#buildRequest().post(`/${url}`, payload)
    }

    protected async get(url: string, params?: Record<string, string>): Promise<AxiosResponse> {
      return await this.#buildRequest().get(`${process.env.REACT_APP_API_URL}/${url}`, {
        params: {
          ...params || {}
        }
      })
  }
}