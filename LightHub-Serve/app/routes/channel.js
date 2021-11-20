const Router = require('koa-router');
const { channel } = require('../controller');

const router = new Router();
router.prefix('/channel')
      .get("/list",channel.list)
      .post("/add",channel.add)
      .post("/update",channel.update)
      .post("/remove",channel.remove)

      

module.exports = router;  