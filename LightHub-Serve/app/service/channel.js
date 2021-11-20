const {channel} = require('../model')
const Service = require('./')

class channelService extends Service{
  constructor(){
    super(channel)
  }
}

module.exports = channelService;