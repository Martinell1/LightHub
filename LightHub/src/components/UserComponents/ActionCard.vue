<template>
  <div v-if="props.action.opt === 'follow'" class="w-700 bg-gray-50 mt-4 shadow">
    <div class="flex items-center text-sm px-5 py-4">
      <img class="w-11 h-11 rounded-full mr-4" src="@/assets/images/login-bg.jpg" />
      <div class="font-semibold mr-1">内秘心书</div>
      <div class="text-gray-500 flex mr-1">
        关注了
        <div v-if="props.action.field === 'tag'" class="flex">
          标签
          <div class="font-semibold text-gray-800">{{ props.action.tag.name }}</div>
        </div>
        <div v-if="props.action.field === 'topic'" class="flex">
          话题
          <div class="font-semibold text-gray-800">{{ props.action.topic.title }}</div>
        </div>
        <div v-if="props.action.field === 'user'" class="flex">
          用户
          <div class="font-semibold text-gray-800">{{ props.action.user.nickname }}</div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="props.action.opt === 'thumb'" class="w-700 bg-gray-50 mt-4 shadow">
    <div v-if="props.action.field === 'article'">
      <div class="text-sm px-4 py-2 border-b-2">
        <span class="text-gray-800">{{ props.action.user.nickname }}</span>
        <span class="text-gray-500">赞了这篇文章</span>
      </div>
      <div class="border-b-2">
        <div class="pl-19 text-lg font-semibold">MongoDB快速入门</div>
        <div class="pl-19 flex mt-2 mb-4">
          <div
            class="text-sm text-gray-500"
          >虽说现在关系型数据库还是主流，但是面对某些需求的时候，需要非关系型数据库来补充它，学习一个主流的NoSQL数据库还是很有必要的。MongoDB是一个功能丰富的NoSQL数据库，本文整理了它最常用的部分形成了这篇入门教程，</div>
          <img class="w-16 h-16 mx-4 rounded" src="../../assets/images/login-bg.jpg" />
        </div>
      </div>

      <div class="flex justify-between">
        <div class="moment-item">{{ props.action.article.up_list.length }}点赞</div>
        <div class="moment-item border-l-2 border-r-2">评论</div>
        <div class="moment-item">收藏</div>
      </div>
    </div>
    <div v-if="props.action.field === 'topic'">
      <div class="text-sm px-4 py-2 border-b-2">
        <span class="text-gray-800">{{ props.action.user.nickname }}</span>
        <span class="text-gray-500">赞了这篇文章</span>
      </div>
      <div class="border-b-2">
        <div class="pl-19 text-lg font-semibold">{{ props.action.topic.title }}</div>
        <div class="pl-19 flex mt-2 mb-4">
          <div class="text-sm text-gray-500">{{ props.action.topic.introduce }}</div>
          <img class="w-16 h-16 mx-4 rounded" src="../../assets/images/login-bg.jpg" />
        </div>
      </div>

      <div class="flex justify-between">
        <div
          class="moment-item"
        >{{ props.action.topic.up_list === undefined ? 0 : props.action.topic.up_list.length }}点赞</div>
        <div class="moment-item border-l-2 border-r-2">关注</div>
        <div class="moment-item">回答</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props: any = defineProps({
  action: Object
})
</script>
<style  scoped>
.moment-item {
  @apply w-full text-center text-sm my-2;
}
</style>
