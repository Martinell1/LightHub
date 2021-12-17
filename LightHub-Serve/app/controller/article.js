const ArticleService = require("../service/article")
const UserService = require("../service/user");
const TagService = require("../service/tag")
const ResultFactory = require('../result')
const articleService = new ArticleService();
const userService = new UserService();
const tagService = new TagService()
const ObjectId = require('../config/db').Types.ObjectId
const {verify} = require('../utils/getToken')
const {up_utils,step_utils} = require('../utils/thumbUtil')


const list = async ctx => {
  let tag = ctx.query.tag;
  const userInfo = await userService.getInfoByToken(ctx.header.token);
  let result = []
  if(tag===''){
    result = await articleService.getArticleListWithUserInfo();
  }else{
    
    const tagList = userInfo.tag_list;
    result = await articleService.getArticleListByTag(tagList);
  }
  result.forEach(element=>{
    element.isUp = element.up_list.some(item => item === userInfo._id.toString())
    element.up_count = element.up_list.length
    delete element.up_list
    element.author = element.author[0]
  })
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }else{
    ctx.body = ResultFactory.buildFailResult("获取信息失败")
  }
}

const listByAuthor = async ctx => {
  const id = ctx.query.id;
  const user = await userService.getInfoByToken(ctx.header.token); 
  let result = await articleService.getArticleListByAuthor(ObjectId(id));
  result.forEach(element => {
    element.isUp = element.up_list.some(item => item === user._id.toString())
    element.up_count = element.up_list.length
    delete element.up_list
    element.author = element.author[0]
    
  })
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }else{
    ctx.body = ResultFactory.buildFailResult("获取信息失败")
  }
}

const detail = async ctx => {
  const id = ObjectId(ctx.query.id);
  let result = await articleService.getArticleWithUserInfo(id)
  result = result[0]
  result.author = result.author[0]
  result.isUp = result.up_list.some(item => item === verify(ctx.header.token).id)
  result.up_count = result.up_list.length
  delete result.up_list
  if(result){
     ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }else{
    ctx.body = ResultFactory.buildFailResult("请求发生错误")
  }
}

const add = async ctx => {
  let body = ctx.request.body
  const uid = verify(ctx.header.token).id
  body.tag_list = JSON.parse(body.tag_list)
  let user = await userService.findAndUpdate({'_id':uid},{$inc:{'article_count':1}})
  body.tag_list.forEach(async element => {
    let tag = await tagService.findAndUpdate({'name':element},{$inc:{'article_count':1}})
  });
  let result = await articleService.add(body)
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }
}

const remove = async ctx => {
  const id = ctx.request.body
  let result = await articleService.remove(id);
  if(result.modifiedCount === 0){
    ctx.body =  ResultFactory.buildFailResult("删除失败")
  }else{
    ctx.body =  ResultFactory.buildSuccessResult(undefined,"删除成功")
  }
}

const up_article = async ctx => {
  const {message,data} = await up_utils(ctx,'article');
  if(message === '出现错误'){
    ctx.body = ResultFactory.buildFailResult(message)
  }else{
    ctx.body = ResultFactory.buildSuccessResult(message,data)
  }
}

const step_article = async ctx => {
  const result = await step_utils(ctx,'article');
  if(result === '出现错误'){
    ctx.body = ResultFactory.buildFailResult(result)
  }else{
    ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }
}



module.exports = {
  list,
  listByAuthor,
  detail,
  add,
  remove,
  up_article,
  step_article,
}
