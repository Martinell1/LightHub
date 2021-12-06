const commentService = require("../service/comment")
const ResultFactory = require('../result')
const ObjectId = require('mongoose').Types.ObjectId
const cs = new commentService();

const list = async ctx => {
  const id = ctx.query.aid;
  let result = await cs.list({"target_id":id})
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(result)
  }else{
    ctx.body = ResultFactory.buildFailResult(result)
  }

}

const add = async ctx => {
  let comment = ctx.request.body
  let result = await cs.add(comment)
  ctx.body =  result
}

const remove = async ctx => {
  const id = ctx.request.body
  let result = await cs.remove(id);
  if(result.modifiedCount === 0){
    ctx.body =  ResultFactory.buildFailResult("删除失败")
  }else{
    ctx.body =  ResultFactory.buildSuccessResult("删除成功")
  }
}

const update = async ctx => {
  let comment = ctx.request.body
  let result = await cs.update(comment)
  ctx.body = ResultFactory.buildSuccessResult(result);
}

const up_comment = async ctx => {
  let body = ctx.request.body;
  let comment = await cs.findOne({"_id":body._id})
  let isUp = comment.up_list.indexOf(body.user_id)>-1;
  if(isUp === true){
    //取消赞
    comment.up_list.remove(body.user_id)
  }else{
    //点赞
    comment.up_list.push(body.user_id)
    comment.step_list.remove(body.user_id)
  }
  let result = await ts.update(comment);
  if(result){
    if(isUp){
      ctx.body =  ResultFactory.buildSuccessResult("取消点赞成功")
    }else{
      ctx.body =  ResultFactory.buildSuccessResult("点赞成功")
    }
  }else{
    ctx.body = ResultFactory.buildFailResult("失败")
  }
}

const step_comment = async ctx => {
  let body = ctx.request.body;
  let comment = await cs.findOne({"_id":body._id})
  let isStep = comment.step_list.indexOf(body.user_id)>-1;
  if(isStep === true){
    //取消点踩
    comment.step_list.remove(body.user_id)
  }else{
    //点踩
    comment.step_list.push(body.user_id)
    comment.up_list.remove(body.user_id)
  }
  let result = await cs.update(comment);
  if(result){
    if(isStep){
      ctx.body =  ResultFactory.buildSuccessResult("取消点踩成功")
    }else{
      ctx.body =  ResultFactory.buildSuccessResult("点踩成功")
    }
  }else{
    ctx.body = ResultFactory.buildFailResult("失败")
  }
}



const reply = async ctx => {
  let body = ctx.request.body
  body.reply_list = JSON.parse(body.reply_list);
  let result = await cs.update(body)
  if(result){
    ctx.body = ResultFactory.buildSuccessResult("成功");
  }else{
    ctx.body = ResultFactory.buildFilResult("失败");
  }
}



module.exports = {
  list,
  add,
  remove,
  update,
  up_comment,
  step_comment,
  reply
}
