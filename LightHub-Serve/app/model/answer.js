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
    default:""
  },
  comment_list:{
    type:Array,
    default:[]
  },
  up_count:{
    type:Number,
    default:0
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
    default:1,
  },
  create_time:{
    type:Date,
    default:new Date().toLocaleString()
  }
},{versionKey:false})

const answerModel = model("answer",answerSchema)

module.exports = answerModel