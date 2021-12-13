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
  let token = ctx.header.token;
  let result = []
  if(tag===''){
    result = await articleService.getArticleListWithUserInfo();
  }else{
    const userInfo = await userService.getInfoByToken(token);
    const tagList = userInfo.tag_list;
    result = await articleService.getArticleListByTag(tagList);
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
  let result = await articleService.getArticleWithUserInfo(id)
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
  let user = await userService.findAndUpdate({'_id':uid},{$inc:{'article_count':1}})
  body.tag_list.forEach(async element => {
    let tag = await tagService.findAndUpdate({'name':element},{$inc:{'article_count':1}})
  });
  let result = await articleService.add(body)
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(result)
  }
}

const remove = async ctx => {
  const id = ctx.request.body
  let result = await articleService.remove(id);
  if(result.modifiedCount === 0){
    ctx.body =  ResultFactory.buildFailResult("删除失败")
  }else{
    ctx.body =  ResultFactory.buildSuccessResult("删除成功")
  }
}

const up_article = async ctx => {
  const result = await up_utils(ctx,'article');
  if(result === '出现错误'){
    ctx.body = ResultFactory.buildFailResult(result)
  }else{
    ctx.body = ResultFactory.buildSuccessResult(result)
  }
}

const step_article = async ctx => {
  const result = await step_utils(ctx,'article');
  if(result === '出现错误'){
    ctx.body = ResultFactory.buildFailResult(result)
  }else{
    ctx.body = ResultFactory.buildSuccessResult(result)
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
