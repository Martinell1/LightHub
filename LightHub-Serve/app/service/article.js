const {article} = require('../model')
const Service = require('./')

class articleService extends Service{
  constructor(){
    super(article)
  }
}

module.exports = articleService;