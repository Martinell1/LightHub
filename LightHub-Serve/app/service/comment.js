const {comment} = require('../model')
const Service = require('.')

class commentService extends Service{
  constructor(){
    super(comment)
  }

  async getCommentListWithUserInfo(id){
    return this.model.aggregate([
      {
        $match:{
          target_id:id
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
}

module.exports = commentService;