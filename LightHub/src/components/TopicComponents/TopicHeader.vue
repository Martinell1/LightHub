<template>
  <div class="flex pt-4 bg-white shadow">
    <div class="w-full mx-auto flex flex-col mb-6 xl:flex-row xl:w-1000">
      <div class="w-full px-4 xl:w-700">
        <div class="flex flex-col">
          <div class="flex">
            <div v-for="tag in props.tag_list" class="btn-plain-mini">{{ tag }}</div>
          </div>

          <div class="my-2">
            <h1 class="text-2xl font-semibold">{{ props.topic.title }}</h1>
          </div>

          <editor
            class="mb-6"
            v-model="props.topic.introduce"
            previewOnly
            style=" background-color: white;"
          ></editor>

          <div class="flex">
            <div
              class="flex mr-4"
              :class="{ 'btn-primary': props.topic.isFollow, 'btn-plain': !props.topic.isFollow }"
              @click="followSubmit(props.topic._id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 my-auto mx-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>关注问题
            </div>
            <div class="btn-plain flex ring-1 ring-indigo-800" @click="shiftEdit()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 my-auto mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                />
                <path
                  fill-rule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  clip-rule="evenodd"
                />
              </svg>写回答
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 flex justify-center xl:w-260 xl:h-12">
        <div class="flex flex-col items-center px-4">
          <div class="text-sm text-second">点赞数</div>
          <div class="font-semibold text-lg text-first">{{ props.topic.up_count }}</div>
        </div>
        <div class="flex flex-col items-center px-4 border-l-2">
          <div class="text-sm text-second">浏览量</div>
          <div class="font-semibold text-lg text-first">{{ props.topic.view_count }}</div>
        </div>
        <div class="flex flex-col items-center px-4 border-l-2">
          <div class="text-sm text-second">关注数</div>
          <div class="font-semibold text-lg text-first">{{ props.topic.follow_count }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Editor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { inject } from 'vue'
import { followTopic } from '@/util/useFollow';
const props: any = defineProps({
  topic: Object
})


const shiftEdit: any = inject('shiftEdit')

const msg: any = inject('Message')
const followSubmit = async (tid) => {
  const result = await followTopic(tid);
  if (result.code === 200) {
    msg('success', result.message);
    props.topic.isFollow = !props.topic.isFollow
    props.topic.follow_count += result.data
  } else {
    msg('fail', result.message);
  }
}


</script>
<style  scoped>
</style>