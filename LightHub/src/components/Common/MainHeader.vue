<template>
  <nav class="bg-white border-b-2 h-16">
    <div class="m-auto flex justify-between xl:w-1200">
      <ul class="flex">
        <li class="hidden mr-4 xl:flex">
          <svg
            t="1640766307771"
            class="m-1 w-8 h-8 my-auto text-cyan-primary xl:w-14 xl:h-14"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2952"
            width="200"
            height="200"
          >
            <path
              d="M506.482 707.444s-60.077-91.746 14.887-164.088l0.082 0.273s61.361-56.949 118.21-28.747c56.849 28.203 39.907 81.545 28.884 105.973 0 0 106.062-30.37 129.396-145.455 0 0 13.834-61.294-12.812-149.81 0 0 49.431 22.38 105.318 136.246 0 0-17.828-155.785-146.725-252.528 0 0-105.854-81.322-231.335-76.981 0 0 260.969 111.988 171.63 286.729 0 0-49.416 97.901-149.548 69.152l0.196-0.208s-80-24.666-84-87.999 50.667-75.333 77.333-78c0 0-79.333-76.667-190.667-39.333 0 0-60 18.667-123.333 86 0 0-5.333-53.998 65.333-159.332 0 0-126 93.332-145.333 253.332 0 0-17.5 132.332 49 238.832 0 0-33.5-282 162.5-292 0 0 109.491-6.154 134.66 94.936l-0.277-0.066s18.639 81.615-34.209 116.746c-52.849 35.131-90.574-6.212-106.217-27.972 0 0-26.729 107.037 61.27 184.788 0 0 46.166 42.628 136.145 63.81 0 0-44.098 31.618-170.652 23.085 0 0 143.828 62.453 292.059-0.803 0 0 123.354-51.011 182.335-161.852 0 0.001-227.469 170.013-334.13 5.272z"
              p-id="2953"
              fill="#00BCD4"
            />
          </svg>
          <div class="leading-16 h-16 text-xl font-semibold text-cyan-primary">LightHub</div>
        </li>

        <router-link :to="{ name: 'Home', params: { 'tag': '' } }" active-class=" text-cyan-dark">
          <div class="nav-list-item">首页</div>
        </router-link>

        <router-link :to="{ name: 'Forum' }" active-class=" text-cyan-dark">
          <div class="nav-list-item">讨论区</div>
        </router-link>
      </ul>
      <div class="flex xl:overflow-hidden xl:w-100">
        <input
          v-model="searchKey"
          class="w-full m-auto h-8 bg-gray-100 text-sm rounded-sm outline-none pl-4 ring-1 ring-cyan-primary flex-shrink-0 xl:w-48 xl:mx-2"
          :class="{ 'input-focus': isSearch, 'input': !isSearch }"
          type="text"
          @keyup.enter="searchSubmit()"
          @focus="focusOnSearch()"
          @blur="focusOnElse()"
        />
        <router-link class="hidden btn-primary my-auto mx-4 xl:block" :to="{ name: 'Editor' }">
          <div :class="{ 'btn-focus': isSearch }">写文章</div>
        </router-link>

        <div
          class="hidden btn-primary my-auto xl:block"
          :class="{ 'btn-focus': isSearch }"
          @click="topicModal(userInfo)"
        >提问</div>
      </div>
      <AvaterOpt></AvaterOpt>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from "vuex";
import AvaterOpt from './AvaterOpt.vue';
const store = useStore();
const userInfo = store.state.userInfo;
const route = useRoute();
const router = useRouter();

let isSearch = ref(false);

const focusOnSearch = () => {
  isSearch.value = true;
}
const focusOnElse = () => {
  isSearch.value = false;
}

const topicModal: any = inject('TopicModal');


const searchKey = ref('')
const searchSubmit = () => {
  router.push({ name: 'Search', params: { query: searchKey.value } })

}


</script>
<style scoped>
.nav-list-item {
  @apply w-12 h-8 leading-16  text-sm text-center cursor-pointer  hover:text-cyan-dark xl:text-base xl:mx-2 xl:h-16 xl:flex xl:items-center;
}

.input {
  @apply w-48 transition-all duration-500 ease-in-out;
}

.input-focus {
  @apply w-48 transition-all duration-500 ease-in-out xl:w-96;
}

.btn-focus {
  @apply transform translate-x-40 transition-all duration-500 ease-in-out;
}
</style>