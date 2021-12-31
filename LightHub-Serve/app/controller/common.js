const {accessKey,secretKey,bucket} = require("../config/upload")
const qiniu = require('qiniu')
const ResultFactory = require('../result');
const ArticleService = require("../service/article");
const TopicService = require("../service/topic");
const UserService = require("../service/user");
const articleService = new ArticleService()
const topicService = new TopicService()
const userService = new UserService()

const upload = async ctx =>{
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

  const options = {
    scope: bucket,
    expires: 7200
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);
  if(uploadToken){
     ctx.body = ResultFactory.buildSuccessResult(undefined,uploadToken)
  }
}

const search = async ctx => {
  const {value,page} = ctx.query
  let result = {}
  let article = await articleService.getArticleListWithUserInfo(page,value)
  let currentUser = undefined;
  if(ctx.header.authorization){
    currentUser = await userService.getInfoByToken(ctx.header.authorization);
  }
  article.forEach(element => {
    if(currentUser){
      element.isUp = element.up_list.some(item => item === currentUser._id.toString())
    }else{
      element.isUp = false
    }
    element.author = element.author[0]
  });  
  let topic = await topicService.getTopicListWithUserInfo(page,value)
  topic.forEach(element => {
    if(currentUser){
      element.isUp = element.up_list.some(item => item === currentUser._id.toString())
      element.isFollow = currentUser.topic_list.some(item => item === element._id.toString())
    }else{
      element.isUp = false
      element.isFollow = false
    }
    element.initiator = element.initiator[0]
  });
  let user = await userService.getUserListOnSearch(page,value)
  user.forEach(element => {
    if(currentUser){
      element.isFollow = element.fans.some(item => item.toString() === currentUser._id.toString())
    }else{
      element.isFollow = false
    }
  });
  result.article = article
  result.topic = topic
  result.user = user
  if(result){
    ctx.body = ResultFactory.buildSuccessResult(undefined,result)
  }else{
    ctx.body = ResultFactory.buildFailResult("获取信息失败")
  }
}

module.exports = {
  upload,
  search
}