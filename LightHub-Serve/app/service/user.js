const {user} = require('../model')
const Service = require('./')

class userService extends Service{
  constructor(){
    super(user)
  }
}

module.exports = userService;