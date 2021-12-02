const channelService = require("../service/channel")
const ResultFactory = require('../result')
const ObjectId = require('mongoose').Types.ObjectId
const cs = new channelService();

const list = async ctx => {
  
  let result = await cs.list()
  ctx.body = ResultFactory.buildSuccessResult(result)
}

const add = async ctx => {
  let channel = ctx.request.body
  let result = await cs.add(channel)
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
  let channel = ctx.request.body
  let result = await cs.update(channel)
  ctx.body = ResultFactory.buildSuccessResult(result);
}


module.exports = {
  list,
  add,
  remove,
  update
}
