<template>
  <div class="card px-5 w-80 flex flex-col z-20">
    <div class="h-9 flex justify-center items-center border-b-2 border-divider">
      <h1 class="font-semibold text-sm">添加到收藏集</h1>
    </div>
    <div class="min-h-30 border-b-2 border-divider">
      <div
        v-for="collection: any in collection_list"
        @click="favArticleSubmit(collection._id)"
        class="py-1 px-2 flex items-center justify-between text-sm cursor-pointer"
      >
        <div class="flex">
          <div class="mx-3">{{ collection.name }}</div>
          <div
            class="w-5 h-5 rounded-full text-center text-second"
          >{{ collection.article_list.length }}</div>
        </div>

        <div v-if="collection.article_list.indexOf(props.article_id) > -1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-cyan-accent mr-1"
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
        class="text-second text-sm hover:text-cyan-primary my-3"
        @click="isAdd = true"
      >新建收藏夹</div>
      <div v-if="isAdd" class="flex w-full justify-between my-2">
        <input v-model="collection_name" type="text" class="mr-4 outline-none text-xs" autofocus />
        <div class="btn-primary-mini w-16" type="submit" @click="addCollectionSubmit()">添加</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from 'vue';
import { useStore } from 'vuex';
import { addCollection, getCollectionList, favArticle } from '@/api/collection';
const props: any = defineProps({
  article_id: String
})
const isAdd = ref(false)

const collection_name = ref('')

const store = useStore()

const shiftCollection: any = inject('shiftCollection')

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
  params.append("aid", props.article_id)
  let { data: result } = await favArticle(params);
  if (result.code === 2000) {
    loadCollectionList()
  }
  shiftCollection()
}

const collection_list = ref([])
const loadCollectionList = async () => {
  let { data: result } = await getCollectionList();
  if (result.code === 200) {
    collection_list.value = result.data
  }
}


onMounted(async () => {
  loadCollectionList()
})

</script>
<style  scoped>
</style>