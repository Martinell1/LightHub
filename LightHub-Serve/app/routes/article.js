const Router = require('koa-router');
const { article } = require('../controller');

const router = new Router();
router.prefix('/article')
      .get("/list",article.list)
      .post("/add",article.add)
      .post("/update",article.update)
      .post("/remove",article.remove)

      

module.exports = router;  