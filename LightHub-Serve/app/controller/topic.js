const topicService = require("../service/topic")
const ResultFactory = require('../result')
const ts = new topicService();
const tagService = require("../service/tag")
const answerService = require("../service/answer")
const userService = require("../service/user")
const as = new answerService()
const tagS = new tagService()
const us = new userService()
const toRegular = require('../utils/toRegular')
const ObjectId = require('../config/db').Types.ObjectId
const {verify} = require('../utils/getToken')

const list = async ctx => {
  let result = await ts.getTopicListWithUserInfo();
  result.forEach(element => {
    element.initiator = element.initiator[0]
  });
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(result)
  }else{
    ctx.body = ResultFactory.buildFailResult(result)
  }
}

const detail = async ctx => {
  let id = ObjectId(ctx.query.id);
  let result = await ts.getTopicWithAnswer(id)
  result[0].initiator = result[0].initiator[0]
  if(result[0]){
     ctx.body = ResultFactory.buildSuccessResult(result[0])
  }else{
    ctx.body = ResultFactory.buildFailResult("请求发生错误")
  }
}

const add = async ctx => {
  const uid = verify(ctx.header.token).id
  let body = ctx.request.body
  let user = await us.update({"_id":uid},{$inc:{'topic_count':1}})
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
  const uid = verify(ctx.header.token).id
  let topic = await ts.findOne({"_id":body._id})
  let isUp = topic.up_list.indexOf(uid)>-1;
  if(isUp === true){
    //取消赞
    topic.up_list.remove(uid)
  }else{
    //点赞
    topic.up_list.push(uid)
    topic.step_list.remove(uid)
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



module.exports = {
  list,
  detail,
  add,
  remove,
  update,
  up_topic,
}
