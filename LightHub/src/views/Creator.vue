<template>
  <div class="creator_layout">
    <CreatorAside></CreatorAside>
    <div class="w-700 ml-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import CreatorAside from '@/components/CreatorComponents/CreatorAside.vue';

</script>
<style  scoped>
.creator_layout {
  @apply w-1200 mx-auto mt-4 flex;
}
</style>