import axios from './axios'

const getCollectionList: Function = async (page: Number) => {
  return await axios.get("collection/list?page=" + page)
}

const getCollectionDetail: Function = async (id: String) => {
  return await axios.get("collection/detail?id=" + id)
}

const addCollection: Function = async (params: Object) => {
  return await axios.post("collection/add", params)
}


const updateCollection: Function = async (params: Object) => {
  return await axios.post("collection/update", params)
}

const favArticle: Function = async (params: Object) => {
  return await axios.post("collection/fav", params)
}

const removeArticle: Function = async (params: Object) => {
  return await axios.post("collection/remove", params)
}


export {
  addCollection,
  getCollectionList,
  updateCollection,
  getCollectionDetail,
  favArticle,
  removeArticle
}