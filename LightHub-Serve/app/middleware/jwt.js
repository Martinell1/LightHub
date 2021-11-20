const koajwt = require('koa-jwt')
const { SECRET } = require('../config/jwt')
// const {verify} = require('../utils/getToken')


const mKoaJWT = koajwt({ secret: SECRET }).unless({
  // 设置login、register接口，可以不需要认证访问
  path: [
    /^\/api\/user\/login/ ,// 注册
    /^\/api\/user\/register/ // 注册
  ]
})

const auth = async (ctx, next) => {
  return next().catch((err) => {
      if(err.status === 401){
          ctx.status = 401;
          ctx.body = 'Protected resource, use Authorization header to get access\n';
      }else{
          throw err;
      }
  })
}

// const getAuth = async (ctx,next) => {
//   const path = ctx.originalUrl.split('/');
//   if(path[3] === 'update' || path[3] === 'remove'){
//     let auth = ctx.header.authorization;
//     let token = auth.split(' ')[1];
//     const id = verify(token).id;
//     let result = await us.findOne({"_id":id})
//     let body = ctx.request.body;

//   }
//   return next()
// }


module.exports = {
  mKoaJWT,
  auth,
}