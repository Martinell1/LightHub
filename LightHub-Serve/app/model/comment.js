const {Schema,model} = require("../config/db.js")

const commentSchema = new Schema({
  article_id:{
    type:Schema.Types.ObjectId
  },
  target_id:{
    type:Schema.Types.ObjectId
  },
  content:{
    type:String,
    default:""
  },
  commenter_id:{
    type: Schema.Types.ObjectId,
    ref:'User'
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