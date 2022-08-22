import { ISuccessResult } from './../interface';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
} from '@midwayjs/decorator';
import { IUser } from '../interface';
import {
  ILogger,
  MidwayConfigService,
  MidwayEnvironmentService,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Controller('/user')
export class UserController {
  @Inject()
  ctx: Context;
  @Inject()
  logger: ILogger;
  @Inject()
  environmentService: MidwayEnvironmentService;
  @Inject()
  configService: MidwayConfigService;

  @Post('/login')
  async loginUser(@Body() body): Promise<ISuccessResult<any>> {
    const { userName, pwd } = body;
    const aUser: IUser = {
      userName: userName,
      pwd: pwd,
      age: 14,
    };
    const optLogger = this.ctx.getLogger('operateLogger');
    optLogger.error('测试打印日志。。。');
    // this.logger.error('logger');
    // console.log(this.environmentService.isDevelopmentEnvironment());
    // console.log(this.configService.getConfiguration());
    return {
      code: 0,
      message: '登陆成功',
      result: aUser,
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
