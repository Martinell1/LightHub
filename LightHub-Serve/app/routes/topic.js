const Router = require('koa-router');
const { topic } = require('../controller');

const router = new Router();
router.prefix('/topic')
      .get("/list",topic.list)
      .get("/listByInitiator",topic.listByInitiator)
      .get("/creator_topic_list",topic.creator_topic_list)
      .get("/detail",topic.detail)
      .post("/add",topic.add)
      .post("/up_topic",topic.up_topic)
      .post("/update",topic.update)
      .post("/remove",topic.remove)
      

      

module.exports = router;  