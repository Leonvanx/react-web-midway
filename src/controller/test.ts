import { Body, Controller, Inject, Post } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import { UserService } from '../service/user/user.service';
import { ISuccessResult } from '../types/commonResult';

// import { PrismaClient } from '@prisma/client';

@Controller('/test')
export class UserController {
  @Inject()
  ctx: Context;
  @Inject()
  jwtService: JwtService;
  @Inject()
  userService: UserService;

  @Post()
  async loginUser(@Body() body): Promise<ISuccessResult<any>> {
    // const { userEmail, userPwd } = body;
    // const aUser: IUser = {
    //   userName: userEmail,
    //   pwd: userPwd,
    //   age: 14,
    // };

    // const bucketData = null;
    // await cos.getService(null, (_err, data) => {
    //   bucketData = data.Buckets;
    //   console.log(data.Buckets);
    // });
    // console.log(this.environmentService.isDevelopmentEnvironment());
    // console.log(this.configService.getConfiguration());
    // const token = this.jwtService.signSync(aUser);

    // const prisma = new PrismaClient();

    // async function main() {
    //   const result = await prisma.t_user.update({
    //     where: { userId: 110 },
    //     data: { userEmail: 'tees@.c' },
    //   });
    //   return result;
    // }
    // return main()
    //   .then(async r => {
    //     await prisma.$disconnect();
    //     console.log(r);
    //     return {
    //       code: 0,
    //       message: '注册成功',
    //     };
    //   })
    //   .catch(async e => {
    //     console.error(e);
    //     await prisma.$disconnect();
    //     return {
    //       code: GlobalResultCodeEnum.ERROR,
    //       message: GlobalResultMessageEnum.ERROR,
    //     };
    //   });

    return {
      code: 0,
      message: '测试接口',
      result: {},
    };
  }
}
