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
    type:JSON
  },
  up_list:{
    type:JSON,
  },
  step_list:{
    type:JSON,
  },
  status:{
    type:Number,
    require:true,
    default:1,
  },
  create_time:{
    type:Date,
    require:true,
    default:Date.now()
  }
},{versionKey:false})

const answerModel = model("answer",answerSchema)

module.exports = answerModel