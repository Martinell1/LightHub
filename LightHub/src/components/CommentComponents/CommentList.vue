<template>
  <div v-for="comment in props.commentList">
    <div v-if="!comment.target_id" class="flex border-b-2 py-4 last">
      <img class="w-9 h-9 rounded-full mr-2" src="@/assets/images/login-bg.jpg" />
      <div class="flex flex-col w-full">
        <div class="font-semibold mr-4">{{ comment.commenter.nickname }}</div>
        <div class="flex items-center">
          <div class="text-xs">{{ comment.create_time }}</div>
        </div>
        <div class="py-2 text-sm">{{ comment.content }}</div>
        <ReplyInput :target_comment="comment"></ReplyInput>
        <ReplyItem :reply_list="comment.reply_list"></ReplyItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ReplyInput from './ReplyInput.vue';
import ReplyItem from './ReplyItem.vue';
const props: any = defineProps({
  commentList: Array
})



</script>
<style  scoped>
.last:last-child {
  border: none;
}
</style>