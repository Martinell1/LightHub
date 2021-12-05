<template>
  <div v-if="userInfo" class="mt-4 w-1000 shadow">
    <div class="h-32 bg-gray-300 rounded-t-md"></div>
    <div class="h-32 bg-gray-50 rounded-b-md flex">
      <div class="w-40 h-40 bg-gray-50 rounded-lg transform -translate-y-1/3 ml-4">
        <img class="p-1 w-full h-full rounded-full" src="../../assets/images/login-bg.jpg" />
      </div>
      <div class="flex flex-col ml-4">
        <div class="flex mt-2">
          <h1 class="font-bold text-2xl tracking-wide">{{ currentUserInfo.nickname }}</h1>
          <span class="m-auto ml-4 text-md">{{ currentUserInfo.inrtodece }}</span>
        </div>
        <div class="flex min-h-36px">
          <div class="text-sm font-semibold my-2">{{ currentUserInfo.education.school }}</div>
          <span v-show="currentUserInfo.education.school" class="text-sm font-semibold my-2 mx-2">·</span>
          <div class="text-sm font-semibold my-2">{{ currentUserInfo.education.major }}</div>
          <span v-show="currentUserInfo.education.major" class="text-sm font-semibold my-2 mx-2">·</span>
          <div class="text-sm font-semibold my-2">{{ currentUserInfo.education.edu }}</div>
        </div>

        <router-link
          v-if="identify()"
          :to="{ 'name': 'Edit' }"
          class="cursor-pointer px-4 ring-2 ring-blue-500 text-center text-sm text-blue-500 p-1 w-32"
        >编辑个人信息</router-link>
        <div
          class="cursor-pointer px-4 ring-2 ring-blue-500 text-center text-sm text-blue-500 p-1"
          v-if="!identify()"
          @click="followSubmit()"
        >
          <div v-if="!isFollow()">未关注</div>
          <div v-if="isFollow()">已关注</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { getOneById, updateFollowUser } from '../../api/axios';

const userInfo: any = inject('userInfo')

const route = useRoute()

//是否是本人
const identify = () => {
  if (route.params.id === userInfo.value._id) {
    return true;
  }
  return false;
}

//加载用户信息
const currentUserInfo: any = ref({
  _id: "",
  account: "",
  nickname: "",
  avater: "",
  introduce: "",
  follows: [],
  fans: [],
  tag_list: [],
  collection_list: [],
  gender: "",
  phone: "",
  email: "",
  education: {
    school: "",
    major: "",
    edu: ""
  },
})
const loadUserInfo = async () => {
  let { data: result } = await getOneById(route.params.id);
  if (result.code === 200) {
    currentUserInfo.value = result.data
  }
}
const msg: any = inject('Message')
const followSubmit = async () => {
  const opt: any = isFollow();

  const params = new FormData();
  params.append('user_id', userInfo.value._id);
  params.append('followed_user_id', currentUserInfo.value._id);
  params.append('isFollow', opt);
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

onMounted(async () => {
  await loadUserInfo()
})


</script>
<style scoped>
</style>

