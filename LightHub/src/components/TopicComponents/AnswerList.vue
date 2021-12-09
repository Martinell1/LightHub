<template>
  <div class="flex flex-col mt-4 card">
    <div
      v-for="(answer,index) in props.answer_list"
      class="border-b-2 mt-4 border-gray-100 relative"
      :class="'item-' + index"
      @mouseleave="removeHoverInfo(index)"
    >
      <div class="flex items-center" @mouseenter="hoverInfo(index, userInfo, answer.answerer)">
        <img class="w-10 h-10 rounded-sm mr-4" src="@/assets/images/login-bg.jpg" />
        <div class="text-sm font-semibold">{{ answer.answerer.nickname }}</div>
      </div>
      <div>
        <p class="my-2">{{ answer.content }}</p>
      </div>
      <div class="text-gray-500 text-sm">编辑于{{ answer.create_time }}</div>
      <div class="flex mt-2 mb-4">
        <div class="btn-primary mr-4">▲赞同</div>
        <div class="btn-plain">▼</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted } from 'vue';

const props: any = defineProps({
  answer_list: Array
})

const userInfo: any = inject('userInfo')

const hoverInfo: any = inject('hoverInfo')
const removeHoverInfo: any = inject('removeHoverInfo')


</script>
<style  scoped>
</style>