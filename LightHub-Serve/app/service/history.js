const {history} = require('../model')
const Service = require('./')

class historyService extends Service{
  constructor(){
    super(history)
  }

}

module.exports = historyService;