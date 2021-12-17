const {Schema,model} = require("../config/db.js")

const topicSchema = new Schema({
  title:{
    type:String,
    require:true
  },
  initiator_id:{
    type:Schema.Types.ObjectId,
  },
  introduce:{
    type:String,
    require:true,
    default:""
  },
  tag_list:{
    type:Array,
    default:[]
  },
  view_count:{
    type:Number,
    default:0
  },
  up_count:{
    type:Number,
    default:0
  },
  answer_count:{
    type:Number,
    default:0
  },
  follow_count:{
    type:Number,
    default:0
  },
  up_list:{
    type:Array,
    require:true,
    default:[]
  },
  step_list:{
    type:Array,
    require:true,
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

const topicModel = model("topic",topicSchema)

module.exports = topicModel