import axios from './axios'

const register: Function = async (user: Object) => {
  return await axios.post("user/register", user);
}

const login: Function = async (user: Object) => {
  return await axios.post("user/login", user);
}

const getOneByToken: Function = async (token: String) => {
  return await axios.get("user/info?token=" + token)
}

const getFollowList: Function = async (id: String, page: Number) => {
  return await axios.get("user/follow_list?id=" + id + "&page=" + page)
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

const updateFollowTopic: Function = async (params: Array<any>) => {
  return await axios.post("user/follow_topic", params)
}

const getActionList: Function = async (page: Number) => {
  return await axios.get("user/action_list?page=" + page)
}

const getCreatorInfo: Function = async () => {
  return await axios.get("user/creator_info")
}

export {
  register,
  login,
  getOneByToken,
  getFollowList,
  getOneById,
  updateUserInfo,
  updateFollowTag,
  updateFollowUser,
  updateFollowTopic,
  getActionList,
  getCreatorInfo
}