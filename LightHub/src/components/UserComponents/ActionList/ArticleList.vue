<template>
  <ArticleCard :articleList="articleList"></ArticleCard>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router';
import { getArticleListByAuthor } from '@/api/article';
import ArticleCard from '@/components/ArticleComponents/ArticleCard.vue';

const route = useRoute()

const articleList: any = ref([])
let page = 0;
const loadArticleList = async () => {
  if (page === -1) {
    return
  }
  let { data: result } = await getArticleListByAuthor(route.params.id, ++page);
  if (result.code === 200) {
    if (result.data.length > 0) {
      articleList.value = [...articleList.value, ...result.data]
    } else {
      page = -1
    }

  }
}


onMounted(async () => {
  loadArticleList()

  window.onscroll = function () {

    if (document.documentElement.clientHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
      loadArticleList()
    }
  }
})

onBeforeUnmount(() => {
  window.onscroll = null
})
</script>
<style scoped>
</style>