import COS = require('cos-nodejs-sdk-v5');
import fs = require('fs');

const cos = new COS({
  SecretId: process.env.REACT_WEB_COS_SECRET_ID || '',
  SecretKey: process.env.REACT_WEB_COS_SECRET_KEY || '',
});
/* 自己封装的上传方法 */

const myUpload = (bucketName: string, Region: string, fileKey: string, fileUrl: string) => {
  cos.putObject(
    {
      Bucket: bucketName || 'xulf-oss-1256971899',
      Region: Region || 'ap-shanghai',
      Key: fileKey,
      StorageClass: 'STANDARD',
      Body: fs.createReadStream(fileUrl), // 上传文件对象
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
const myDelete = (bucketName: string, Region: string, fileKey: string) => {
  cos.deleteObject({
    Bucket: bucketName || 'xulf-oss-1256971899',
    Region: Region || 'ap-shanghai',
    Key: fileKey,
  });
};
export { myUpload, myDelete };
export default cos;
