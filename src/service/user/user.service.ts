import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../entity/user/user';
import { ISuccessResult } from './../../types/commonResult.d';

import { GlobalResultCodeEnum, GlobalResultMessageEnum } from '../../enums/httpEnum';
import { UserControllerResMessage } from '../../enums/userEnum';

import { queryUserByLoginAccountSql } from './user.sql';
import { JwtService } from '@midwayjs/jwt';
import { Context } from '@midwayjs/koa';
@Provide()
export class UserService {
  @InjectEntityModel(User)
  userRepo: Repository<User>;
  @Inject()
  ctx: Context;
  @Inject()
  jwtService: JwtService;

  /**
   *
   * @description 用户注册
   * @param userData
   * @returns code,message
   */
  async registerUser(userData: User): Promise<ISuccessResult<null>> {
    try {
      const queryEmailCountResult = await this.queryCountEmail(userData.userEmail);
      if (queryEmailCountResult !== 0) {
        return {
          code: GlobalResultCodeEnum.ERROR,
          message: UserControllerResMessage.EMAIL_HAS_REGISTER,
        };
      }
      await this.userRepo.save(userData);
      return {
        code: GlobalResultCodeEnum.SUCCESS,
        message: UserControllerResMessage.REGISTER_SUCCESS,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async loginUser(loginInfo: User, queryAccountResult: User): Promise<ISuccessResult<null>> {
    const { userPwd } = loginInfo;
    if (userPwd === queryAccountResult.userPwd) {
      const token = this.jwtService.signSync(queryAccountResult);
      this.ctx.set('authorization', token);
      return {
        code: GlobalResultCodeEnum.SUCCESS,
        message: UserControllerResMessage.LOGIN_SUCCESS,
      };
    } else {
      return {
        code: GlobalResultCodeEnum.ERROR,
        message: UserControllerResMessage.LOGIN_ERROR,
      };
    }
  }

  async getUserList(): Promise<ISuccessResult<User[]>> {
    try {
      const result = await this.userRepo.find();
      return {
        code: GlobalResultCodeEnum.SUCCESS,
        message: GlobalResultMessageEnum.SUCCESS,
        result: result,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async queryCountEmail(email: string): Promise<number> {
    try {
      const result = await this.userRepo.countBy({
        userEmail: email,
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async queryUserByEmail(email: string): Promise<ISuccessResult<User>> {
    try {
      const queryResult: User = await this.userRepo.findOneBy({
        userEmail: email,
      });
      if (queryResult == null) {
        return {
          code: GlobalResultCodeEnum.SUCCESS,
          message: GlobalResultMessageEnum.NO_DATA,
        };
      }
      return {
        code: GlobalResultCodeEnum.SUCCESS,
        message: GlobalResultMessageEnum.SUCCESS,
        result: queryResult,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async queryUserByLoginAccount(loginAccount: string): Promise<User[]> {
    try {
      const queryResult = await this.userRepo.query(queryUserByLoginAccountSql, [
        loginAccount,
        loginAccount,
        loginAccount,
      ]);
      return queryResult;
    } catch (error) {
      throw new Error(error);
    }
  }

  async queryUserById(id: number): Promise<ISuccessResult<User>> {
    try {
      const queryResult: User = await this.userRepo.findOneBy({
        userId: id,
      });
      if (queryResult == null) {
        return {
          code: GlobalResultCodeEnum.SUCCESS,
          message: GlobalResultMessageEnum.NO_DATA,
        };
      }
      return {
        code: GlobalResultCodeEnum.SUCCESS,
        message: GlobalResultMessageEnum.SUCCESS,
        result: queryResult,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUserById(userInfo: User, authorization: string): Promise<ISuccessResult<null>> {
    try {
      const parts = authorization.trim().split(' ');
      const [, token] = parts;
      const headerTokenInfo = this.jwtService.decodeSync(token);
      const queryResult = await this.userRepo.findOneBy({
        //@ts-ignore
        userId: headerTokenInfo.userId,
      });
      if (queryResult == null) {
        return {
          code: GlobalResultCodeEnum.ERROR,
          message: GlobalResultMessageEnum.NO_DATA,
        };
      }
      Object.assign(queryResult, userInfo);
      await this.userRepo.save(queryResult);
      return {
        code: GlobalResultCodeEnum.SUCCESS,
        message: GlobalResultMessageEnum.SUCCESS,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
