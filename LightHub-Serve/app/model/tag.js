const {Schema,model} = require("../config/db.js")

const tagSchema = new Schema({
  name:{
    type:String,
    require:true
  },
  introduce:{
    type:String,
    require:true,
    default:""
  },
  icon:{
    type:String,
    require:true,
    default:""
  },
  article_count:{
    type:Number,
    default:0
  },
  topic_count:{
    type:Number,
    default:0
  },
  fans_count:{
    type:Number,
    default:0
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

const tagModel = model("tag",tagSchema)

module.exports = tagModel