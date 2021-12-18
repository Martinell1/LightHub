<template>
  <div class="card" style="height:calc(100vh - 100px)">
    <div class="flex py-2 text-gray-500">
      <div
        class="p-2 ml-5 cursor-pointer"
        :class="{ 'border-b-2 border-orange-500 ': isArticle }"
        @click="isArticle = true"
      >文章</div>
      <div
        class="p-2 mx-5 cursor-pointer"
        :class="{ 'border-b-2 border-orange-500 ': !isArticle }"
        @click="isArticle = false"
      >草稿箱</div>
    </div>
    <div>
      <div v-if="isArticle">
        <ArticleCard :article_list="article_list" @refresh="loadArticleList()"></ArticleCard>
      </div>
      <div v-if="!isArticle">
        <ArticleCard :article_list="draft_list"></ArticleCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { creator_article_list } from '@/api/article';
import { ref, onMounted } from 'vue'
import ArticleCard from './ArticleManage/ArticleCard.vue';

const isArticle = ref<boolean>(true)

const article_list: any = ref([])
const draft_list: any = ref([])
const loadArticleList = async () => {
  let { data: result } = await creator_article_list();
  article_list.value = result.data.article_list
  draft_list.value = result.data.draft_list
}


onMounted(async () => {
  loadArticleList()
})


</script>
<style scoped>
</style>