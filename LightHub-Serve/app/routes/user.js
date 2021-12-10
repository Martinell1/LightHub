const Router = require('koa-router');
const { user } = require('../controller');

const router = new Router();
router.prefix('/user')
      .get("/list",user.list)
      .get("/info",user.info)
      .post("/login",user.login)
      .post("/register",user.register)
      .post("/update",user.update)
      .post("/follow_tag",user.follow_tag)
      .post("/follow_user",user.follow_user)
      .post("/remove",user.remove)
      .post("/start_topic",user.start_topic)


module.exports = router;  