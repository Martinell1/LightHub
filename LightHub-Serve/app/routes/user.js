const Router = require('koa-router');
const { user } = require('../controller');

const router = new Router();
router.prefix('/user')
      .get("/list",user.list)
      .get("/info",user.info)
      .post("/login",user.login)
      .post("/register",user.register)
      .post("/update",user.update)
      .post("/remove",user.remove)


module.exports = router;  