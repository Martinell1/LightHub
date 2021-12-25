const {article} = require('../model')
const Service = require('./')

class ArticleService extends Service{

  constructor(){
    super(article)
    this.count = 10
  }



  async getArticleWithUserInfo(id){
    return this.model.aggregate([
      {
        $match:{
          _id:id,
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

  async getArticleListWithUserInfo(page){
    let skip = (page - 1)*this.count
    return this.model.aggregate([
      {
        $match:{
          status:1
        }
      },
      {
        $skip:skip
      },
      {
        $limit:this.count
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
            follows:0,
            fans:0,
            topic_list:0,
            gender:0,
            phone:0,
            email:0,
            education:0,
          }
        }
      }
    ])
  }

  async getArticleListByAuthor(id,page){
    let skip = (page - 1)*this.count
    return this.model.aggregate([
      {
        $match:{
          author_id:id,
          status:1
        }
      },
      {
        $skip:skip
      },
      {
        $limit:this.count
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

  async getArticleListByTag(tagList,page){
    let skip = (page - 1)*this.count
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
        $skip:skip
      },
      {
        $limit:this.count
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
            follows:0,
            fans:0,
            topic_list:0,
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
          status:2
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

  async getDraftArticleList(id,page){
    console.log(page);
    let skip = (page - 1)*this.count
    return this.model.aggregate([
      {
        $match:{
          author_id:id,
          status:2,
        }
      },
      {
        $skip:skip
      },
      {
        $limit:this.count
      },
      {
        $project:{
          title:1,
          tag_list:1,
          status:1,
          create_time:1,
        }
      }
    ])
  }
}

module.exports = ArticleService;