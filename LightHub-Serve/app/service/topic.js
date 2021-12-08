const {topic} = require('../model')
const Service = require('./')

class topicService extends Service{
  constructor(){
    super(topic)
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

module.exports = topicService;