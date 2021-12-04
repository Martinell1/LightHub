<template>
  <div class="topic_layout">
    <main class="min-w-700 border-2">
      <SecondNav type="topic"></SecondNav>
      <TopicCard v-for="topic in topicList" :topic="topic"></TopicCard>
    </main>
    <HomeAside></HomeAside>
  </div>
</template>

<script setup lang="ts">
import SecondNav from '../components/Common/SecondNav.vue';
import HomeAside from '../components/HoneComponents/HomeAside.vue';
import TopicCard from '../components/TopicComponents/TopicCard.vue';
import { useRoute } from 'vue-router';
import { ref, watch, onMounted } from 'vue'
import { getTopicList } from '../api/axios'
let topicList = ref([])
const loadTopicList = async () => {
  let { data: result } = await getTopicList();
  if (result.code === 200) {
    topicList.value = result.data
  }
}

onMounted(async () => {
  loadTopicList()
})

</script>
<style scoped>
.topic_layout {
  @apply w-1000 m-auto mt-4 flex;
}
</style>

