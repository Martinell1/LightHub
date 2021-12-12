const userService = require("../service/user")
const articleService = require("../service/article");
const tagService = require("../service/tag");
const topicService = require("../service/topic");
const ResultFactory = require('../result')
const us = new userService();
const as = new articleService();
const ts = new tagService();
const ts2 = new topicService();

const {buildToken,verify} = require('../utils/getToken')
const bcrypt = require('bcryptjs');


const login = async ctx => {
  let body = ctx.request.body;
  let user = await us.findOne({"account":body.account})
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
  let user = await us.findOne({"account":body.account})
  if(user){
    return ctx.body = ResultFactory.buildFailResult("用户已存在")
  }
  const salt = await bcrypt.genSalt(10);
  const newPassWord = await bcrypt.hash(body.password, salt)
  body.password = newPassWord;
  let result = await us.add(body)
  if(result){
    return ctx.body = ResultFactory.buildSuccessResult("注册成功");
  }else{
    return ctx.body = ResultFactory.buildFailResult("注册失败");
  }
}

const info = async ctx => {
  if(ctx.query.id){
    const id = ctx.query.id;
    let result = await us.findOne(
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
    let result = await us.getInfoByToken(token);
    if(result){
      return ctx.body = ResultFactory.buildSuccessResult(result);
    }
  }
}

const list = async ctx => {
  let result = await us.list()
  ctx.body = ResultFactory.buildSuccessResult(result)
}

const update = async ctx => {
  let body = ctx.request.body
  const uid = verify(ctx.header.token).id
  body.education = JSON.parse(body.education)
  //修改用户信息
  await us.findAndUpdate({"_id":uid},body)
  let result = await us.findOne({"_id":uid})
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(result);
  }else{
    ctx.body = ResultFactory.buildFailResult("更新失败");
  }
}

const follow_tag = async ctx => {
  let body = ctx.request.body;
  const user = await us.getInfoByToken(ctx.header.token)
  let tag = await ts.findOne({"_id":body.tag_id})
  let isFollow = user.tag_list.indexOf(tag.name)>-1
  if(isFollow === true){
    //已关注，需要取关
    user.tag_list = user.tag_list.remove(tag.name)
    tag.fans_count--
  }else{
    //未关注，需要关注
    user.tag_list.push(tag.name)
    tag.fans_count++
  }
  let result1 = await us.update(user)
  let result2 = await ts.update(tag)
  if(result1 && result2){
    ctx.body = ResultFactory.buildSuccessResult("修改成功");
  }else{
    ctx.body = ResultFactory.buildFailResult("修改失败");
  }
  //cs2.findAndUpdate({'name':element},{$inc:{'fans_count':1}})
}

const follow_user = async ctx => {
    let body = ctx.request.body;
    const user = await us.getInfoByToken(ctx.header.token)
    let followed_user = await us.findOne({"_id":body.followed_user_id})

    let isFollow = user.follows.indexOf(followed_user._id)>-1
    if(isFollow === true){
      //已关注，需要取关
      user.follows = user.follows.remove(followed_user._id)
      followed_user.fans = followed_user.fans.remove(user._id)
    }else{
      //未关注，需要关注
      user.follows.push(followed_user._id)
      followed_user.fans.push(user._id)
    }
    let result1 = await us.update(user)
    let result2 = await us.update(followed_user)
    if(result1 && result2){
      ctx.body = ResultFactory.buildSuccessResult(isFollow);
    }else{
      ctx.body = ResultFactory.buildFailResult("修改失败");
    }
}

const start_topic = async ctx => {
  let body = ctx.request.body;
  let tid = body.tid;
  const user = await us.getInfoByToken(ctx.header.token);
  let star_list = user.star_list;
  let isStar = star_list.indexOf(tid)>-1

  if(isStar){
    star_list.remove(tid)
    let result2 = await ts2.findAndUpdate({'_id':tid},{$inc:{'star_count':-1}})
  }else{
    star_list.push(tid)
    let result2 = await ts2.findAndUpdate({'_id':tid},{$inc:{'star_count':1}})
  }
  let result = await us.update({"_id":user._id,"star_list":star_list})
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(isStar);
  }else{
    ctx.body = ResultFactory.buildFailResult("修改失败");
  }
}

const remove = async ctx => {
  const id = verify(ctx.header.token).id
  let result = await us.remove(id);
  if(result.modifiedCount === 0){
    ctx.body = ResultFactory.buildFailResult("删除失败")
  }else{
    ctx.body = ResultFactory.buildSuccessResult("删除成功")
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
  start_topic
}
