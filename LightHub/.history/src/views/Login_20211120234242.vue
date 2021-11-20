<template>
  <div class="login-page">
    <div class="login-wrap">
      <div class="login-title">
        <h1>LightHub</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


</script>
<style lang='scss' scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-image: url("../../src/assets/images/login-bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;

  .login-wrap {
    position: relative;
    width: 400px;
    height: 500px;
    border-radius: 2px;
    background-color: rgba($color: #ffffff, $alpha: 0.5);

    .login-title {
      position: absolute;
      top: -50px;
      color: white;
    }
  }
}
</style>