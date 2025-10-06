import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type Method,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios';
import type { ApiResponse, ErrorResponse } from '@/lib/api/types/api';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

console.log('API_BASE_URL', API_BASE_URL);

// Default configuration for FPL API
const defaultConfig: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

// Create axios instance
const axiosClient: AxiosInstance = axios.create(defaultConfig);

// Request interceptor
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add Authorization header if token exists
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (import.meta.env.VITE_DEV) {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
      console.log('Authorization header:', config.headers.Authorization);
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (import.meta.env.VITE_DEV) {
      console.log(`API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  async (error: AxiosError) => {
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      console.error('API Error Response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        url: error.config?.url,
        data: error.response.data,
      });

      // Handle 401 Unauthorized - token expired or invalid
      if (error.response.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken && error.config && !(error.config as any)._retry) {
          (error.config as any)._retry = true;

          try {
            // Try to refresh the token
            const response = await axiosClient.post('/auth/token/refresh', {
              refresh_token: refreshToken,
            });

            const newToken = response.data.data.access_token;
            localStorage.setItem('accessToken', newToken);

            // Retry the original request with new token
            if (error.config) {
              error.config.headers.Authorization = `Bearer ${newToken}`;
              return axiosClient(error.config);
            }
          } catch (refreshError) {
            // Refresh failed, redirect to login
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/auth/login';
            return Promise.reject(refreshError);
          }
        } else {
          // No refresh token or already retried, redirect to login
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/auth/login';
        }
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.message);
    } else {
      // Something else happened
      console.error('Request Setup Error:', error.message);
    }

    return Promise.reject(error);
  }
);

/*Generic request function*/
const ApiRequest = <T = unknown, D = unknown>(options: {
  method: Method;
  url: string;
  data?: D;
  config?: AxiosRequestConfig;
}): Promise<ApiResponse<T>> => {
  return axiosClient
    .request({
      method: options.method,
      url: options.url,
      data: options.data,
      ...options.config,
    })
    .then((response: AxiosResponse<ApiResponse<T>>) => response.data)
    .catch((error: AxiosError<ErrorResponse>) => {
      throw new Error(
        error.response?.data?.error?.message || 'An error occurred'
      );
    });
};

export default ApiRequest;
