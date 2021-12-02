<template>
  <nav class="bg-gray-50 h-12 shadow-sm">
    <div v-if="props.type === 'channelList'" class="w-1000 m-auto flex justify-between">
      <div class="flex px-4">
        <router-link :to="{ name: 'Home' }" class="channel-item">推荐</router-link>
        <router-link :to="{ name: 'Home', params: { 'channel': 'follow' } }" class="channel-item">关注</router-link>
        <router-link
          v-for="channel in channelList"
          :to="{ name: 'Home', params: { 'channel': channel.name } }"
          class="channel-item"
        >{{ channel.name }}</router-link>
      </div>

      <div class="mr-4 text-sm leading-12 cursor-pointer text-gray-500 hover:text-blue-500">
        <router-link to="/channel/follow">标签管理</router-link>
      </div>
    </div>

    <div v-if="props.type === 'channelManage'" class="w-1000 m-auto flex">
      <router-link
        to="/channel/follow"
        class="channel-manage-item"
        active-class="border-blue-500"
      >已关注频道</router-link>
      <router-link to="/channel/all" class="channel-manage-item" active-class="border-blue-500">全部频道</router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
const props: any = defineProps({
  type: String,
})

import { inject } from 'vue'
const channelList: any = inject('channelList')



</script>
<style scoped>
.channel-item {
  @apply mr-6 text-sm leading-12 cursor-pointer text-gray-500 hover:text-blue-500;
}

.channel-manage-item {
  @apply px-6 text-sm leading-12 cursor-pointer font-semibold text-blue-500 border-b-2 hover:border-blue-500;
}
</style>