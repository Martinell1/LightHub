<template>
  <div class="bg-gray-50 p-4 border-b-2">
    <div>{{ props.topic.initiator }}</div>
    <div class="text-xl font-semibold my-2">{{ props.topic.title }}</div>
    <div class="h-12">{{ props.topic.introduce }}</div>
    <div class="flex my-3">
      <div class="flex">
        <div class="btn-primary text-sm">△赞同222</div>
        <div class="btn-primary ml-2 mr-4 text-xl">▽</div>
      </div>
      <div class="btn">参与回答</div>
      <div class="btn">收藏</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const props: any = defineProps({
  topic: Object
})




</script>
<style scoped>
.btn-primary {
  @apply bg-blue-100 text-blue-500 p-2 py-1 leading-7 rounded;
}

.btn {
  @apply leading-9 text-sm text-gray-500 mx-4;
}
</style>