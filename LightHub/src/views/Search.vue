<template>
  <div class="w-full mx-auto mt-4 xl:w-1000">
    <nav class="bg-gray-50 shadow border-b-2 border-gray-100 h-12">
      <div class="flex">
        <div class="item" @click="type = 'article'; page = 0">文章</div>

        <div class="item" @click="type = 'topic'; page = 0">话题</div>

        <div class="item" @click="type = 'user'; page = 0">用户</div>
      </div>
    </nav>
    <ArticleCard v-if="type === 'article'" :articleList="searchList.articleList"></ArticleCard>
    <TopicCard v-if="type === 'topic'" :topicList="searchList.topicList"></TopicCard>
    <UserCard v-if="type === 'user'" :userList="searchList.userList"></UserCard>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { search } from '@/api/common';
import ArticleCard from '@/components/ArticleComponents/ArticleCard.vue';
import TopicCard from '@/components/TopicComponents/TopicCard.vue';
import UserCard from '../components/UserComponents/UserCard.vue';

const route = useRoute()
const query = route.params.query

const type = ref('article')

const searchList: any = ref({
  articleList: [],
  topicList: [],
  userList: []
})
let page = 0;
const loadSearchInfo = async () => {
  if (page === -1) {
    return
  }
  let { data: result } = await search(query, ++page);
  console.log(result);
  if (result.code === 200) {
    if (result.data) {
      searchList.value.articleList = [...searchList.value.articleList, ...result.data.article]
      console.log(searchList.value.articleList.length);

      searchList.value.topicList = [...searchList.value.topicList, ...result.data.topic]
      searchList.value.userList = [...searchList.value.userList, ...result.data.user]
    } else {
      page = -1
    }
  }
}


onMounted(async () => {
  loadSearchInfo()
  window.onscroll = function () {

    if (document.documentElement.clientHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
      loadSearchInfo()
    }
  }

})

onBeforeUnmount(() => {
  window.onscroll = null
})


</script>
<style scoped>
.item {
  @apply flex items-center justify-between xl:justify-center cursor-pointer w-14 h-12 xl:w-20;
}

.item-act {
  @apply text-indigo-800 border-b-2 border-indigo-800;
}
</style>