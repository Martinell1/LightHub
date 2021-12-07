<template>
  <div class="bg-gray-50 px-6">
    <article class="py-6">
      <div class="flex items-center mb-6">
        <img class="w-10 h-10 rounded-full mr-3" src="../../assets/images/login-bg.jpg" />
        <div v-if="props.article.author" class="flex flex-col">
          <div class="font-semibold">{{ props.article.author.nickname }}</div>
          <div class="text-sm text-gray-500 flex">
            <div class="mr-4">{{ fmt4Time(props.article.update_time) }}</div>
            <div>阅读{{ props.article.view_count }}</div>
          </div>
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
          class="mt-4 mr-4 bg-gray-100 px-2 py-1 rounded text-gray-600"
        >{{ tag }}</div>
      </div>
    </article>
    <div class="pb-4 border-b-2">
      <div class="flex">
        <img class="w-10 h-10 rounded-full mr-4" src="../../assets/images/login-bg.jpg" />
        <textarea
          v-model="comment.content"
          class="bg-gray-200 outline-none w-full px-3 py-2 rounded border-2 focus:border-orange-500"
          placeholder="输入评论"
        ></textarea>
      </div>
      <div class="flex justify-between items-center">
        <div class="text-gray-500 ml-14 opacity-0">按Enter键发送</div>
        <div
          class="my-4 w-24 text-center py-1 rounded text-gray-50 bg-orange-500 cursor-pointer"
          @click="commmentSubmit()"
        >发表评论</div>
      </div>
    </div>

    <CommentList :aid="props.article._id" ref="child"></CommentList>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, inject } from 'vue'
import Editor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { addComment } from '@/api/comment';
import CommentList from '../CommentComponents/CommentList.vue';
import { fmt4Time } from '../../util/fmt4Time.js'
const userInfo: any = inject('userInfo')
const props: any = defineProps({
  article: Object
})

const comment = reactive({
  target_id: "",
  content: "",
  commenter: {},
})

const msg: any = inject('Message')
const commmentSubmit = async () => {
  comment.target_id = props.article._id
  comment.commenter = userInfo.value
  const params = new FormData();
  params.append("comment", JSON.stringify(comment))
  let { data: result } = await addComment(params);
  if (result.code === 200) {
    msg('success', '发布成功')
  }
}

</script>
<style  scoped>
</style>