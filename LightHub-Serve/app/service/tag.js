const {tag} = require('../model')
const Service = require('.')

class tagService extends Service{
  constructor(){
    super(tag)
  }
}

module.exports = tagService;