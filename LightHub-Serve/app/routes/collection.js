const Router = require('koa-router');
const { collection } = require('../controller');

const router = new Router();
router.prefix('/collection')
      .get("/list",collection.list)
      .get("/detail",collection.detail)
      .post("/update",collection.update)
      .post("/add",collection.add)
      .post("/fav",collection.fav)
      .post("/remove",collection.remove)

module.exports = router;