const TopicService = require("../service/topic")
const TagService = require("../service/tag")
const UserService = require("../service/user")
const ResultFactory = require('../result')
const topicService = new TopicService();
const tagService = new TagService()
const userService = new UserService()
const ObjectId = require('../config/db').Types.ObjectId
const toRegular = require('../utils/toRegular')
const {verify} = require('../utils/getToken')
const {up_utils} = require('../utils/thumbUtil')


const list = async ctx => {
  const user = await userService.getInfoByToken(ctx.header.token);
  let result = await topicService.getTopicListWithUserInfo();
  result.forEach(element=>{
    element.isUp = element.up_list.some(item => item === user._id.toString())
    element.up_count = element.up_list.length
    delete element.up_list
    element.initiator = element.initiator[0]
    element.isFollow = user.topic_list.some(item => item === element._id.toString())
  })
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }else{
    ctx.body = ResultFactory.buildFailResult(result)
  }
}

const listByInitiator = async ctx => {
  const id = ctx.query.id
  const user = await userService.getInfoByToken(ctx.header.token);
  let result = await topicService.getTopicListByInitiator(ObjectId(id));
  result.forEach(element=>{
    element.isUp = element.up_list.some(item => item === user._id.toString())
    element.up_count = element.up_list.length
    delete element.up_list
    element.initiator = element.initiator[0]
    element.isFollow = user.topic_list.some(item => item === element._id.toString())
  })
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }else{
    ctx.body = ResultFactory.buildFailResult(result)
  }
}

const detail = async ctx => {
  const user = await userService.getInfoByToken(ctx.header.token);
  let id = ObjectId(ctx.query.id);
  let result = await topicService.getTopicWithAnswer(id)
  result = result[0]
  result.initiator = result.initiator[0]
  result.isUp = result.up_list.some(item => item === verify(ctx.header.token).id)
  result.up_count = result.up_list.length
  delete result.up_list
  result.isFollow = user.topic_list.some(item => item === result._id.toString())
  if(result){
     ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }else{
    ctx.body = ResultFactory.buildFailResult("请求发生错误")
  }
}

const add = async ctx => {
  const uid = verify(ctx.header.token).id
  let body = ctx.request.body
  let user = await userService.update({"_id":uid},{$inc:{'topic_count':1}})
  body.tag_list = JSON.parse(body.tag_list)
  body.tag_list.forEach(async element => {
    let tag = await tagService.findAndUpdate({'name':element},{$inc:{'topic_count':1}})
  });
  let result = await topicService.add(body)
  if(result){
    ctx.body =  ResultFactory.buildSuccessResult(undefined,result)
  }else{
    ctx.body =  ResultFactory.buildFailResult(result)
  }

}

const remove = async ctx => {
  const id = ctx.request.body
  let result = await topicService.remove({"_id":id});
  if(result.modifiedCount === 0){
    ctx.body = ResultFactory.buildFailResult("删除失败")
  }else{
    ctx.body = ResultFactory.buildSuccessResult(undefined,"删除成功")
  }
}

const update = async ctx => {
  let topic = ctx.request.body
  let result = await topicService.update(topic)
  ctx.body = ResultFactory.buildSuccessResult(undefined,result);
}



const up_topic = async ctx => {
  const {message,data} = await up_utils(ctx,'topic');
  if(message === '出现错误'){
    ctx.body = ResultFactory.buildFailResult(message)
  }else{
    ctx.body = ResultFactory.buildSuccessResult(message,data)
  }
}




module.exports = {
  list,
  listByInitiator,
  detail,
  add,
  remove,
  update,
  up_topic,
}
