export interface ISuccessResult<T> {
  code: number;
  message: string;
  result?: T;
}

/**
 * @description User-Service parameters
 */
export interface IUser {
  uid?: number;
  userName: string;
  pwd: string;
  age: number;
}
