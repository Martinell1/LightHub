const Router = require('koa-router');
const { article } = require('../controller');

const router = new Router();
router.prefix('/article')
      .get("/list",article.list)
      .get("/detail",article.detail)
      .post("/add",article.add)
      .post("/comment",article.comment)
      .post("/remove",article.remove)

      

module.exports = router;  