import axios from './axios'

const getAnswerListById: Function = async (tid: String) => {
  return await axios.get("answer/list?tid=" + tid)
}

const getAnswerListByAnswerer: Function = async (id: String, page: Number) => {
  return await axios.get("answer/listByAnswerer?id=" + id + "&page=" + page)
}

const getAnswerByUserId: Function = async (tid: String, uid: String) => {
  return await axios.get("answer/detail?tid=" + tid + "&uid=" + uid)
}

const saveOrUpdateAnswer: Function = async (answer: Object) => {
  return await axios.post("answer/saveOrUpdate", answer)
}

const upAnswer: Function = async (params: Object) => {
  return await axios.post("answer/up_answer", params)
}

const stepAnswer: Function = async (params: Object) => {
  return await axios.post("answer/step_answer", params)
}


export {
  getAnswerListById,
  getAnswerListByAnswerer,
  saveOrUpdateAnswer,
  upAnswer,
  stepAnswer,
  getAnswerByUserId
}