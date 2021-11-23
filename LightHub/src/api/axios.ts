import axios from 'axios'
// axios.defaults.baseURL = "https://121.5.127.215:8150/api/"
axios.defaults.baseURL = "http://localhost:3001/api/"

const register: Function = async (user: Object) => {
  return await axios.post("user/register", user);
}

const login: Function = async (user: Object) => {
  return await axios.post("user/login", user);
}

const getUserInfo: Function = async (token: String) => {
  return await axios.get("user/info?token=" + token)
}


export {
  register,
  login,
  getUserInfo
}