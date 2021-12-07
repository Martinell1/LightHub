<template>
  <div class="w-700 bg-gray-50 shadow">
    <div>
      <ul class="flex">
        <li class="activity-item">动态</li>
        <li class="activity-item activity-item-act">文章</li>
        <li class="activity-item">回答</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">


</script>
<style scoped>
.activity-item {
  @apply px-5 py-3 cursor-pointer;
}

.activity-item-act {
  @apply border-orange-500 border-b-2;
}
</style>