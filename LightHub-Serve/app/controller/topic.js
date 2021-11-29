const topicService = require("../service/topic")
const ResultFactory = require('../result')
const ts = new topicService();
const toRegular = require('../utils/toRegular')

const list = async ctx => {
  let key = toRegular(ctx.query)
  let result = await ts.find(key)
  ctx.body = ResultFactory.buildSuccessResult(result)
}

const add = async ctx => {
  let topic = ctx.request.body
  let result = await ts.add(topic)
  ctx.body =  ResultFactory.buildSuccessResult(result)
}

const remove = async ctx => {
  const id = ctx.request.body
  let result = await ts.remove(id);
  if(result.modifiedCount === 0){
    ctx.body = ResultFactory.buildFailResult("删除失败")
  }else{
    ctx.body = ResultFactory.buildSuccessResult("删除成功")
  }
}

const update = async ctx => {
  let topic = ctx.request.body
  let result = await ts.update(topic)
  ctx.body = ResultFactory.buildSuccessResult(result);
}




module.exports = {
  list,
  add,
  remove,
  update
}
