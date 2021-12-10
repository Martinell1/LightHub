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

const updateStarTopic: Function = async (params: Array<any>) => {
  return await axios.post("user/start_topic", params)
}

export {
  register,
  login,
  getOneByToken,
  getOneById,
  updateUserInfo,
  updateFollowTag,
  updateFollowUser,
  updateStarTopic
}