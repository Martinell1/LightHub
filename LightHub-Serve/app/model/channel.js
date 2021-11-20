const {Schema,model} = require("../config/db.js")

const channelSchema = new Schema({
  name:{
    type:String,
    require:true
  },
  introduce:{
    type:String,
    require:true
  },
  icon:{
    type:String,
    require:true
  },
  topic_list:{
    type:Array
  },
  fans:{
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

const channelModel = model("channel",channelSchema)

module.exports = channelModel