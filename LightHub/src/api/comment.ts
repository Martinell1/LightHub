import axios from './axios'

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
  getCommentList,
  upComment,
  replyComment,
}