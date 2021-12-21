<template>
  <div class="card mb-5" style="min-height:calc(100vh - 100px)">
    <div class="flex py-2 text-gray-500">
      <div class="p-2 ml-5 cursor-pointer border-b-2 border-orange-500">收藏夹</div>
    </div>
    <div
      v-for="(collection,index) in collection_list"
      class="py-4 border-b-2 px-5 border-gray-100 cursor-pointer hover:bg-gray-100 last"
    >
      <div class="flex justify-between">
        <div class="flex">
          <input v-model="collection.name" class="bg-gray-50 outline-none bg-opacity-0" />
          <svg
            @click="updateSubmit(collection)"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
            />
          </svg>
        </div>

        <svg
          v-if="!isShow[index]"
          @click="loadCollectionDetail(collection._id); showDetail(true, index)"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
          <path
            fill-rule="evenodd"
            d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-if="isShow[index]"
          @click="showDetail(false, index)"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <div v-if="isShow[index]">
        <div v-for="article in currentCollection.article_list">
          <div class="flex justify-between items-center">
            <router-link :to="{ name: 'Article', params: { id: article._id } }">
              <div class="my-1">{{ article.title }}</div>
            </router-link>

            <svg
              @click="removeSubmit(collection._id, article._id)"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCollectionList, getCollectionDetail, removeArticle, updateCollection } from '@/api/collection';
import { ref, onMounted, inject, onBeforeUnmount } from 'vue'

const msg: any = inject('Message')

const isShow: any = ref([])

const showDetail = (flag, index) => {
  isShow.value.fill(false)
  if (flag) {
    isShow.value[index] = true
  }
}


const collection_list: any = ref([])
let page = 0;
const loadCollectionList = async () => {
  if (page === -1) {
    return -1
  }
  let { data: result } = await getCollectionList(++page);
  if (result.code === 200) {
    if (result.data.length > 0) {
      collection_list.value = [...collection_list.value, ...result.data]
    } else {
      page = -1
    }

  }
}

const currentCollection: any = ref({})
const loadCollectionDetail = async (cid) => {
  let { data: result } = await getCollectionDetail(cid)
  if (result.code === 200) {
    currentCollection.value = result.data
  }
}

const updateSubmit = async (collection) => {
  const params = new FormData();
  params.append("_id", collection._id)
  params.append("name", collection.name)
  let { data: result } = await updateCollection(params);
  if (result.code === 200) {
    loadCollectionList()
    msg('success', result.message)
  }
}

const removeSubmit = async (cid, aid) => {
  const params = new FormData();
  params.append("cid", cid)
  params.append("aid", aid)
  let { data: result } = await removeArticle(params);
  if (result.code === 200) {
    loadCollectionList()
    msg('success', result.message)
  }
}

onMounted(async () => {
  loadCollectionList()

  window.onscroll = function () {
    if (document.documentElement.clientHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
      loadCollectionList()
    }
  }
})

onBeforeUnmount(() => {
  window.onscroll = null
})


</script>
<style scoped>
</style>