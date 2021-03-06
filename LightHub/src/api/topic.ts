import axios from './axios'

const addTopic: Function = async (topic: Object) => {
  return await axios.post("topic/add", topic)
}

const getTopicList: Function = async (page: Number) => {
  return await axios.get("topic/list?page=" + page)
}

const getTopicListByInitiator: Function = async (id: String, page: Number) => {
  return await axios.get("topic/listByInitiator?id=" + id + "&page=" + page)
}

const creator_topic_list: Function = async (page: Number) => {
  return await axios.get("topic/creator_topic_list?page=" + page)
}

const getTopicById: Function = async (id: String) => {
  return await axios.get("topic/detail?id=" + id)
}

const upTopic: Function = async (params: Object) => {
  return await axios.post("topic/up_topic", params)
}

const remove_topic: Function = async (params: Object) => {
  return await axios.post("topic/remove", params)
}


export {
  addTopic,
  getTopicById,
  getTopicList,
  getTopicListByInitiator,
  upTopic,
  creator_topic_list,
  remove_topic
}