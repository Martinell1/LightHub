<template>
  <nav class="bg-gray-50 h-12 shadow-sm">
    <div v-if="props.type === 'tagList'" class="w-1000 m-auto flex justify-between overflow-hidden">
      <div class="flex">
        <router-link
          :to="{ name: 'Home', params: { 'tag': '' } }"
          class="tag-item"
          active-class=" text-orange-500"
        >推荐</router-link>
        <router-link
          v-for="tag in tagList"
          :to="{ name: 'Home', params: { 'tag': tag } }"
          class="tag-item"
          active-class=" text-orange-500"
        >{{ tag }}</router-link>
      </div>

      <div class="mr-4 text-sm leading-12 cursor-pointer text-gray-500 hover:text-orange-500">
        <router-link to="/tag/follow">标签管理</router-link>
      </div>
    </div>

    <div v-if="props.type === 'tagManage'" class="w-1000 m-auto flex">
      <router-link to="/tag/follow" class="tag-manage-item" active-class="text-orange-500">已关注频道</router-link>
      <router-link to="/tag/all" class="tag-manage-item" active-class="text-orange-500">全部频道</router-link>
    </div>

    <div v-if="props.type === 'topic'" class="m-auto flex border-b-2">
      <router-link :to="{ 'name': 'Forum' }" class="topic-item" active-class="text-orange-500">关注</router-link>
      <router-link :to="{ 'name': 'Forum' }" class="topic-item" active-class="text-orange-500">推荐</router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const props: any = defineProps({
  type: String,
})

const tagList = reactive([
  "关注",
  "前端",
  "后端",
  "人工智能",
  "Android",
  "iOS",
  "开发工具"
])

</script>
<style scoped>
.tag-item {
  @apply mx-2 text-sm h-12 text-center leading-12 cursor-pointer text-gray-500  hover:text-orange-500;
}

.tag-manage-item {
  @apply px-6 text-sm leading-12 cursor-pointer font-semibold text-orange-500 border-b-2 hover:border-orange-500;
}

.topic-item {
  @apply mx-4 h-12 text-center leading-12 cursor-pointer text-gray-600  hover:text-orange-500;
}
</style>