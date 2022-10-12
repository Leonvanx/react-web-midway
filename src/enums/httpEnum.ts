// /**
//  * @description: Request result set
//  */
export enum GlobalResultCodeEnum {
  SUCCESS = 0,
  ERROR = -1,
  TIMEOUT = 401,
}

export enum GlobalResultMessageEnum {
  SUCCESS = '成功！',
  ERROR = '服务器内部错误！',
  TIMEOUT = '响应超时，请稍后再试!',
  NO_DATA = '暂无匹配数据',
}
