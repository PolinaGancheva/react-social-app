import { AxiosError } from 'axios';
import { ErrorResponse } from 'types';

export const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const isAxiosError = (error: unknown): error is AxiosError<any> => {
  return isError(error) && !!(error as AxiosError<any>)?.response?.data;
};

export const extractErrorMsg = (error: unknown): string | null => {
  if (isAxiosError(error)) {
    return error.response?.data?.message;
  }
  if (isError(error)) {
    return error.message;
  }
  return null;
};

export const extractApiError = (error: unknown): ErrorResponse | null => {
  if (isAxiosError(error)) {
    return error?.response?.data;
  }
  return null;
};
