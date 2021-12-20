import axios from './axios'

const getCommentList: Function = async (aid: String) => {
  return await axios.get("comment/list?aid=" + aid)
}

const getCommentListByUser: Function = async () => {
  return await axios.get("comment/listByUser")
}

const addComment: Function = async (params: Object) => {
  return await axios.post("comment/add", params)
}

const upComment: Function = async (params: Object) => {
  return await axios.post("comment/up_comment", params)
}

const stepComment: Function = async (params: Object) => {
  return await axios.post("comment/step_comment", params)
}

const replyComment: Function = async (params: Object) => {
  return await axios.post("comment/reply", params)
}

const removeComment: Function = async (params: Object) => {
  return await axios.post("comment/remove", params)
}



export {
  addComment,
  getCommentList,
  getCommentListByUser,
  upComment,
  stepComment,
  replyComment,
  removeComment
}