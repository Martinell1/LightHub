const UserService = require("../service/user")
const userService = new UserService();

const TagService = require("../service/tag");
const tagService = new TagService();

const TopicService = require("../service/topic");
const topicService = new TopicService();

const HistoryService = require("../service/history")
const historyService = new HistoryService()

class Action{
  constructor(field,item){
    this.type = 'follow';
    this.field = field;
    this.item = item;
    this.time = new Date().toLocaleString()
  }

  getAction(){
    return{
      "type":this.type,
      "field":this.field,
      "item":this.item,
    }
  }
}

const follow_utils = async(ctx,field) => {
  const body = ctx.request.body;
  const user = await userService.getInfoByToken(ctx.header.token)
  let isFollow = undefined;
  let count = 0;
  let result1 = undefined;
  let result2 = undefined;
  if(field === 'tag'){
    const tag = await tagService.findOne({"_id":body.tag_id})
    const action = new Action('tag',body.tag_id);
    isFollow = user.tag_list.indexOf(tag.name)>-1
    if(isFollow){
      //已关注，需要取关
      count = -1
      result1 = await userService.findAndUpdate({"_id":user._id},{$pull:{"tag_list":tag.name}});
      await historyService.findAndUpdate({"user_id":user._id},{$pull:{"action_list":action.getAction()}});
    }else{
      //未关注，需要关注
      count = 1
      result1 = await userService.findAndUpdate({"_id":user._id},{$push:{"tag_list":tag.name}});
      await historyService.findAndUpdate({"user_id":user._id},{$push:{"action_list":action}})
    }
    result2 = await tagService.findAndUpdate({"_id":tag._id},{$inc:{"fans_count":count}})
  }

  else if(field === 'topic'){
    const tid = body.tid
    const action = new Action('topic',tid);
    isFollow = user.star_list.indexOf(tid)>-1
    if(isFollow){
      //已关注，需要取关
      count = -1
      result1 = await userService.findAndUpdate({"_id":user._id},{$pull:{"star_list":tid}});  
      await historyService.findAndUpdate({"user_id":user._id},{$pull:{"action_list":action.getAction()}});
    }else{
      //未关注，需要关注
      count = 1
      result1 = await userService.findAndUpdate({"_id":user._id},{$push:{"star_list":tid}});
      await historyService.findAndUpdate({"user_id":user._id},{$push:{"action_list":action}})
    }
    result2 = await topicService.findAndUpdate({"_id":tid},{$inc:{"star_count":count}})
  }

  else if(field === 'user'){
    const followed_user = await userService.findOne({"_id":body.followed_user_id})
    const action = new Action('user',body.followed_user_id);
    isFollow = user.follows.indexOf(followed_user._id)>-1
    if(isFollow){
      //已关注，需要取关
      count = -1
      result1 = await userService.findAndUpdate({"_id":user._id},{$pull:{"follows":followed_user._id}});  
      result2 = await userService.findAndUpdate({"_id":followed_user._id},{$pull:{"fans":user._id}})
      await historyService.findAndUpdate({"user_id":user._id},{$pull:{"action_list":action.getAction()}});
    }else{
      //未关注，需要关注
      count = 1
      result1 = await userService.findAndUpdate({"_id":user._id},{$push:{"follows":followed_user._id}});  
      result2 = await userService.findAndUpdate({"_id":followed_user._id},{$push:{"fans":user._id}})
      await historyService.findAndUpdate({"user_id":user._id},{$push:{"action_list":action}})
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