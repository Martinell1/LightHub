import axios from 'axios'
// axios.defaults.baseURL = "https://121.5.127.215:8150/api/"
axios.defaults.baseURL = "http://localhost:3001/api/"

const register: Function = async (user: Object) => {
  return await axios.post("user/register", user);
}

const login: Function = async (user: Object) => {
  return await axios.post("user/login", user);
}

const getOneByToken: Function = async (token: String) => {
  return await axios.get("user/info?token=" + token)
}

const getOneById: Function = async (id: String) => {
  return await axios.get("user/info?id=" + id)
}

const updateUserInfo: Function = async (user: Object) => {
  return await axios.post("user/update", user)
}

const updateFollows: Function = async (follow: Array<any>) => {
  return await axios.post("user/follow", follow)
}

const getChannelList: Function = async () => {
  return await axios.get("channel/list")
}

const getArticleList: Function = async () => {
  return await axios.get("article/list")
}

const addArticle: Function = async (article: Object) => {
  return await axios.post("article/add", article)
}

const addTopic: Function = async (topic: Object) => {
  return await axios.post("topic/add", topic)
}


export {
  register,
  login,
  getOneByToken,
  getOneById,
  updateUserInfo,
  updateFollows,
  getChannelList,
  addTopic,
  getArticleList,
  addArticle
}