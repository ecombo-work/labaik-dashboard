export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  errors: string[] | { field: any; message: unknown[] }[] | null;
  statusCode: number;
}
