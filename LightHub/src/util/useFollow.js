import {  } from '@/api/user';

const loadUserInfo = async () => {
  let { data: result } = await getOneById(route.params.id);
  if (result.code === 200) {
    currentUserInfo.value = result.data
  }
}
const msg: any = inject('Message')
const followSubmit = async () => {
  const params = new FormData();
  params.append('user_id', userInfo.value._id);
  params.append('followed_user_id', currentUserInfo.value._id);
  let { data: result } = await updateFollowUser(params);
  if (result.code === 200) {
    msg("success", '成功')
    userInfo.value.follows.push(currentUserInfo.value._id)
  }
}

//是否关注
const isFollow = () => {
  return userInfo.value.follows.indexOf(currentUserInfo.value._id) > -1 ? true : false
}