const {collection} = require('../model')
const Service = require('./')

class CollectionService extends Service{
  constructor(){
    super(collection)
  }

  async getCollectionDetail(id){
    return this.model.aggregate([
      {
        $match:{
          _id:id
        }
      },
      {
        $unwind:'$article_list'
      },
      {
        $lookup:{
          from: "articles",
          localField: "article_list",
          foreignField: "_id",
          as: "article",
        }
      },
    ])
  }
}

module.exports = CollectionService;