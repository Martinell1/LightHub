import axios from './axios'

const upload: Function = async () => {
  return await axios.post("common/upload")
}

const toQiNiu: Function = async (form: FormData) => {
  return await axios.post("http://upload-cn-east-2.qiniup.com", form)
}

const search: Function = async (value: String, page: Number) => {
  return await axios.get("common/search?value=" + value + "&page=" + page)
}


export {
  upload,
  toQiNiu,
  search
}