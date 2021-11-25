<template>
  <MainHeader></MainHeader>
  <div class="main_layout">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import MainHeader from '../components/MainHeader.vue';

</script>
<style scoped>
</style>