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
}
