const UserService = require("../service/user")
const userService = new UserService();

const TagService = require("../service/tag");
const tagService = new TagService();

const TopicService = require("../service/topic");
const topicService = new TopicService();

const HistoryService = require("../service/history");
const historyService = new HistoryService();

const ObjectId = require('../config/db').Types.ObjectId


const follow_utils = async(ctx,field) => {
  const body = ctx.request.body;
  const user = await userService.getInfoByToken(ctx.header.token)
  let isFollow = undefined;
  let count = 0;
  let result1 = undefined;
  let result2 = undefined;
  if(field === 'tag'){
    const tag = await tagService.findOne({"_id":body.tag_id})
    isFollow = user.tag_list.indexOf(tag.name)>-1
    if(isFollow){
      //已关注，需要取关
      count = -1
      result1 = await userService.findAndUpdate({"_id":user._id},{$pull:{"tag_list":tag.name}});
      await historyService.delete({"user_id":user._id,"opt":'follow',"field":'tag','target_id':tag._id})
    }else{
      //未关注，需要关注
      count = 1
      result1 = await userService.findAndUpdate({"_id":user._id},{$push:{"tag_list":tag.name}});
      await historyService.add({"user_id":user._id,"opt":'follow',"field":'tag','target_id':tag._id})
    }
    result2 = await tagService.findAndUpdate({"_id":tag._id},{$inc:{"fans_count":count}})
  }

  else if(field === 'topic'){
    const tid = body.tid
    isFollow = user.star_list.indexOf(tid)>-1
    if(isFollow){
      //已关注，需要取关
      count = -1
      result1 = await userService.findAndUpdate({"_id":user._id},{$pull:{"star_list":tid}});  
      await historyService.delete({"user_id":user._id,"opt":'follow',"field":'topic','target_id':tid})
    }else{
      //未关注，需要关注
      count = 1
      result1 = await userService.findAndUpdate({"_id":user._id},{$push:{"star_list":tid}});
      await historyService.add({"user_id":user._id,"opt":'follow',"field":'topic','target_id':tid})
    }
    result2 = await topicService.findAndUpdate({"_id":tid},{$inc:{"star_count":count}})
  }

  else if(field === 'user'){
    const followed_user = await userService.findOne({"_id":body.followed_user_id})
    isFollow = user.follows.indexOf(followed_user._id)>-1
    if(isFollow){
      //已关注，需要取关
      count = -1
      result1 = await userService.findAndUpdate({"_id":user._id},{$pull:{"follows":followed_user._id}});  
      result2 = await userService.findAndUpdate({"_id":followed_user._id},{$pull:{"fans":user._id}})
      await historyService.delete({"user_id":user._id,"opt":'follow',"field":'user','target_id':body.followed_user_id})
    }else{
      //未关注，需要关注
      count = 1
      result1 = await userService.findAndUpdate({"_id":user._id},{$push:{"follows":followed_user._id}});  
      result2 = await userService.findAndUpdate({"_id":followed_user._id},{$push:{"fans":user._id}})
      await historyService.add({"user_id":user._id,"opt":'follow',"field":'user','target_id':body.followed_user_id})
    }
  }

  if(result1 && result2 && count === 1){
    return '关注成功'
  }else if(result1 && result2 && count === -1){
    return '取关成功'
  }else{
    return '出现错误'
  }
}

module.exports = {
  follow_utils
}