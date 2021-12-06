<template>
  <div class="bg-gray-50 p-4 border-b-2">
    <UserInfo :type="'topic'" :id="props.topic.initiator"></UserInfo>
    <div class="text-xl font-semibold my-2">{{ props.topic.title }}</div>
    <div class="h-12">{{ props.topic.introduce }}</div>
    <div class="flex my-3">
      <div class="flex">
        <div class="btn-primary text-sm" @click="upSubmit()">△{{ up_count }}</div>
        <div class="btn-primary ml-2 mr-4 text-xl" @click="stepSubmit()">▽</div>
      </div>
      <div class="btn">参与回答</div>
      <div class="btn" @click="followSubmit()">关注问题</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import UserInfo from '../Common/UserInfo.vue';
import { upTopic, stepTopic } from '../../api/axios';
const props: any = defineProps({
  topic: Object
})

const up_count = computed(() => {
  let up_length = 0;
  let step_length = 0;
  try {
    up_length = props.topic.up_list.length;
    step_length = props.topic.step_list.length;
  } finally {

    console.log(up_length, step_length);

    return up_length - step_length;
  }
})

const userInfo: any = inject('userInfo')
const msg: any = inject("Message")
const upSubmit = async () => {
  let params = new FormData();
  params.append("_id", props.topic._id);
  params.append("user_id", userInfo.value._id)
  let { data: result } = await upTopic(params);
  if (result.code === 200) {
    if (result.data === "取消点赞成功") {
      msg("success", "取消点赞成功")
    } else {
      msg("success", "点赞成功")
    }

  }
}

const stepSubmit = async () => {
  let params = new FormData();
  params.append("_id", props.topic._id);
  params.append("user_id", userInfo.value._id)
  let { data: result } = await stepTopic(params);
  if (result.code === 200) {
    if (result.data === "取消点踩成功") {
      msg("success", "取消点踩成功")
    } else {
      msg("success", "点踩成功")
    }
  }
}

const followSubmit = async () => {

}

</script>
<style scoped>
.btn-primary {
  @apply bg-blue-100 text-blue-500 p-2 py-1 leading-7 rounded cursor-pointer;
}

.btn {
  @apply leading-9 text-sm text-gray-500 mx-4;
}
</style>