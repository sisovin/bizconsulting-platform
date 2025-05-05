import axios, { AxiosResponse } from 'axios';

export async function makeApiCall<T>(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any): Promise<AxiosResponse<T>> {
  try {
    const response = await axios({
      url,
      method,
      data,
    });
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
}

export function handleApiError(error: any): Error {
  if (axios.isAxiosError(error)) {
    // Handle Axios-specific errors
    return new Error(`API Error: ${error.response?.status} - ${error.response?.statusText}`);
  } else {
    // Handle other errors
    return new Error('An unexpected error occurred');
  }
}
