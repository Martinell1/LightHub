<template>
  <div class="card" style="min-height:calc(100vh - 100px)">
    <div class="flex py-2 text-gray-500">
      <div class="p-2 ml-5 cursor-pointer border-b-2 border-orange-500">话题列表</div>
    </div>
    <div
      v-for="(topic,index) in topic_list"
      class="py-4 border-b-2 px-5 border-gray-100 cursor-pointer hover:bg-gray-100 last"
    >
      <div class="flex justify-between mb-2">
        <router-link :to="{ name: 'Topic', params: { id: topic._id } }">
          <div>{{ topic.title }}</div>
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
            <div class="px-2 py-1 text-sm" @click="topicModal(topic)">编辑</div>

            <div class="px-2 py-1 cursor-pointer text-sm" @click="removeTopic(topic._id)">删除</div>
          </div>
        </div>
      </div>

      <div class="text-gray-500 text-sm">{{ topic.create_time }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { creator_topic_list, remove_topic } from '@/api/topic';
import { ref, onMounted, inject, onBeforeUnmount } from 'vue'
const topicModal: any = inject('TopicModal');

const isShow: any = ref([])

const showDrop = (index) => {
  if (isShow.value[index]) {
    isShow.value[index] = false
  } else {
    isShow.value[index] = true
  }
}

const topic_list: any = ref([])
let page = 0;
const loadTopicList = async () => {
  if (page === -1) {
    return
  }
  let { data: result } = await creator_topic_list(++page);
  if (result.code === 200) {
    if (result.data.length > 0) {
      topic_list.value = [...topic_list.value, ...result.data]
    } else {
      page = -1
    }
  }

}

const removeTopic = async (tid) => {
  const params = new FormData();
  params.append("tid", tid)
  let { data: result } = await remove_topic(params)
  if (result.code === 200) {
    loadTopicList()
  }
}


onMounted(async () => {
  loadTopicList()
  window.onscroll = function () {
    if (document.documentElement.clientHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
      loadTopicList()
    }
  }
})

onBeforeUnmount(() => {
  window.onscroll = null
})

</script>
<style scoped>
</style>