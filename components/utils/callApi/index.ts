import { ApiUrl, baseUrl } from '@ek-components/config/api';
import { getAccessToken } from '@ek-components/Auth/authToken';
import axios, { AxiosError } from 'axios';

export interface ApiInput {
  url: ApiUrl;
  params?: Record<string, string | number | boolean | undefined>;
  query?: Record<string, string | number | boolean | undefined>;
  data?: any;
  config?: axios.AxiosRequestConfig<any>;
}
// axios hooks to include token
axios.interceptors.request.use((config) => {
  // read token from cookies
  const token = getAccessToken();
  if (token) {
    config.headers['Authorization'] = token;
  }

  return config;
});

export const getApi = async <T>({
  url,
  params,
  query,
  config,
}: ApiInput): Promise<T> => {
  if (baseUrl === '') {
    throw Error('API base url not found');
  }

  const apiUrl = replaceParamsInUrl(`${baseUrl}${url}`, params);
  const result = await axios.get<T>(
    attachQueryString(apiUrl, query || {}),
    config
  );
  return result.data;
};

export const postApi = async <T>({
  url,
  params,
  data,
}: ApiInput): Promise<T> => {
  const apiUrl = replaceParamsInUrl(`${baseUrl}${url}`, params);
  const result = await axios.post<T>(apiUrl, data);
  return result.data;
};

export const putApi = async <T>({
  url,
  data,
  params,
}: ApiInput): Promise<T> => {
  const apiUrl = replaceParamsInUrl(`${baseUrl}${url}`, params);
  const result = await axios.put<T>(apiUrl, data);
  return result.data;
};

export const deleteApi = async <T>({
  url,
  data,
  params,
}: ApiInput): Promise<T> => {
  const apiUrl = replaceParamsInUrl(`${baseUrl}${url}`, params);
  const result = await axios.delete<T>(apiUrl, data);
  return result.data;
};

export const replaceParamsInUrl = (
  url: string,
  params?: Record<string, string | number | boolean | undefined>
) => {
  if (!params) return url;

  let modifiedUrl = url;
  Object.keys(params).forEach((param) => {
    modifiedUrl = modifiedUrl.replace(`:${param}`, String(params[param]));
  });

  return modifiedUrl;
};

export const attachQueryString = (
  url: string,
  params: Record<string, string | number | boolean | undefined>
) => {
  const queryString = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  return `${url}?${queryString}`;
};

export const getErrorMessage = (error: AxiosError | any) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  return error?.message;
  // return error.response?.data || 'error ';
};

export const getSuccessMessage = (response: any) => {
  return response?.data?.message || 'Success';
};

export const handleError = (error: unknown) => {
  const axiosError = error as AxiosError;
  const errorMessage = getErrorMessage(axiosError);

  return {
    error: {
      status: axiosError.response?.status || 500,
      statusText: axiosError.message,
      data: errorMessage,
    },
  };
};
