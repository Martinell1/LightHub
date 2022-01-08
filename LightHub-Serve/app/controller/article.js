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
const channel = require('../config/channel')



const list = async ctx => {
  let {tag,page} = ctx.query
  let user = undefined;
  if(ctx.header.authorization){
    user = await userService.getInfoByToken(ctx.header.authorization);
  }
  let result = []
  if(tag===''){
    result = await articleService.getArticleListWithUserInfo(page);
  }else if(tag==='following'){
    const tagList = user.tag_list;
    result = await articleService.getArticleListByTag(tagList,page);
  }else {
    const tagList = channel.get(tag) || []
    result = await articleService.getArticleListByTag(tagList,page);
  }
  result.forEach(element=>{
    if(user){
      element.isUp = element.up_list.some(item => item === user._id.toString())
    }else{
      element.isUp = false
    }
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
  const {id,page} = ctx.query;
  let result = await articleService.getArticleListByAuthor(ObjectId(id),page);
  let user = undefined;
  if(ctx.header.authorization){
    user = await userService.getInfoByToken(ctx.header.authorization);
  }
  result.forEach(element => {
    if(user){
      element.isUp = element.up_list.some(item => item === user._id.toString())
    }else{
      element.isUp = false
    }
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
  let view_id = ctx.cookies.get(id.toString());
  if(!view_id){
    await articleService.findAndUpdate({"_id":id},{$inc:{"view_count":1}})
      ctx.cookies.set(id, id, {
          maxAge: 2 * 60 * 1000,     //cookie有效时长，单位：毫秒数
          path:"/",         //cookie保存路径, 默认是'/，（是/的情况下所有路由都可以访问）set时更改，get时同时修改，不然会保存不上，服务同时也获取不到
          domain:"localhost",       //cookie可用域名，“.”开头支持顶级域名下的所有子域名,（默认情况下就是当前域名）
          secure:false,       //默认false，设置成true表示只有https可以访问
          httpOnly:"true",    //true，客户端不可读取
          overwrite:"true"    //一个布尔值，表示是否覆盖以前设置的同名的 cookie (默认是 false). 如果是 true,                  
                              //在同一个请求中设置相同名称的所有 Cookie（不管路径或域）是否在设置此Cookie 时从 Set-Cookie 标头中过滤掉。
       }  
      ) 
  }
  result = result[0]
  result.author = result.author[0]
  if(ctx.header.authorization){
    const uid = verify(ctx.header.authorization)
    result.isUp = result.up_list.some(item => item === uid)
    result.author.isFollow = result.author.fans.some(item => item.toString() === uid)
  }
  

  if(result){
     ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }else{
    ctx.body = ResultFactory.buildFailResult("请求发生错误")
  }
}

const add = async ctx => {
  let body = ctx.request.body
  const uid = verify(ctx.header.authorization)
  body.tag_list = JSON.parse(body.tag_list)
  body.author_id = uid
  let result = undefined;
  if(body._id){
    let article = await articleService.findOne({"_id":body._id})
    for(let i = 0,len = article.tag_list.length; i < len; i++){
      await tagService.findAndUpdate({'name':article.tag_list[i]},{$inc:{'article_count':-1}})
    }
    result = await articleService.findAndUpdate({"_id":body._id},body)
  }else{
    result = await articleService.add(body)
    await userService.findAndUpdate({'_id':uid},{$inc:{'article_count':1}})
    body.tag_list.forEach(async element => {
      await tagService.findAndUpdate({'name':element},{$inc:{'article_count':1}})
    });
  }
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }else{
    ctx.body =  ResultFactory.buildSuccessResult(undefined,"出现错误")
  }
}

const remove = async ctx => {
  const aid = ctx.request.body.aid
  const uid = verify(ctx.header.authorization);
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
  const id = verify(ctx.header.authorization);
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
  const id = verify(ctx.header.authorization);
  const page = ctx.query.page;
  let result = await articleService.getDraftArticleList(ObjectId(id),page)
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
  add,
  remove,
  up_article,
  step_article,
  creator_article_list,
  creator_draft_list
}
