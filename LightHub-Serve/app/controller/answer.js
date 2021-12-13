const AnswerService = require("../service/answer")
const ResultFactory = require('../result')
const answerService = new AnswerService();
const ObjectId = require('../config/db').Types.ObjectId
const {verify} = require('../utils/getToken')
const {up_utils,step_utils} = require('../utils/thumbUtil')

const saveOrUpdate = async ctx => {
  let body = ctx.request.body;
  const uid = verify(ctx.header.token).id
  let temp = await answerService.findOne({"topic_id":body.topic_id,"answerer_id":uid})
  let result = undefined;
  if(temp){
    result = await answerService.findAndUpdate({"topic_id":body.topic_id,"answerer_id":uid},{"content":body.content})
  }else{
    result = await answerService.add(body);
  }
  if(result){
    ctx.body = ResultFactory.buildSuccessResult("编辑成功");
  }else{
    ctx.body = ResultFactory.buildFailResult("编辑失败")
  }
}

const list = async ctx => {
  let id = ObjectId(ctx.query.tid);
  let result = await answerService.getAnswerListByTopicId(id)
  result.forEach(element => {
    element.answerer = element.answerer[0]
  });
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(result);
  }else{
    ctx.body = ResultFactory.buildFailResult("回答失败")
  }
}

const detail = async ctx => {
  let tid = ObjectId(ctx.query.tid);
  let uid = ObjectId(ctx.query.uid);
  let result = await answerService.getAnswerByUserId(tid,uid)
  result.forEach(element => {
    element.answerer = element.answerer[0]
  });
  if(result[0]){
    ctx.body = ResultFactory.buildSuccessResult(result[0]);
  }else{
    ctx.body = ResultFactory.buildFailResult("回答失败")
  }
}


const remove = async ctx => {
  const id = ctx.request.body
  let result = await answerService.remove(id);
  if(result.modifiedCount === 0){
    ctx.body =  ResultFactory.buildFailResult("删除失败")
  }else{
    ctx.body =  ResultFactory.buildSuccessResult("删除成功")
  }
}

const update = async ctx => {
  let answer = ctx.request.body
  let result = await answerService.update(answer)
  ctx.body = ResultFactory.buildSuccessResult(result);
}

const up_answer = async ctx => {
  const result = await up_utils(ctx,'answer');
  if(result === '出现错误'){
    ctx.body = ResultFactory.buildFailResult(result)
  }else{
    ctx.body = ResultFactory.buildSuccessResult(result)
  }
}

const step_answer = async ctx => {
  const result = await step_utils(ctx,'answer');
  if(result === '出现错误'){
    ctx.body = ResultFactory.buildFailResult(result)
  }else{
    ctx.body = ResultFactory.buildSuccessResult(result)
  }
}

module.exports = {
  list,
  saveOrUpdate,
  detail,
  up_answer,
  step_answer,
  remove,
  update,
}
