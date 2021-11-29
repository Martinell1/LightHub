const articleService = require("../service/article")
const ResultFactory = require('../result')
const as = new articleService();

const list = async ctx => {
  let result = await as.list()
  ctx.body = ResultFactory.buildSuccessResult(result)
}

const add = async ctx => {
  let article = ctx.request.body
  console.log(article);
  let result = await as.add(article)
  if(result){
    return  ctx.body = ResultFactory.buildSuccessResult(result)
  }
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
  let article = ctx.request.body
  let result = await as.update(article)
  ctx.body = ResultFactory.buildSuccessResult(result);
}

module.exports = {
  list,
  add,
  remove,
  update,
}
