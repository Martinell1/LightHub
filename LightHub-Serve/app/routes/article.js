const Router = require('koa-router');
const { article } = require('../controller');

const router = new Router();
router.prefix('/article')
      .get("/list",article.list)
      .get("/listByAuthor",article.listByAuthor)
      .get("/creator_article_list",article.creator_article_list)
      .get("/detail",article.detail)
      .post("/up_article",article.up_article)
      .post("/add",article.add)
      .post("/remove",article.remove)

      

module.exports = router;  