const CollectionService = require("../service/collection")
const UserService = require("../service/user")
const ResultFactory = require('../result')
const collectionService = new CollectionService();
const userService = new UserService();
const ObjectId = require('../config/db').Types.ObjectId
const {verify} = require('../utils/getToken');
const ArticleService = require("../service/article");
const articleService = new ArticleService()

const list = async ctx => {
  const id = verify(ctx.header.authorization);
  const page = ctx.query.page
  let result = await collectionService.find({"holder_id":id})
                                      .skip((page-1)*10)
                                      .limit(10)
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,result);
  }else{
    ctx.body = ResultFactory.buildFailResult("出现错误")
  }
}

const detail = async ctx => {
  const id = ctx.query.id
  let result = await collectionService.findOne({"_id":id})
  for(let i = 0, len = result.article_list.length ; i < len ; i++){
    result.article_list[i] = await articleService.findOne({"_id":result.article_list[i]},{"_id":1,"title":1})
  }
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,result);
  }else{
    ctx.body = ResultFactory.buildFailResult("出现错误")
  }
}

const add = async ctx => {
  let body = ctx.request.body;
  const uid = verify(ctx.header.authorization)
  let article_list = [];
  article_list.push(body.aid)
  let user = await userService.findAndUpdate({'_id':uid},{$inc:{'collection_list':1}})
  let result =  await collectionService.add({"holder_id":uid,"name":body.name,"article_list":article_list})

  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,"添加成功");
  }else{
    ctx.body = ResultFactory.buildFailResult("添加失败")
  }
}

const update = async ctx => {
  let body = ctx.request.body;
  let result = await collectionService.findAndUpdate({"_id":body._id},body)
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,"添加成功");
  }else{
    ctx.body = ResultFactory.buildFailResult("添加失败")
  }
}

const fav = async ctx => {
  let body = ctx.request.body;
  let cid = body.cid;
  let aid = body.aid;
  let collection = await collectionService.findOne({"_id":cid});
  let result = await collectionService.findAndUpdate({"_id":cid},{$push:{"article_list":aid}})
  await articleService.findAndUpdate({"_id":aid},{$inc:{"fav_count":1}})
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,"添加成功");
  }else{
    ctx.body = ResultFactory.buildFailResult("添加失败")
  }
}

const remove = async ctx => {
  let body = ctx.request.body;
  let cid = body.cid;
  let aid = body.aid;
  let result = await collectionService.findAndUpdate({"_id":cid},{$pull:{"article_list":aid}})
  await articleService.findAndUpdate({"_id":aid},{$inc:{"fav_count":-1}})
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,"添加成功");
  }else{
    ctx.body = ResultFactory.buildFailResult("添加失败")
  }
}



module.exports = {
  list,
  add,
  update,
  fav,
  detail,
  remove
}
