<template>
  <div class="sign-in-page">
    <div class="sign-in-decorate">
      <div :class="{ 'circle': true, 'circle-login': isLogin, 'circle-register': !isLogin }"></div>
      <img
        :class="{ 'sign-in-pic': true, 'sign-in-pic-login': isLogin, 'sign-in-pic-login-act': !isLogin, }"
        src="../assets/log.svg"
      />
      <img
        :class="{ 'sign-in-pic': true, 'sign-in-pic-register': !isLogin, 'sign-in-pic-register-act': isLogin, }"
        src="../assets/register.svg"
      />
    </div>

    <div class="sign-in-wrap">
      <div
        :class="{ 'sign-in-form': true, 'login-form': true, 'hide-form': !isLogin, 'appear-form': isLogin }"
      >
        <form>
          <div class="sign-in-form-item">
            <input v-model="userInfo.account" class="input" placeholder="请输入用户名" />
          </div>
          <div class="sign-in-form-item">
            <input v-model="userInfo.password" class="input" type="password" placeholder="请输入密码" />
          </div>
          <div class="sign-in-form-btn" @click="loginSubmit()">登录</div>

          <div class="sign-in-form-btn sign-in-form-btn-shift" @click="toRegister()">注册</div>
        </form>
      </div>
      <div
        :class="{ 'sign-in-form': true, 'register-form': true, 'hide-form': isLogin, 'appear-form': !isLogin }"
      >
        <form>
          <div class="sign-in-form-item">
            <input
              v-model="userInfo.account"
              class="input"
              autocomplete="username"
              placeholder="请输入用户名"
            />
          </div>
          <div class="sign-in-form-item">
            <input
              v-model="userInfo.password"
              class="input"
              type="password"
              autocomplete="current-password"
              placeholder="请输入密码"
            />
          </div>
          <div class="sign-in-form-item">
            <input v-model="userInfo.password" class="input" placeholder="请输入密码" />
          </div>
          <div class="sign-in-form-btn" @click="registerSubmit()">注册</div>

          <div class="sign-in-form-btn sign-in-form-btn-shift" @click="toLogin()">登录</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { login, register } from '../api/axios';
const isLogin = ref(true);
const userInfo = reactive({
  account: ref(),
  password: ref(),
})
const toLogin = () => {
  isLogin.value = true
}
const toRegister = () => {
  isLogin.value = false
}
const loginSubmit = async () => {
  let params = new FormData();
  params.append("account", userInfo.account);
  params.append("password", userInfo.password);
  console.log(params);
  let { data: result } = await login(params);
  if (result.code === 200) {
    alert("登录成功")
    localStorage.setItem("token", result.token);
    localStorage.setItem("nickname", result.nickname);
    localStorage.setItem("avater", result.avater);
  } else {
    alert("登录失败")
  }

}
const registerSubmit = async () => {
  let params = new FormData();
  params.append("account", userInfo.account);
  params.append("password", userInfo.password);
  let { data: result } = await register(params);
  if (result.code === 200) {
    alert("注册成功")
  } else {
    alert("注册失败")
  }
}
onMounted(() => {
  console.log('Component is mounted!')
})

</script>
<style lang='scss' scoped>
.sign-in-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #f4f5f5;
  overflow: hidden;

  .sign-in-decorate {
    .circle {
      position: absolute;

      border-radius: 50%;
      z-index: 5;
      background-color: rgba($color: #005ce6, $alpha: 1);
      overflow: hidden;
    }

    .circle-login {
      transform: translate(-50%, -60%);
      transition: transform 1.8s;
      transition-timing-function: ease-in-out;
    }

    .circle-register {
      transform: translate(50%, -60%);
      transition: transform 1.8s;
      transition-timing-function: ease-in-out;
    }

    .sign-in-pic {
      position: absolute;
      width: 20%;
      min-width: 300px;
      top: 50%;
      z-index: 6;
    }

    .sign-in-pic-login {
      transform: translateX(200px);
      transition: transform 0.9s;
      transition-delay: 0.6s;
      transition-timing-function: ease-in-out;
    }

    .sign-in-pic-login-act {
      transition: transform 0.9s;
      transform: translateX(-200px);
      transition-delay: 0.6s;
      transition-timing-function: ease-in-out;
    }

    .sign-in-pic-register {
      transform: translateX(1300px);
      transition: transform 0.9s;
      transition-delay: 0.6s;
      transition-timing-function: ease-in-out;
    }

    .sign-in-pic-register-act {
      transform: translateX(1700px);
      transition: transform 0.9s;
      transition-delay: 0.6s;
      transition-timing-function: ease-in-out;
    }
  }

  .sign-in-wrap {
    position: relative;
    top: 50%;

    .sign-in-form {
      width: 400px;
      transform: translate(-50%, -50%);
      padding: 12px 24px;
      border-radius: 2px;
      border: 1px solid black;
      background-color: rgba($color: #ffffff, $alpha: 0.5);
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
        cursor: pointer;
      }
      .sign-in-form-btn-shift {
        color: #005ce6;
        background-color: white;
      }
    }

    .login-form {
      position: absolute;
      left: 75%;
    }

    .register-form {
      position: absolute;
      left: 25%;
    }

    .hide-form {
      opacity: 0;
      transition: all 0.7s;
      transition-delay: 1s;
      transition-timing-function: ease-in-out;
    }

    .appear-form {
      opacity: 1;
      transition: all 0.7s;
      transition-delay: 1s;
      transition-timing-function: ease-in-out;
    }
  }
}
@media screen and (orientation: landscape) {
  .circle {
    width: 100vw;
    height: 100vw;
  }
}

@media screen and (orientation: portrait) {
  .circle {
    width: 100vh;
    height: 100vh;
  }
  .sign-in-pic {
    display: none;
  }
}
</style>