const {comment} = require('../model')
const Service = require('.')

class CommentService extends Service{
  constructor(){
    super(comment)
  }

  async getCommentListWithUserInfo(article_id=null,target_id=null){
    console.log(article_id,target_id);
    return this.model.aggregate([
      {
        $match:{
          article_id:article_id,
          target_id:target_id,
          status:1,
        }
      },
      {
        $lookup:{
          from: "users",
          localField: "commenter_id",
          foreignField: "_id",
          as: "commenter"
        }
      },
      {
        $project:{
          commenter: {
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

  async getCommentListByUser(id){
    return this.model.aggregate([
      {
        $match:{
          commenter_id:id,
          status:1,
        }
      },
      {
        $lookup:{
          from: "articles",
          localField: "article_id",
          foreignField: "_id",
          as: "article"
        }
      },
      {
        $project:{
          article:{
            cover:0,
            author_id:0,
            content:0,
            comment_count:0,
            fav_count:0,
            view_count:0,
            up_count:0,
            up_list:0,
            step_list:0,
            status:0,
            introduce:0,
            create_time:0,
            modify_time:0,
            tag_list:0
          },
          commenter: {
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

module.exports = CommentService;