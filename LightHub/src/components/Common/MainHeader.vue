<template>
  <nav class="bg-gray-50 h-16 border-b-2 border-gray-100">
    <div class="m-auto w-1200 flex justify-between">
      <ul class="flex">
        <li class="flex mr-4">
          <img src="../../assets/images/logo.png" class="w-14 h-14 m-1" />
          <div class="leading-16 h-16 text-xl font-semibold text-blue-900">LightHub</div>
        </li>

        <li class="nav-list-item">
          <router-link class="nav-list-item" :to="{ name: 'Home', params: { 'tag': '' } }">首页</router-link>
        </li>
        <li class="nav-list-item">
          <router-link class="nav-list-item" :to="{ name: 'Topic' }">讨论区</router-link>
        </li>
      </ul>
      <div class="flex w-100 overflow-hidden">
        <input
          class="m-auto mx-2 w-48 h-8 bg-gray-100 text-sm rounded-sm outline-none pl-4 ring-1 ring-blue-500 flex-shrink-0"
          :class="{ 'input-focus': isSearch, 'input': !isSearch }"
          type="text"
          @focus="focusOnSearch()"
          @blur="focusOnElse()"
        />

        <div class="btn" :class="{ 'btn-focus': isSearch }">搜索</div>
        <div class="btn" :class="{ 'btn-focus': isSearch }" @click="preTopicSubmit()">提问</div>
      </div>
      <div @mouseenter="clickAvater = true" @mouseleave="clickAvater = false" class="relative">
        <img
          class="w-10 h-10 rounded-full m-3 cursor-pointer"
          src="../../assets/images/login-bg.jpg"
        />
        <ul
          v-show="clickAvater"
          class="absolute rounded bg-gray-50 -ml-24 text-gray-500 ring-2 ring-gray-200 text-sm z-50"
        >
          <li class="user-opt-item">
            <router-link to="/editor">写文章</router-link>
          </li>
          <li class="user-opt-item border-b-2 border-gray-100">草稿箱</li>
          <li class="user-opt-item">
            <router-link :to="{ name: 'User', params: { 'id': userInfo.id } }">我的主页</router-link>
          </li>
          <li class="user-opt-item border-b-2 border-gray-100">我赞过的</li>
          <li class="user-opt-item" @click="exit()">退出</li>
        </ul>
      </div>
    </div>
  </nav>
  <TopicDialog v-if="showDialog" @close="closeDialog()"></TopicDialog>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from "vuex";
import TopicDialog from '../TopicComponents/TopicDialog.vue';
const store = useStore();
const userInfo = store.state.userInfo;
// const userInfo: any = inject('userInfo')

let isSearch = ref(false);
let clickAvater = ref(false);
let showDialog = ref(false)

const focusOnSearch = () => {
  isSearch.value = true;
}
const focusOnElse = () => {
  isSearch.value = false;
}

const preTopicSubmit = () => {
  showDialog.value = true
}

const closeDialog = () => {
  showDialog.value = false
}

const router = useRouter();
const exit = () => {
  store.commit('logOut')
  router.push({
    path: '/'
  })
}




</script>
<style scoped>
.nav-list-item {
  @apply text-base leading-16 h-16 mx-2 cursor-pointer text-gray-500 hover:text-blue-500;
}

.input {
  @apply w-48 transition-all duration-500 ease-in-out;
}

.input-focus {
  @apply w-96 transition-all duration-500 ease-in-out;
}

.btn {
  @apply rounded-sm w-20 h-9 my-auto mx-2 bg-blue-500 text-gray-50 text-center leading-8 text-sm cursor-pointer;
}

.btn-focus {
  @apply transform translate-x-40 transition-all duration-500 ease-in-out;
}

.user-opt-item {
  @apply w-36 px-2 py-2 right-40 cursor-pointer;
}
</style>