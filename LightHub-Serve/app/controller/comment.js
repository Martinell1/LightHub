const commentService = require("../service/comment")
const ResultFactory = require('../result')
const ObjectId = require('../config/db').Types.ObjectId
const cs = new commentService();
const {verify} = require('../utils/getToken')

const list = async ctx => {
  const id = ObjectId(ctx.query.aid);
  let result = await cs.getCommentListWithUserInfo(id);
  result.forEach(element => {
    element.commenter = element.commenter[0]
  });
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(result)
  }else{
    ctx.body = ResultFactory.buildFailResult(result)
  }

}

const add = async ctx => {
  let body = ctx.request.body
  let result = await cs.add(body)
  if(result){
    ctx.body =  ResultFactory.buildSuccessResult(result)
  }
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
  const uid = verify(ctx.header.token).id
  let comment = await cs.findOne({"_id":body._id})
  let isUp = comment.up_list.indexOf(uid)>-1;
  if(isUp === true){
    //取消赞
    comment.up_list.remove(uid)
  }else{
    //点赞
    comment.up_list.push(uid)
    comment.step_list.remove(uid)
  }
  let result = await cs.update(comment);
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
  const uid = verify(ctx.header.token).id
  let comment = await cs.findOne({"_id":body._id})
  let isStep = comment.step_list.indexOf(uid)>-1;
  if(isStep === true){
    //取消点踩
    comment.step_list.remove(uid)
  }else{
    //点踩
    comment.step_list.push(uid)
    comment.up_list.remove(uid)
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
