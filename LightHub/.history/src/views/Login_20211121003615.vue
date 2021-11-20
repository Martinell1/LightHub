<template>
  <div class="login-page">
    <div class="login-wrap">
      <div class="login-title">
        <h1>LightHub</h1>
      </div>
      <div class="login-tabs">
        <div class="login-tab word-btn">登录</div>
        <div class="login-tab word-btn">注册</div>
      </div>
      <div class="login-form">
        <div class="login-form-item">
          <input class="input" placeholder="请输入用户名" />
        </div>
        <div class="login-form-item">
          <input class="input" placeholder="请输入密码" />
        </div>
        <div class="login-form-btn">登录</div>
      </div>
      <div class="register-form hide">
        <div class="login-form-item">
          <input class="input" placeholder="请输入用户名" />
        </div>
        <div class="login-form-item">
          <input class="input" placeholder="请输入密码" />
        </div>
        <div class="login-form-btn" ">登录</div>
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
    padding: 0 24px;
    border-radius: 2px;
    background-color: rgba($color: #ffffff, $alpha: 0.5);

    .login-title {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -150%);
      color: white;
    }
  }

  .login-tabs {
    .login-tab {
      display: inline-block;
    }
  }

  .login-form {
    .login-form-item {
      padding: 12px 0;

      input {
        width: 100%;
        line-height: 24px;
        height: 24px;
        background: transparent;
      }
      border-bottom: 1px solid black;
    }

    .login-form-btn {
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