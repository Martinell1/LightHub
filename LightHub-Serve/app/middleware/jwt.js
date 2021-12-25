const koajwt = require('koa-jwt')
const { SECRET } = require('../config/jwt')
const ResultFactory = require('../result')



const mKoaJWT = koajwt({ secret: SECRET }).unless({
  // 设置login、register接口，可以不需要认证访问
  path: [
    /^\/api\/user\/info/ ,
    /^\/api\/user\/login/ ,// 注册
    /^\/api\/user\/register/, // 注册
    /^\/api\/user\/action_list/,
    /^\/api\/user\/follow_list/,
    /^\/api\/article\/list/,
    /^\/api\/article\/listByAuthor/,
    /^\/api\/article\/detail/,
    /^\/api\/comment\/list/,
    /^\/api\/topic\/list/,
    /^\/api\/topic\/listByInitiator/,
    /^\/api\/topic\/detail/,
    /^\/api\/answer\/list/,
    /^\/api\/answer\/detail/,
    /^\/api\/answer\/listByAnswerer/,
    /^\/api\/tag\/list/,
  
  ]
})

const auth = async (ctx, next) => {
  return next().catch((err) => {
      if(err.status === 401){
          ctx.body = ResultFactory.buildFailResult('请先登录\n');
      }else{
          throw err;
      }
  })
}

module.exports = {
  mKoaJWT,
  auth,
}