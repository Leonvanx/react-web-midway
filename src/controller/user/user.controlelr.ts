import { Headers, Body, Controller, Get, Inject, Post } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';

import { User } from '../../entity/user/user';
import { IPageParams, ISuccessResult } from '../../types/commonResult';

import { GlobalResultMessageEnum, GlobalResultCodeEnum } from '../../enums/httpEnum';

import { UserService } from '../../service/user/user.service';
import { UserControllerResMessage } from '../../enums/userEnum';

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
  async login(@Body() body: User): Promise<ISuccessResult<null>> {
    const { userName } = body;
    try {
      const queryAccountResult = await this.userService.queryUserByLoginAccount(userName);
      if (queryAccountResult.length === 0) {
        return {
          code: GlobalResultCodeEnum.ERROR,
          message: UserControllerResMessage.LOGIN_ERROR,
        };
      }
      const loginResult = await this.userService.loginUser(body, queryAccountResult[0]);
      return loginResult;
    } catch (error) {
      return {
        code: GlobalResultCodeEnum.ERROR,
        message: GlobalResultMessageEnum.ERROR,
      };
    }
  }

  @Post('/register')
  async register(@Body() body: User): Promise<ISuccessResult<null>> {
    const { userEmail, userName, userPwd, userPhone } = body;
    const user: User = {
      userName: userName,
      userPwd: userPwd,
      userEmail: userEmail,
      userPhone: userPhone,
      createTime: new Date(),
    };
    try {
      const result = await this.userService.registerUser(user);
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
  async updateUserInfo(@Headers('authorization') token: string, @Body() body: User): Promise<ISuccessResult<null>> {
    try {
      const result = await this.userService.updateUserById(body, token);
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

  @Get('/getUserInfo')
  async getUserInfo(@Body() body: User): Promise<ISuccessResult<User>> {
    const { userId } = body;
    try {
      const result = await this.userService.queryUserById(userId);
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

  @Get('/getUserList')
  async getUserList(@Body() body: IPageParams): Promise<ISuccessResult<User[]>> {
    // const { pageSize, pageNo } = body;
    try {
      const result = await this.userService.getUserList();
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
}
