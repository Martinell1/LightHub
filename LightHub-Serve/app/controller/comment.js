const commentService = require("../service/comment")
const ResultFactory = require('../result')
const ObjectId = require('mongoose').Types.ObjectId
const cs = new commentService();

const list = async ctx => {
  let result = await cs.list()
  ctx.body = ResultFactory.buildSuccessResult(result)
}

const add = async ctx => {
  let comment = ctx.request.body
  let result = await cs.add(comment)
  ctx.body =  result
}

const remove = async ctx => {
  const id = ctx.request.body
  let result = await cs.remove(id);
  if(result.modifiedCount === 0){
    ctx.body =  ResultFactory.buildFailResult("删除失败")
  }else{
    ctx.body =  ResultFactory.buildSuccessResult("删除成功")
  }
}

const update = async ctx => {
  let comment = ctx.request.body
  let result = await cs.update(comment)
  ctx.body = ResultFactory.buildSuccessResult(result);
}




module.exports = {
  list,
  add,
  remove,
  update
}
