import axios from './axios'

const addTopic: Function = async (topic: Object) => {
  return await axios.post("topic/add", topic)
}

const getTopicList: Function = async () => {
  return await axios.get("topic/list")
}

const upTopic: Function = async (params: Object) => {
  return await axios.post("topic/up_topic", params)
}


export {
  addTopic,
  getTopicList,
  upTopic,
}