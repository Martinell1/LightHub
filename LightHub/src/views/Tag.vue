<template>
  <SecondNav type="tagManage"></SecondNav>
  <div class="tag_layout">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import SecondNav from '../components/Common/SecondNav.vue';

</script>
<style scoped>
.tag_layout {
  @apply w-1000 m-auto;
}
</style>