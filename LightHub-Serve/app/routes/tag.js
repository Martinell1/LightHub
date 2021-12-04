const Router = require('koa-router');
const { tag } = require('../controller');

const router = new Router();
router.prefix('/tag')
      .get("/list",tag.list)
      .post("/add",tag.add)
      .post("/update",tag.update)
      .post("/remove",tag.remove)

      

module.exports = router;  