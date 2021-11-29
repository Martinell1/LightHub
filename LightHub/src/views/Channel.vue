<template>
  <SecondNav type="channelManage"></SecondNav>
  <div class="channel_layout">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import SecondNav from '../components/Common/SecondNav.vue';

</script>
<style scoped>
.channel_layout {
  @apply w-1000 m-auto;
}
</style>