// import { User } from './../entity/user';
import { MidwayConfig } from '@midwayjs/core';
const os = require('os');
export default {
  hostname: process.env.HOST || '127.0.0.1',
  // JWT配置
  jwt: {
    secret: 'react-web-midway-jwt', // fs.readFileSync('xxxxx.key')
    expiresIn: '1d', // https://github.com/vercel/ms
  },
  // typeorm配置
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        driver: require('mysql2'),
        host: 'localhost',
        port: 3306,
        username: 'xulf',
        password: 'xulf@mysql',
        database: 'xulfDev',
        synchronize: false,
        logging: false,

        // 配置实体模型 - 路径扫描方式
        entities: ['/entity'],
      },
    },
  },
  // 腾讯云对象存储密钥配置
  cos: {
    client: {
      SecretId: '***********',
      SecretKey: '***********',
    },
  },
  // 日志配置
  midwayLogger: {
    default: {
      format: info => {
        return `${info.timestamp} ${info.LEVEL} ${info.pid} ${info.labelText}${info.message}`;
      },
    },
    clients: {
      coreLogger: {},
      appLogger: {},
      operateLogger: {
        enableConsole: false,
        dir: './logs/operate_logs',
        errorDir: './logs/operate_error_logs',
        fileLogName: `${os.hostname()}_operatelog.log`,
        errorLogName: `${os.hostname()}_operate_erroe_log.log`,
      },
    },
  },
  koa: {
    //上下文日志格式配置
    contextLoggerFormat: info => {
      const ctx = info.ctx;
      return `${info.timestamp} ${info.LEVEL} ${info.pid} ${Date.now() - ctx.startTime}ms [${ctx.method} ${ctx.url} ${
        ctx.hostname
      }] ${info.message}`;
    },
    port: process.env.PORT || 7001,
  },
  // use for cookie sign key, should change to your own and keep security
  keys: 'react-web-session',
} as MidwayConfig;
