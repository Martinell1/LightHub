const articleService = require("../service/article")
const userService = require("../service/user");
const commentService = require("../service/comment")
const tagService = require("../service/tag")
const ResultFactory = require('../result')
const as = new articleService();
const us = new userService();
const cs = new commentService();
const ts = new tagService()
const ObjectId = require('../config/db').Types.ObjectId
const {verify} = require('../utils/getToken')


const list = async ctx => {
  let tag = ctx.query.tag;
  let token = ctx.header.token;
  let result = []
  if(tag===''){
    result = await as.getArticleListWithUserInfo();
  }else{
    const userInfo = await us.getInfoByToken(token);
    const tagList = userInfo.tag_list;
    result = await as.getArticleListByTag(tagList);
  }
  result.forEach(element=>{
    element.author = element.author[0]
  })
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(result)
  }else{
    ctx.body = ResultFactory.buildFailResult("获取信息失败")
  }
}

const detail = async ctx => {
  let id = ObjectId(ctx.query.id);
  let result = await as.getArticleWithUserInfo(id)
  result[0].author = result[0].author[0]
  if(result[0]){
     ctx.body = ResultFactory.buildSuccessResult(result[0])
  }else{
    ctx.body = ResultFactory.buildFailResult("请求发生错误")
  }
}

const add = async ctx => {
  let body = ctx.request.body
  const uid = verify(ctx.header.token).id
  body.tag_list = JSON.parse(body.tag_list)
  let user = await us.findAndUpdate({'_id':uid},{$inc:{'article_count':1}})
  body.tag_list.forEach(async element => {
    let tag = await ts.findAndUpdate({'name':element},{$inc:{'article_count':1}})
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

const up_article = async ctx => {
  let body = ctx.request.body;
  const uid = verify(ctx.header.token).id
  let article = await as.findOne({"_id":body._id})
  let isUp = article.up_list.indexOf(uid)>-1;
  if(isUp === true){
    //取消赞
    article.up_list.remove(uid)
  }else{
    //点赞
    article.up_list.push(uid)
    article.step_list.remove(uid)
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
  const uid = verify(ctx.header.token).id
  let article = await as.findOne({"_id":body._id})
  let isStep = article.step_list.indexOf(uid)>-1;
  if(isStep === true){
    //取消点踩
    article.step_list.remove(uid)
  }else{
    //点踩
    article.step_list.push(uid)
    article.up_list.remove(uid)
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
  up_article,
  step_article,
}
