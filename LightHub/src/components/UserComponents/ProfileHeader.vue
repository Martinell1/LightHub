<template>
  <div v-if="currentUserInfo" class="mt-4 w-full shadow xl:w-1000">
    <div class="h-32 bg-gradient-to-r from-cyan-dark to-cyan-primary rounded-t-md"></div>
    <div class="h-32 rounded-b-md flex flex-col relative xl:flex-row">
      <div class="w-20 h-20 rounded-lg absolute -top-14 ml-4 xl:w-40 xl:h-40">
        <div v-if="identify">
          <label for="upload" class="w-full h-full absolute block"></label>
          <input
            ref="input_value"
            id="upload"
            type="file"
            class="hidden"
            @change="handFile"
            multiple="true"
            enctype="multipart/form-data"
          />
        </div>

        <img class="p-1 w-full h-full rounded-full object-cover" :src="currentUserInfo.avater" />
      </div>
      <div class="flex flex-col mt-4 ml-4 xl:mt-0 xl:ml-48">
        <div class="flex mt-2">
          <h1 class="font-bold tracking-wide text-md xl:text-2xl">{{ currentUserInfo.nickname }}</h1>
          <span class="m-auto ml-4 text-sm text-second xl:text-md">{{ currentUserInfo.introduce }}</span>
        </div>
        <div v-if="currentUserInfo.education" class="flex min-h-36px">
          <div class="user-edu-item">{{ currentUserInfo.education.school }}</div>
          <span v-if="currentUserInfo.education.major !== ''" class="user-edu-item mx-2">·</span>
          <div class="user-edu-item">{{ currentUserInfo.education.major }}</div>
          <span v-if="currentUserInfo.education.edu !== ''" class="user-edu-item mx-2">·</span>
          <div class="user-edu-item">{{ currentUserInfo.education.edu }}</div>
        </div>

        <router-link
          v-if="identify"
          :to="{ 'name': 'Edit' }"
          class="cursor-pointer px-4 ring-2 ring-cyan-primary text-cyan-primary text-center text-sm p-1 w-32"
        >编辑个人信息</router-link>
        <div
          class="cursor-pointer px-4 ring-2 ring-cyan-primary text-cyan-primary text-center text-sm p-1 w-28"
          v-if="!identify"
          @click="Submit()"
        >
          <div v-if="!isFollow">未关注</div>
          <div v-if="isFollow">已关注</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { updateUserInfo } from '@/api/user';
import { upload, toQiNiu } from '@/api/common'
import { ref, inject, computed, nextTick } from 'vue'

import { followUser } from '@/util/useFollow'
import { useStore } from 'vuex';
const userInfo: any = inject('userInfo')

//加载用户信息
const props: any = defineProps({
  currentUserInfo: Object
})

//是否是本人
const identify = computed(() => {
  if (props.currentUserInfo._id === userInfo.value._id) {
    return true;
  }
  return false;
})

// //是否关注
const isFollow = computed(() => {
  if (!identify.value)

    return props.currentUserInfo.follows?.some(item => item === userInfo.value._id)
})


const msg: any = inject('Message')
const Submit = async () => {
  const result = await followUser(props.currentUserInfo._id);
  if (result.code === 200) {
    msg('success', result.message);

  } else {
    msg('fail', result.message);
  }
}

const store = useStore()
const loadUserInfo: any = inject('loadUserInfo')
const input_value = ref()
const handFile = async () => {
  const file = input_value.value.files[0];
  let { data: result } = await upload();
  if (result.code === 200) {
    const form = new FormData();
    form.append("token", result.data)
    form.append("file", file)
    let { data: res } = await toQiNiu(form);

    const addr = "http://qiniu.kaijinx.top/" + res.key;
    console.log(addr);

    const params = new FormData();
    params.append('_id', userInfo.value._id)
    params.append('avater', addr)

    let { data: result2 } = await updateUserInfo(params);
    if (result2.code === 200) {
      userInfo.value = result2.data;

      msg('success', '更新成功')
      loadUserInfo(userInfo.value._id)
      localStorage.setItem("avater", userInfo.value.avater)
      store.commit('updateUserInfo', { "id": userInfo.value._id, "nickname": userInfo.value.nickname, "avater": userInfo.value.avater })
    }

  }
}




</script>
<style scoped>
.user-edu-item {
  @apply text-xs font-semibold my-2 xl:text-sm;
}
</style>

