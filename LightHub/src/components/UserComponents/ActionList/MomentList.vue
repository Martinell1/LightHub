<template>
  <div class="mb-20">
    <div v-for="action in action_list">
      <ActionCard :action="action"></ActionCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getActionList } from '@/api/user';
import ActionCard from './MomentAction/ActionCard.vue';

const action_list = ref([])
const loadActionList = async () => {
  let { data: result } = await getActionList();
  if (result.code === 200) {
    action_list.value = result.data
  }
}

onMounted(async () => {
  loadActionList()
})
</script>
<style  scoped>
</style>