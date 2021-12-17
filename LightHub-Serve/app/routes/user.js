const Router = require('koa-router');
const { user } = require('../controller');

const router = new Router();
router.prefix('/user')
      .get("/list",user.list)
      .get("/info",user.info)
      .get("/creator_info",user.getCreatorInfo)
      .post("/login",user.login)
      .post("/register",user.register)
      .post("/update",user.update)
      .post("/follow_tag",user.follow_tag)
      .post("/follow_user",user.follow_user)
      .post("/remove",user.remove)
      .post("/follow_topic",user.follow_topic)
      .get("/action_list",user.action_list)


module.exports = router;  