const Router = require('koa-router');
const { comment } = require('../controller');

const router = new Router();
router.prefix('/comment')
      .get("/list",comment.list)
      .post("/add",comment.add)
      .post("/update",comment.update)
      .post("/remove",comment.remove)

      

module.exports = router;  