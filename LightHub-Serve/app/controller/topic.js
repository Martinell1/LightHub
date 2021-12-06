const topicService = require("../service/topic")
const ResultFactory = require('../result')
const ts = new topicService();
const tagService = require("../service/tag")
const answerService = require("../service/answer")
const as = new answerService()
const tagS = new tagService()
const toRegular = require('../utils/toRegular')

const list = async ctx => {
  let result = await ts.find({},{answer_list:0})
  ctx.body = ResultFactory.buildSuccessResult(result)
}

const add = async ctx => {
  let body = ctx.request.body
  let user = await us.update({"_id":body._id},{"topic_count":body.topic_count++})
  body.tag_list = JSON.parse(body.tag_list)
  body.tag_list.forEach(async element => {
    let tag = await tagS.findAndUpdate({'name':element},{$inc:{'topic_count':1}})
  });
  let result = await ts.add(body)
  if(result){
    ctx.body =  ResultFactory.buildSuccessResult(result)
  }else{
    ctx.body =  ResultFactory.buildFailResult(result)
  }

}

const remove = async ctx => {
  const id = ctx.request.body
  let result = await ts.remove(id);
  if(result.modifiedCount === 0){
    ctx.body = ResultFactory.buildFailResult("删除失败")
  }else{
    ctx.body = ResultFactory.buildSuccessResult("删除成功")
  }
}

const update = async ctx => {
  let topic = ctx.request.body
  let result = await ts.update(topic)
  ctx.body = ResultFactory.buildSuccessResult(result);
}



const up_topic = async ctx => {
  let body = ctx.request.body;
  let topic = await ts.findOne({"_id":body._id})
  let isUp = topic.up_list.indexOf(body.user_id)>-1;
  if(isUp === true){
    //取消赞
    topic.up_list.remove(body.user_id)
  }else{
    //点赞
    topic.up_list.push(body.user_id)
    topic.step_list.remove(body.user_id)
  }
  let result = await ts.update(topic);
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

const step_topic = async ctx => {
  let body = ctx.request.body;
  let topic = await ts.findOne({"_id":body._id})
  let isStep = topic.step_list.indexOf(body.user_id)>-1;
  if(isStep === true){
    //取消点踩
    topic.step_list.remove(body.user_id)
  }else{
    //点踩
    topic.step_list.push(body.user_id)
    topic.up_list.remove(body.user_id)
  }
  let result = await ts.update(topic);
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
  list,
  add,
  remove,
  update,
  up_topic,
  step_topic
}
