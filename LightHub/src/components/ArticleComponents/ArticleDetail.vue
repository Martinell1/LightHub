<template>
  <div class="bg-gray-50 px-6">
    <article class="py-6">
      <div class="flex items-center mb-6">
        <img class="w-10 h-10 rounded-full mr-3" src="../../assets/images/login-bg.jpg" />
        <div v-if="props.article.author" class="flex flex-col">
          <div class="font-semibold">{{ props.article.author.nickname }}</div>
          <div class="text-sm text-gray-500 flex">
            <div class="mr-4">{{ props.article.update_time }}</div>
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
    <div class="pb-4">
      <div class="flex">
        <img class="w-10 h-10 rounded-full mr-4" src="../../assets/images/login-bg.jpg" />
        <textarea
          class="bg-gray-200 outline-none w-full px-3 py-2 rounded border-2 focus:border-blue-500"
          placeholder="输入评论"
        ></textarea>
      </div>
      <div class="flex justify-between items-center">
        <div class="text-gray-500 ml-14 opacity-0">按Enter键发送</div>
        <div
          class="my-4 w-24 text-center py-1 rounded text-gray-50 bg-blue-500"
          @click="commmentSubmit()"
        >发表评论</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import Editor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
const userInfo = inject('inject')
const props: any = defineProps({
  article: Object
})

const commmentSubmit = () => {

}

</script>
<style  scoped>
</style>