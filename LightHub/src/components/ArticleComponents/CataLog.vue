<template>
  <div class="hidden fixed mx-5 card w-280 px-4 py-5 xl:block">
    <div class="font-semibold">目录</div>
    <div v-for="catalog in catalogList">
      <a v-if="catalog.level < 2" :href="'#' + catalog.text">
        <div class="catalog-level">{{ catalog.text }}</div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
const catalogList: any = inject('catalogList')

</script>
<style scoped>
.catalog-level {
  @apply border-l-4 border-indigo-800 py-1 my-2 px-2 text-gray-500;
}
</style>

