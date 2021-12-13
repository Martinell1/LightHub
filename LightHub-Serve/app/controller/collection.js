const CollectionService = require("../service/collection")
const UserService = require("../service/user")
const ResultFactory = require('../result')
const collectionService = new CollectionService();
const userService = new UserService();
const ObjectId = require('../config/db').Types.ObjectId
const {verify} = require('../utils/getToken')

const list = async ctx => {
  let id = ctx.query.uid
  let result = await collectionService.find({"holder_id":id})
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(result);
  }else{
    ctx.body = ResultFactory.buildFailResult("出现错误")
  }
}

const add = async ctx => {
  let body = ctx.request.body;
  const uid = verify(ctx.header.token).id
  let article_list = [];
  article_list.push(body.aid)
  let user = await userService.findAndUpdate({'_id':uid},{$inc:{'collection_list':1}})
  let result =  await collectionService.add({"holder_id":uid,"name":body.name,"article_list":article_list})

  if(result){
    ctx.body = ResultFactory.buildSuccessResult("添加成功");
  }else{
    ctx.body = ResultFactory.buildFailResult("添加失败")
  }
}

const fav = async ctx => {
  let body = ctx.request.body;
  let cid = body.cid;
  let aid = body.aid;
  let collection = await collectionService.findOne({"_id":cid});
  collection.article_list.push(aid)
  let article_list = Array.from(new Set(collection.article_list))
  let result = await collectionService.findAndUpdate({"_id":cid},{"article_list":article_list})
  if(result){
    ctx.body = ResultFactory.buildSuccessResult("添加成功");
  }else{
    ctx.body = ResultFactory.buildFailResult("添加失败")
  }
}



module.exports = {
  list,
  add,
  fav
}
