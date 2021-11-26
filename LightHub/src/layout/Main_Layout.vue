<template>
  <router-view name="header"></router-view>
  <div class="main_layout">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, provide, onMounted } from 'vue'
import { useStore } from 'vuex';
import { getOneById } from '../api/axios';
const store = useStore();
const id = store.state.userInfo.id;

let userInfo = ref({});

const loadUserInfo = async () => {
  let { data: result } = await getOneById(id);
  if (result.code === 200) {
    userInfo.value = result.data
    console.log("Provide的值", userInfo.value);
  }
}

provide('userInfo', userInfo.value)

onMounted(async () => {
  loadUserInfo()
})


</script>
<style scoped>
</style>