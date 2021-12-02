<template>
  <SecondNav type="channelList"></SecondNav>
  <div class="home_layout">
    <main class="min-w-700">
      <ArticleCard v-for="article in articleList" :article="article"></ArticleCard>
    </main>
    <HomeAside></HomeAside>
  </div>
</template>

<script setup lang="ts">
import SecondNav from '../components/Common/SecondNav.vue';
import HomeAside from '../components/HoneCompoents/HomeAside.vue';
import ArticleCard from '../components/HoneCompoents/ArticleCard.vue';
import { useRoute } from 'vue-router';
import { ref, watch, onMounted } from 'vue'
import { getArticleList } from '../api/axios';
let articleList = ref([])
const loadArticleList = async () => {
  let { data: result } = await getArticleList(route.params.channel === undefined ? '' : route.params.channel);
  if (result.code === 200) {
    articleList.value = result.data
  }
}

const route = useRoute()
watch(route, () => {
  loadArticleList()
})

onMounted(async () => {
  loadArticleList()
})

</script>
<style scoped>
.home_layout {
  @apply w-1000 m-auto mt-4 flex;
}
</style>

