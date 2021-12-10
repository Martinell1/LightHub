<template>
  <TopicHeader
    :topic_id="topic._id"
    :tag_list="topic.tag_list"
    :title="topic.title"
    :initiator="topic.initiator"
    :view_count="topic.view_count"
    :up_list="topic.up_list"
    :introduce="topic.introduce"
    :star_count="topic.star_count"
    @useEdit="shiftEdit()"
  ></TopicHeader>

  <div class="flex answer_layout mt-4">
    <div class="w-700">
      <AnswerTopic v-if="isEdit" :topic_id="topic._id"></AnswerTopic>
      <AnswerList :answer_list="answer_list"></AnswerList>
    </div>
    <div class="w-260"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getTopicById } from '@/api/topic';
import { getAnswerListById } from '@/api/answer';
import { useRoute } from 'vue-router';
import TopicHeader from '@/components/TopicComponents/TopicHeader.vue';
import AnswerList from '@/components/TopicComponents/AnswerList.vue';
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

const answer_list = ref([])
const loadAnswerList = async () => {
  let { data: result } = await getAnswerListById(id);
  if (result.code === 200) {
    answer_list.value = result.data
  }
}

onMounted(async () => {
  loadTopic()
  loadAnswerList()
})

</script>
<style  scoped>
.answer_layout {
  @apply w-1000 mx-auto;
}
</style>