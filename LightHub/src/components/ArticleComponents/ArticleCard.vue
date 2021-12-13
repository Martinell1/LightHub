<template>
  <div class="w-700 card">
    <div v-for="(article,index) in props.articleList" :key="index" class="py-4 border-b-2 last">
      <div
        class="flex mb-2 text-sm text-gray-600 relative"
        :class="'item-' + index"
        @mouseleave="removeHoverInfo(index)"
      >
        <div class="border-r-2 pr-2">
          <div
            class="font-semibold"
            @mouseenter="hoverInfo(index, userInfo, article.author)"
          >{{ article.author.nickname }}</div>
        </div>
        <div class="border-r-2 px-2">{{ fmt4Time(article.create_time) }}</div>
        <div class="tag-list" v-for="tag in article.tag_list">{{ tag }}</div>
      </div>
      <div class="flex justify-between">
        <div class="flex flex-col">
          <router-link :to="{ name: 'Article', params: { id: article._id } }">
            <h1 class="text-xl text-gray-800 font-semibold">{{ article.title }}</h1>
            <p class="text-sm text-gray-500 truncate my-2 max-w-md">{{ article.content }}</p>
          </router-link>

          <div class="flex items-center text-sm">
            <div
              class="flex mr-4 ring-1 ring-orange-500"
              @click="upSubmit(article)"
              :class="{ 'btn-primary': isThumb(index), 'btn-plain': !isThumb(index) }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 my-auto mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
              点赞{{ article.up_list.length }}
            </div>

            <router-link
              :to="{ name: 'Article', params: { id: article._id } }"
              class="btn-plain flex mr-4 ring-1 ring-orange-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 my-auto mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              浏览量{{ article.view_count }}
            </router-link>

            <router-link
              :to="{ name: 'Article', params: { id: article._id } }"
              class="btn-plain flex ring-1 ring-orange-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 my-auto mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              评论{{ article.comments }}
            </router-link>
          </div>
        </div>
        <img class="w-32 h-20" src="@/assets/images/login-bg.jpg" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { upArticle } from '@/api/article';
const props: any = defineProps({
  articleList: Array
})


const hoverInfo: any = inject('hoverInfo')
const removeHoverInfo: any = inject('removeHoverInfo')

const fmt4Time = (create_time) => {
  const articleTime = Date.parse(create_time);
  const hours = Math.floor((Date.now() - articleTime) / (1000 * 60 * 60));
  return hours > 24 ? Math.floor(hours / 24) + "天前" : '1天内'
}

const isThumb = (index) => {
  return props.articleList[index].up_list.indexOf(userInfo.value._id) > -1;
}

const userInfo: any = inject('userInfo')
const msg: any = inject('Message')
const upSubmit = async (article) => {
  let params = new FormData();
  params.append("_id", article._id);
  let { data: result } = await upArticle(params);
  if (result.code === 200) {
    msg("success", result.data)
    if (result.data === "已取消点赞") {
      let index = article.up_list.indexOf(userInfo.value._id)
      article.up_list.splice(index, 1)
    } else {
      article.up_list.push(userInfo.value._id)
    }
  }
}

</script>
<style scoped>
.tag-list {
  @apply mx-2;
}
</style>