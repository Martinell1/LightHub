const ArticleService = require("../service/article")
const UserService = require("../service/user");
const TagService = require("../service/tag")
const ResultFactory = require('../result')
const HistoryService = require("../service/history");
const articleService = new ArticleService();
const userService = new UserService();
const tagService = new TagService()
const historyService = new HistoryService();
const ObjectId = require('../config/db').Types.ObjectId
const {verify} = require('../utils/getToken')
const {up_utils,step_utils} = require('../utils/thumbUtil');



const list = async ctx => {
  let tag = ctx.query.tag;
  let page = ctx.query.page;
  const userInfo = await userService.getInfoByToken(ctx.header.token);
  let result = []
  if(tag===''){
    result = await articleService.getArticleListWithUserInfo(page);
  }else if(tag==='following'){
    const tagList = userInfo.tag_list;
    result = await articleService.getArticleListByTag(tagList,page);
  }else {
    const tagList = []
    tagList.push(tag)
    result = await articleService.getArticleListByTag(tagList,page);
  }
  result.forEach(element=>{
    element.isUp = element.up_list.some(item => item === userInfo._id.toString())
    element.up_count = element.up_list.length
    delete element.up_list
    element.author = element.author[0]
  })
  if(result.length === 0){
    ctx.body = ResultFactory.buildSuccessResult(undefined,'翻到底了')
  }
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }else{
    ctx.body = ResultFactory.buildFailResult("获取信息失败")
  }
}

const listByAuthor = async ctx => {
  const id = ctx.query.id;
  const page = ctx.query.page
  const user = await userService.getInfoByToken(ctx.header.token); 
  let result = await articleService.getArticleListByAuthor(ObjectId(id),page);
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
  // let result = await articleService.getArticleWithUserInfo(id,2)
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
const save = async ctx => {
  let body = ctx.request.body
  const uid = verify(ctx.header.token).id
  body.tag_list = JSON.parse(body.tag_list)
  body.author_id = uid
  let result = await articleService.add(body);
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }else{
    ctx.body =  ResultFactory.buildSuccessResult(undefined,"出现错误")
  }
}

const add = async ctx => {
  let body = ctx.request.body
  const uid = verify(ctx.header.token).id
  body.tag_list = JSON.parse(body.tag_list)
  body.author_id = uid
  let result = undefined;
  if(body._id){
    result = await articleService.findAndUpdate({"_id":body._id},body)
  }else{
    result = await articleService.add(body)
  }
  await userService.findAndUpdate({'_id':uid},{$inc:{'article_count':1}})
  body.tag_list.forEach(async element => {
    await tagService.findAndUpdate({'name':element},{$inc:{'article_count':1}})
  });
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }else{
    ctx.body =  ResultFactory.buildSuccessResult(undefined,"出现错误")
  }
}

const remove = async ctx => {
  const aid = ctx.request.body.aid
  const uid = verify(ctx.header.token).id;
  const article = await articleService.findOne({"_id":aid},{"author_id":1})
  let result = undefined;
  if(uid === article.author_id.toString()){
    let temp = await historyService.delete({"target_id":aid})

    result = await articleService.remove({"_id":aid});
  }
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

const creator_article_list = async ctx => {
  const id = verify(ctx.header.token).id;
  const page = ctx.query.page;
  let result = await articleService.find({"author_id":id},{'title':1,'tag_list':1,'status':1,'create_time':1})
                                    .skip((page-1)*10)
                                    .limit(10)
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }else{
    ctx.body = ResultFactory.buildFailResult('出现错误')
  }
}

const creator_draft_list = async ctx => {
  const id = verify(ctx.header.token).id;
  const page = ctx.query.page;
  let result = await articleService.getDraftArticle(ObjectId(id),page)
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }else{
    ctx.body = ResultFactory.buildFailResult('出现错误')
  }
}




module.exports = {
  list,
  listByAuthor,
  detail,
  save,
  add,
  remove,
  up_article,
  step_article,
  creator_article_list,
  creator_draft_list
}
