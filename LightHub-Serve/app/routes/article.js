const Router = require('koa-router');
const { article } = require('../controller');

const router = new Router();
router.prefix('/article')
      .get("/list",article.list)
      .get("/b",article.b)

      

module.exports = router;  