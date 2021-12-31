const {user} = require('../model')
const Service = require('./')
const {verify} = require('../utils/getToken');

class UserService extends Service{
  constructor(){
    super(user)
  }

  async getInfoByToken(token){
    return await this.model.findOne({"_id":verify(token)},{
      'password':0,
      'account':0,
      'salt':0,
      'statis':0})
  }

  async getFollowList(user_list,page){
    let skip = (page - 1)*10
    return this.model.aggregate([
      {
        $match:{
          _id:{
            $in:user_list
          }
        }
      },
      {
        $skip:skip
      },
      {
        $limit:10
      },
      {
        $project:{
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
    ])
  }

  async getUserListOnSearch(page,query){
    query = new RegExp(query)
    let skip = (page - 1) * 10
    return this.model.aggregate([
      {
        $match:{
          nickname:query,
          status:1
        }
      },
      {
        $skip:skip
      },
      {
        $limit:10
      },
      {
        $project:{
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
    ])
  }

}

module.exports = UserService;