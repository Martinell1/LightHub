const {Schema,model} = require("../config/db.js")

const channelSchema = new Schema({
  name:{
    type:String,
    require:true
  },
  introduce:{
    type:String,
    require:true,
    default:""
  },
  icon:{
    type:String,
    require:true,
    default:""
  },
  topic_list:{
    type:Array,
    default:[]
  },
  fans:{
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

const channelModel = model("channel",channelSchema)

module.exports = channelModel