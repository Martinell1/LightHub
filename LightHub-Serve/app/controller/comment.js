const CommentService = require("../service/comment")
const ResultFactory = require('../result')
const ObjectId = require('../config/db').Types.ObjectId
const commentService = new CommentService();
const {verify} = require('../utils/getToken')
const {up_utils,step_utils} = require('../utils/thumbUtil');
const ArticleService = require("../service/article");
const articleService = new ArticleService()

const list = async ctx => {
  const id = ObjectId(ctx.query.aid);
  let result = await commentService.getCommentListWithUserInfo(id);
  result.forEach(element => {
    element.commenter = element.commenter[0]
  });
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }else{
    ctx.body = ResultFactory.buildFailResult(result)
  }

}

const add = async ctx => {
  let body = ctx.request.body
  let result = await commentService.add(body)
  await articleService.update({"_id":body.aid},{$inc:{'comment_count':1}})
  if(result){
    ctx.body =  ResultFactory.buildSuccessResult(undefined,result)
  }
}

const remove = async ctx => {
  const id = ctx.request.body
  let result = await commentService.remove(id);
  if(result.modifiedCount === 0){
    ctx.body =  ResultFactory.buildFailResult("删除失败")
  }else{
    ctx.body =  ResultFactory.buildSuccessResult(undefined,"删除成功")
  }
}

const update = async ctx => {
  let comment = ctx.request.body
  let result = await commentService.update(comment)
  ctx.body = ResultFactory.buildSuccessResult(undefined,result);
}

const up_comment = async ctx => {
  const result = await up_utils(ctx,'comment');
  if(result === '出现错误'){
    ctx.body = ResultFactory.buildFailResult(result)
  }else{
    ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }body = ResultFactory.buildFailResult("失败")
}

const step_comment = async ctx => {
  const result = await step_utils(ctx,'comment');
  if(result === '出现错误'){
    ctx.body = ResultFactory.buildFailResult(result)
  }else{
    ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }
}


const reply = async ctx => {
  let body = ctx.request.body
  body.reply_list = JSON.parse(body.reply_list);
  let result = await commentService.update(body)
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,"成功");
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
