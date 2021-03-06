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
  let page = ctx.query.page;
  let user = undefined
  if(ctx.header.authorization){
    user = await userService.getInfoByToken(ctx.header.authorization);
  }
  let result = await topicService.getTopicListWithUserInfo(page);
  result.forEach(element=>{
    if(user){
      element.isUp = element.up_list.some(item => item === user._id.toString())
      element.isFollow = user.topic_list.some(item => item === element._id.toString())
    }else{
      element.isUp = false
      element.isFollow = false
    }
    element.initiator = element.initiator[0]
  })
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }else{
    ctx.body = ResultFactory.buildFailResult(result)
  }
}

const listByInitiator = async ctx => {
  const id = ctx.query.id
  const page = ctx.query.page
  let user = undefined
  if(ctx.header.authorization){
    user = await userService.getInfoByToken(ctx.header.authorization);
  }
  let result = await topicService.getTopicListByInitiator(ObjectId(id),page);
  result.forEach(element=>{
    if(user){
      element.isUp = element.up_list.some(item => item === user._id.toString())
      element.isFollow = user.topic_list.some(item => item === element._id.toString())
    }else{
      element.isUp = false
      element.isFollow = false
    }

    element.up_count = element.up_list.length
    delete element.up_list
    element.initiator = element.initiator[0]

  })
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }else{
    ctx.body = ResultFactory.buildFailResult(result)
  }
}

const detail = async ctx => {
  let id = ObjectId(ctx.query.id);
  let result = await topicService.getTopicWithAnswer(id)
  let user = undefined;
  if(ctx.header.authorization){
    user = await userService.getInfoByToken(ctx.header.authorization);
  }
  result = result[0]
  result.initiator = result.initiator[0]
  if(ctx.header.authorization){
    result.isUp = result.up_list.some(item => item === user._id.toString())
    result.isFollow = user.topic_list.some(item => item === result._id.toString())
  }else{
    result.isUp = false
    result.isFollow = false
  }
  result.up_count = result.up_list.length
  delete result.up_list

  if(result){
     ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }else{
    ctx.body = ResultFactory.buildFailResult("??????????????????")
  }
}

const add = async ctx => {
  const uid = verify(ctx.header.authorization)
  let body = ctx.request.body
  body.tag_list = JSON.parse(body.tag_list)
  body.initiator_id = uid
  let result = undefined
  if(body._id){
    //??????
    result = await topicService.findAndUpdate({"_id":body._id},body)
  }else{
    //??????
    result = await topicService.add(body)
    const user = await userService.update({"_id":uid},{$inc:{'topic_count':1}})
  }
  body.tag_list.forEach(async element => {
    await tagService.findAndUpdate({'name':element},{$inc:{'topic_count':1}})
  });
  if(result){
    ctx.body =  ResultFactory.buildSuccessResult(undefined,'??????')
  }else{
    ctx.body =  ResultFactory.buildFailResult(result)
  }

}

const remove = async ctx => {
  const tid = ctx.request.body.tid
  const uid = verify(ctx.header.authorization);
  const topic = await topicService.findOne({"_id":tid},{"initiator_id":1})
  let result = undefined;
  if(uid === topic.initiator_id.toString()){
    let temp = await historyService.delete({"target_id":tid})
    result = await topicService.remove({"_id":tid});
  }
  if(result.modifiedCount === 0){
    ctx.body =  ResultFactory.buildFailResult("????????????")
  }else{
    ctx.body =  ResultFactory.buildSuccessResult(undefined,"????????????")
  }
}

const update = async ctx => {
  let topic = ctx.request.body
  let result = await topicService.update(topic)
  ctx.body = ResultFactory.buildSuccessResult(undefined,result);
}



const up_topic = async ctx => {
  const {message,data} = await up_utils(ctx,'topic');
  if(message === '????????????'){
    ctx.body = ResultFactory.buildFailResult(message)
  }else{
    ctx.body = ResultFactory.buildSuccessResult(message,data)
  }
}

const creator_topic_list = async ctx => {
  const page = ctx.query.page
  const id = verify(ctx.header.authorization);
  let result = await topicService.find({"initiator_id":id},{'title':1,'introduce':1,'tag_list':1,'create_time':1})
                                 .skip((page-1)*10)
                                 .limit(10)
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }else{
    ctx.body = ResultFactory.buildFailResult('????????????')
  }
}





module.exports = {
  list,
  listByInitiator,
  creator_topic_list,
  detail,
  add,
  remove,
  update,
  up_topic,
}
