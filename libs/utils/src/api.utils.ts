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

export function formatApiResponse<T>(data: T, message: string = 'Success', status: number = 200): { status: number, message: string, data: T } {
  return {
    status,
    message,
    data,
  };
}

export function validateRequest(schema: any, data: any): boolean {
  const { error } = schema.validate(data);
  if (error) {
    throw new Error(`Validation Error: ${error.message}`);
  }
  return true;
}

export function calculatePagination(page: number, limit: number): { skip: number, take: number } {
  const skip = (page - 1) * limit;
  const take = limit;
  return { skip, take };
}

export async function fetchWrapper<T>(url: string, options: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
