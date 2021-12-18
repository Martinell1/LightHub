<template>
  <div
    v-for="(article,index) in props.article_list"
    class="py-4 border-b-2 px-5 border-gray-100 cursor-pointer hover:bg-gray-100 last"
  >
    <div class="flex justify-between mb-2">
      <router-link :to="{ name: 'Article', params: { id: article._id } }">
        <div>{{ article.title }}</div>
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
          <router-link :to="{ name: 'Editor', params: { aid: article._id } }">
            <div class="px-2 py-1 text-sm" @click="toEdit(article)">编辑</div>
          </router-link>
          <div class="px-2 py-1 cursor-pointer text-sm" @click="removeArticle(article._id)">删除</div>
        </div>
      </div>
    </div>

    <div class="text-gray-500 text-sm">{{ article.create_time }}</div>
  </div>
</template>

<script setup lang="ts">
import { remove_article } from '@/api/article'
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const props: any = defineProps({
  article_list: Array,
  isArticle: Boolean,
})

const isShow: any = ref([])

const showDrop = (index) => {
  if (isShow.value[index]) {
    isShow.value[index] = false
  } else {
    isShow.value[index] = true
  }
}

const emit = defineEmits(['refresh'])

const removeArticle = async (aid) => {
  const params = new FormData();
  params.append("aid", aid)
  let { data: result } = await remove_article(params)
  if (result.code === 200) {
    emit('refresh')
  }

}

const toEdit = (article) => {
  store.commit('updateEditArticle', article)

}

</script>
<style  scoped>
</style>