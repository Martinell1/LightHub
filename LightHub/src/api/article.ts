import axios from './axios'

const getArticleList: Function = async (tag: String) => {
  return await axios.get("article/list?tag=" + tag)
}

const getArticleListByAuthor: Function = async (id: String) => {
  return await axios.get("article/listByAuthor?id=" + id)
}

const getArticleById: Function = async (id: String) => {
  return await axios.get("article/detail?id=" + id)
}

const addArticle: Function = async (article: Object) => {
  return await axios.post("article/add", article)
}

const upArticle: Function = async (params: Object) => {
  return await axios.post("article/up_article", params)
}

const stepArticle: Function = async (params: Object) => {
  return await axios.post("article/step_article", params)
}


export {
  getArticleList,
  getArticleListByAuthor,
  getArticleById,
  addArticle,
  upArticle,
  stepArticle,
}