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
  },
  tag_list:{
    type:Array,
    require:true,
    default:[],
  },
  collection_list:{
    type:Array,

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
    default:Date.now()
  }
},{versionKey:false})

const userModel = model("user",userSchema)

module.exports = userModel