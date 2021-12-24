<template>
  <div class="card mb-5" style="min-height:calc(100vh - 100px)">
    <div class="flex py-2 text-gray-500">
      <div class="p-2 ml-5 cursor-pointer border-b-2 border-indigo-800">评论列表</div>
    </div>
    <div
      v-for="(comment,index) in comment_list"
      class="py-4 border-b-2 px-5 border-gray-100 cursor-pointer hover:bg-gray-100 last"
    >
      <div class="flex justify-between mb-2">
        <router-link :to="{ name: 'Article', params: { id: comment.article._id } }">
          <div>{{ comment.article.title }}</div>
        </router-link>
        <div class="relative" @click="showDrop(index)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
            />
          </svg>
          <div v-if="isShow[index]" class="absolute card w-12 text-center py-1">
            <div class="px-2 py-1 text-sm" @click="showEdit(index)">编辑</div>

            <div class="px-2 py-1 cursor-pointer text-sm" @click="removeSubmit(comment._id)">删除</div>
          </div>
        </div>
      </div>

      <div class="text-gray-500 text-sm">{{ comment.create_time }}</div>
      <div v-if="isEdit[index]">
        <div class="py-4 rounded flex items-center">
          <input
            v-model="comment.content"
            class="bg-gray-50 outline-none w-full px-3 py-2 rounded border-2 h-9 focus:border-indigo-800"
            placeholder="输入评论"
          />
          <div
            class="ml-4 my-auto w-24 text-center py-1 rounded text-gray-50 bg-indigo-800 cursor-pointer"
            @click="editSubmit(comment)"
          >编辑</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCommentListByUser, removeComment, updateComment } from '@/api/comment';
import { ref, onMounted, inject, onBeforeUnmount } from 'vue'

const msg: any = inject('Message')

const isShow: any = ref([])
const isEdit: any = ref([])
const showDrop = (index) => {
  if (isShow.value[index]) {
    isShow.value[index] = false
  } else {
    isShow.value[index] = true
  }
}

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

const showEdit = async (index) => {
  isEdit.value[index] = true
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