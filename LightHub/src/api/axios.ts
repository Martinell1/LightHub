import axios from 'axios'
import { channel } from 'diagnostics_channel';
// axios.defaults.baseURL = "https://121.5.127.215:8150/api/"
axios.defaults.baseURL = "http://localhost:3001/api/"

// 添加请求拦截器
axios.interceptors.request.use(function (config: any) {
  config.headers.token = localStorage.getItem("token")
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


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

const updateFollowTag: Function = async (follow: Array<any>) => {
  return await axios.post("user/follow_tag", follow)
}

const updateFollowUser: Function = async (follow: Array<any>) => {
  return await axios.post("user/follow_user", follow)
}

const getChannelList: Function = async () => {
  return await axios.get("channel/list")
}

const getArticleList: Function = async (channel: String) => {
  return await axios.get("article/list?channel=" + channel)
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

const addTopic: Function = async (topic: Object) => {
  return await axios.post("topic/add", topic)
}

const getCommentList: Function = async (aid: String) => {
  return await axios.get("comment/list?aid=" + aid)
}

const upComment: Function = async (params: Object) => {
  return await axios.post("comment/up", params)
}

const replyComment: Function = async (params: Object) => {
  return await axios.post("comment/reply", params)
}


export {
  register,
  login,
  getOneByToken,
  getOneById,
  updateUserInfo,
  updateFollowTag,
  updateFollowUser,
  getChannelList,
  addTopic,
  getArticleList,
  getArticleById,
  addArticle,
  updateArticleComment,
  getCommentList,
  upComment,
  replyComment
}