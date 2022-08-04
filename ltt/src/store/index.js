import Vue from "vue";
import Vuex from "vuex";
import { scqn, scqny, getuserInfo } from "../API/user";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    token: "",
    uid: "",
    username: "",
    isLogin: false,
    userInfo: {},
  }, //放数据的
  getters: {}, //计算属性
  mutations: {
    change(state, { key, value }) {
      state[key] = value;
    },
    // let{token,uid,username,isLogin,userInfo}=this,
    clear(state) {
      (state.token = ""),
        (state.uid = ""),
        (state.username = ""),
        (state.isLogin = false),
        (state.userInfo = {});
    },
  }, //写方法
  actions: {
    async getuser({ commit }, token) {
      return getuserInfo({ token }).then((res) => {
        if (res.code == 0) {
          commit("change", {
            key: "isLogin",
            value: true,
          });
          commit("change", {
            key: "token",
            value: token,
          });
          commit("change", {
            key: "userInfo",
            value: res.userInfo,
          });
          commit("change", {
            key: "uid",
            value: res.uid,
          });
          commit("change", {
            key: "username",
            value: res.userInfo.username,
          });
        } else {
          console.log(111);
        }
      });
    },

    // 上传图片
    async upload(v, fileList) {
      let imageSrc = [];
      if (!fileList || fileList == []) {
        console.log("图片数组为空");
        return imageSrc;
      }
      let task = await fileList.map((v) => {
        return new Promise(async (resolve, reject) => {
          let { file } = v;
          let { type } = file;
          type = type.split("/")[1];
          // 重新命名
          let file_name = `${new Date().getTime()}_${Math.random()
            .toString(36)
            .slice(2)}.${type}`;
          let { token } = await scqn();
          console.log(token);
          const formdata = new FormData();
          formdata.append("file", file);
          formdata.append("token", token);
          formdata.append("key", file_name);
          await scqny(formdata).then((res) => {
            resolve(`http://toutiao.longxiaokj.com/` + res.key);
          });
        });
      });
      imageSrc = await Promise.all(task);
      return imageSrc;
    }, //上传图片
  },
  modules: {},
});
