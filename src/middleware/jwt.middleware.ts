import { Inject, Middleware } from '@midwayjs/decorator';
import { Context, NextFunction } from '@midwayjs/koa';
import { httpError } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';

@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService;

  public static getName(): string {
    return 'jwt';
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 判断下有没有校验信息
      if (!ctx.headers['authorization']) {
        throw new httpError.UnauthorizedError('用户未授权');
      }
      // 从 header 上获取校验信息
      const parts = ctx.get('authorization').trim().split(' ');

      if (parts.length !== 2) {
        throw new httpError.UnauthorizedError('用户信息已过期，请重新登录');
      }

      const [scheme, token] = parts;

      if (/^Bearer$/i.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          await this.jwtService.verify(token, {
            complete: true,
          });
        } catch (error) {
          //token过期 生成新的token
          throw new httpError.UnauthorizedError('用户信息已过期，请重新登录!');
          // const newToken = this.jwtService.signSync(payload, secretOrPrivateKey, { algorithm: 'RS256' });
          //将新token放入Authorization中返回给前端
          // ctx.set('Authorization', 'Bearer ' + newToken);
        }
        await next();
      }
    };
  }

  // 配置忽略鉴权的路由地址
  public match(ctx: Context): boolean {
    const ignoreUrlArr = ['/user/login', '/user/register'];
    for (const item of ignoreUrlArr) {
      if (ctx.path.indexOf(item) !== -1) {
        return false;
      } else {
        return true;
      }
    }
  }
}
