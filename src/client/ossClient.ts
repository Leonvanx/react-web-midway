import COS = require('cos-nodejs-sdk-v5');

const cos = new COS({
  SecretId:
    process.env.REACT_WEB_COS_SECRET_ID ||
    'AKIDtnmngP4Wnpd7UgiWUHtJcntlOq8E8rNh',
  SecretKey:
    process.env.REACT_WEB_COS_SECRET_KEY || 'A6WpFrwwlVOAl9b1GPXxPjtqcLc4TiO5',
});
/* 自己封装的上传方法 */

const myUpload = () => {
  cos.putObject({
    Body: '',
    Bucket: '',
    Region: '',
    Key: '',
  });
};

/* 自己封装的删除方法 */
const myDelete = () => {
  cos.deleteObject({
    Bucket: '',
    Region: '',
    Key: '',
  });
};
export { cos, myUpload, myDelete };
