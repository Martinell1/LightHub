<template>
  <div v-for="comment in props.reply_list" class="flex p-4 bg-gray-100 border-b-2 last">
    <div class="flex flex-col w-full">
      <div class="flex items-center">
        <div class="text-xs mr-2 pr-2 border-r-2">{{ comment.commenter.nickname }}</div>
        <div class="text-xs">{{ comment.create_time }}</div>
      </div>
      <div class="py-1 text-sm text-gray-600">{{ comment.content }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props: any = defineProps({
  reply_list: Array
})

</script>
<style  scoped>
</style>