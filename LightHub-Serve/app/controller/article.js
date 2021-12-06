const articleService = require("../service/article")
const userService = require("../service/user");
const commentService = require("../service/comment")
const tagService = require("../service/tag")
const ResultFactory = require('../result')
const as = new articleService();
const us = new userService();
const cs = new commentService();
const cs2 = new tagService()



const list = async ctx => {
  let tag = ctx.query.tag;
  let token = ctx.header.token;
  let result = await as.list();
  if(tag===''){

  }else if(tag === 'follow'){
    const userInfo = await us.getInfoByToken(token);
    const tag_list = userInfo.tag_list;
    result = await as.find({'tag_list':{ $in: tag_list}});
  }else{
    result = result.filter(article=>{return article.tag_list.includes(tag)})
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
  body.author.article_count++
  body.tag_list.forEach(async element => {
    let tag = await cs2.findAndUpdate({'name':element},{$inc:{'article_count':1}})
  });
  let result = await as.add(body)
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(result)
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

const up_article = async ctx => {
  let body = ctx.request.body;
  let article = await as.findOne({"_id":body._id})
  let isUp = article.up_list.indexOf(body.user_id)>-1;
  if(isUp === true){
    //取消赞
    article.up_list.remove(body.user_id)
  }else{
    //点赞
    article.up_list.push(body.user_id)
    article.step_list.remove(body.user_id)
  }
  let result = await as.update(article);
  if(result){
    if(isUp){
      ctx.body =  ResultFactory.buildSuccessResult("取消点赞成功")
    }else{
      ctx.body =  ResultFactory.buildSuccessResult("点赞成功")
    }
  }else{
    ctx.body = ResultFactory.buildFailResult("失败")
  }
}

const step_article = async ctx => {
  let body = ctx.request.body;
  let article = await as.findOne({"_id":body._id})
  let isStep = article.step_list.indexOf(body.user_id)>-1;
  if(isStep === true){
    //取消点踩
    article.step_list.remove(body.user_id)
  }else{
    //点踩
    article.step_list.push(body.user_id)
    article.up_list.remove(body.user_id)
  }
  let result = await as.update(article);
  if(result){
    if(isStep){
      ctx.body =  ResultFactory.buildSuccessResult("取消点踩成功")
    }else{
      ctx.body =  ResultFactory.buildSuccessResult("点踩成功")
    }
  }else{
    ctx.body = ResultFactory.buildFailResult("失败")
  }
}



module.exports = {
  list,
  detail,
  add,
  remove,
  comment,
  up_article,
  step_article,
}
