const {history} = require('../model')
const Service = require('./')

class HistoryService extends Service{
  constructor(){
    super(history)
  }

  async findDetail(id){
    return this.model.aggregate([
      {
        $match:{
          user_id:id
        }
      },
      {
        $lookup:{
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user"
        },
      },
      {
        $lookup:{
          from: "tags",
          localField: "target_id",
          foreignField: "_id",
          as: "tag"
        },
      },
      {
        $lookup:{
          from: "articles",
          localField: "target_id",
          foreignField: "_id",
          as: "article"
        },
      },
      {
        $lookup:{
          from: "topics",
          localField: "target_id",
          foreignField: "_id",
          as: "topic"
        },
      },
      {
        $project:{
          _id:1,
          opt:1,
          field:1,
          user:{
            _id:1,
            nickname:1,
            fans:1,
            article_count:1,
            topic_count:1,
            answer:1,
          },
          article:{
            _id:1,
            title:1,
            up_list:1,
            comment_count:1,
          },
          topic:{
            _id:1,
            title:1,
            introduce:1,
          },
          tag:{
            _id:1,
            name:1,
          },
        }
      }
    ])
  }
}

module.exports = HistoryService;