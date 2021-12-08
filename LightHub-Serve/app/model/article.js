const {Schema,model} = require("../config/db.js")

const articleSchema = new Schema({
  id:{
    type:String,
    require:true
  },
  title:{
    type:String,
    require:true,
    default:"",
  },
  cover:{
    type:String,
    default:"",
  },
  author_id:{
    type:Schema.Types.ObjectId,
  },
  content:{
    type:String,
    require:true,
    default:"",
  },
  tag_list:{
    type:Array,
    default:[]
  },
  comments:{
    type:Number,
    default:0
  },
  view_count:{
    type:Number,
    require:true,
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
    default:1
  },
  update_time:{
    type:Date,
    require:true,
    default:Date.now()
  },
  create_time:{
    type:Date,
    require:true,
    default:new Date().toLocaleString()
  }
},{versionKey:false})

const articleModel = model("articles",articleSchema)

module.exports = articleModel