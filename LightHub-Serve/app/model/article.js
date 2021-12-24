const {Schema,model} = require("../config/db.js")
const plugins = require('../plugins/article');  


const articleSchema = new Schema({
  id:{
    type:String,
  },
  title:{
    type:String,
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
  fav_count:{
    type:Number,
    default:0
  },
  view_count:{
    type:Number,
    default:0
  },
  up_count:{
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
    default:1
  },
  create_time:{
    type:Date,
    default:new Date().toLocaleString()
  }
},{versionKey:false})

articleSchema.plugin(plugins.lastModified);
articleSchema.plugin(plugins.getIntrodueceAndCover);
articleSchema.plugin(plugins.test);

const articleModel = model("articles",articleSchema)

module.exports = articleModel