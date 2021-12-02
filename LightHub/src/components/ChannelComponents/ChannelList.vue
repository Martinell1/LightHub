<template>
  <div class="mt-4">
    <div v-if="route.path === '/channel/all'" class="flex my-4 pl-2">
      <input
        v-model="channelKey"
        type="text"
        class="outline-none rounded border-2 text-sm p-2"
        placeholder="搜索标签"
      />
    </div>
    <ChannelCard :channelList="filters()"></ChannelCard>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import { useRoute } from 'vue-router';
import ChannelCard from './ChannelCard.vue';
import _ from 'lodash'
let channelList: any = inject('channelList')
let userInfo: any = inject('userInfo')
const route = useRoute();


const channelKey = ref('')
const filters = () => {
  if (route.path.indexOf('follow') > 0) {
    return channelList.value.filter(item => { return userInfo.value.tag_list.includes(item.name) });
  } else {
    if (channelKey.value === '') {
      return channelList.value;
    } else {
      return channelList.value.filter(item => item.name.indexOf(channelKey.value) > -1)
    }
  }
}


</script>
<style scoped>
</style>