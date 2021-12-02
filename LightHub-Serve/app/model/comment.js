const {Schema,model} = require("../config/db.js")

const commentSchema = new Schema({
  answer_id:{
    type:String,
    require:true
  },
  comment_id:{
    type:String
  },
  content:{
    type:String,
    require:true,
    default:""
  },
  commenter:{
    type:Object,
    require:true,
    default:{}
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

const commentModel = model("comment",commentSchema)

module.exports = commentModel