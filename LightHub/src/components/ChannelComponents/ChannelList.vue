<template>
  <div class="mt-4">
    <ChannelCard v-for="channel in channelList" :data="channel"></ChannelCard>
  </div>
</template>

<script setup lang="ts">
import { watch, inject } from 'vue'
import { useRoute } from 'vue-router';
import ChannelCard from './ChannelCard.vue';
let channelList: any = inject('channelList')
const route = useRoute();
watch(route, () => {
  console.log(route.path);
  if (route.path.indexOf('follow') > -1) {
    console.log(route.path.indexOf('follow'));
    channelList = []
  }
})





</script>
<style scoped>
</style>