const {Schema,model} = require("../config/db.js")

const userSchema = new Schema({
  
  account:{
    type:String,
    require:true
  },
  password:{
    type:String,
    require:true
  },
  salt:{
    type:String,
    require:true

  },
  nickname:{
    type:String,
    require:true,
    default:"",
  },
  avater:{
    type:String,
    require:true,
    default:"",
  },
  introduce:{
    type:String,
    default:"",
  },
  role:{
    type:String,
    require:true,
    default:"user"
  },
  follows:{
    type:Array,
    require:true,
    default:[],
  },
  fans:{
    type:Array,
    require:true,
    default:[],
  },
  tag_list:{
    type:Array,
    require:true,
    default:[],
  },
  article_count:{
    type:Number,
    require:true,
    default:0
  },
  topic_count:{
    type:Number,
    require:true,
    default:0
  },
  answer_count:{
    type:Number,
    require:true,
    default:0
  },
  gender:{
    type:String,
    default:"",
  },
  phone:{
    type:String,
    default:"",
  },
  email:{
    type:String,
    default:"",
  },
  education:{
    type:Object,
    default:{
      school:"",
      major:"",
      edu:"",
    }
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

const userModel = model("user",userSchema)

module.exports = userModel