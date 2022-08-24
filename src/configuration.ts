import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as dotenv from 'dotenv';
import * as cos from '@midwayjs/cos';
import { join } from 'path';
import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { ILifeCycle } from '@midwayjs/core';

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
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: koa.Application;

  async onConfigLoad(): Promise<void> {}
  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
  async onServerReady(): Promise<void> {
    console.info('appServer is ready');
  }
  async onStop(): Promise<void> {
    console.log('app is stop');
  }
}
