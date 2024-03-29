import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as dotenv from 'dotenv';
import * as cos from '@midwayjs/cos';
import * as jwt from '@midwayjs/jwt';
import * as orm from '@midwayjs/typeorm';

import { join } from 'path';

import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { UnauthorizedFilter } from './filter/unauthorized.filter';

import { ReportMiddleware } from './middleware/report.middleware';
import { JwtMiddleware } from './middleware/jwt.middleware';

import { ILifeCycle, IMidwayContainer } from '@midwayjs/core';

dotenv.config();
@Configuration({
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    cos,
    jwt,
    orm,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: koa.Application;

  async onConfigLoad(): Promise<void> {}
  async onReady(container: IMidwayContainer) {
    // add middleware
    this.app.useMiddleware([ReportMiddleware, JwtMiddleware]);
    // add filter
    this.app.useFilter([NotFoundFilter, DefaultErrorFilter, UnauthorizedFilter]);
  }
  async onServerReady(): Promise<void> {
    console.info('appServer is ready');
  }
  async onStop(): Promise<void> {
    console.log('app is stop');
  }
}
