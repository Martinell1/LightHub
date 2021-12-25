<template>
  <div class="article_layout mb-10">
    <main class="w-full xl:w-700">
      <ArticleDetail :article="article" :commentList="comment_list"></ArticleDetail>
    </main>
    <aside>
      <CataLog></CataLog>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, provide } from 'vue'
import { getArticleById } from '@/api/article';
import { getCommentList } from '@/api/comment';
import { useRoute } from 'vue-router';
import ArticleDetail from '../components/ArticleComponents/ArticleDetail.vue';
import CataLog from '@/components/ArticleComponents/CataLog.vue';
const route = useRoute();
const id = route.params.id;

let article = ref({
  author: {},
  content: "",
  cover: "",
  create_time: "",
  step_list: [],
  tag_list: [],
  title: "",
  update_time: "",
  view_count: "",
  _id: "",
  up_list: []
})

const catalogList: any = ref([])
provide('catalogList', catalogList)
const loadArticle = async () => {
  let { data: result } = await getArticleById(id);
  if (result.code === 200) {
    article.value = result.data
  }
}

const comment_list: any = ref([])
const loadCommentList = async () => {
  let { data: result } = await getCommentList(id);
  if (result.code === 200) {
    comment_list.value = result.data
  }
}

onMounted(async () => {
  loadArticle()
  loadCommentList()
})

</script>
<style  scoped>
.article_layout {
  @apply w-full m-auto mt-4 flex xl:w-1000;
}
</style>