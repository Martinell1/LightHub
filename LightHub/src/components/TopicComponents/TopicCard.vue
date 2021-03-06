<template>
  <div v-show="!props.topicList" class="shadow rounded-md px-5 py-4 w-full">
    <div class="animate-pulse flex flex-col">
      <div class="h-4 mb-2 bg-cyan-light rounded w-1/2"></div>
      <div class="h-6 bg-cyan-light rounded w-1/4"></div>
      <div class="h-4 my-2 bg-cyan-light rounded w-5/6"></div>
      <div class="h-4 bg-cyan-light rounded w-1/3"></div>
    </div>
  </div>
  <div class="card px-5">
    <div v-for="(topic,index) in props.topicList" class="py-4 border-b-2 last">
      <AuthorInfo
        :index="index"
        :author="topic.initiator"
        :create_time="topic.create_time"
        :tag_list="topic.tag_list"
      ></AuthorInfo>
      <router-link :to="{ 'name': 'Topic', params: { 'id': topic._id } }">
        <div class="text-xl font-semibold text-first">{{ topic.title }}</div>
      </router-link>

      <div
        class="text-sm max-w-xl h-5 text-second truncate my-2"
      >{{ fmtIntroduce(topic.introduce) }}</div>
      <div class="flex text-sm text-second">
        <div class="flex">
          <div
            class="flex mr-4 ring-1"
            :class="{ 'btn-primary': topic.isUp, 'btn-plain': !topic.isUp }"
            @click="upSubmit(topic._id, index)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="svg-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
              />
            </svg>
            有所帮助 {{ topic.up_count }}
          </div>
        </div>

        <div
          class="flex mr-5 items-center cursor-pointer"
          :class="{ ' text-cyan-primary': topic.isFollow }"
          @click="followSubmit(topic._id, index)"
        >
          <svg
            v-show="!topic.isFollow"
            xmlns="http://www.w3.org/2000/svg"
            class="w-3 h-3 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          <svg
            v-show="topic.isFollow"
            xmlns="http://www.w3.org/2000/svg"
            class="svg-icon"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
          {{ topic.follow_count }}
        </div>

        <router-link
          :to="{ 'name': 'Topic', params: { 'id': topic._id } }"
          class="flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="svg-icon"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clip-rule="evenodd"
            />
          </svg>
          <div class="opacity-0 hover:opacity-100">参与回答</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { upTopic } from '@/util/useThumb';
import { followTopic } from '@/util/useFollow';
import AuthorInfo from '../Common/AuthorInfo.vue'
const props: any = defineProps({
  topicList: Array
})

const fmtIntroduce = (introduce) => {
  let result = introduce.replace(/[![].+\][\(]http\:\/\/qiniu\.kaijinx\.top\/.+[\)]/, '') //处理图片
  result = result.replace(/#+[ ].+/g, '')      //处理目录
  result = result.replace(/`{3}[^`]*`{3}/, '') //处理代码块
  return result
}

const userInfo: any = inject('userInfo')
const hoverInfo: any = inject('hoverInfo')
const removeHoverInfo: any = inject('removeHoverInfo')





const msg: any = inject("Message")
const upSubmit = async (tid, index) => {
  const result = await upTopic(tid)
  if (result.code === 200) {
    msg('success', result.message);
    props.topicList[index].isUp = !props.topicList[index].isUp
    props.topicList[index].up_count += result.data
  } else {
    msg('fail', result.message);
  }
}

const followSubmit = async (tid, index) => {
  const result = await followTopic(tid);
  if (result.code === 200) {
    msg('success', result.message);
    props.topicList[index].isFollow = !props.topicList[index].isFollow
    props.topicList[index].follow_count += result.data
  } else {
    msg('fail', result.message);
  }
}

</script>
<style scoped>
.svg-icon {
  @apply w-4 h-4 my-auto mr-1;
}
</style>
