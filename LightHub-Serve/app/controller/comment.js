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
  for(let i=0,len=result.length;i<len;i++){
    result[i].commenter = result[i].commenter[0]
    result[i].reply_list = await commentService.getCommentListWithUserInfo(id,result[i]._id)
  }
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }else{
    ctx.body = ResultFactory.buildFailResult(result)
  }
}

const listByUser = async ctx => {
  const page = ctx.query.page;
  const uid = ObjectId(verify(ctx.header.authorization))
  let result = await commentService.getCommentListByUser(uid);
  result.forEach(element => {
    element.article = element.article[0]
  });
  result = result.splice(10*(page-1),10*page)
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }else{
    ctx.body = ResultFactory.buildFailResult(result)
  }
}

const add = async ctx => {
  let body = ctx.request.body
  body.commenter_id = verify(ctx.header.authorization)
  let result = await commentService.add(body)
  await articleService.update({"_id":body.article_id},{$inc:{'comment_count':1}})
  if(result){
    ctx.body =  ResultFactory.buildSuccessResult(undefined,result)
  }
}

const remove = async ctx => {
  const cid = ObjectId(ctx.request.body.cid)
  let result = await commentService.remove({"_id":cid});
  if(result.modifiedCount === 0){
    ctx.body =  ResultFactory.buildFailResult("删除失败")
  }else{
    ctx.body =  ResultFactory.buildSuccessResult(undefined,"删除成功")
  }
}

const update = async ctx => {
  let comment = ctx.request.body
  let result = await commentService.findAndUpdate({"_id":comment._id},comment)
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,'修改成功');
  }else{
    ctx.body =  ResultFactory.buildFailResult("修改成功")
  }
 
}

const up_comment = async ctx => {
  const {message,data} = await up_utils(ctx,'comment');
  if(message === '出现错误'){
    ctx.body = ResultFactory.buildFailResult(message)
  }else{
    ctx.body = ResultFactory.buildSuccessResult(message,data)
  }
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
  listByUser,
  add,
  remove,
  update,
  up_comment,
  step_comment,
  reply
}
