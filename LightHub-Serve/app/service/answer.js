const {answer} = require('../model')
const Service = require('./')

class AnswerService extends Service{
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

  async getAnswerListByAnswerer(id){
    return this.model.aggregate([
      {
        $match:{
          answerer_id:id
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
        $lookup:{
          from: "topics",
          localField: "topic_id",
          foreignField: "_id",
          as: "topic",
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
          },
          topic:{
            introduce:0,
            initiator_id:0,
            tag_list:0,
            view_count:0,
            follow_count:0,
            up_list:0,
            step_list:0,
            status:0,
            create_time:0,
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

module.exports = AnswerService;