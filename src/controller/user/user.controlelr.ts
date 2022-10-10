import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';

import { User } from '../../entity/user/user';
import { ISuccessResult } from '../../types/commonResult';

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
  async loginUser(@Body() body: User): Promise<ISuccessResult<any>> {
    const { userEmail } = body;
    try {
      const queryEmailResult = await this.userService.queryCountEmail(userEmail);
      if (queryEmailResult === 0) {
        return {
          code: GlobalResultCodeEnum.ERROR,
          message: UserControllerResMessage.EMAIL_NO_REGISTER,
        };
      }
      const queryUserResult = await this.userService.queryUserByEmail(userEmail);
      if (userEmail === queryUserResult.result.userEmail) {
        const token = this.jwtService.signSync(queryUserResult);
        this.ctx.set('token', token);
        return {
          code: GlobalResultCodeEnum.SUCCESS,
          message: UserControllerResMessage.LOGIN_SUCCESS,
        };
      }
    } catch (error) {
      return {
        code: GlobalResultCodeEnum.ERROR,
        message: GlobalResultMessageEnum.ERROR,
      };
    }
  }

  @Post('/register')
  async registerUser(@Body() body): Promise<ISuccessResult<any>> {
    const { userEmail, userName, userPwd } = body;
    const user: User = {
      userName: userName,
      userPwd: userPwd,
      userEmail: userEmail,
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
  async updateUserById(@Body() body): Promise<ISuccessResult<any>> {
    const userInfo: User = body;
    try {
      const result = await this.userService.updateUserById(userInfo);
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
  async getUserList(): Promise<ISuccessResult<User[]>> {
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
