<template>
  <div class="mb-20">
    <div v-for="action in action_list">
      <ActionCard :action="action"></ActionCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getActionList } from '@/api/user';
import ActionCard from './MomentAction/ActionCard.vue';

const action_list: any = ref([])
let page = 0
const loadActionList = async () => {
  if (page === -1) {
    return
  }
  let { data: result } = await getActionList(++page);
  if (result.code === 200) {
    if (result.data.length > 0) {
      action_list.value = [...action_list.value, ...result.data]
    } else {
      page = -1
    }

  }
}

onMounted(async () => {
  loadActionList()
  window.onscroll = function () {

    if (document.documentElement.clientHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
      loadActionList()
    }
  }

})

onBeforeUnmount(() => {
  window.onscroll = null
})
</script>
<style  scoped>
</style>