import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../entity/user';
import { GlobalResultCodeEnum, GlobalResultMessageEnum } from '../../enums/httpEnum';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userRepo: Repository<User>;

  async insertUser(userData: User) {
    try {
      await this.userRepo.save(userData);
      return {
        code: GlobalResultCodeEnum.SUCCESS,
        message: GlobalResultMessageEnum.SUCCESS,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUserById(userInfo: User) {
    try {
      const queryResult = await this.userRepo.find({
        where: {
          userId: userInfo.userId,
        },
      });
      if (queryResult == null) {
        return {
          code: GlobalResultCodeEnum.SUCCESS,
          message: GlobalResultMessageEnum.NO_DATA,
        };
      }
      await this.userRepo.save(queryResult);
      return {
        code: GlobalResultCodeEnum.SUCCESS,
        message: GlobalResultMessageEnum.SUCCESS,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async queryAllUser() {
    try {
      const result = await this.userRepo.find();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
