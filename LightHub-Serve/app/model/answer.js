const {Schema,model} = require("../config/db.js")

const answerSchema = new Schema({
  topic_id:{
    type:Schema.Types.ObjectId,
  },
  answerer_id:{
    type:Schema.Types.ObjectId,
  },
  content:{
    type:String,
    require:true,
  },
  comment_list:{
    type:Array,
    default:[]
  },
  up_list:{
    type:Array,
    default:[]
  },
  step_list:{
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

const answerModel = model("answer",answerSchema)

module.exports = answerModel