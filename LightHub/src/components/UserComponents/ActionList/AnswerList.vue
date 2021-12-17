<template>
  <AnswerCard :answerList="answerList">
    <template v-slot="topic">
      <router-link :to="{ 'name': 'Topic', params: { 'id': topic.id } }">
        <div class="text-xl font-semibold mb-2">{{ topic.title }}</div>
      </router-link>
    </template>
  </AnswerCard>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { getAnswerListByAnswerer } from '@/api/answer';
import AnswerCard from '@/components/TopicComponents/AnswerCard.vue'

const route = useRoute()

const answerList = ref([])
const loadAnswerList = async () => {
  let { data: result } = await getAnswerListByAnswerer(route.params.id);
  if (result.code === 200) {
    answerList.value = result.data
  }
}

onMounted(async () => {
  loadAnswerList()
})
</script>
<style scoped>
</style>