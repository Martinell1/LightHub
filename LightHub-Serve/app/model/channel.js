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
    type:JSON
  },
  fans:{
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

const channelModel = model("channel",channelSchema)

module.exports = channelModel