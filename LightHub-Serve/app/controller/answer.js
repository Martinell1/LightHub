const AnswerService = require("../service/answer")
const UserService = require("../service/user");
const ResultFactory = require('../result')
const answerService = new AnswerService();
const userService = new UserService()
const ObjectId = require('../config/db').Types.ObjectId
const {verify} = require('../utils/getToken')
const {up_utils,step_utils} = require('../utils/thumbUtil');
const TopicService = require("../service/topic");
const topicService = new TopicService()



const saveOrUpdate = async ctx => {
  let body = ctx.request.body;
  const uid = verify(ctx.header.token).id
  let temp = await answerService.findOne({"topic_id":body.topic_id,"answerer_id":uid})
  let result = undefined;
  if(temp){
    result = await answerService.findAndUpdate({"topic_id":body.topic_id,"answerer_id":uid},{"content":body.content})
  }else{
    result = await answerService.add(body);
    await topicService.findAndUpdate({"_id":body.topic_id},{$inc:{"answer_count":1}})
  }
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,"编辑成功");
  }else{
    ctx.body = ResultFactory.buildFailResult("编辑失败")
  }
}

const list = async ctx => {
  let id = ObjectId(ctx.query.tid);
  let result = await answerService.getAnswerListByTopicId(id)
  result.forEach(element => {
    element.answerer = element.answerer[0]
    element.isUp = element.up_list.some(item => item === verify(ctx.header.token).id)
    element.isStep = element.step_list.some(item => item === verify(ctx.header.token).id)
    element.up_count = element.up_list.length - element.step_list.length;
  });
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,result);
  }else{
    ctx.body = ResultFactory.buildFailResult("回答失败")
  }
}

const listByAnswerer = async ctx => {
  const id = ObjectId(ctx.query.id);
  let result = await answerService.getAnswerListByAnswerer(id)
  result.forEach(element => {
    element.answerer = element.answerer[0]
    element.topic = element.topic[0]
    element.isUp = element.up_list.some(item => item === verify(ctx.header.token).id)
    element.isStep = element.step_list.some(item => item === verify(ctx.header.token).id)
    element.up_count = element.up_list.length - element.step_list.length;
  });
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,result);
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
    ctx.body = ResultFactory.buildSuccessResult(undefined,result[0]);
  }else{
    ctx.body = ResultFactory.buildFailResult("回答失败")
  }
}


const remove = async ctx => {
  const id = ctx.request.body
  let result = await answerService.remove({"_id":id});
  if(result.modifiedCount === 0){
    ctx.body =  ResultFactory.buildFailResult("删除失败")
  }else{
    ctx.body =  ResultFactory.buildSuccessResult(undefined,"删除成功")
  }
}

const update = async ctx => {
  let answer = ctx.request.body
  let result = await answerService.update(answer)
  ctx.body = ResultFactory.buildSuccessResult(undefined,result);
}

const up_answer = async ctx => {
  const {message,data} = await up_utils(ctx,'answer');
  if(message === '出现错误'){
    ctx.body = ResultFactory.buildFailResult(message)
  }else{
    ctx.body = ResultFactory.buildSuccessResult(message,data)
  }
}


const step_answer = async ctx => {
  const {message,data} = await step_utils(ctx,'answer');
  if(message === '出现错误'){
    ctx.body = ResultFactory.buildFailResult(message)
  }else{
    ctx.body = ResultFactory.buildSuccessResult(message,data)
  }
}

module.exports = {
  list,
  listByAnswerer,
  saveOrUpdate,
  detail,
  up_answer,
  step_answer,
  remove,
  update,
}
