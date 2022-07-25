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
        maxlength="500"
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
import ny7 from "../7ny/7ny";
import { Form, Toast } from "vant";
import buttom from "../index/buttom.vue";
export default {
  components: {
    buttom,
    ny7,
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
      fileList: [
        { url: "https://img01.yzcdn.cn/vant/leaf.jpg" },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        { url: "https://cloud-image", isImage: true },
      ],
      fbmk: [], //模板列表
      username: "", //名字
      tokenID: "",
    };
  },
  methods: {
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      // console.log(item);
      this.fbmk = item;
      console.log(this.fbmk);
      this.show = false;
      Toast(item.name);
    },
    fb() {
      this.axios
        .post("/api/add_article", {
          title: this.title, //标题
          content: this.content, //内容
          cate_name: this.fbmk.name, //分类名字
          cate_id: this.fbmk.id, //分类ID
          author: this.title,
          author_id: localStorage.getItem("uid"),
          imageSrc: ["https://i.postimg.cc/zf45MQzQ/20220719115836.jpg"], //图片链接
        })
        .then((result) => {
          console.log(result);
        });
    },
  },
  beforeCreate() {
    this.axios.post("/api/get_cate_list").then((res) => {
      res.data.data.forEach((v, i) => {
        this.actions[i].name = v.name;
        this.actions[i].id = v._id;
      });
    });
    this.username = localStorage.getItem("username");
    console.log(this.username);
    this.tokenID = localStorage.getItem("tokenID");
    console.log(this.tokenID);
  },
  mounted() {},
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
