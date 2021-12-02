const {Schema,model} = require("../config/db.js")

const answerSchema = new Schema({
  topic_id:{
    type:String,
    require:true
  },
  answerer:{
    type:Object,
    require:true,
    default:{}
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
    default:Date.now()
  }
},{versionKey:false})

const answerModel = model("answer",answerSchema)

module.exports = answerModel