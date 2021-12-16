<template>
  <TopicCard :topicList="topicList"></TopicCard>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { getTopicListByInitiator } from '@/api/topic';
import TopicCard from '@/components/TopicComponents/TopicCard.vue';

const route = useRoute()

const topicList = ref([])
const loadTopicList = async () => {
  let { data: result } = await getTopicListByInitiator(route.params.id);
  if (result.code === 200) {
    topicList.value = result.data
  }
}


onMounted(async () => {
  loadTopicList()
})
</script>
<style scoped>
</style>