export default interface ErrorType {
  status?: number;
  statusName?: string;
  errorCode?: number;
  message: string;
  errors: { [key: string]: string[] };
}
