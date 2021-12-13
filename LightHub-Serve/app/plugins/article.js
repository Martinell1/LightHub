// modules/articles/articles.model.js
const lastModified = (schema, options) => {   

  schema.add({ modify_time: Date });    
  
  schema.pre('save', function (next) {   
     this.modify_time = new Date;   
     next()   
  })   
}  
 

module.exports = {
  lastModified
}   
 