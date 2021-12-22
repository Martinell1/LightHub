const {accessKey,secretKey,bucket} = require("../config/upload")
const qiniu = require('qiniu')
const ResultFactory = require('../result')

const upload = async ctx =>{
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

  const options = {
    scope: bucket,
    expires: 7200
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);
  if(uploadToken){
     ctx.body = ResultFactory.buildSuccessResult(undefined,uploadToken)
  }
}

module.exports = {
  upload
}