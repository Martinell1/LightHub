const lastModified = (schema, options) => {   

  schema.add({ modify_time: Date });    
  
  schema.pre('save', function (next) {   
     this.modify_time = new Date;   
     next()   
  })   
}

const test = (schema, options) => {   

  schema.pre('updateOne', function (next) {
    let content = this.content.slice(0,200)
    const reg1 = /http\:\/\/qiniu\.kaijinx\.top\/.+[^\)]/
    const imgs = reg1.exec(content)
 
    const reg2 = /#+[ ].+/g
    if(imgs){
      this.cover = imgs[0]
      content = content.replace(imgs[0],'')
    }
    content = content.replace(/#+[ ].+/g,'')
  
    this.introduce = content
    console.log('updateOne',this.introduce);
    next()   
  }) 
}


const getIntrodueceAndCover = (schema, options) => {   
  schema.add({ introduce: String });    
  
  schema.pre('save', function (next) {   
    let content = this.content.slice(0,100)
    const reg1 = /[![].+\][\(]http\:\/\/qiniu\.kaijinx\.top\/.+[\)]/
    const imgs = reg1.exec(content)
    const reg2 = /#+[ ].+/g
    if(imgs){
      this.cover = /http\:\/\/qiniu\.kaijinx\.top\/.+.(?=\))/.exec(content)[0]
      content = content.replace(imgs[0],'')
    }
    content = content.replace(/`{3}[^`]*`{3}/,'')

    this.introduce = content
    console.log('save',this.introduce);
    next()   
  })

}
 

module.exports = {
  lastModified,
  getIntrodueceAndCover,
  test
}   
 