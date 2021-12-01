const {Schema,model} = require("../config/db.js")

const articleSchema = new Schema({
  id:{
    type:String,
    require:true
  },
  title:{
    type:String,
    require:true,
  },
  cover:{
    type:String
  },
  author_id:{
    type:String,
    require:true,
  },
  author_nickname:{
    type:String,
    require:true,
  },
  content:{
    type:String,
    require:true
  },
  tag_list:{
    type:JSON,
  },
  comment_list:{
    type:Array
  },
  view_count:{
    type:Number,
    require:true,
    default:0
  },
  up_list:{
    type:Array,
  },
  step_list:{
    type:Array,
  },
  status:{
    type:Number,
    require:true,
    default:1
  },
  update_time:{
    type:Date,
    require:true,
    default:Date.now()
  },
  create_time:{
    type:Date,
    require:true,
    default:Date.now()
  }
},{versionKey:false})

const articleModel = model("articles",articleSchema)

module.exports = articleModel