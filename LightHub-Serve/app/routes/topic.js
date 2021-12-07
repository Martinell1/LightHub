const Router = require('koa-router');
const { topic } = require('../controller');

const router = new Router();
router.prefix('/topic')
      .get("/list",topic.list)
      .post("/add",topic.add)
      .post("/up_topic",topic.up_topic)
      .post("/update",topic.update)
      .post("/remove",topic.remove)
      

      

module.exports = router;  