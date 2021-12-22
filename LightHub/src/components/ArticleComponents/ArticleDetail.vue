<template>
  <ArticleSideAction :article="props.article"></ArticleSideAction>
  <div class="card px-5">
    <article class="py-6">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center">
          <img class="w-10 h-10 rounded-full mr-3" src="../../assets/images/login-bg.jpg" />
          <div v-if="props.article.author" class="flex flex-col">
            <div class="font-semibold">{{ props.article.author.nickname }}</div>
            <div class="text-sm text-gray-500 flex">
              <div class="mr-4">{{ fmt4Time(props.article.update_time) }}</div>
              <div>阅读{{ props.article.view_count }}</div>
            </div>
          </div>
        </div>
        <div v-if="!identify" @click="followSubmit()">
          <div v-if="props.article.isFollow" class="btn-primary-mini">已关注</div>
          <div v-if="!props.article.isFollow" class="btn-plain-mini ring-1 ring-orange-500">关注</div>
        </div>
      </div>

      <editor
        class="mb-6"
        v-model="props.article.content"
        previewOnly
        style=" background-color: #f9fafb;"
      ></editor>

      <div class="flex border-t-2">
        <div
          v-for="tag in props.article.tag_list"
          class="mt-4 mr-4 bg-orange-500 px-2 py-1 rounded text-gray-50 text-sm text-center flex items-center"
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
    <CommentPublish :article_id="props.article._id" id="comment"></CommentPublish>
    <CommentList :commentList="props.commentList" ref="child"></CommentList>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'
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
  if (result.code === 200) {
    msg('success', result.data);
  } else {
    msg('fail', '出现错误' + result.code);
  }
}






</script>
<style  scoped>
</style>
