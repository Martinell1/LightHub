const Router = require('koa-router');
const { comment } = require('../controller');

const router = new Router();
router.prefix('/comment')
      .get("/list",comment.list)
      .get("/listByUser",comment.listByUser)
      .post("/add",comment.add)
      .post("/up_comment",comment.up_comment)
      .post("/step_comment",comment.step_comment)
      .post("/reply",comment.reply)
      .post("/update",comment.update)
      .post("/remove",comment.remove)

      

module.exports = router;  