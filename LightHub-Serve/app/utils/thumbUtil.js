const ArticleService = require("../service/article");
const articleService = new ArticleService();

const TopicService = require("../service/topic");
const topicService = new TopicService();

const CommentService = require("../service/comment");
const commentService = new CommentService();

const AnswerService = require("../service/answer");
const answerService = new AnswerService();

const HistoryService = require("../service/history");
const historyService = new HistoryService();

const {verify} = require('./getToken')


const up_utils = async(ctx,field) => {
  const body = ctx.request.body;
  const uid = verify(ctx.header.token).id
  let result = undefined;
  let isUp = undefined;
  if(field === 'topic'){
    const topic = await topicService.findOne({"_id":body._id})
    isUp = topic.up_list.indexOf(uid)>-1;
    if(isUp){
      //取消赞
      result = await topicService.findAndUpdate({"_id":body._id},{$pull:{"up_list":uid}})
      await historyService.delete({"user_id":uid,"opt":'thumb',"field":'topic','target_id':body._id})
    }else{
      //点赞
      result = await topicService.findAndUpdate({"_id":body._id},{$push:{"up_list":uid},$pull:{"step_list":uid}})
      await historyService.add({"user_id":uid,"opt":'thumb',"field":'topic','target_id':body._id})
    }
  }
  
  else if(field === 'comment'){
    const comment = await commentService.findOne({"_id":body._id})
    let isUp = comment.up_list.indexOf(uid)>-1;
    if(isUp){
      //取消赞
      result = await commentService.findAndUpdate({"_id":body._id},{$pull:{"up_list":uid}})
    }else{
      //点赞
      result = await commentService.findAndUpdate({"_id":body._id},{$push:{"up_list":uid},$pull:{"step_list":uid}})
    }
  }

  else if(field === 'article'){
    const article = await articleService.findOne({"_id":body._id})
    isUp = article.up_list.indexOf(uid)>-1;
    if(isUp){
      //取消赞
      result = await articleService.findAndUpdate({"_id":body._id},{$pull:{"up_list":uid}})
      await historyService.delete({"user_id":uid,"opt":'thumb',"field":'article','target_id':body._id})

    }else{
      //点赞
      result = await articleService.findAndUpdate({"_id":body._id},{$push:{"up_list":uid},$pull:{"step_list":uid}})
      await historyService.add({"user_id":uid,"opt":'thumb',"field":'article','target_id':body._id})
    }
  }

  else if(field === 'answer'){
    const answer = await answerService.findOne({"_id":body._id})
    isUp = answer.up_list.indexOf(uid)>-1;
    if(isUp){
      //取消赞
      result = await answerService.findAndUpdate({"_id":body._id},{$pull:{"up_list":uid}})
    }else{
      //点赞
      result = await answerService.findAndUpdate({"_id":body._id},{$push:{"up_list":uid},$pull:{"step_list":uid}})
    }

  }

  if(result && isUp){
    return {
      message:"已取消点赞",
      data:-1
    }
  }else if(result && !isUp){
    return {
      message:"点赞成功",
      data:1
    }
  }else{
    return '出现错误'
  }
}

const step_utils = async(ctx,field) => {
  const body = ctx.request.body;
  const uid = verify(ctx.header.token).id
  let isStep = undefined;
  if(field === 'comment'){
    const comment = await commentService.findOne({"_id":body._id})
    isStep = comment.step_list.indexOf(uid)>-1;
    if(isStep){
      //取消点踩
      result = await commentService.findAndUpdate({"_id":body._id},{$pull:{"step_list":uid}})
    }else{
      //点踩
      result = await commentService.findAndUpdate({"_id":body._id},{$push:{"step_list":uid},$pull:{"up_list":uid}})
    }
  }

  else if(field === 'article'){
    const article = await articleService.findOne({"_id":body._id})
    isStep = article.step_list.indexOf(uid)>-1;
    if(isStep){
      //取消点踩
      result = await articleService.findAndUpdate({"_id":body._id},{$pull:{"step_list":uid}})
    }else{
      //点踩
      result = await articleService.findAndUpdate({"_id":body._id},{$push:{"step_list":uid},$pull:{"up_list":uid}})
    }
  }

  else if(field === 'answer'){
    const answer = await answerService.findOne({"_id":body._id})
    isStep = article.step_list.indexOf(uid)>-1;
    if(isStep){
      //取消点踩
      result = await answerService.findAndUpdate({"_id":body._id},{$pull:{"step_list":uid}})
    }else{
      //点踩
      result = await answerService.findAndUpdate({"_id":body._id},{$push:{"step_list":uid},$pull:{"up_list":uid}})
    }
  }

  if(result && isStep){
    return "已取消点踩"
  }else if(result && !isStep){
    return '踩了一下'
  }else{
    return '出现错误'
  }

}


module.exports = {
  up_utils,
  step_utils
}