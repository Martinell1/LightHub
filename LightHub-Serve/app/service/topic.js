const {topic} = require('../model')
const Service = require('./')

class TopicService extends Service{
  constructor(){
    super(topic)
    this.count = 5
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

  async getTopicListWithUserInfo(page){
    let skip = (page - 1) * this.count
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
        $skip:skip
      },
      {
        $limit:this.count
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

  async getTopicListByInitiator(id,page){
    let skip = (page - 1) * this.count
    return this.model.aggregate([
      {
        $match:{
          initiator_id:id
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

  async getCreatorInfo(id){
    return this.model.aggregate([
      {
        $match:{
          initiator_id:id
        }
      },
      {
        $group:{
          _id:'$initiator_id',
          topic_count:{
            $sum:1
          },
          topic_view_count:{
            $sum:'$view_count'
          },
          topic_up_count:{
            $sum:'$up_count'
          },
          topic_answer_count:{
            $sum:'$answer_count'
          },
          topic_follow_count:{
            $sum:'$follow_count'
          }
        }
      },
    ])
  }

  
}

module.exports = TopicService;