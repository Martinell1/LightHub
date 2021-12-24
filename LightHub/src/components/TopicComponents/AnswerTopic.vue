<template>
  <div class="flex flex-col card px-5">
    <div class="border-b-2 border-gray-100">
      <h1 class="text-xl font-semibold mt-4 mb-3 text-gray-500">回答问题</h1>
    </div>
    <div class="flex items-center mt-2">
      <img class="w-9 h-9 rounded-full mr-2 object-cover" :src="userInfo.avater" />
      <div class="flex text-sm text-gray-500">
        <div class="font-semibold">{{ userInfo.nickname }}</div>
        <div>{{ userInfo.introduce || '' }}</div>
      </div>
    </div>
    <div class="my-2">
      <editor v-model="answer_content"></editor>
    </div>
    <div class="mt-2 mb-4 flex">
      <div class="btn-primary" @click="answerSubmit()">发布回答</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'
import Editor from '@/components/Common/Editor.vue';
import { saveOrUpdateAnswer, getAnswerByUserId } from '@/api/answer';

const props: any = defineProps({
  topic_id: String
})

const userInfo: any = inject('userInfo')

const loadAnswerList: any = inject('refreshAnswer')

const answer_content = ref('')

const msg: any = inject('Message')
const answerSubmit = async () => {

  const params = new FormData();
  params.append("topic_id", props.topic_id)
  params.append("answerer_id", userInfo.value._id)
  params.append("content", answer_content.value)
  let { data: result } = await saveOrUpdateAnswer(params);
  if (result.code === 200) {
    msg("success", '回答成功')
    loadAnswerList()
  }
}

const loadAnswer = async () => {
  let { data: result } = await getAnswerByUserId(props.topic_id, userInfo.value._id);
  if (result.code === 200) {
    answer_content.value = result.data.content
  }
}



onMounted(async () => {
  loadAnswer()
})

</script>
<style  scoped>
</style>