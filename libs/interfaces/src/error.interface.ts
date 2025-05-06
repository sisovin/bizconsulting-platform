export interface CustomError {
  message: string;
  status: number;
  type: 'client' | 'server' | 'network';
  details?: any;
}
