<template>
  <SecondNav type="channelList"></SecondNav>
  <div class="home_layout">
    <main>
      <ArticleCard v-for="article in articleList" :article="article"></ArticleCard>
    </main>
    <HomeAside></HomeAside>
  </div>
</template>

<script setup lang="ts">
import SecondNav from '../components/Common/SecondNav.vue';
import HomeAside from '../components/HoneCompoents/HomeAside.vue';
import ArticleCard from '../components/HoneCompoents/ArticleCard.vue';

import { ref, onMounted } from 'vue'
import { getArticleList } from '../api/axios';
let articleList = ref([])
const loadArticleList = async () => {
  let { data: result } = await getArticleList();
  if (result.code === 200) {
    articleList.value = result.data
  }
}

onMounted(async () => {
  loadArticleList()
})

</script>
<style scoped>
.home_layout {
  @apply w-1000 m-auto mt-4 flex;
}
</style>

