const {user} = require('../model')
const Service = require('./')
const {verify} = require('../utils/getToken');

class UserService extends Service{
  constructor(){
    super(user)
  }

  async getInfoByToken(token){
    return await this.model.findOne({"_id":verify(token).id})
  }


}

module.exports = UserService;