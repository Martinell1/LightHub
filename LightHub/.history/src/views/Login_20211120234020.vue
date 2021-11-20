<template>
  <div class="login-wrap">
    <div class="login-content"></div>
  </div>
</template>

<script setup lang="ts">


</script>
<style lang='scss' scoped>
.login-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-image: url("../../src/assets/images/login-bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;

  .login-content {
    width: 400px;
    height: 500px;
    background-color: rgba($color: #ffffff, $alpha: 0.5);
  }
}
</style>