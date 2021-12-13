const UserService = require("../service/user")
const TagService = require("../service/tag");
const TopicService = require("../service/topic");
const HistoryService = require("../service/history");
const ResultFactory = require('../result')
const userService = new UserService();
const tagService = new TagService();
const topicService = new TopicService();
const historyService = new HistoryService();

const bcrypt = require('bcryptjs');
const ObjectId = require('../config/db').Types.ObjectId
const {buildToken,verify} = require('../utils/getToken')
const {follow_utils} = require('../utils/followUtil')


const login = async ctx => {
  let body = ctx.request.body;
  let user = await userService.findOne({"account":body.account})
  if(!user){
    return ctx.body = ResultFactory.buildFailResult("用户不存在")
  }
  let isEqual = await bcrypt.compare(body.password, user.password);
  if(isEqual){
    return ctx.body = ResultFactory.buildSuccessResult(buildToken({"id":user._id}))
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
      ctx.body = ResultFactory.buildSuccessResult(result);
    }
  }else{
    const token = ctx.query.token;
    let result = await userService.getInfoByToken(token);
    if(result){
      return ctx.body = ResultFactory.buildSuccessResult(result);
    }
  }
}

const list = async ctx => {
  let result = await userService.list()
  ctx.body = ResultFactory.buildSuccessResult(result)
}

const update = async ctx => {
  let body = ctx.request.body
  const uid = verify(ctx.header.token).id
  body.education = JSON.parse(body.education)
  //修改用户信息
  await userService.findAndUpdate({"_id":uid},body)
  let result = await userService.findOne({"_id":uid})
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(result);
  }else{
    ctx.body = ResultFactory.buildFailResult("更新失败");
  }
}

const follow_tag = async ctx => {
  const result = await follow_utils(ctx,'tag')
  if(result === '出现错误'){
    ctx.body = ResultFactory.buildFailResult("修改失败");
  }else{
    ctx.body = ResultFactory.buildSuccessResult(result);
  }
}

const follow_user = async ctx => {
  const result = await follow_utils(ctx,'user')
  if(result === '出现错误'){
    ctx.body = ResultFactory.buildFailResult("修改失败");
  }else{
    ctx.body = ResultFactory.buildSuccessResult(result);
  }
}

const star_topic = async ctx => {
  const result = await follow_utils(ctx,'topic')
  if(result === '出现错误'){
    ctx.body = ResultFactory.buildFailResult("修改失败");
  }else{
    ctx.body = ResultFactory.buildSuccessResult(result);
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
  console.log(result);
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(result.action_list);
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
  star_topic,
  action_list
}
