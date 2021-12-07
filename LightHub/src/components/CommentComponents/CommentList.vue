<template>
  <div v-for="comment in props.commentList" class="flex border-b-2 py-4 last">
    <UserInfo :type="'comment'" :id="comment.commenter"></UserInfo>
    <div class="flex flex-col w-full">
      <div class="flex items-center">
        <div class="text-xs">{{ comment.create_time }}</div>
      </div>
      <div class="py-2 text-sm">{{ comment.content }}</div>
      <ReplyInput :comment="comment"></ReplyInput>
      <ReplyItem :reply_list="comment.reply_list"></ReplyItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import ReplyInput from './ReplyInput.vue';
import ReplyItem from './ReplyItem.vue';
import UserInfo from '../Common/UserInfo.vue';
const props: any = defineProps({
  commentList: Array
})


</script>
<style  scoped>
.last:last-child {
  border: none;
}
</style>