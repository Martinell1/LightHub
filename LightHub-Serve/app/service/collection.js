const {collection} = require('../model')
const Service = require('./')

class collectionService extends Service{
  constructor(){
    super(collection)
  }

}

module.exports = collectionService;