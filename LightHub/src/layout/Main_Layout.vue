<template>
  <MainHeader></MainHeader>
  <div class="main_layout">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import MainHeader from '../components/MainHeader.vue';

</script>
<style lang='scss' scoped>
.main_layout {
  width: 1080px;
  margin: 0 auto;
  background-color: lightblue;
}
</style>