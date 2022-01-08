import axios from './axios'

const getArticleList: Function = async (tag: String, page: Number) => {
  return await axios.get("article/list?tag=" + tag + "&page=" + page)
}

const getArticleListByAuthor: Function = async (id: String, page: Number) => {
  return await axios.get("article/listByAuthor?id=" + id + "&page=" + page)
}

const getArticleById: Function = async (id: String) => {
  axios.defaults.withCredentials = true
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

const creator_article_list: Function = async (page: Number) => {
  return await axios.get("article/creator_article_list?page=" + page)
}

const creator_draft_list: Function = async (page: Number) => {
  return await axios.get("article/creator_draft_list?page=" + page)
}

const remove_article: Function = async (params: Object) => {
  return await axios.post("article/remove", params)
}


export {
  getArticleList,
  getArticleListByAuthor,
  getArticleById,
  addArticle,
  upArticle,
  stepArticle,
  creator_article_list,
  creator_draft_list,
  remove_article
}