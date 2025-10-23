export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface FormState {
  loading: boolean;
  error: string;
  success: boolean;
}
