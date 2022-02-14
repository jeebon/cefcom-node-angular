export interface CommonResponse {
  message: string;
  path?: string,
  timestamp?: number,
  error?: boolean,
  validationErrors?: any
}
