<template>
  <div class="card">
    <div v-for="(topic,index) in props.topicList" class="py-4 border-b-2 last">
      <UserInfo :type="'topic'" :id="topic.initiator"></UserInfo>
      <div class="text-xl font-semibold my-2">{{ topic.title }}</div>
      <div class="h-12">{{ topic.introduce }}</div>
      <div class="flex">
        <div class="flex">
          <div
            class="flex mr-4"
            :class="{ 'btn-primary': isThumb(index), 'btn-plain': !isThumb(index) }"
            @click="upSubmit(topic)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 my-auto mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
              />
            </svg>
            有所帮助 {{ topic.up_list.length }}
          </div>
        </div>
        <router-link
          :to="{ 'name': 'Topic', params: { 'id': topic._id } }"
          class="flex btn-plain mr-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 my-auto mx-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clip-rule="evenodd"
            />
          </svg>参与回答
        </router-link>

        <div class="flex btn-plain" @click="followSubmit(topic)">
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import UserInfo from '../Common/UserInfo.vue';
import { upTopic } from '@/api/topic';
const props: any = defineProps({
  topicList: Array
})
const userInfo: any = inject('userInfo')

const isThumb = (index) => {
  return props.topicList[index].up_list.indexOf(userInfo.value._id) > -1;
}

const msg: any = inject("Message")
const upSubmit = async (topic) => {
  let params = new FormData();
  params.append("_id", topic._id);
  params.append("user_id", userInfo.value._id)
  let { data: result } = await upTopic(params);
  if (result.code === 200) {
    if (result.data === "取消点赞成功") {
      msg("success", "取消点赞成功")
      let index = topic.up_list.indexOf(userInfo.value._id)
      topic.up_list.splice(index, 1)
    } else {
      msg("success", "点赞成功")
      topic.up_list.push(userInfo.value._id)
    }

  }
}


const followSubmit = async (topic) => {

}

</script>
<style scoped>
</style>
