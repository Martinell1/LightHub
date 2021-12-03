const articleService = require("../service/article")
const userService = require("../service/user");
const commentService = require("../service/comment")
const ResultFactory = require('../result')
const as = new articleService();
const us = new userService();
const cs = new commentService();



const list = async ctx => {
  let channel = ctx.query.channel;
  let token = ctx.header.token;
  let result = await as.list();
  if(channel===''){

  }else if(channel === 'follow'){
    const userInfo = await us.getInfoByToken(token);
    const tag_list = userInfo.tag_list;
    result = await as.find({'tag_list':{ $in: tag_list}});
  }else{
    result = result.filter(article=>{return article.tag_list.includes(channel)})
  }
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(result)
  }else{
    ctx.body = ResultFactory.buildFailResult("获取信息失败")
  }
}

const detail = async ctx => {
  let id = ctx.query.id;
  let result = await as.findOne({"_id":id})
  if(result){
     ctx.body = ResultFactory.buildSuccessResult(result)
  }else{
    ctx.body = ResultFactory.buildFailResult("请求发生错误")
  }
}

const add = async ctx => {
  let body = ctx.request.body
  body.tag_list = JSON.parse(body.tag_list)
  body.author = JSON.parse(body.author)
  let result = await as.add(body)
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

const comment = async ctx => {
  let body = ctx.request.body
  let result = await cs.add(JSON.parse(body.comment));
  if(result){
    ctx.body = ResultFactory.buildSuccessResult("评论成功");
  }else{
    ctx.body = ResultFactory.buildSuccessResult("评论失败");
  }
}


module.exports = {
  list,
  detail,
  add,
  remove,
  comment,
}
