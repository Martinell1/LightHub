const {Schema,model} = require("../config/db.js")

const historySchema = new Schema({
  user_id:{
    type:Schema.Types.ObjectId
  },
  opt:{
    type:String
  },
  field:{
    type:String
  },
  target_id:{
    type:Schema.Types.ObjectId
  },
  time:{
    type:Date,
    default:new Date().toLocaleString()
  },
  
},{versionKey:false})

const historyModel = model("history",historySchema)

module.exports = historyModel