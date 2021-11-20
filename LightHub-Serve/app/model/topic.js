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
  answer_list:{
    type:Array
  },
  view_count:{
    type:Number,
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

const topicModel = model("topic",topicSchema)

module.exports = topicModel