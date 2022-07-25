import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tokenID: "",
    uid: "",
    username: "",
    isLogin: false,
  }, //放数据的
  getters: {}, //计算属性
  mutations: {
    // change(state, value) {
    //   state.a = value;
    // },

    change(state, { key, value }) {
      state[key] = value;
    },
  }, //写方法
  actions: {},
  modules: {},
});
