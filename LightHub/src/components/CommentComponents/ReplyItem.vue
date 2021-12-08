<template>
  <div v-for="reply in props.reply_list" class="flex p-4 bg-gray-100 border-b-2 last">
    <!-- <UserInfo :type="'reply'" :user="reply.replyer"></UserInfo> -->
    <div class="flex flex-col w-full">
      <div class="flex items-center">
        <div class="text-xs mr-2 pr-2 border-r-2">{{ reply.replyer.nickname }}</div>
        <div class="text-xs">{{ reply.create_time }}</div>
      </div>
      <div class="py-1 text-sm text-gray-600">{{ reply.content }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserInfo from '../Common/UserInfo.vue';
const props: any = defineProps({
  reply_list: Array
})
console.log(props.reply_list);

</script>
<style  scoped>
</style>