const answerService = require("../service/answer")
const ResultFactory = require('../result')
const ObjectId = require('mongoose').Types.ObjectId
const as = new answerService();

const list = async ctx => {
  let result = await as.list()
  ctx.body = ResultFactory.buildSuccessResult(result)
}

const add = async ctx => {
  let answer = ctx.request.body
  let result = await answer.add(answer)
  ctx.body =  result
}

const remove = async ctx => {
  const id = ctx.request.body
  let result = await as.remove(id);
  if(result.modifiedCount === 0){
    ctx.body =  ResultFactory.buildFailResult("删除失败")
  }else{
    ctx.body =  ResultFactory.buildSuccessResult("删除成功")
  }
}

const update = async ctx => {
  let answer = ctx.request.body
  let result = await as.update(answer)
  ctx.body = ResultFactory.buildSuccessResult(result);
}

module.exports = {
  list,
  add,
  remove,
  update,
}
