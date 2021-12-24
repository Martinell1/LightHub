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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router';
import { getAnswerListByAnswerer } from '@/api/answer';
import AnswerCard from '@/components/TopicComponents/AnswerCard.vue'

const route = useRoute()

const answerList: any = ref([])
let page = 0;
const loadAnswerList = async () => {
  if (page === -1) {
    return
  }
  let { data: result } = await getAnswerListByAnswerer(route.params.id, ++page);
  if (result.code === 200) {
    if (result.data.length > 0) {
      answerList.value = [...answerList.value, ...result.data]
    } else {
      page = -1
    }

  }
}

onMounted(async () => {
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
<style scoped>
</style>