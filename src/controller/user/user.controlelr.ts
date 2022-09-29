import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
// import cos from './../client/ossClient';
import { JwtService } from '@midwayjs/jwt';

import { User } from '../../entity/user';
import { ISuccessResult } from '../../types/commonResult';

import { GlobalResultMessageEnum, GlobalResultCodeEnum } from '../../enums/httpEnum';

import { UserService } from '../../service/user/user.service';

// import { PrismaClient } from '@prisma/client';

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
    // const { userEmail, userPwd } = body;
    // const aUser: IUser = {
    //   userName: userEmail,
    //   pwd: userPwd,
    //   age: 14,
    // };

    // const bucketData = null;
    // await cos.getService(null, (_err, data) => {
    //   bucketData = data.Buckets;
    //   console.log(data.Buckets);
    // });
    // console.log(this.environmentService.isDevelopmentEnvironment());
    // console.log(this.configService.getConfiguration());
    // const token = this.jwtService.signSync(aUser);
    return {
      code: 0,
      message: '登陆成功',
      result: {},
    };
  }

  @Post('/register')
  async registerUser(@Body() body): Promise<ISuccessResult<any>> {
    const { userEmail, userPhone, userName, userPwd } = body;
    const user: User = {
      userName: userName,
      userEmail: userEmail,
      userPhone: userPhone,
      userPwd: userPwd,
      create_time: new Date(),
    };
    try {
      const result = await this.userService.insertUser(user);
      return result;
    } catch (error) {
      const optLogger = this.ctx.getLogger('operateLogger');
      optLogger.error(error);
      return {
        code: GlobalResultCodeEnum.ERROR,
        message: GlobalResultMessageEnum.ERROR,
      };
    }

    // const prisma = new PrismaClient();

    // async function main() {
    //   const result = await prisma.t_user.update({
    //     where: { userId: 110 },
    //     data: { userEmail: 'tees@.c' },
    //   });
    //   return result;
    // }
    // return main()
    //   .then(async r => {
    //     await prisma.$disconnect();
    //     console.log(r);
    //     return {
    //       code: 0,
    //       message: '注册成功',
    //     };
    //   })
    //   .catch(async e => {
    //     console.error(e);
    //     await prisma.$disconnect();
    //     return {
    //       code: GlobalResultCodeEnum.ERROR,
    //       message: GlobalResultMessageEnum.ERROR,
    //     };
    //   });
  }

  @Post('/updateUserInfo')
  async updateUserById(@Body() body): Promise<ISuccessResult<any>> {
    const userInfo: User = body;
    try {
      const updateRes = await this.userService.updateUserById(userInfo);
      return {
        code: 0,
        message: '',
        result: updateRes,
      };
    } catch (error) {
      const optLogger = this.ctx.getLogger('operateLogger');
      optLogger.error(error);
      return {
        code: GlobalResultCodeEnum.ERROR,
        message: GlobalResultMessageEnum.ERROR,
      };
    }
  }

  @Get('/getUserInfo')
  async getUser(@Query('id') id: number): Promise<ISuccessResult<User[]>> {
    try {
      const allUsers = await this.userService.queryAllUser();
      return {
        code: 0,
        message: '',
        result: allUsers,
      };
    } catch (error) {
      const optLogger = this.ctx.getLogger('operateLogger');
      optLogger.error(error);
      return {
        code: GlobalResultCodeEnum.ERROR,
        message: GlobalResultMessageEnum.ERROR,
      };
    }
  }
}
