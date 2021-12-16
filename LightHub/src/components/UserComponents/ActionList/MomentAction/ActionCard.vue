<template>
  <div v-if="props.action.opt === 'follow'" class="w-700 rounded bg-gray-50 mb-4 shadow">
    <div class="flex items-center text-sm px-5 py-4">
      <img class="w-11 h-11 rounded-full mr-4" src="@/assets/images/login-bg.jpg" />
      <div class="font-semibold mr-1">{{ props.action.user.nickname }}</div>
      <div class="text-gray-500 flex mr-1">
        关注了
        <div v-if="props.action.field === 'tag'" class="flex">
          标签
          <div class="font-semibold text-gray-800">{{ props.action.tag.name }}</div>
        </div>
        <div v-if="props.action.field === 'topic'" class="flex">
          话题
          <div class="font-semibold text-gray-800">{{ props.action.topic.title }}</div>
        </div>
        <div v-if="props.action.field === 'user'" class="flex">
          用户
          <div class="font-semibold text-gray-800">{{ props.action.user.nickname }}</div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="props.action.opt === 'thumb'" class="w-700 rounded bg-gray-50 mb-4 shadow">
    <ThumbCard :data="props.action"></ThumbCard>
  </div>
</template>

<script setup lang="ts">
import ThumbCard from './ThumbCard.vue';
const props: any = defineProps({
  action: Object
})
</script>
<style  scoped>
</style>
