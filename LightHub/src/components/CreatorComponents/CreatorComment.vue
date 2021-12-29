<template>
  <div class="card mb-5" style="min-height:calc(100vh - 100px)">
    <div class="flex py-2 text-gray-500">
      <div class="p-2 ml-5 cursor-pointer border-b-2 border-cyan-primary">评论列表</div>
    </div>
    <div
      v-for="(comment,index) in comment_list"
      class="py-4 border-b-2 px-5 border-gray-100 cursor-pointer hover:bg-gray-100 last"
    >
      <router-link :to="{ name: 'Article', params: { id: comment.article._id } }">
        <div class="flex justify-between mb-2">
          <div>{{ comment.article.title }}</div>
          <div class="text-gray-500 text-sm">{{ fmt4Time(comment.create_time) }}</div>
        </div>
      </router-link>

      <div class="py-2 rounded flex items-center">
        <input
          v-model="comment.content"
          class="bg-gray-50 outline-none w-full px-3 py-2 rounded border-2 h-9 focus:border-cyan-primary"
          placeholder="输入评论"
        />
        <div class="opacity-0 hover:opacity-100 flex items-center">
          <div
            class="ml-4 my-auto w-24 text-center py-1 rounded text-gray-50 bg-indigo-800 cursor-pointer"
            @click="editSubmit(comment)"
          >编辑</div>
          <div class="flex items-center mx-2" @click="removeSubmit(comment._id)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fmt4Time } from '@/util/fmt4Time.js'
import { getCommentListByUser, removeComment, updateComment } from '@/api/comment';
import { ref, onMounted, inject, onBeforeUnmount } from 'vue'


const msg: any = inject('Message')


const comment_list: any = ref([])
let page = 0
const loadCommentList = async () => {
  if (page === -1) {
    return
  }
  let { data: result } = await getCommentListByUser(++page);
  if (result.data.length > 0) {
    comment_list.value = [...comment_list.value, ...result.data]
  } else {
    page = -1
  }

}




const editSubmit = async (comment) => {
  const params = new FormData();
  params.append("_id", comment._id)
  params.append("content", comment.content)
  let { data: result } = await updateComment(params)
  if (result.code === 200) {
    loadCommentList()
    msg('success', result.data)
  }
}

const removeSubmit = async (cid) => {
  const params = new FormData();
  params.append("cid", cid)
  let { data: result } = await removeComment(params)
  if (result.code === 200) {
    loadCommentList()
    msg('success', result.data)
  }
}


onMounted(async () => {
  loadCommentList()
  window.onscroll = function () {
    if (document.documentElement.clientHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
      loadCommentList()
    }
  }
})

onBeforeUnmount(() => {
  window.onscroll = null
})


</script>
<style scoped>
</style>