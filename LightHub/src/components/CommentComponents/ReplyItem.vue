<template>
  <div v-for="(comment,index) in props.reply_list" class="flex p-4 bg-gray-100 border-b-2 last">
    <img class="w-9 h-9 rounded-full mr-2" :src="comment.commenter.avater" />
    <div class="flex flex-col w-full">
      <div class="font-semibold mr-4">{{ comment.commenter.nickname }}</div>
      <div class="flex items-center">
        <div class="text-xs">{{ comment.create_time }}</div>
      </div>
      <div class="py-2 text-sm">{{ comment.content }}</div>
      <div class="flex">
        <div class="text-xs text-second mr-4 cursor-pointer" @click="upSubmit(comment, index)">
          <div class="flex" :class="{ 'text-cyan-primary': false }">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
            {{ comment.up_count }}
          </div>
        </div>
        <div
          v-show="!isShow[index]"
          class="text-xs text-second cursor-pointer"
          @click="isShow[index] = true"
        >
          <div class="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>回复
          </div>
        </div>
        <div
          v-show="isShow[index]"
          class="text-xs text-second cursor-pointer"
          @click="isShow[index] = false"
        >
          <div class="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>取消回复
          </div>
        </div>
      </div>
      <ReplyInput
        v-if="isShow[index]"
        :target_id="props.target_id"
        :article_id="comment.article_id"
      >
        <div>回复</div>
      </ReplyInput>
    </div>
  </div>
</template>

<script setup lang="ts">
import ReplyInput from './ReplyInput.vue'
import { ref, inject } from 'vue'
import { upComment } from '@/util/useThumb'
const props: any = defineProps({
  reply_list: Array,
  target_id: String,
})

const isShow: any = ref([])

const msg: any = inject('Message')
const upSubmit = async (cid, index) => {
  const result = await upComment(cid)
  if (result.code === 200) {
    msg('success', result.message);
    props.reply_list[index].up_count += result.data
  } else {
    msg('fail', '出现错误' + result.code);
  }
}

</script>
<style  scoped>
</style>