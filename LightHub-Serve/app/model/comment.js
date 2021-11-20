const {Schema,model} = require("../config/db.js")

const commentSchema = new Schema({
  answer_id:{
    type:String,
    require:true
  },
  comment_id:{
    type:String
  },
  content:{
    type:String,
    require:true
  },
  commenter:{
    type:Object,
    require:true
  },
  up_array:{
    type:Array,
  },
  step_array:{
    type:Array,
  },
  status:{
    type:Number,
    require:true
  },
  create_time:{
    type:Date,
    require:true,
  }
},{versionKey:false})

const commentModel = model("comment",commentSchema)

module.exports = commentModel