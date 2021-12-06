import axios from './axios'

const getTagList: Function = async () => {
  return await axios.get("tag/list")
}

export {
  getTagList,
}