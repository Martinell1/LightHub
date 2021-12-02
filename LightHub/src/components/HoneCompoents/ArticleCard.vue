<template>
  <div class="w-700 px-5 pt-4 bg-gray-50 rounded hover:bg-gray-100">
    <div class="flex mb-2 text-sm text-gray-600">
      <div class="border-r-2 pr-2">
        <router-link
          :to="{ name: 'User', params: { 'id': props.article.author._id } }"
        >{{ props.article.author.nickname }}</router-link>
      </div>
      <div class="border-r-2 px-2">{{ fmt4Time() }}</div>
      <div class="tag-list" v-for="tag in props.article.tag_list">{{ tag }}</div>
    </div>
    <div class="flex justify-between">
      <div class="flex flex-col">
        <h1 class="text-xl text-gray-800 font-semibold">{{ props.article.title }}</h1>
        <p class="text-sm text-gray-500 truncate my-2 max-w-md">{{ props.article.content }}</p>
        <div class="flex mb-2 text-sm">
          <div>{{ props.article.view_count }}</div>
          <div>{{ props.article.up_list.length }}</div>
          <div>{{ props.article.comment_list.length }}</div>
        </div>
      </div>
      <img class="w-32 h-20" src="../../assets/images/login-bg.jpg" />
    </div>
    <div class="border-b-2"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const props: any = defineProps({
  article: Object
})


const fmt4Time = () => {
  const articleTime = Date.parse(props.article.create_time);
  const hours = Math.floor((Date.now() - articleTime) / (1000 * 60 * 60));
  return hours > 24 ? Math.floor(hours / 24) + "天前" : '1天内'
}


</script>
<style scoped>
.tag-list {
  @apply mx-2;
}
</style>