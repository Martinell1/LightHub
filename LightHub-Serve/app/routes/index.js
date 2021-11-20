const Router = require('koa-router');

const {autoReadFiles} = require('../utils/readfiles')

const routers = new Router()
routers.prefix('/api')

let result = autoReadFiles("routes");
for(let route of result){
  route = require("./" + route);
  routers.use(route.routes(),route.allowedMethods());
}


module.exports = routers;