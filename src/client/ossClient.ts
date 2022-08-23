import COS = require('cos-nodejs-sdk-v5');

const cos = new COS({
  SecretId: process.env.REACT_WEB_COS_SECRET_ID || '',
  SecretKey: process.env.REACT_WEB_COS_SECRET_KEY || '',
});
/* 自己封装的上传方法 */

const myUpload = () => {
  cos.putObject(
    {
      Bucket: 'xulf-oss-1256971899' /* 必须 */,
      Region: 'ap-shanghai' /* 必须 */,
      Key: 'exampleobject' /* 必须 */,
      StorageClass: 'STANDARD',
      Body: fs.createReadStream('./exampleobject'), // 上传文件对象
      onProgress: function (progressData) {
        console.log(JSON.stringify(progressData));
      },
    },
    (err, data) => {
      console.log(err || data);
    }
  );
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
