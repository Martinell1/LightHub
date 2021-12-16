const {article} = require('../model')
const Service = require('./')

class ArticleService extends Service{
  constructor(){
    super(article)
  }

  async getArticleWithUserInfo(id){
    return this.model.aggregate([
      {
        $match:{
          _id:id
        }
      },
      {
        $limit:1
      },
      {
        $lookup:{
          from: "users",
          localField: "author_id",
          foreignField: "_id",
          as: "author",
        }
      },
      {
        $project:{
          author: {
            account:0,
            password:0,
            salt:0,
            role:0,
            tag_list:0,
            gender:0,
            phone:0,
            email:0,
            education:0,
          }
        }
      }
    ])
  }

  async getArticleListWithUserInfo(){
    return this.model.aggregate([
      {
        $lookup:{
          from: "users",
          localField: "author_id",
          foreignField: "_id",
          as: "author",
        }
      },
      {
        $project:{
          author: {
            account:0,
            password:0,
            salt:0,
            role:0,
            tag_list:0,
            gender:0,
            phone:0,
            email:0,
            education:0,
          }
        }
      }
    ])
  }

  async getArticleListByAuthor(id){
    return this.model.aggregate([
      {
        $match:{
          author_id:id
        }
      },
      {
        $lookup:{
          from: "users",
          localField: "author_id",
          foreignField: "_id",
          as: "author",
        }
      },
      {
        $project:{
          author: {
            account:0,
            password:0,
            salt:0,
            role:0,
            tag_list:0,
            gender:0,
            phone:0,
            email:0,
            education:0,
          }
        }
      }
    ])
  }

  async getArticleListByTag(tagList){
    return this.model.aggregate([
      {
        $match:{
         tag_list:{
            $in:tagList
         }
        }
      },
      {
        $lookup:{
          from: "users",
          localField: "author_id",
          foreignField: "_id",
          as: "author",
        }
      },
      {
        $project:{
          author: {
            account:0,
            password:0,
            salt:0,
            role:0,
            tag_list:0,
            gender:0,
            phone:0,
            email:0,
            education:0,
          }
        }
      }
    ])
  }
}

module.exports = ArticleService;