<template>
  <TopicHeader :topic="topic" @useEdit="shiftEdit()"></TopicHeader>

  <div class="flex answer_layout mt-4">
    <div class="w-1000">
      <AnswerTopic v-if="isEdit" :topic_id="topic._id"></AnswerTopic>
      <AnswerList :answerList="answerList"></AnswerList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, provide, onBeforeUnmount } from 'vue'
import { getTopicById } from '@/api/topic';
import { getAnswerListById } from '@/api/answer';
import { useRoute } from 'vue-router';
import TopicHeader from '@/components/TopicComponents/TopicHeader.vue';
import AnswerList from '@/components/TopicComponents/AnswerCard.vue';
import AnswerTopic from '@/components/TopicComponents/AnswerTopic.vue';
const route = useRoute();
const id = route.params.id;

const isEdit = ref(false)

const shiftEdit = () => {
  isEdit.value = !isEdit.value
}


const topic: any = ref({})
const loadTopic = async () => {
  let { data: result } = await getTopicById(id);
  if (result.code === 200) {
    topic.value = result.data
  }
}

const answerList = ref([])
let page = 0
const loadAnswerList = async () => {
  if (page === -1) {
    return
  }
  let { data: result } = await getAnswerListById(id, ++page);
  if (result.code === 200) {
    if (result.data.length > 0) {
      answerList.value = result.data
    } else {
      page = -1
    }

  }
}

const answerSuccess = () => {
  loadAnswerList()
  shiftEdit()
}

provide('refreshAnswer', answerSuccess)

onMounted(async () => {
  loadTopic()
  loadAnswerList()

  window.onscroll = function () {
    if (document.documentElement.clientHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
      loadAnswerList()
    }
  }
})

onBeforeUnmount(() => {
  window.onscroll = null
})

</script>
<style  scoped>
.answer_layout {
  @apply w-1000 mx-auto;
}
</style>