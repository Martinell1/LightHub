<template>
  <div class="fixed -ml-28 top-64">
    <div
      class="side-act-item"
      :class="{ 'text-indigo-800': props.article.isUp, ' text-gray-500': !props.article.isUp }"
      @click="upSubmit()"
    >
      <div
        class="absolute top-0 -right-2 bg-gray-500 text-gray-50 leading-3 text-xs rounded-full w-5 h-3 text-center"
      >{{ props.article.up_count }}</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
        />
      </svg>
    </div>
    <div class="side-act-item">
      <a href="#comment">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </div>
    <div class="side-act-item" @click="shiftCollection()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        />
      </svg>
    </div>
  </div>
  <CollectionAdd
    class="fixed top-80 -ml-16 mt-10"
    v-if="isCollection"
    :article_id="props.article._id"
    @useCollection="shiftCollection()"
  ></CollectionAdd>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { upArticle } from '@/util/useThumb'

import CollectionAdd from '../CollectionComponents/CollectionAdd.vue';
const props: any = defineProps({
  article: Object
})

const msg: any = inject('Message')
const upSubmit = async () => {
  const result = await upArticle(props.article._id)
  if (result.code === 200) {
    msg('success', result.message);
    props.article.isUp = !props.article.isUp
    props.article.up_count += result.data

  } else {
    msg('fail', '出现错误' + result.code);
  }
}

const isCollection = ref(false)

const shiftCollection = () => {
  isCollection.value = !isCollection.value
}




</script>
<style  scoped>
.side-act-item {
  @apply w-10 h-10 rounded-full bg-gray-50 shadow flex justify-center items-center mb-4 cursor-pointer relative;
}
</style>