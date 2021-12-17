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
          _id:id,
          status:1
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
        $match:{
          status:1
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

  async getArticleListByAuthor(id){
    return this.model.aggregate([
      {
        $match:{
          author_id:id,
          status:1
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
         },
         status:1
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

  async getCreatorInfo(id){
    return this.model.aggregate([
      {
        $match:{
          author_id:id,
        }
      },
      {
        $group:{
          _id:'$author_id',
          article_count:{
            $sum:1
          },
          article_view_count:{
            $sum:'$view_count'
          },
          article_up_count:{
            $sum:'$up_count'
          },
          article_comment_count:{
            $sum:'$comment_count'
          },
          article_fav_count:{
            $sum:'$fav_count'
          }
        }
      },
    ])
  }

  async getDraftArticle(id){
    return this.model.aggregate([
      {
        $match:{
          author_id:id,
          status:2,
        }
      }
    ])
  }
}

module.exports = ArticleService;