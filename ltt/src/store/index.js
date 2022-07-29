import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
     tokenID: "",
    uid: "",
    username: "",
    isLogin: false,
    tokens: "",
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
  actions: {
    // 上传图片
    async upload(fileList) {
      let imageSrc = [];
      if (!this.fileList || this.fileList == []) {
        return imageSrc;
      }
      // console.log(fileList);
      let task = await fileList.map((v) => {
        return new Promise(async (resolve, reject) => {
          let { file } = v;
          let { type } = file;
          type = type.split("/")[1];
          // 重新命名
          let file_name = `${new Date().getTime()}_${Math.random()
            .toString(36)
            .slice(2)}.${type}`;
          await this.axios.post("/upload/token").then((res) => {
            console.log(res.data.token);
            this.$store.state.tokens = res.data.token;
            console.log(this.$store.state.tokens);
          });

          const formdata = new FormData();
          formdata.append("file", file);
          formdata.append("token", this.$store.state.tokens);
          formdata.append("key", file_name);
          await this.axios
            .post("https://upload-z1.qiniup.com", formdata)
            .then((res) => {
              // console.log(res);
              // console.log(`http://toutiao.longxiaokj.com/` + res.data.key);
              resolve(`http://toutiao.longxiaokj.com/` + res.data.key);
            });
          // console.log(result);
        });
      });
      imageSrc = await Promise.all(task);
      // console.log(imageSrc);
      return imageSrc;
    }, //上传图片
  },
  modules: {},
});
