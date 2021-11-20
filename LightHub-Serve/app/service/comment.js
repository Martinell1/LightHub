const {comment} = require('../model')
const Service = require('./')

class commentService extends Service{
  constructor(){
    super(comment)
  }
}

module.exports = commentService;