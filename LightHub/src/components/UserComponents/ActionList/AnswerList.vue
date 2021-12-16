<template>
  <AnswerCard :answerList="answerList"></AnswerCard>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { getAnswerListByAnswerer } from '@/api/answer';
import AnswerCard from './AnswerCard.vue';

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