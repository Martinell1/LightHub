const {answer} = require('../model')
const Service = require('./')

class answerService extends Service{
  constructor(){
    super(answer)
  }

  async getAnswerByUserId(tid,uid){
    return this.model.aggregate([
      {
        $match:{
          topic_id:tid,
          answerer_id:uid
        }
      },
      {
        $limit:1
      },
      {
        $lookup:{
          from: "users",
          localField: "answerer_id",
          foreignField: "_id",
          as: "answerer",
        }
      },
      {
        $project:{
          answerer: {
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


  async getAnswerListByTopicId(id){
    return this.model.aggregate([
      {
        $match:{
          topic_id:id
        }
      },
      {
        $lookup:{
          from: "users",
          localField: "answerer_id",
          foreignField: "_id",
          as: "answerer",
        }
      },
      {
        $project:{
          answerer: {
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

module.exports = answerService;