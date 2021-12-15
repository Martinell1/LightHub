import { updateFollowUser,updateFollowTag,updateFollowTopic } from '@/api/user';

const followUser = async (uid) => {
  const params = new FormData()
  params.append('followed_user_id', uid)
  const {data:result} = await updateFollowUser(params)
  return result
}

const followTag = async (tid) => {
  const params = new FormData()
  params.append('tag_id', tid)
  const {data:result} = await updateFollowTag(params)
  return result
}

const followTopic = async (tid) => {
  const params = new FormData()
  params.append('tid', tid)
  const { data: result } = await updateFollowTopic(params);
  return result
}

export {
  followUser,
  followTag,
  followTopic
}