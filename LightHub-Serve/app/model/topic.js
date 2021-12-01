const {Schema,model} = require("../config/db.js")

const topicSchema = new Schema({
  title:{
    type:String,
    require:true
  },
  initiator:{
    type:Object,
    require:true
  },
  introduce:{
    type:String,
    require:true
  },
  channel_list:{
    type:JSON
  },
  answer_list:{
    type:JSON
  },
  view_count:{
    type:Number,
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
    default:1,
  },
  create_time:{
    type:Date,
    require:true,
    default:Date.now()
  }
},{versionKey:false})

const topicModel = model("topic",topicSchema)

module.exports = topicModel