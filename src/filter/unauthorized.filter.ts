import { Catch } from '@midwayjs/decorator';
import { httpError, MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Catch(httpError.UnauthorizedError)
export class UnauthorizedFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    return {
      code: err.status,
      message: err.message,
    };
  }
}
