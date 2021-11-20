const {article} = require("../service")


const list = async ctx => {
  // const result = 
  // await articleService.findAll().then((result)=>{
  //   ctx.body = '路由改造后的结果' + result
  // })
  let result = await article.findAll()
  ctx.body = '路由改造后的结果\n' + result
}

const b = async ctx => {
  ctx.body = "b"
}


module.exports = {
  list,
  b
}
