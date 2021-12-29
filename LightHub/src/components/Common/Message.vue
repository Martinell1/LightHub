<template>
  <div
    class="msg"
    :class="{
      'success_msg': type === 'success', 'fail_msg': type === 'fail',
      'hide': isDisappear
    }"
  >{{ info }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const info = ref('')
const setTinfo = (msg) => {
  info.value = msg
}
const type = ref('')
const setType = (str) => {
  type.value = str
}

defineExpose({
  setTinfo,
  setType,
})

const isDisappear = ref(false)
setTimeout(() => {
  isDisappear.value = true
}, 2500)

</script>
<style scoped>
.msg {
  @apply w-80 h-12  rounded shadow text-center leading-12 text-sm  z-50;
}

.success_msg {
  @apply bg-cyan-light  text-cyan-primary;
}

.fail_msg {
  @apply bg-cyan-light text-red-500;
}

.hide {
  @apply opacity-0 transition-opacity duration-1400 ease-in-out;
}
</style>