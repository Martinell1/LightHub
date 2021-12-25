<template>
  <nav class="bg-gray-50 border-b-2 border-gray-100 h-16">
    <div class="m-auto flex justify-between xl:w-1200">
      <ul class="flex">
        <li class="hidden mr-4 xl:flex">
          <img src="@/assets/images/logo.png" class="m-1 w-8 h-8 my-auto xl:w-14 xl:h-14" />
          <div class="leading-16 h-16 text-xl font-semibold text-orange-600">LightHub</div>
        </li>

        <router-link :to="{ name: 'Home', params: { 'tag': '' } }">
          <div class="nav-list-item">首页</div>
        </router-link>

        <router-link :to="{ name: 'Forum' }">
          <div class="nav-list-item">讨论区</div>
        </router-link>
      </ul>
      <div class="flex xl:overflow-hidden xl:w-100">
        <input
          class="w-full m-auto h-8 bg-gray-100 text-sm rounded-sm outline-none pl-4 ring-1 ring-indigo-800 flex-shrink-0 xl:w-48 xl:mx-2"
          :class="{ 'input-focus': isSearch, 'input': !isSearch }"
          type="text"
          @focus="focusOnSearch()"
          @blur="focusOnElse()"
        />

        <div class="hidden btn-primary my-auto mx-4 xl:block" :class="{ 'btn-focus': isSearch }">搜索</div>
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
import { useStore } from "vuex";
import AvaterOpt from './AvaterOpt.vue';
const store = useStore();
const userInfo = store.state.userInfo;

let isSearch = ref(false);

const focusOnSearch = () => {
  isSearch.value = true;
}
const focusOnElse = () => {
  isSearch.value = false;
}

const topicModal: any = inject('TopicModal');


</script>
<style scoped>
.nav-list-item {
  @apply w-12 h-8 leading-16  text-sm text-center cursor-pointer text-gray-500 hover:text-indigo-800 xl:text-base xl:mx-2 xl:h-16 xl:flex xl:items-center;
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