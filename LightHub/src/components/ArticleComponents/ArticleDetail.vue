<template>
  <div class="card px-5">
    <article class="py-6">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center">
          <img class="w-10 h-10 rounded-full mr-3 object-cover" :src="props.article.author.avater" />
          <div v-if="props.article.author" class="flex flex-col">
            <div class="font-semibold">{{ props.article.author.nickname }}</div>
            <div class="text-sm text-second flex">
              <div class="mr-4">{{ fmt4Time(props.article.create_time) }}</div>
              <div>阅读{{ props.article.view_count }}</div>
            </div>
          </div>
        </div>
        <div v-if="!identify" @click="followSubmit()">
          <div v-if="props.article.isFollow" class="btn-primary-mini">已关注</div>
          <div v-if="!props.article.isFollow" class="btn-plain-mini ring-1 ring-cyan-dark">关注</div>
        </div>
      </div>

      <editor
        class="mb-6"
        v-model="props.article.content"
        previewOnly
        :onGetCatalog="getCatalog"
        style=" background-color: white;"
      ></editor>

      <div class="flex border-t-2">
        <div
          v-for="tag in props.article.tag_list"
          class="mt-4 mr-4 bg-cyan-primary text-white px-2 py-1 rounded text-sm text-center flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
            />
          </svg>
          {{ tag }}
        </div>
      </div>
    </article>
    <ArticleSideAction :article="props.article"></ArticleSideAction>
    <CommentPublish :article_id="props.article._id" id="comment"></CommentPublish>
    <CommentList :commentList="props.commentList" ref="child"></CommentList>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import Editor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { fmt4Time } from '../../util/fmt4Time.js'
import CommentList from '../CommentComponents/CommentList.vue';
import CommentPublish from '../CommentComponents/CommentPublish.vue';
import { followUser } from '@/util/useFollow'
import ArticleSideAction from './ArticleSideAction.vue';
const userInfo: any = inject('userInfo')
const props: any = defineProps({
  article: Object,
  commentList: Array,
})

const identify = computed(() => {
  return userInfo.value._id === props.article.author_id
})

//关注
const msg: any = inject('Message')
const followSubmit = async () => {
  const result = await followUser(props.article.author_id);
  console.log(result);

  if (result.code === 200) {
    msg('success', result.data);
  } else {
    msg('fail', result.message);
  }
}

const catalogList: any = inject('catalogList')
const getCatalog = (list) => {
  catalogList.value = list
}




</script>
<style  scoped>
</style>
