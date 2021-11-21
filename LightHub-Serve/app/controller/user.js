const userService = require("../service/user")
const ResultFactory = require('../result')
const us = new userService();
const {getToken} = require('../utils/getToken')
const bcrypt = require('bcryptjs')

const login = async ctx => {
  console.log(ctx)
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
  return ctx.body =  result
}

const list = async ctx => {
  let result = await us.list()
  ctx.body = ResultFactory.buildSuccessResult(result)
}

const update = async ctx => {
  let user = ctx.request.body
  let result = await us.update(user)
  ctx.body = ResultFactory.buildSuccessResult(result);
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
  login
}
