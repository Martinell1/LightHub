<template>
  <div class="w-60 h-60 py-5 border-2 inline-block mx-5px mb-3">
    <div class="flex flex-col justify-center items-center my-4">
      <img :src="props.data.icon" class="w-12 h-12 rounded-full object-cover my-4" />
      <a class="text-lg">{{ props.data.name }}</a>
      <div class="flex my-2">
        <div class="mx-2 text-gray-500 text-sm">200人关注</div>
        <div class="mx-2 text-gray-500 text-sm">12篇文章</div>
      </div>
      <div class="bg-blue-500 text-gray-100 text-sm px-4 py-1 rounded my-2">已关注</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props: any = defineProps({
  data: Object
})

</script>
<style  scoped>
</style>