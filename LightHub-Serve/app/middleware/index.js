const router = require('../routes');
const koaBody = require('koa-body');
const path = require('path');
const { mKoaJWT , auth ,getAuth } = require('./jwt');
const cors = require('koa2-cors');


const mCors =   cors({
  origin: function(ctx) { //设置允许来自指定域名请求
      return 'http://localhost:3000'; //只允许http://localhost:8080这个域名的请求
  },
  maxAge: 5, //指定本次预检请求的有效期，单位为秒。
  credentials: true, //是否允许发送Cookie
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
  allowHeaders: ['origin','Content-Type', 'Authorization', 'Accept', 'Token'], //设置服务器支持的所有头信息字段
})


const mKoaBody = koaBody({
  multipart:true, // 支持文件上传
  encoding:'gzip',
  formidable:{
    uploadDir:path.join(__dirname,'../public/uploads'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
    onFileBegin:(name,file) => { // 文件上传前的设置
      // console.log(`name: ${name}`);
      // console.log(file);
    },
  }
})

module.exports = [
  mKoaBody,
  mCors,
  auth,
  mKoaJWT,
  router.routes(),
  router.allowedMethods(),
];

