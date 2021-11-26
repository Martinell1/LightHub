<template>
  <nav class="bg-gray-50 h-12 shadow-sm">
    <div class="w-1000 m-auto flex justify-between">
      <ul class="flex px-4">
        <li class="channel-item">推荐</li>
        <li class="channel-item">关注</li>
        <li class="channel-item" v-for="channel in channelList">{{ channel.name }}</li>
      </ul>
      <div class="mr-4 text-sm leading-12 cursor-pointer text-gray-500 hover:text-blue-500">
        <a>标签管理</a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getChannelList } from '../../api/axios';
const channelList = ref();

const loadChannelList = async () => {
  let { data: result } = await getChannelList();
  channelList.value = result.data;
}

onMounted(async () => {
  loadChannelList()
})


</script>
<style scoped>
.channel-item {
  @apply mr-6 text-sm leading-12 cursor-pointer text-gray-500 hover:text-blue-500;
}
</style>