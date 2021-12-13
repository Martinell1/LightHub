const {history} = require('../model')
const Service = require('.')

class HistoryService extends Service{
  constructor(){
    super(history)
  }

}

module.exports = HistoryService;