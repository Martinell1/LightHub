<template>
  <nav class="bg-gray-50 h-12 shadow-sm overflow-scroll">
    <div v-if="props.type === 'tagList'" class="m-auto flex justify-between w-1000">
      <div class="flex">
        <router-link
          :to="{ name: 'Home', params: { 'tag': '' } }"
          class="tag-item"
          active-class=" text-indigo-800"
        >推荐</router-link>
        <router-link
          v-for="tag in tagList"
          :to="{ name: 'Home', params: { 'tag': tag.tag } }"
          class="tag-item"
          active-class=" text-indigo-800"
        >{{ tag.name }}</router-link>
      </div>

      <div class="mr-4 text-sm leading-12 cursor-pointer text-gray-500 hover:text-indigo-800">
        <router-link to="/tag/follow">标签管理</router-link>
      </div>
    </div>

    <div v-if="props.type === 'tagManage'" class="w-1000 m-auto flex">
      <router-link to="/tag/follow" class="tag-manage-item" active-class="text-indigo-800">已关注频道</router-link>
      <router-link to="/tag/all" class="tag-manage-item" active-class="text-indigo-800">全部频道</router-link>
    </div>

    <div v-if="props.type === 'topic'" class="m-auto flex border-b-2">
      <router-link :to="{ 'name': 'Forum' }" class="topic-item" active-class="text-indigo-800">关注</router-link>
      <router-link :to="{ 'name': 'Forum' }" class="topic-item" active-class="text-indigo-800">推荐</router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
const props: any = defineProps({
  type: String,
})

const store = useStore()

const tagList = reactive([
  {
    name: "前端",
    tag: 'frontend'
  },
  {
    name: "后端",
    tag: 'backend'
  },
  {
    name: "人工智能",
    tag: 'ai'
  },
  {
    name: "Android",
    tag: 'android'
  },
  {
    name: "iOS",
    tag: 'ios'
  },
  {
    name: "开发工具",
    tag: 'freebie'
  },
])

if (store.state.userInfo.id) {
  tagList.unshift({
    name: "关注",
    tag: 'following'
  })
}





</script>
<style scoped>
.tag-item {
  @apply mx-2 text-sm h-12 text-center leading-12 cursor-pointer text-gray-500  hover:text-indigo-800;
}

.tag-manage-item {
  @apply px-6 text-sm leading-12 cursor-pointer font-semibold text-indigo-800 border-b-2 hover:border-indigo-800;
}

.topic-item {
  @apply mx-4 h-12 text-center leading-12 cursor-pointer text-gray-600  hover:text-indigo-800;
}
</style>