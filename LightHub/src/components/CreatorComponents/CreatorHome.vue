<template>
  <div class="card px-5 flex-col flex" style="min-height:calc(100vh - 100px)">
    <div>
      <h1 class="text-xl py-2 text-gray-500">数据概览</h1>
    </div>
    <div class="flex flex-wrap justify-between">
      <div class="data-card">
        <div class="text-sm">关注数</div>
        <div class="text-4xl font-semibold">{{ creatorInfo.fans_count || 0 }}</div>
      </div>
      <div class="data-card">
        <div class="text-sm">文章</div>
        <div class="text-4xl font-semibold">{{ creatorInfo.article_count || 0 }}</div>
      </div>
      <div class="data-card">
        <div class="text-sm">草稿箱</div>
        <div class="text-4xl font-semibold">{{ creatorInfo.draft_count || 0 }}</div>
      </div>
      <div class="data-card">
        <div class="text-sm">文章阅读数</div>
        <div class="text-4xl font-semibold">{{ creatorInfo.article_view_count || 0 }}</div>
      </div>
      <div class="data-card">
        <div class="text-sm">文章点赞数</div>
        <div class="text-4xl font-semibold">{{ creatorInfo.article_up_count || 0 }}</div>
      </div>
      <div class="data-card">
        <div class="text-sm">文章评论数</div>
        <div class="text-4xl font-semibold">{{ creatorInfo.article_comment_count || 0 }}</div>
      </div>
      <div class="data-card">
        <div class="text-sm">文章收藏数</div>
        <div class="text-4xl font-semibold">{{ creatorInfo.article_fav_count || 0 }}</div>
      </div>
      <div class="data-card">
        <div class="text-sm">讨论数</div>
        <div class="text-4xl font-semibold">{{ creatorInfo.topic_count || 0 }}</div>
      </div>
      <div class="data-card">
        <div class="text-sm">讨论阅读数</div>
        <div class="text-4xl font-semibold">{{ creatorInfo.topic_view_count || 0 }}</div>
      </div>
      <div class="data-card">
        <div class="text-sm">讨论回复数</div>
        <div class="text-4xl font-semibold">{{ creatorInfo.topic_up_count || 0 }}</div>
      </div>
      <div class="data-card">
        <div class="text-sm">讨论点赞数</div>
        <div class="text-4xl font-semibold">{{ creatorInfo.topic_answer_count || 0 }}</div>
      </div>
      <div class="data-card">
        <div class="text-sm">讨论收藏数</div>
        <div class="text-4xl font-semibold">{{ creatorInfo.topic_follow_count || 0}}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCreatorInfo } from '@/api/user'
import { ref, onMounted } from 'vue'

const creatorInfo: any = ref<Object>({})
const loadCreatorInfo = async () => {
  let { data: result } = await getCreatorInfo();
  if (result.code === 200) {
    creatorInfo.value = result.data
  }
}

onMounted(() => {
  loadCreatorInfo()
})

</script>
<style scoped>
.data-card {
  @apply w-36 bg-gray-200 p-4 flex flex-col rounded-lg mb-5 xl:w-64;
}
</style>