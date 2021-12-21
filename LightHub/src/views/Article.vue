<template>
  <div class="article_layout">
    <main class="min-w-700">
      <ArticleDetail :article="article" :commentList="comment_list"></ArticleDetail>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { getArticleById } from '@/api/article';
import { getCommentList } from '@/api/comment';
import { useRoute } from 'vue-router';
import ArticleDetail from '../components/ArticleComponents/ArticleDetail.vue';
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
  @apply w-1000 m-auto mt-4 flex;
}
</style>