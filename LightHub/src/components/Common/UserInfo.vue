<template>
  <div
    class="bg-gray-50 absolute p-4 pt-6 shadow-lg ring-2 ring-gray-200 w-80 z-10 m-4 ml-0 hover-block"
  >
    <div class="flex -mt-10">
      <img class="w-16 h-16 rounded-md border-2 object-cover" :src="currentUserInfo.avater" />
      <div class="flex flex-col text-sm transform ml-2 justify-end">
        <a
          :href="/user/ + currentUserInfo._id"
          class="mr-4 text-orange-600 font-semibold"
        >{{ currentUserInfo.nickname }}</a>
        <div class="text-sm text-gray-500">{{ currentUserInfo.introduce }}</div>
      </div>
    </div>
    <div class="flex justify-around my-4">
      <div class="item">
        <div class="item-text">文章数</div>
        <div class="item-count">{{ currentUserInfo.article_count }}</div>
      </div>
      <div class="item">
        <div class="item-text">回答数</div>
        <div class="item-count">{{ currentUserInfo.answer_count }}</div>
      </div>
      <div class="item">
        <div class="item-text">关注者</div>
        <div class="item-count">{{ fans_count }}</div>
      </div>
    </div>
    <div v-if="!identify">
      <div v-show="isFollow" @click="Submit()" class="btn-primary">取消关注</div>
      <div v-show="!isFollow" @click="Submit()" class="btn-primary">关注他</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { followUser } from '@/util/useFollow'

const currentUserInfo: any = ref({})
//我的信息
const userInfo: any = ref({})

//是否是本人
const identify = computed(() => {
  if (userInfo.value._id === currentUserInfo.value._id) {
    return true;
  }
  return false;
})


const fans_count = computed(() => {
  let length = 0;
  try {
    length = currentUserInfo.fans.length;
  }
  finally {
    return length;
  }
})


// 当前用户在我的关注列表里的位置
const index = computed(() => {
  return userInfo.value.follows.indexOf(currentUserInfo.value._id)
})

//判断当前用户是否已经被关注
const isFollow = computed(() => {
  return index.value > -1 ? true : false
})

//提交按钮
const Submit = async () => {
  await followUser(currentUserInfo.value._id);
}


const setCurrentUserInfo = (user, info) => {
  currentUserInfo.value = info
  userInfo.value = user
}

defineExpose({
  setCurrentUserInfo
})

</script>
<style scoped>
.hover_block::after {
  content: "";
  z-index: -10;
  @apply absolute -inset-5;
}

.item {
  @apply flex flex-col items-center;
}

.item-text {
  @apply text-sm text-gray-500;
}

.item-count {
  @apply font-semibold text-lg text-gray-700;
}
</style>