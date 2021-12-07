const {Schema,model} = require("../config/db.js")

const commentSchema = new Schema({
  target_id:{
    type:String,
  },
  content:{
    type:String,
    require:true,
    default:""
  },
  commenter:{
    type:String,
    require:true,
    default:""
  },
  reply_list:{
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

const commentModel = model("comment",commentSchema)

module.exports = commentModel