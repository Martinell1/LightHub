<template>
  <editor v-model="text" style="height:calc(100vh - 4rem)"></editor>
</template>

<script setup lang="ts">
import { getArticleById } from '@/api/article';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Editor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import _ from 'lodash'
const store = useStore();
const route = useRoute();
const text = ref('');

watch(
  text,
  _.debounce(() => {
    store.commit('updateArticleText', text.value)
  }, 500)
)



const loadArticle = async () => {
  let { data: result } = await getArticleById(route.params.aid);
  if (result.code === 200) {
    text.value = result.data.content
  }
}

if (route.params.aid) {
  loadArticle()
}


</script>

