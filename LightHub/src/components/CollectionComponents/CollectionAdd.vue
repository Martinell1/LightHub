<template>
  <div class="fixed card w-80 flex flex-col z-20 top-80 -ml-16 mt-10">
    <div class="h-9 flex justify-center items-center border-b-2 border-gray-100">
      <h1 class="font-semibold text-sm">添加到收藏集</h1>
    </div>
    <div class="min-h-30 border-b-2 border-gray-100">
      <div
        v-for="collection: any in collection_list"
        @click="favArticleSubmit(collection._id)"
        class="py-1 px-2 flex items-center justify-between text-sm cursor-pointer hover:bg-gray-100"
      >
        <div class="flex">
          <div class="mx-3">{{ collection.name }}</div>
          <div
            class="w-5 h-5 rounded-full bg-gray-200 text-center text-gray-500"
          >{{ collection.article_list.length }}</div>
        </div>

        <div v-if="collection.article_list.indexOf(props.article_id) > -1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-orange-500 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="flex">
      <div
        v-if="!isAdd"
        class="text-gray-500 text-sm hover:text-orange-500 my-3"
        @click="isAdd = true"
      >新建收藏夹</div>
      <div v-if="isAdd" class="flex w-full justify-between my-2">
        <input
          v-model="collection_name"
          type="text"
          class="mr-4 bg-gray-50 outline-none text-xs"
          autofocus
        />
        <div class="btn-primary-mini w-16" type="submit" @click="addCollectionSubmit()">添加</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { addCollection, getCollectionListByUserId, favArticle } from '@/api/collection';
const props: any = defineProps({
  article_id: String
})
const isAdd = ref(false)

const collection_name = ref('')

const store = useStore()

const addCollectionSubmit = async () => {
  const params = new FormData();
  params.append("uid", store.state.userInfo.id)
  params.append("name", collection_name.value)
  params.append("aid", props.article_id)
  let { data: result } = await addCollection(params);
  if (result.code === 2000) {
    loadCollectionList()
  }
  shiftCollection()
}


const favArticleSubmit = async (cid) => {
  const params = new FormData();
  params.append("cid", cid)
  params.append("uid", store.state.userInfo.id)
  params.append("aid", props.article_id)
  let { data: result } = await favArticle(params);
  if (result.code === 2000) {
    loadCollectionList()
  }
  shiftCollection()
}

const collection_list = ref([])
const loadCollectionList = async () => {
  let { data: result } = await getCollectionListByUserId(store.state.userInfo.id);
  if (result.code === 200) {
    collection_list.value = result.data
  }
}

const emit = defineEmits(['useCollection'])
const shiftCollection = () => {
  emit('useCollection')
}

onMounted(async () => {
  loadCollectionList()
})

</script>
<style  scoped>
</style>