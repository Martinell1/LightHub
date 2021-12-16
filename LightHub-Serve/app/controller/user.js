const UserService = require("../service/user")
const TagService = require("../service/tag");
const TopicService = require("../service/topic");
const ArticleService = require("../service/article");
const HistoryService = require("../service/history");
const ResultFactory = require('../result')
const userService = new UserService();
const tagService = new TagService();
const topicService = new TopicService();
const historyService = new HistoryService();
const articleService = new ArticleService();
const bcrypt = require('bcryptjs');
const ObjectId = require('../config/db').Types.ObjectId
const {buildToken,verify} = require('../utils/getToken')
const {follow_utils} = require('../utils/followUtil');




const login = async ctx => {
  let body = ctx.request.body;
  let user = await userService.findOne({"account":body.account})
  if(!user){
    return ctx.body = ResultFactory.buildFailResult("用户不存在")
  }
  let isEqual = await bcrypt.compare(body.password, user.password);
  if(isEqual){
    return ctx.body = ResultFactory.buildSuccessResult(undefined,buildToken({"id":user._id}))
  }else{
    return ctx.body = ResultFactory.buildFailResult("密码错误")
  }
}

const register = async ctx => {
  let body = ctx.request.body;
  let user = await userService.findOne({"account":body.account})
  if(user){
    return ctx.body = ResultFactory.buildFailResult("用户已存在")
  }
  const salt = await bcrypt.genSalt(10);
  const newPassWord = await bcrypt.hash(body.password, salt)
  body.password = newPassWord;
  let result = await userService.add(body)
  let history = await historyService.add({"user_id":result._id})
  if(result){
    return ctx.body = ResultFactory.buildSuccessResult("注册成功");
  }else{
    return ctx.body = ResultFactory.buildFailResult("注册失败");
  }
}

const info = async ctx => {
  if(ctx.query.id){
    const id = ctx.query.id;
    let result = await userService.findOne(
      { "_id":id},
      { password:0,
        role:0,
        status:0,
      }
    )
    if(result){
      ctx.body = ResultFactory.buildSuccessResult(undefined,result);
    }
  }else{
    const token = ctx.query.token;
    let result = await userService.getInfoByToken(token);
    if(result){
      return ctx.body = ResultFactory.buildSuccessResult(undefined,result);
    }
  }
}

const list = async ctx => {
  let result = await userService.list()
  ctx.body = ResultFactory.buildSuccessResult(undefined,result)
}

const update = async ctx => {
  let body = ctx.request.body
  const uid = verify(ctx.header.token).id
  body.education = JSON.parse(body.education)
  //修改用户信息
  await userService.findAndUpdate({"_id":uid},body)
  let result = await userService.findOne({"_id":uid})
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,result);
  }else{
    ctx.body = ResultFactory.buildFailResult("更新失败");
  }
}

const follow_tag = async ctx => {
  const result = await follow_utils(ctx,'tag')
  if(result === '出现错误'){
    ctx.body = ResultFactory.buildFailResult("修改失败");
  }else{
    ctx.body = ResultFactory.buildSuccessResult(undefined,result);
  }
}

const follow_user = async ctx => {
  const result = await follow_utils(ctx,'user')
  if(result === '出现错误'){
    ctx.body = ResultFactory.buildFailResult("修改失败");
  }else{
    ctx.body = ResultFactory.buildSuccessResult(undefined,result);
  }
}

const follow_topic = async ctx => {
  const {message,data} = await follow_utils(ctx,'topic')
  if(message === '出现错误'){
    ctx.body = ResultFactory.buildFailResult("修改失败");
  }else{
    ctx.body = ResultFactory.buildSuccessResult(message,data);
  }
}

const remove = async ctx => {
  const id = verify(ctx.header.token).id
  let result = await userService.remove(id);
  if(result.modifiedCount === 0){
    ctx.body = ResultFactory.buildFailResult("删除失败")
  }else{
    ctx.body = ResultFactory.buildSuccessResult("删除成功")
  }
}

const action_list = async ctx => {
  const id = ObjectId(verify(ctx.header.token).id)
  let result = await historyService.findDetail(id);
  const user = await userService.findOne({"_id":id});
  result.forEach(item => {
    item.user = item.user[0]
    item.tag = item.tag[0]
    item.article = item.article[0]
    item.topic = item.topic[0]
    if(item.opt === 'thumb'){
      if(item.field === 'article'){
        item.article.isUp = item.article.up_list.some(item => item === id.toString())
        item.article.up_count = item.article.up_list.length
        delete item.article.up_list
      }
      if(item.field === 'topic'){
        item.topic.isUp = item.topic.up_list.some(element => element === id.toString())
        item.topic.isFollow = user.topic_list.some(element => item.topic._id.toString())
        item.topic.up_count = item.topic.up_list.length
        delete item.topic.up_list
      }
    }
    return item
  });
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,result);
  }else{
    ctx.body = ResultFactory.buildFailResult("出现错误");
  }
}

module.exports = {
  list,
  remove,
  update,
  register,
  login,
  info,
  follow_tag,
  follow_user,
  follow_topic,
  action_list
}
