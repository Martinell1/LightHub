const Router = require('koa-router');
const { common } = require('../controller');

const router = new Router();
router.prefix('/common')
      .post("/upload",common.upload)
      .get("/search",common.search)

module.exports = router;  