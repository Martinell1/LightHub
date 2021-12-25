<template>
  <div class="w-full card px-5 xl:w-700">
    <div v-for="(article,index) in props.articleList" :key="index" class="py-4 border-b-2 last">
      <div
        class="flex mb-2 text-sm text-gray-600 relative"
        :class="'item-' + index"
        @mouseleave="removeHoverInfo(index)"
      >
        <div class="border-r-2 pr-2">
          <div
            class="font-semibold"
            @mouseenter="hoverInfo(index, article.author_id, userInfo._id)"
          >{{ article.author.nickname }}</div>
        </div>
        <div class="border-r-2 px-2">{{ fmt4Time(article.create_time) }}</div>
        <div class="tag-list" v-for="tag in article.tag_list">{{ tag }}</div>
      </div>
      <div class="flex justify-between">
        <div class="flex flex-col">
          <router-link :to="{ name: 'Article', params: { id: article._id } }">
            <h1 class="text-xl text-gray-800 font-semibold">{{ article.title }}</h1>
            <p
              v-if="article.cover"
              class="text-sm text-gray-500 truncate my-2 max-w-xs xl:max-w-md"
            >{{ article.introduce }}</p>
            <p
              v-if="!article.cover"
              class="text-sm text-gray-500 truncate my-2 max-w-xs xl:max-w-xl"
            >{{ article.introduce }}</p>
          </router-link>

          <div class="flex items-center text-sm text-gray-500">
            <router-link :to="{ name: 'Article', params: { id: article._id } }" class="flex mr-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="svg-icon"
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
              {{ article.view_count }}
            </router-link>

            <div
              class="flex mr-5 cursor-pointer"
              @click="upSubmit(article._id, index)"
              :class="{ ' text-indigo-800': article.isUp }"
            >
              <svg
                v-show="!article.isUp"
                xmlns="http://www.w3.org/2000/svg"
                class="svg-icon"
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
              <svg
                v-show="article.isUp"
                xmlns="http://www.w3.org/2000/svg"
                class="svg-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
                />
              </svg>
              {{ article.up_count }}
            </div>

            <router-link :to="{ name: 'Article', params: { id: article._id } }" class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="svg-icon"
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
              {{ article.comment_count }}
            </router-link>
          </div>
        </div>

        <img v-if="article.cover" class="object-cover xl:w-32 xl:h-20" :src="article.cover" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { upArticle } from '@/util/useThumb'
const props: any = defineProps({
  articleList: Array
})

const userInfo: any = inject('userInfo')

const hoverInfo: any = inject('hoverInfo')
const removeHoverInfo: any = inject('removeHoverInfo')

const fmt4Time = (create_time) => {
  const articleTime = Date.parse(create_time);
  const hours = Math.floor((Date.now() - articleTime) / (1000 * 60 * 60));
  return hours > 24 ? Math.floor(hours / 24) + "天前" : '1天内'
}


const msg: any = inject('Message')
const upSubmit = async (aid, index) => {
  const result = await upArticle(aid)
  if (result.code === 200) {
    msg('success', result.message);
    props.articleList[index].isUp = !props.articleList[index].isUp
    props.articleList[index].up_count += result.data
  } else {
    msg('fail', result.message);
  }
}


</script>
<style scoped>
.tag-list {
  @apply mx-2;
}

.svg-icon {
  @apply h-4 w-4 my-auto mr-1;
}
</style>