import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
// import cos from './../client/ossClient';
import { ISuccessResult, IUser } from './../interface';

@Controller('/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Post('/login')
  async loginUser(@Body() body): Promise<ISuccessResult<any>> {
    const { userEmail, userPwd } = body;
    const aUser: IUser = {
      userName: userEmail,
      pwd: userPwd,
      age: 14,
    };
    // const optLogger = this.ctx.getLogger('operateLogger');
    // optLogger.error('测试打印日志。。。');
    const bucketData = null;
    // await cos.getService(null, (_err, data) => {
    //   bucketData = data.Buckets;
    //   console.log(data.Buckets);
    // });
    // console.log(this.environmentService.isDevelopmentEnvironment());
    // console.log(this.configService.getConfiguration());
    return {
      code: 0,
      message: '登陆成功',
      result: { ...aUser, bucketData: bucketData },
    };
  }
  @Get('/getUserInfo')
  async getUser(@Query('id') id: number): Promise<IUser> {
    const aUser: IUser = {
      uid: id,
      userName: '四1',
      pwd: 'AC24',
      age: 14,
    };
    return aUser;
  }
}
