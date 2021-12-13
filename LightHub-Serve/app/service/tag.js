const {tag} = require('../model')
const Service = require('.')

class TagService extends Service{
  constructor(){
    super(tag)
  }
}

module.exports = TagService;