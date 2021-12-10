const Router = require('koa-router');
const { collection } = require('../controller');

const router = new Router();
router.prefix('/collection')
      .get("/list",collection.list)
      .post("/add",collection.add)
      .post("/fav",collection.fav)

module.exports = router;