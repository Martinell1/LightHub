const {Schema,model} = require("../config/db.js")

const answerSchema = new Schema({
  topic_id:{
    type:String,
    require:true
  },
  answerer:{
    type:Object,
    require:true
  },
  content:{
    type:String,
    require:true
  },
  comment_list:{
    type:Array
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

const answerModel = model("answer",answerSchema)

module.exports = answerModel