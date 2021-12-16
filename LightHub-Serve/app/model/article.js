const {Schema,model} = require("../config/db.js")
const plugins = require('../plugins/article');  


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
  comment_count:{
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
  create_time:{
    type:Date,
    require:true,
    default:new Date().toLocaleString()
  }
},{versionKey:false})

articleSchema.plugin(plugins.lastModified);
articleSchema.plugin(plugins.getIntroduece);

const articleModel = model("articles",articleSchema)

module.exports = articleModel