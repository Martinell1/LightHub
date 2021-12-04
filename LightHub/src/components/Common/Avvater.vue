<template></template>

<script setup lang="ts">
import { inject } from 'vue'
const props = defineProps({
  type: String,
  user: Object
})

const userInfo = inject('userInfo')



</script>
<style  scoped>
</style>