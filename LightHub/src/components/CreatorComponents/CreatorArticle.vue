<template>
  <div class="card" style="min-height:calc(100vh - 100px)">
    <div class="flex py-2 text-gray-500">
      <div
        class="p-2 ml-5 cursor-pointer"
        :class="{ 'border-b-2  border-cyan-primary ': isArticle }"
        @click="isArticle = true; page = 0; article_list = []; loadArticleList()"
      >文章</div>
      <div
        class="p-2 mx-5 cursor-pointer"
        :class="{ 'border-b-2 border-cyan-primary': !isArticle }"
        @click="isArticle = false; page = 0; article_list = []; loadArticleList()"
      >草稿箱</div>
    </div>

    <div>
      <ArticleCard v-if="isArticle" :article_list="article_list" @refresh="loadArticleList()"></ArticleCard>
      <ArticleCard v-if="!isArticle" :article_list="article_list" @refresh="loadArticleList()"></ArticleCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { creator_article_list, creator_draft_list } from '@/api/article';
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ArticleCard from './ArticleManage/ArticleCard.vue';

const isArticle = ref<boolean>(true)

const article_list: any = ref([])
let page = ref(0);
const loadArticleList = async () => {
  if (page.value === -1) {
    return
  }
  let result: any = undefined;
  if (isArticle.value) {
    result = await creator_article_list(++page.value);
  } else {
    result = await creator_draft_list(++page.value);
  }
  result = result.data

  if (result.code === 200) {
    if (result.data.length > 0) {
      article_list.value = [...article_list.value, ...result.data]
    } else {
      page.value = -1
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