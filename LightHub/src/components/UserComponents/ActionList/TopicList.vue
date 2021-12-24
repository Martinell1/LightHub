<template>
  <TopicCard :topicList="topicList"></TopicCard>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router';
import { getTopicListByInitiator } from '@/api/topic';
import TopicCard from '@/components/TopicComponents/TopicCard.vue';

const route = useRoute()

const topicList: any = ref([])
let page = 0;
const loadTopicList = async () => {
  if (page === -1) {
    return
  }
  let { data: result } = await getTopicListByInitiator(route.params.id, ++page);

  if (result.code === 200) {
    if (result.data.length > 0) {
      topicList.value = [...topicList.value, ...result.data]
    } else {
      page = -1
    }

  }
}


onMounted(async () => {
  loadTopicList()

  window.onscroll = function () {
    if (document.documentElement.clientHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
      loadTopicList()
    }
  }
})
onBeforeUnmount(() => {
  window.onscroll = null
})
</script>
<style scoped>
</style>