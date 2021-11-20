const Router = require('koa-router');
const { answer } = require('../controller');

const router = new Router();
router.prefix('/answer')
      .get("/list",answer.list)
      .post("/add",answer.add)
      .post("/update",answer.update)
      .post("/remove",answer.remove)

      

module.exports = router;  