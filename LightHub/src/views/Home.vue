<template>
  <SecondNav type="tagList"></SecondNav>
  <div class="home_layout">
    <main>
      <ArticleCard :articleList="articleList"></ArticleCard>
    </main>
    <HomeAside></HomeAside>
  </div>
</template>

<script setup lang="ts">
import SecondNav from '../components/Common/SecondNav.vue';
import HomeAside from '../components/HoneComponents/HomeAside.vue';
import ArticleCard from '../components/ArticleComponents/ArticleCard.vue';
import { useRoute } from 'vue-router';
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { getArticleList } from '@/api/article'
let articleList: any = ref([])
let page = 0;
let loadArticleList = async () => {
  if (page === -1) {
    return
  }
  let { data: result } = await getArticleList(route.params.tag, ++page);
  if (result.code === 200) {
    if (result.data.length > 0) {
      articleList.value = [...articleList.value, ...result.data]
    }
    else {
      page = -1
    }
  }
}


const route = useRoute()
watch(route, () => {
  articleList.value = []
  page = 0
  loadArticleList()
})



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
.home_layout {
  @apply w-full m-auto mt-4 flex xl:w-1000;
}
</style>

