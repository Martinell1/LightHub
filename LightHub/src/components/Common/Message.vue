<template>
  <div
    class="w-80 h-20 bg-blue-400 fixed right-0 top-16 rounded shadow flex justify-center items-center"
    @click="log()"
  >{{ info }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  info: String,
})
const info = ref('')
const log = (a) => {
  info.value = a
  console.log(a);
}
defineExpose({
  info,
  log
})

</script>
<style scoped>
</style>