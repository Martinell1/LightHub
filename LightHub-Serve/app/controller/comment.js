const commentService = require("../service/comment")
const ResultFactory = require('../result')
const ObjectId = require('mongoose').Types.ObjectId
const cs = new commentService();

const list = async ctx => {
  const id = ctx.query.aid;
  let result = await cs.list({"target_id":id})
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(result)
  }else{
    ctx.body = ResultFactory.buildFailResult(result)
  }

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

const up = async ctx => {
  let body = ctx.request.body
  body.up_list = JSON.parse(body.up_list);
  let result = await cs.update(body)
  if(result){
    ctx.body = ResultFactory.buildSuccessResult("成功");
  }else{
    ctx.body = ResultFactory.buildFilResult("失败");
  }
}

const reply = async ctx => {
  let body = ctx.request.body
  body.reply_list = JSON.parse(body.reply_list);
  let result = await cs.update(body)
  if(result){
    ctx.body = ResultFactory.buildSuccessResult("成功");
  }else{
    ctx.body = ResultFactory.buildFilResult("失败");
  }
}



module.exports = {
  list,
  add,
  remove,
  update,
  up,
  reply
}
