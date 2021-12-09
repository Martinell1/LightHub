const Router = require('koa-router');
const { answer } = require('../controller');

const router = new Router();
router.prefix('/answer')
      .get("/list",answer.list)
      .get("/detail",answer.detail)
      .post("/saveOrUpdate",answer.saveOrUpdate)
      .post("/up_answer",answer.up_answer)
      .post("/step_answer",answer.step_answer)
      .post("/update",answer.update)
      .post("/remove",answer.remove)

      

module.exports = router;  