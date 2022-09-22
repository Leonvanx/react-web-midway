export interface ISuccessResult<T> {
  code: number;
  message: string;
  result?: T;
}
