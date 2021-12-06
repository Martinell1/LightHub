const answerService = require("../service/answer")
const topicService = require("../service/topic")
const ResultFactory = require('../result')
const as = new answerService();

const answer_topic = async ctx => {
  let body = ctx.request.body;
  let result = await as.add(answer)
  if(result){
    ctx.body = ResultFactory.buildSuccessResult("回答成功");
  }else{
    ctx.body = ResultFactory.buildFailResult("回答失败")
  }
}


const remove = async ctx => {
  const id = ctx.request.body
  let result = await as.remove(id);
  if(result.modifiedCount === 0){
    ctx.body =  ResultFactory.buildFailResult("删除失败")
  }else{
    ctx.body =  ResultFactory.buildSuccessResult("删除成功")
  }
}

const update = async ctx => {
  let answer = ctx.request.body
  let result = await as.update(answer)
  ctx.body = ResultFactory.buildSuccessResult(result);
}

const up_answer = async ctx => {
  let body = ctx.request.body;
  let answer = await as.findOne({"_id":body._id})
  let isUp = answer.up_list.indexOf(body.user_id)>-1;
  if(isUp === true){
    //取消赞
    answer.up_list.remove(body.user_id)
  }else{
    //点赞
    answer.up_list.push(body.user_id)
    answer.step_list.remove(body.user_id)
  }
  let result = await as.update(answer);
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

const step_answer = async ctx => {
  let body = ctx.request.body;
  let answer = await as.findOne({"_id":body._id})
  let isStep = article.step_list.indexOf(body.user_id)>-1;
  if(isStep === true){
    //取消点踩
    answer.step_list.remove(body.user_id)
  }else{
    //点踩
    answer.step_list.push(body.user_id)
    answer.up_list.remove(body.user_id)
  }
  let result = await as.update(answer);
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

module.exports = {
  answer_topic,
  up_answer,
  step_answer,
  remove,
  update,
}
