<template>
  <div>
    <div class="text-sm px-5 py-2 border-b-2 flex">
      <div class="text-gray-800">{{ props.data.user.nickname }}</div>
      <div class="text-gray-500 flex">
        赞了这
        <div v-if="props.data.field === 'topic'">个话题</div>
        <div v-if="props.data.field === 'article'">篇文章</div>
      </div>
    </div>
    <div class="flex justify-between border-b-2 px-5 py-4">
      <div>
        <div class="text-lg font-semibold mb-2">
          <div v-if="props.data.field === 'topic'">{{ props.data.topic.title }}</div>
          <div v-if="props.data.field === 'article'">{{ props.data.article.title }}</div>
        </div>

        <div class="text-sm text-gray-500">
          <div v-if="props.data.field === 'topic'">{{ props.data.topic.introduce }}</div>
          <div v-if="props.data.field === 'article'">{{ props.data.article.introduce }}</div>
        </div>
      </div>
      <img
        v-if="props.data.field === 'article' && props.data.article.cover"
        class="w-32 h-20 rounded object-cover"
        :src="props.data.article.cover"
      />
    </div>

    <div v-if="props.data.field === 'topic'" class="flex justify-between text-gray-500">
      <div
        class="moment-item"
        :class="{ 'text-indigo-800': props.data.topic.isUp }"
        @click="topicUpSubmit(props.data.topic._id)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
          />
        </svg>
        {{ props.data.topic.up_count }}
      </div>
      <div
        class="moment-item border-l-2 border-r-2"
        :class="{ 'text-indigo-800': props.data.topic.isFollow }"
        @click="topicFollowSubmit(props.data.topic._id)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
        {{ props.data.topic.follow_count }}
      </div>
      <div class="moment-item">
        <router-link :to="{ name: 'Topic', params: { 'id': props.data.topic._id } }" class="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>回答
        </router-link>
      </div>
    </div>

    <div v-if="props.data.field === 'article'" class="flex justify-between text-gray-500">
      <div
        class="moment-item"
        :class="{ 'text-indigo-800': props.data.article.isUp }"
        @click="articleUpSubmit(props.data.article._id)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
          />
        </svg>
        {{ props.data.article.up_count }}
      </div>
      <div class="moment-item border-l-2 border-r-2 relative" @click="shiftCollection()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
        收藏
      </div>
      <CollectionAdd
        v-if="isCollection"
        :article_id="props.data.article._id"
        class="absolute ml-100"
        @useCollection="shiftCollection()"
      ></CollectionAdd>
      <div class="moment-item">
        <router-link
          :to="{ name: 'Article', params: { 'id': props.data.article._id } }"
          class="flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>评论
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CollectionAdd from '@/components/CollectionComponents/CollectionAdd.vue';
import { upArticle, upTopic } from '@/util/useThumb';
import { followTopic } from '@/util/useFollow';
import { ref, inject } from 'vue'

const props: any = defineProps({
  data: Object
})

const isCollection = ref(false)

const shiftCollection = () => {
  isCollection.value = !isCollection.value
}

const msg: any = inject('Message')
const topicUpSubmit = async (tid) => {
  const result = await upTopic(tid)
  if (result.code === 200) {
    msg('success', result.message);
    props.data.topic.isUp = !props.data.topic.isUp
    props.data.topic.up_count += result.data
  } else {
    msg('fail', '出现错误' + result.code);
  }
}
const topicFollowSubmit = async (tid) => {
  const result = await followTopic(tid);
  if (result.code === 200) {
    msg('success', result.message);
    props.data.topic.isFollow = !props.data.topic.isFollow
    props.data.topic.follow_count += result.data
  } else {
    msg('fail', '出现错误' + result.code);
  }
}
const articleUpSubmit = async (aid) => {
  const result = await upArticle(aid)
  if (result.code === 200) {
    msg('success', result.message);
    props.data.article.isUp = !props.data.article.isUp
    props.data.article.up_count += result.data
  } else {
    msg('fail', '出现错误' + result.code);
  }
}

</script>
<style  scoped>
.moment-item {
  @apply w-full text-center text-sm my-2 flex justify-center items-center cursor-pointer;
}
</style>