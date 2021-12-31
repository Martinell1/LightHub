import axios from 'axios'
// axios.defaults.baseURL = "/api"
axios.defaults.baseURL = "http://localhost:3001/api"

// 添加请求拦截器
axios.interceptors.request.use(function (config: any) {
  // config.headers.token = localStorage.getItem("token")
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }


  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


export default axios