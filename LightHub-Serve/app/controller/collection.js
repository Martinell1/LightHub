const collectionService = require("../service/collection")
const userService = require("../service/user")
const ResultFactory = require('../result')
const cs = new collectionService();
const us = new userService();
const ObjectId = require('../config/db').Types.ObjectId


const list = async ctx => {
  let id = ctx.query.uid
  let result = await cs.find({"holder_id":id})
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(result);
  }else{
    ctx.body = ResultFactory.buildFailResult("出现错误")
  }
}

const add = async ctx => {
  let body = ctx.request.body;
  let article_list = [];
  article_list.push(body.aid)
  let user = await us.findAndUpdate({'_id':body.uid},{$inc:{'collection_list':1}})
  let result =  await cs.add({"holder_id":body.uid,"name":body.name,"article_list":article_list})

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
  let collection = await cs.findOne({"_id":cid});
  collection.article_list.push(aid)
  let article_list = Array.from(new Set(collection.article_list))
  let result = await cs.findAndUpdate({"_id":cid},{"article_list":article_list})
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
