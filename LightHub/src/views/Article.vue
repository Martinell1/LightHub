<template>
  <div class="article_layout">
    <main class="min-w-700">
      <ArticleDetail :article="article"></ArticleDetail>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getArticleById } from '../api/axios';
import { useRoute } from 'vue-router';
import ArticleDetail from '../components/ArticleComponents/ArticleDetail.vue';
const route = useRoute();
const id = route.params.id;

const article = ref({})
const loadArticle = async () => {
  let { data: result } = await getArticleById(id);
  if (result.code === 200) {
    article.value = result.data
  }
}

onMounted(async () => {
  loadArticle()
})

</script>
<style  scoped>
.article_layout {
  @apply w-1000 m-auto mt-4 flex;
}
</style>