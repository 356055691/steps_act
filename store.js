import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogin: null,
    user: null
  },
  mutations: {
    setLogin(state, value) {
      state.isLogin = value;
    },
    setUser(state, value) {
      state.user = value;
    }
  }
});

export default store;