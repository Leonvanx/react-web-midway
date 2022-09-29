import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
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
  }

  @Post('/updateUserInfo')
  async updateUserById(@Body() body): Promise<ISuccessResult<any>> {
    const userInfo: User = body;
    try {
      const updateRes = await this.userService.updateUserById(userInfo);
      return updateRes;
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
        code: GlobalResultCodeEnum.SUCCESS,
        message: GlobalResultMessageEnum.SUCCESS,
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
