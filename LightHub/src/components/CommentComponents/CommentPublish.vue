<template>
  <div class="pb-4 border-b-2">
    <div class="flex">
      <img class="w-9 h-9 rounded-full mr-4" src="@/assets/images/login-bg.jpg" />
      <textarea
        v-model="comment_content"
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
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { addComment } from '@/api/comment';

const props: any = defineProps({
  article_id: String,
})

const userInfo: any = inject('userInfo')
const comment_content = ref("");


const msg: any = inject('Message')
const commmentSubmit = async () => {
  if (comment_content.value === '') {
    msg('fail', '内容不能为空')
    return
  }


  const params = new FormData()

  params.append("article_id", props.article_id)
  params.append("commenter_id", userInfo.value._id)
  params.append("content", comment_content.value)
  let { data: result } = await addComment(params);
  if (result.code === 200) {
    msg('success', '发布成功')
  }
}

</script>
<style  scoped>
</style>