import axios from './axios'


const addArticle: Function = async (answer: Object) => {
  return await axios.post("answer/add", answer)
}

const upArticle: Function = async (params: Object) => {
  return await axios.post("answer/up_answer", params)
}

const stepArticle: Function = async (params: Object) => {
  return await axios.post("answer/step_answer", params)
}


export {
  addArticle,
  upArticle,
  stepArticle,
}