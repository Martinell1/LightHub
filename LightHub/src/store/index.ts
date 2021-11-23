import { createStore } from 'vuex'


export default createStore({
  state: {
    userInfo: {
      nickname: localStorage.getItem("nickname"),
      avater: localStorage.getItem("avater"),
    }
  },
  mutations: {
    updateUserInfo(state, userInfo) {
      state.userInfo.nickname = userInfo.nickname;
      state.userInfo.avater = userInfo.avater;
    },

    logOut(state) {
      state.userInfo = {
        nickname: "",
        avater: '',
      }
    },

  },
  actions: {
    asyncUpdateUserInfo(context, userInfo) {
      context.commit("updateUserInfo", userInfo);
    }
  },
  modules: {
  }
})
