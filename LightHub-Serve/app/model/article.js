const {Schema,model} = require("../config/db.js")

const articleSchema = new Schema({

  name:{
    type:String,
    require:true
  }
})

const articleModel = model("articles",articleSchema)

module.exports = articleModel