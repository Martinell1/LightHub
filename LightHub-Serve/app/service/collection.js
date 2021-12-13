const {collection} = require('../model')
const Service = require('./')

class CollectionService extends Service{
  constructor(){
    super(collection)
  }

}

module.exports = CollectionService;