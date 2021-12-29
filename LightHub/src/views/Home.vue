<template>
  <SecondNav type="tagList"></SecondNav>
  <div class="home_layout">
    <main>
      <div v-if="load" class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="rounded-full bg-blue-400 h-12 w-12"></div>
          <div class="flex-1 space-y-4 py-1">
            <div class="h-4 bg-blue-400 rounded w-3/4"></div>
            <div class="space-y-2">
              <div class="h-4 bg-blue-400 rounded"></div>
              <div class="h-4 bg-blue-400 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
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
let load = ref(true)
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

