<template>
  <div class="flex flex-col mb-4 card px-5">
    <div
      v-for="(answer,index) in props.answerList"
      class="border-b-2 mt-4 relative"
      :class="'item-' + index"
      @mouseleave="removeHoverInfo(index)"
    >
      <div v-if="answer.topic">
        <slot :id="answer.topic._id" :title="answer.topic.title"></slot>
      </div>

      <div
        class="flex items-center"
        @mouseenter="hoverInfo(index, answer.answerer_id, userInfo._id)"
      >
        <img class="w-10 h-10 rounded-sm mr-4 object-cover" :src="answer.answerer.avater" />
        <div class="text-sm font-semibold">{{ answer.answerer.nickname }}</div>
      </div>

      <editor v-model="answer.content" :preview-only="true"></editor>

      <div class="text-second text-sm">编辑于{{ answer.create_time }}</div>
      <div class="flex mt-2 mb-4">
        <div
          class="mr-4"
          :class="{ 'btn-primary': answer.isUp, 'btn-plain': !answer.isUp }"
          @click="upSubmit(answer._id, index)"
        >▲赞同{{ answer.up_count }}</div>
        <div
          :class="{ 'btn-primary': answer.isStep, 'btn-plain': !answer.isStep }"
          @click="stepSubmit(answer._id, index)"
        >▼</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Editor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { upAnswer, stepAnswer } from '@/util/useThumb';
import { inject } from 'vue';

const props: any = defineProps({
  answerList: Array
})

const userInfo: any = inject('userInfo')

const hoverInfo: any = inject('hoverInfo')
const removeHoverInfo: any = inject('removeHoverInfo')

const msg: any = inject('Message')
const upSubmit = async (aid, index) => {
  const result = await upAnswer(aid)
  if (result.code === 200) {
    msg('success', result.message);
    props.answerList[index].isUp = !props.answerList[index].isUp
    if (props.answerList[index].isUp) {
      props.answerList[index].isStep = false
    }
    props.answerList[index].up_count += result.data
  } else {
    msg('fail', '出现错误' + result.code);
  }
}

const stepSubmit = async (aid, index) => {
  const result = await stepAnswer(aid)
  if (result.code === 200) {
    msg('success', result.message);
    props.answerList[index].isStep = !props.answerList[index].isStep
    if (props.answerList[index].isStep) {
      props.answerList[index].isUp = false
    }
    props.answerList[index].up_count += result.data
  } else {
    msg('fail', '出现错误' + result.code);
  }
}


</script>
<style  scoped>
</style>