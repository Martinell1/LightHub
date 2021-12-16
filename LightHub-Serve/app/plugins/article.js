// modules/articles/articles.model.js
const lastModified = (schema, options) => {   

  schema.add({ modify_time: Date });    
  
  schema.pre('save', function (next) {   
     this.modify_time = new Date;   
     next()   
  })   
}

const getIntroduece = (schema, options) => {   

  schema.add({ introduce: String });    
  
  schema.pre('save', function (next) {   
     this.introduce = this.content.slice(0,100)
     next()   
  })   
}
 

module.exports = {
  lastModified,
  getIntroduece
}   
 