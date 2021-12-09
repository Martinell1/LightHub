import axios from './axios'

const addTopic: Function = async (topic: Object) => {
  return await axios.post("topic/add", topic)
}

const getTopicList: Function = async () => {
  return await axios.get("topic/list")
}

const getTopicById: Function = async (id: String) => {
  return await axios.get("topic/detail?id=" + id)
}

const upTopic: Function = async (params: Object) => {
  return await axios.post("topic/up_topic", params)
}


export {
  addTopic,
  getTopicById,
  getTopicList,
  upTopic,
}