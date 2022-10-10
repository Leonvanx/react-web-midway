import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../entity/user/user';
import { ISuccessResult } from './../../types/commonResult.d';

import { GlobalResultCodeEnum, GlobalResultMessageEnum } from '../../enums/httpEnum';
import { UserControllerResMessage } from '../../enums/userEnum';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userRepo: Repository<User>;

  /**
   *
   * @description 用户注册
   * @param userData ：
   * @returns : code,message
   */
  async registerUser(userData: User): Promise<ISuccessResult<any>> {
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

  async loginUser(userEmail: string): Promise<ISuccessResult<any>> {
    return {
      code: GlobalResultCodeEnum.SUCCESS,
      message: UserControllerResMessage.LOGIN_SUCCESS,
    };
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

  async updateUserById(userInfo: User): Promise<ISuccessResult<any>> {
    try {
      const queryResult = await this.userRepo.findOneBy({
        userId: userInfo.userId,
      });
      if (queryResult == null) {
        return {
          code: GlobalResultCodeEnum.ERROR,
          message: GlobalResultMessageEnum.NO_DATA,
        };
      }
      Object.assign(queryResult, userInfo);
      console.log(queryResult);
      // Object.keys(userInfo).forEach(key2 => {
      //   Object.keys(queryResult).forEach(key1 => {
      //     if (key1 === key2) {
      //       queryResult[key1] = userInfo[key2];
      //     }
      //   });
      // });
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
