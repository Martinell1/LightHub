const {Schema,model} = require("../config/db.js")

const topicSchema = new Schema({
  title:{
    type:String,
    require:true
  },
  initiator:{
    type:Object,
    require:true,
    default:{}
  },
  introduce:{
    type:String,
    require:true,
    default:""
  },
  channel_list:{
    type:Array,
    default:[]
  },
  answer_list:{
    type:Array,
    default:[]
  },
  view_count:{
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
    require:true,
    default:1,
  },
  create_time:{
    type:Date,
    require:true,
    default:new Date().toLocaleString()
  }
},{versionKey:false})

const topicModel = model("topic",topicSchema)

module.exports = topicModel