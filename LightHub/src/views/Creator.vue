<template>
  <div class="creator_layout">
    <CreatorAside></CreatorAside>
    <div class="w-700">
      <CreatorMain></CreatorMain>
    </div>
  </div>
</template>

<script setup lang="ts">
import CreatorAside from '@/components/CreatorComponents/CreatorAside.vue';
import CreatorMain from '@/components/CreatorComponents/CreatorMain.vue';


</script>
<style  scoped>
.creator_layout {
  @apply w-1200 mx-auto mt-4;
}
</style>