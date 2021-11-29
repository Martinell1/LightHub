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
  author:{
    type:String,
    require:true,
  },
  content:{
    type:String,
    require:true
  },
  comment_list:{
    type:Array
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
  create_time:{
    type:Date,
    require:true,
    default:Date.now()
  }
},{versionKey:false})

const articleModel = model("articles",articleSchema)

module.exports = articleModel