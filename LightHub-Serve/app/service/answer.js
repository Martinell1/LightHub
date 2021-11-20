const {answer} = require('../model')
const Service = require('./')

class answerService extends Service{
  constructor(){
    super(answer)
  }
}

module.exports = answerService;