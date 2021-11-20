<template>
  <div class="sign-in-page">
    <div class="sign-in-wrap">
      <div class="sign-in-title">
        <h1>LightHub</h1>
      </div>
      <div class="sign-in-tabs">
        <div class="sign-in-tab word-btn">登录</div>
        <div class="sign-in-tab word-btn">注册</div>
      </div>
      <div class="sign-in-form login-form">
        <div class="sign-in-form-item">
          <input class="input" placeholder="请输入用户名" />
        </div>
        <div class="sign-in-form-item">
          <input class="input" placeholder="请输入密码" />
        </div>
        <div class="sign-in-form-btn" @click="shift()">登录</div>
      </div>
      <div class="sign-in-form login-form">
        <div class="sign-in-form-item">
          <input class="input" placeholder="请输入用户名" />
        </div>
        <div class="sign-in-form-item">
          <input class="input" placeholder="请输入密码" />
        </div>
        <div class="sign-in-form-btn" @click="shift()">登录</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
const isLogin = ref(false);
const shift = () => {
  isLogin.value = !isLogin.value
  console.log(isLogin.value);

}


</script>
<style lang='scss' scoped>
.sign-in-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-image: url("../../src/assets/images/sign-in-bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;

  .sign-in-wrap {
    position: relative;
    width: 400px;
    height: 500px;
    padding: 0 24px;
    border-radius: 2px;
    background-color: rgba($color: #ffffff, $alpha: 0.5);

    .sign-in-title {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -150%);
      color: white;
    }
  }

  .sign-in-tabs {
    .sign-in-tab {
      display: inline-block;
    }
  }

  .sign-in-form {
    .sign-in-form-item {
      padding: 12px 0;

      input {
        width: 100%;
        line-height: 24px;
        height: 24px;
        background: transparent;
      }
      border-bottom: 1px solid black;
    }

    .sign-in-form-btn {
      margin: 12px 0;
      height: 36px;
      line-height: 36px;
      text-align: center;
      color: white;
      background-color: #005ce6;
      border-radius: 2px;
    }
  }
}
</style>