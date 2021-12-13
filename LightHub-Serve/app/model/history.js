const {Schema,model} = require("../config/db.js")

const historySchema = new Schema({
  user_id:{
    type:Schema.Types.ObjectId
  },
  action_list:{
    type:Array,
    default:[]
  }
},{versionKey:false})

const historyModel = model("history",historySchema)

module.exports = historyModel