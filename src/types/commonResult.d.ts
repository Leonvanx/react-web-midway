export interface ISuccessResult<T> {
  code: number;
  message: string;
  result?: T;
}

export interface IPageParams {
  pageSize: number;
  pageNo: number;
}
