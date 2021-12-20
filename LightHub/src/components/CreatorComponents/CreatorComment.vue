<template>
  <div class="card" style="height:calc(100vh - 100px)">
    <div class="flex py-2 text-gray-500">
      <div class="p-2 ml-5 cursor-pointer border-b-2 border-orange-500">评论列表</div>
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
            <div class="px-2 py-1 text-sm" @click="editComment(comment)">编辑</div>

            <div class="px-2 py-1 cursor-pointer text-sm" @click="removeSubmit(comment._id)">删除</div>
          </div>
        </div>
      </div>

      <div class="text-gray-500 text-sm">{{ comment.create_time }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCommentListByUser, removeComment } from '@/api/comment';
import { ref, onMounted } from 'vue'

const isShow: any = ref([])

const showDrop = (index) => {
  if (isShow.value[index]) {
    isShow.value[index] = false
  } else {
    isShow.value[index] = true
  }
}

const comment_list: any = ref([])
const loadCommentList = async () => {
  let { data: result } = await getCommentListByUser();
  comment_list.value = result.data
}

const editComment = async (tid) => {
  const params = new FormData();
  params.append("tid", tid)
  let { data: result } = await getCommentListByUser(params)
  if (result.code === 200) {
    loadCommentList()
  }
}

const removeSubmit = async (cid) => {
  const params = new FormData();
  params.append("cid", cid)
  let { data: result } = await removeComment(params)
  if (result.code === 200) {
    loadCommentList()
  }
}


onMounted(async () => {
  loadCommentList()
})


</script>
<style scoped>
</style>