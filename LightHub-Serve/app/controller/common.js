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
  article.forEach(element => {
    element.author = element.author[0]
  });  
  let topic = await topicService.getTopicListWithUserInfo(page,value)
  topic.forEach(element => {
    element.initiator = element.initiator[0]
  });
  let user = await userService.find({"nickname":new RegExp(value)}) 

  result.article = article
  result.topic = topic;
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