
interface ResponseApiMessage {
  message: string;
  type?: 'error' | 'success';
}

export const getErrorString = (error: any): ResponseApiMessage => {
  return {
    message: error?.data?.error || error?.data || 'An unexpected error occurred',
    type: 'error',
  };
};

export const getSuccessString = (response: any): ResponseApiMessage => {
  return {
    message: response?.message || 'Operation completed successfully',
    type: 'success',
  };
};