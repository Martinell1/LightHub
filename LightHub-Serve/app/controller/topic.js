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
  let result = await topicService.getTopicListWithUserInfo();
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
  let result = await topicService.getTopicWithAnswer(id)
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
  let user = await userService.update({"_id":uid},{$inc:{'topic_count':1}})
  body.tag_list = JSON.parse(body.tag_list)
  body.tag_list.forEach(async element => {
    let tag = await tagService.findAndUpdate({'name':element},{$inc:{'topic_count':1}})
  });
  let result = await topicService.add(body)
  if(result){
    ctx.body =  ResultFactory.buildSuccessResult(result)
  }else{
    ctx.body =  ResultFactory.buildFailResult(result)
  }

}

const remove = async ctx => {
  const id = ctx.request.body
  let result = await topicService.remove(id);
  if(result.modifiedCount === 0){
    ctx.body = ResultFactory.buildFailResult("删除失败")
  }else{
    ctx.body = ResultFactory.buildSuccessResult("删除成功")
  }
}

const update = async ctx => {
  let topic = ctx.request.body
  let result = await topicService.update(topic)
  ctx.body = ResultFactory.buildSuccessResult(result);
}



const up_topic = async ctx => {
  const result = await up_utils(ctx,'topic');
  if(result === '出现错误'){
    ctx.body = ResultFactory.buildFailResult(result)
  }else{
    ctx.body = ResultFactory.buildSuccessResult(result)
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
