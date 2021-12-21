<template>
  <div class="topic_layout">
    <main class="min-w-700">
      <div class="border-2">
        <SecondNav type="topic"></SecondNav>
        <TopicCard :topicList="topicList"></TopicCard>
      </div>
    </main>
    <HomeAside></HomeAside>
  </div>
</template>

<script setup lang="ts">
import SecondNav from '../components/Common/SecondNav.vue';
import HomeAside from '../components/HoneComponents/HomeAside.vue';
import TopicCard from '../components/TopicComponents/TopicCard.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getTopicList } from '@/api/topic'
let topicList: any = ref([])
let page = 0;
const loadTopicList = async () => {
  if (page === -1) {
    return
  }
  let { data: result } = await getTopicList(++page);
  if (result.code === 200) {
    if (result.data.length > 0) {
      topicList.value = [...topicList.value, ...result.data]
    }
    else {
      page = -1
    }

  }
}

onMounted(async () => {
  loadTopicList()

  window.onscroll = function () {
    if (document.documentElement.clientHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
      console.log('到底');
      loadTopicList()
    }
  }
})

onBeforeUnmount(() => {
  window.onscroll = null
})

</script>
<style scoped>
.topic_layout {
  @apply w-1000 m-auto mt-4 flex;
}
</style>

