<template>
  <div class="mt-4">
    <div v-if="route.path === '/channel/all'" class="flex my-4 pl-2">
      <input type="text" class="outline-none" />
      <div>搜索</div>
    </div>
    <ChannelCard v-for="channel in channelList" :channel="channel"></ChannelCard>
  </div>
</template>

<script setup lang="ts">
import { watch, inject } from 'vue'
import { useRoute } from 'vue-router';
import ChannelCard from './ChannelCard.vue';
let channelList: any = inject('channelList')
const route = useRoute();
watch(route, () => {
  if (route.path.indexOf('follow') > -1) {
    console.log(route.path.indexOf('follow'));
    channelList = []
  }
})





</script>
<style scoped>
</style>