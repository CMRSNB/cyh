<template>
  <div class="publish">
    <div>
      <van-nav-bar title="发布" />
    </div>
    <div class="publish-tow">
      <van-field v-model="title" placeholder="请输入标题" />
    </div>
    <div class="publish-three">
      <van-field
        v-model="content"
        rows="2"
        type="textarea"
        placeholder="请输入内容"
        show-word-limit
      />
    </div>
    <div class="publish-for">
      <van-cell is-link title="选择你要发布的模块" @click="show = true" />
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
    </div>
    <div class="publish-five">
      <van-uploader v-model="fileList" multiple />
    </div>
    <div class="publish-six">
      <van-button type="primary" size="large" @click="fb()">提交</van-button>
    </div>
    <buttom></buttom>
  </div>
</template>

<script>
import { Form, Toast } from "vant";
import buttom from "../index/buttom.vue";

import { mapActions } from "vuex";
export default {
  components: {
    buttom,
  },

  data() {
    return {
      show: false,
      actions: [
        { name: "选项一", id: "" },
        { name: "选项二", id: "" },
        { name: "选项三", id: "" },
        { name: "选项三", id: "" },
        { name: "选项三", id: "" },
        { name: "选项三", id: "" },
        { name: "选项三", id: "" },
      ],
      value1: 0,
      title: "", //标题
      content: "", //发布内容
      fileList: [], //图片数组
      fbmk: [], //模板列表
      username: "", //名字
      tokenID: "",
      tokens: "",
      res: [],
    };
  },
  computed: {
    // ...mapState([]),
  },
  methods: {
    ...mapActions(["upload"]),
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      // console.log(item);
      this.fbmk = item;
      console.log(this.fbmk);
      this.show = false;
      Toast(item.name);
    },
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
    async fb() {
      let { title, content, fileList, upload } = this;
      let res = await upload(fileList);
      console.log(res);
      this.axios
        .post("/api/add_article", {
          title, //标题
          content, //内容
          cate_name: this.fbmk.name, //分类名字
          cate_id: this.fbmk.id, //分类ID
          author: title, //发布者名字
          author_id: localStorage.getItem("uid"),
          imageSrc: res,
        })
        .then((result) => {
          console.log(result);
          this.$toast(result.data.msg);
          if (result.data.code == 0) {
            this.title = "";
           this.content = ""; //发布内容
           this.fileList = []; //图片数组
          }
        });
    }, //点击提交
  },
  beforeCreate() {
    this.axios.post("/api/get_cate_list").then((res) => {
      res.data.data.forEach((v, i) => {
        this.actions[i].name = v.name;
        this.actions[i].id = v._id;
      });
    });
    this.username = localStorage.getItem("username");
    // console.log(this.username);
    this.tokenID = localStorage.getItem("tokenID");
    // console.log(this.tokenID);
  },
};
</script>
<style lang="less">
.publish {
  width: 375px;
  background-color: #f5f7f9;
}

.publish-three {
  margin-top: 10px;
}
.publish-tow {
  margin-top: 10px;
}

.publish-six {
  width: 300px;
  margin: 0 auto;
}
.publish-for {
  margin: 10px 0;
}
</style>
