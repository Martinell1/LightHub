const {article} = require('../model')

const findAll = () => {
  return article.find({})
}

// const newArticle = {
//   name:"Insert"
// }

// Article.create(newArticle,(err,res) => {
//   if(err) {
// 		console.log(err);
// 		return;
// 	}
// 	console.log(res);
// })

// Article.updateOne({name:"Update2"},
//   { $set: { name: "UpdateOn" + Date.now() } },
//   (err,res) => {
//   if(err) {
// 		console.log(err);
// 		return;
// 	}
// 	console.log(res);
// })

// Article.remove({name:"Insert"},(err,res) => {
//   if(err) {
// 		console.log(err);
// 		return;
// 	}
// 	console.log(res);
// })

module.exports = {
  findAll
};