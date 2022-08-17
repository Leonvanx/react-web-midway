import { Provide } from '@midwayjs/decorator';
// import { IUser } from '../interface';

@Provide()
export class UserService {
  async getUser(uid: number) {
    return {
      uid: uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
}
