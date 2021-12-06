<template>
  <div v-for="comment in comment_list" class="flex border-b-2 py-4 last">
    <img class="w-9 h-9 rounded-full mr-4" src="../../assets/images/login-bg.jpg" />
    <div class="flex flex-col w-full">
      <div class="flex items-center">
        <div class="text-xs mr-2 pr-2 border-r-2">{{ comment.commenter.nickname }}</div>
        <div class="text-xs">{{ comment.create_time }}</div>
      </div>
      <div class="py-2 text-sm">{{ comment.content }}</div>
      <ReplyInput :comment="comment"></ReplyInput>
      <ReplyItem :reply_list="comment.reply_list"></ReplyItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, reactive, onMounted } from 'vue'
import { getCommentList, upComment } from '@/api/comment';
import ReplyInput from './ReplyInput.vue';
import ReplyItem from './ReplyItem.vue';
const props: any = defineProps({
  aid: String
})

const comment_list: any = ref([])
const loadCommentList = async () => {
  let { data: result } = await getCommentList(props.aid);
  if (result.code === 200) {
    comment_list.value = result.data
  }
}



onMounted(() => {
  loadCommentList()
})


</script>
<style  scoped>
.last:last-child {
  border: none;
}
</style>