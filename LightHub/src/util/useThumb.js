import { upTopic as apiUpTopic } from '@/api/topic';
import { upArticle as apiUpArticle } from '@/api/article';
import { upComment as apiUpComment } from '@/api/comment'

const upTopic = async (tid) => {
  const params = new FormData()
  params.append("_id", tid)
  const { data: result } = await apiUpTopic(params)
  return result
}

const upArticle = async (aid) => {
  const params = new FormData();
  params.append("_id", aid);
  const { data: result } = await apiUpArticle(params);
  return result
}

const upComment = async (comment) => {
  const params = new FormData()
  params.append('_id', comment._id)
  const { data: result } = await apiUpComment(params)
  return result
}

export {
  upTopic,
  upArticle,
  upComment
}
