import axios from './axios'

const getArticleList: Function = async (tag: String) => {
  return await axios.get("article/list?tag=" + tag)
}

const getArticleById: Function = async (id: String) => {
  return await axios.get("article/detail?id=" + id)
}

const addArticle: Function = async (article: Object) => {
  return await axios.post("article/add", article)
}

const updateArticleComment: Function = async (params: Object) => {
  return await axios.post("article/comment", params)
}

export {
  getArticleList,
  getArticleById,
  addArticle,
  updateArticleComment,
}