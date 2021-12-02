const {user} = require('../model')
const Service = require('./')
const {verify} = require('../utils/getToken');

class userService extends Service{
  constructor(){
    super(user)
  }

  async getInfoByToken(token){
    const id = verify(token).id;
    let result = await this.model.findOne({"_id":id})
    return result;
  }
}

module.exports = userService;