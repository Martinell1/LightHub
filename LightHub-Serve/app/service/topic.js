const {topic} = require('../model')
const Service = require('./')

class topicService extends Service{
  constructor(){
    super(topic)
  }
}

module.exports = topicService;