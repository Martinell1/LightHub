const {topic} = require('../model')
const Service = require('./')

class TopicService extends Service{
  constructor(){
    super(topic)
  }

  async getTopicWithAnswer(id){
    return this.model.aggregate([
      {
        $match:{
          _id:id
        }
      },
      {
        $lookup:{
          from: "users",
          localField: "initiator_id",
          foreignField: "_id",
          as: "initiator",
        }
      },
      {
        $project:{
          initiator: {
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

  async getTopicListWithUserInfo(id){
    return this.model.aggregate([
      {
        $lookup:{
          from: "users",
          localField: "initiator_id",
          foreignField: "_id",
          as: "initiator",
        }
      },
      {
        $project:{
          initiator: {
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

module.exports = TopicService;