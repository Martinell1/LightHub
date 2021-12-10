const {Schema,model} = require("../config/db.js")

const collectionSchema = new Schema({
  holder_id:{
    type:Schema.Types.ObjectId,
  },
  name:{
    type:String
  },
  introduce:{
    type:String
  },
  article_list:{
    type:Array,
    default:[]
  },
  status:{
    type:Number,
    require:true,
    default:1,
  },
  create_time:{
    type:Date,
    require:true,
    default:new Date().toLocaleString()
  }
},{versionKey:false})

const collectionModel = model("collection",collectionSchema)

module.exports = collectionModel