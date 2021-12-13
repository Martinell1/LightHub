const {history} = require('../model')
const Service = require('.')

class HistoryService extends Service{
  constructor(){
    super(history)
  }

  async findDetail(uid){
    return this.model.aggregate([
      {
        $match:{
          user_id:uid,
        }
      },
      {
        $limit:1
      },
      {
        $unwind:"$action_list"
      },
    ])
  }
}

module.exports = HistoryService;