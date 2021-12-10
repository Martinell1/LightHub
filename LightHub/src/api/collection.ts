import axios from './axios'

const getCollectionListByUserId: Function = async (id: String) => {
  return await axios.get("collection/list?uid=" + id)
}

const addCollection: Function = async (params: Object) => {
  return await axios.post("collection/add", params)
}

const favArticle: Function = async (params: Object) => {
  return await axios.post("collection/fav", params)
}



export {
  addCollection,
  getCollectionListByUserId,
  favArticle
}