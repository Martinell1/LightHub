<template>
  <div>
    <div class="flex">
      <div class="text-xs text-gray-500 mr-4 cursor-pointer" @click="upSubmit(comment)">
        <div class="flex" :class="{ 'text-orange-500': isFollow }">
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
          {{ props.target_comment.up_list.length }}
        </div>
      </div>
      <div v-show="!isShow" class="text-xs text-gray-500 cursor-pointer" @click="isShow = true">
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
      <div v-show="isShow" class="text-xs text-gray-500 cursor-pointer" @click="isShow = false">
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

    <div v-show="isShow" class="mt-4 px-4 pt-4 bg-gray-100 mb-1 rounded">
      <input
        v-model="comment.content"
        class="bg-gray-50 outline-none w-full px-3 py-2 rounded border-2 h-9 focus:border-orange-500"
        placeholder="输入评论"
      />
      <div class="flex justify-between items-center">
        <div class="text-gray-500 ml-14 opacity-0">按Enter键发送</div>
        <div
          class="my-4 w-24 text-center py-1 rounded text-gray-50 bg-orange-500 cursor-pointer"
          @click="commmentSubmit()"
        >发表评论</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import { addComment } from '@/api/comment';
import { upComment } from '@/util/useThumb'

const props: any = defineProps({
  target_comment: Object
})
const msg: any = inject('Message')
const userInfo: any = inject('userInfo')
const upSubmit = async (cid) => {
  const result = await upComment(cid)
  if (result.code === 200) {
    msg('success', result.data);
  } else {
    msg('fail', '出现错误' + result.code);
  }
}

const isFollow = computed(() => {
  return props.target_comment.up_list.indexOf(userInfo.value._id) > -1
})


const isShow = ref(false)

const comment: any = ref({})

const commmentSubmit = async () => {
  console.log(props.target_comment);

  if (comment.value.content === '') {
    msg('fail', '内容不能为空')
    return
  }

  const params = new FormData()
  params.append("target_id", props.target_comment._id)
  params.append("article_id", props.target_comment.article_id)
  params.append("content", comment.value.content)
  let { data: result } = await addComment(params);
  if (result.code === 200) {
    msg('success', '发布成功')
  }
}
</script>
<style scoped>
</style>