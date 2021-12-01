const userService = require("../service/user")
const articleService = require("../service/article");
const ResultFactory = require('../result')
const us = new userService();
const as = new articleService();
const {getToken,verify} = require('../utils/getToken')
const bcrypt = require('bcryptjs');


const login = async ctx => {
  let body = ctx.request.body;
  let user = await us.findOne({"account":body.account})
  if(!user){
    return ctx.body = ResultFactory.buildFailResult("用户不存在")
  }
  let isEqual = await bcrypt.compare(body.password, user.password);
  if(isEqual){
    return ctx.body = ResultFactory.buildSuccessResult(getToken({"id":user._id}))
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
    let result = await us.findOne({"_id":id})
    if(result){
      return ctx.body = ResultFactory.buildSuccessResult(result);
    }
  }else{
    const token = ctx.query.token;
    const id = verify(token).id;
    let result = await us.findOne({"_id":id})
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
  let result1 = await us.update(body);
  let user = await us.findOne({"_id":body._id})
  let result2 = await as.updates({"author_id":user._id},{"author_nickname":user.nickname});
  
  if(result1 && result2){
    ctx.body = ResultFactory.buildSuccessResult(user);
  }else{
    ctx.body = ResultFactory.buildFailResult("更新失败");
  }

}

const remove = async ctx => {
  const id = ctx.request.body
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
  info
}
