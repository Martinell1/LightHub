<template>
  <div>
    <div class="flex">
      <div
        class="text-xs text-gray-500 mr-4 cursor-pointer"
        @click="upSubmit(comment)"
      >{{ props.comment.up_list.length }}点赞</div>
      <div
        v-show="!replyShow"
        class="text-xs text-gray-500 cursor-pointer"
        @click="replyShow = true"
      >回复</div>
      <div
        v-show="replyShow"
        class="text-xs text-gray-500 cursor-pointer"
        @click="replyShow = false"
      >取消回复</div>
    </div>

    <div v-show="replyShow" class="mt-4 px-4 pt-4 bg-gray-100 mb-1">
      <input
        v-model="reply.content"
        class="bg-gray-50 outline-none w-full px-3 py-2 rounded border-2 h-9 focus:border-blue-500"
        placeholder="输入评论"
      />
      <div class="flex justify-between items-center">
        <div class="text-gray-500 ml-14 opacity-0">按Enter键发送</div>
        <div
          class="my-4 w-24 text-center py-1 rounded text-gray-50 bg-blue-500 cursor-pointer"
          @click="replySubmit()"
        >发表评论</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, inject } from 'vue'
import { upComment, replyComment } from '../../api/axios';

const props: any = defineProps({
  comment: Object
})
const msg: any = inject('Message')
const userInfo: any = inject('userInfo')
const upSubmit = async (comment) => {
  let opt = isFollow(comment.up_list)
  if (opt) {
    //取关
    let index = getIndex(comment.up_list);
    console.log(index);

    comment.up_list.splice(index, 1)
  } else {
    comment.up_list.push(userInfo.value._id)
  }
  const params = new FormData();
  params.append('_id', comment._id);
  params.append('up_list', JSON.stringify(comment.up_list));

  let { data: result } = await upComment(params);
  if (result.code === 200) {
    msg('success', '成功')
  }
}

//获取
const getIndex = (up_list) => {
  let index = -1
  try {
    index = up_list.indexOf(userInfo.value._id)
  } finally {
    return index;
  }
}

const isFollow = (up_list) => {
  return getIndex(up_list) > -1 ? true : false
}


const replyShow = ref(false)
const reply = reactive({
  content: "",
  replyer: {},
  create_time: new Date().toLocaleString()
})
const replySubmit = async () => {
  reply.replyer = userInfo.value;
  props.comment.reply_list.push(reply)
  const params = new FormData();
  params.append("_id", props.comment._id)
  params.append("reply_list", JSON.stringify(props.comment.reply_list))
  let { data: result } = await replyComment(params);
  if (result.code === 200) {
    alert('回复')
  }

}
</script>
<style scoped>
</style>