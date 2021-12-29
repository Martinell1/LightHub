<template>
  <div
    class="bg-gray-50 absolute p-4 pt-6 shadow-lg ring-2 z-10 ring-gray-200 w-80 m-4 ml-0 hover-block"
  >
    <div class="flex -mt-10">
      <img class="w-16 h-16 rounded-md border-2 object-cover" :src="userInfo.avater" />
      <div class="flex flex-col text-sm transform ml-2 justify-end">
        <a
          :href="/user/ + userInfo._id"
          class="mr-4 text-cyan-dark font-semibold"
        >{{ userInfo.nickname }}</a>
        <div class="text-sm text-second">{{ userInfo.introduce }}</div>
      </div>
    </div>
    <div class="flex justify-around my-4">
      <div class="item">
        <div class="item-text">文章数</div>
        <div class="item-count">{{ userInfo.article_count }}</div>
      </div>
      <div class="item">
        <div class="item-text">回答数</div>
        <div class="item-count">{{ userInfo.answer_count }}</div>
      </div>
      <div class="item">
        <div class="item-text">关注者</div>
        <div class="item-count">{{ userInfo.fans_count }}</div>
      </div>
    </div>
    <div v-if="!userInfo.identify">
      <div v-show="userInfo.isFollow" @click="Submit()" class="btn-plain">取消关注</div>
      <div v-show="!userInfo.isFollow" @click="Submit()" class="btn-primary">关注他</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { followUser } from '@/util/useFollow'
const userInfo: any = ref({})

const setUserInfo = (info) => {
  userInfo.value = info
}

defineExpose({
  setUserInfo
})

const Submit = async () => {
  const { data: result } = await followUser(userInfo.value._id)
  userInfo.value.fans_count += result.data
  userInfo.value.isFollow = !userInfo.value.isFollow
}


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
  @apply text-sm text-second;
}

.item-count {
  @apply font-semibold text-lg text-first;
}
</style>