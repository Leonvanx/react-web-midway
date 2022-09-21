import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userRepo: Repository<User>;

  async insertUser(userData: User) {
    try {
      const userResult = await this.userRepo.save(userData);
      console.log('user id = ', userResult.userId);
      return {
        username: 'mockedName',
        phone: '12345678901',
        email: 'xxx.xxx@xxx.com',
      };
    } catch (error) {
      console.log(error);
    }
  }
}
