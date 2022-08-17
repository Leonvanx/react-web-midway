import { MidwayConfig } from '@midwayjs/core';

export default {
  midwayLogger: {
    default: {
      format: info => {
        return `${info.timestamp} ${info.LEVEL} ${info.pid} ${info.labelText}${info.message}`;
      },
    },
    clients: {
      coreLogger: {
        // ...
      },
      appLogger: {
        // ...
      },
      operateLog: {
        fileLogName: 'operate.log.crn',
        contextFormat: info => {
          const ctx = info.ctx;
          return `${info.timestamp} ${info.LEVEL} [${
            Date.now() - ctx.startTime
          }ms ${ctx.method}] ${info.message}`;
        },
        // ...
      },
    },
  },
  // use for cookie sign key, should change to your own and keep security
  keys: 'react-web-session',
  koa: {
    port: process.env.PORT || 7001,
  },
} as MidwayConfig;
