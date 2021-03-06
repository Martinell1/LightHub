const TagService = require("../service/tag")
const ResultFactory = require('../result')
const ObjectId = require('mongoose').Types.ObjectId
const tagService = new TagService();
const {verify} = require('../utils/getToken')

const list = async ctx => {
  let result = await tagService.list()
  ctx.body = ResultFactory.buildSuccessResult(undefined,result)
}

const add = async ctx => {
  let tag = ctx.request.body
  let result = await tagService.add(tag)
  ctx.body =  result
} 

const remove = async ctx => {
  const id = ctx.request.body
  let result = await tagService.remove(id);
  if(result.modifiedCount === 0){
    ctx.body =  ResultFactory.buildFailResult("删除失败")
  }else{
    ctx.body =  ResultFactory.buildSuccessResult(undefined,"删除成功")
  }
}

const update = async ctx => {
  let tag = ctx.request.body
  let result = await tagService.update(tag)
  ctx.body = ResultFactory.buildSuccessResult(undefined,result);
}


module.exports = {
  list,
  add,
  remove,
  update
}
