<template>
  <ArticleCard :articleList="articleList"></ArticleCard>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { getArticleListByAuthor } from '@/api/article';
import ArticleCard from '@/components/ArticleComponents/ArticleCard.vue';

const route = useRoute()

const articleList = ref([])
const loadArticleList = async () => {
  let { data: result } = await getArticleListByAuthor(route.params.id);
  if (result.code === 200) {
    articleList.value = result.data
  }
}


onMounted(async () => {
  loadArticleList()
})
</script>
<style scoped>
</style>