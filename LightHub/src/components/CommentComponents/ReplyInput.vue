<template>
  <div class="py-4 rounded">
    <input
      v-model="comment.content"
      class="bg-gray-50 outline-none w-full px-3 py-2 rounded border-2 h-9 focus:border-cyan-primary"
      placeholder="输入评论"
    />
    <div class="flex justify-between items-center">
      <div class="text-second ml-14 opacity-0">按Enter键发送</div>
      <div
        class="mt-4 w-24 text-center py-1 rounded text-gray-50 bg-cyan-primary cursor-pointer"
        @click="commmentSubmit()"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { addComment } from '@/api/comment';

const props: any = defineProps({
  target_id: String,
  article_id: String,
})
const msg: any = inject('Message')

const comment: any = ref({})

const commmentSubmit = async () => {

  if (comment.value.content === '') {
    msg('fail', '内容不能为空')
    return
  }

  const params = new FormData()
  params.append("target_id", props.target_id)
  params.append("article_id", props.article_id)
  params.append("content", comment.value.content)
  let { data: result } = await addComment(params);
  if (result.code === 200) {
    msg('success', '发布成功')
  }
}
</script>
<style scoped>
</style>