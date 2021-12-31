<template>
  <div
    class="flex mb-2 text-sm text-second relative"
    :class="'item-' + index"
    @mouseleave="removeHoverInfo(index)"
  >
    <div class="pr-2">
      <div
        class="font-semibold"
        @mouseenter="hoverInfo(index, props.author._id, userInfo._id)"
      >{{ props.author.nickname }}</div>
    </div>
    <div v-if="props.create_time" class="px-2">{{ fmt4Time(props.create_time) }}</div>
    <div v-if="props.tag_list" class="mx-2" v-for="tag in props.tag_list">{{ tag }}</div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
const props: any = defineProps({
  index: Number,
  author: Object,
  create_time: String,
  tag_list: Array
})

const fmt4Time = (create_time) => {
  const Time = Date.parse(create_time);
  const hours = Math.floor((Date.now() - Time) / (1000 * 60 * 60));
  return hours > 24 ? Math.floor(hours / 24) + "天前" : '1天内'
}

const userInfo: any = inject('userInfo')
const hoverInfo: any = inject('hoverInfo')
const removeHoverInfo: any = inject('removeHoverInfo')


</script>
<style  scoped>
</style>