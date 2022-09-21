import { User } from './../entity/user';
import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
// import cos from './../client/ossClient';
import { ISuccessResult, IUser } from '../interface';
import { JwtService } from '@midwayjs/jwt';
import { UserService } from '../service/user.service';
// import { User } from '../entity/user';

@Controller('/user')
export class UserController {
  @Inject()
  ctx: Context;
  @Inject()
  jwtService: JwtService;
  @Inject()
  userService: UserService;

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
    // const bucketData = null;
    // await cos.getService(null, (_err, data) => {
    //   bucketData = data.Buckets;
    //   console.log(data.Buckets);
    // });
    // console.log(this.environmentService.isDevelopmentEnvironment());
    // console.log(this.configService.getConfiguration());

    const token = this.jwtService.signSync(aUser);
    return {
      code: 0,
      message: '登陆成功',
      result: { ...aUser, token: token },
    };
  }

  @Post('/register')
  async registerUser(@Body() body): Promise<ISuccessResult<any>> {
    const { userEmail, userPhone, userName, userAdress, userPwd } = body;
    const user: User = {
      userName: userName,
      userEmail: userEmail,
      userPhone: userPhone,
      userPwd: userPwd,
      userId: 0,
    };
    try {
      await this.userService.insertUser(user);
      return {
        code: 0,
        message: '注册成功！',
      };
    } catch (error) {
      return {
        code: -1,
        message: '注册成功！',
      };
    }
  }

  @Get('/getUserInfo')
  async getUser(@Query('id') id: number): Promise<ISuccessResult<IUser>> {
    const aUser: IUser = {
      uid: id,
      userName: '四1',
      pwd: 'AC24',
      age: 14,
    };
    return {
      code: 0,
      message: '',
      result: aUser,
    };
  }
}
