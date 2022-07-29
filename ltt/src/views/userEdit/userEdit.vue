<template>
  <div class="userEdit">
    <div><go></go> <van-nav-bar title="个人信息" /></div>
    <div class="userEdit-tow">
      <van-cell title="头像" is-link value="内容">
        <label for="tx"
          ><img :src="fileList" alt="" />
        </label>
        <!-- 点击lable标签触发input事件 -->
        <input
          type="file"
          hidden
          accept="image/*"
          ref="file"
          id="tx"
          @change="change"
        />
      </van-cell>
      <van-cell-group>
        <van-field v-model="username" label="昵称" placeholder="请输入用户名" />
      </van-cell-group>
      <van-cell title="生日" :value="date" @click="show = true" is-link />
      <van-calendar
        v-model="show"
        color="#07c160"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
      />
      <van-cell title="性别" :value="sex" @click="showw = true" is-link />
      <van-action-sheet
        v-model="showw"
        :actions="actions"
        cancel-text="取消"
        close-on-click-action
        @cancel="onCancel"
        @select="Sex"
      />
    </div>
    <div class="userEdit-three">
      <van-button square type="primary" size="large" @click="qd"
        >确定</van-button
      >
    </div>
  </div>
</template>
<script>
import go from "../go/go.vue";
import { Toast } from "vant";
import { Dialog } from "vant";
export default {
  data() {
    return {
      username: "",
      showww: false,
      showw: false,
      actions: [{ name: "男" }, { name: "女" }],
      date: "",
      show: false,
      sex: "男",
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2093, 0, 31),
      fileList:[]
    };
  },
  components: {
    go: go,
  },
  methods: {
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
   async change(e) {
      // console.log(11);
      console.log(e);
  this.fileList.push(e)
  // let img=  await this.upload(fileList)
  //   console.log(img);
    },

    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
      console.log(this.formatDate(date));
      console.log(this.date);
    },

   async qd() {
   let img=  await  this.upload(fileList)
      this.axios
        .post("/user/editUserInfo", {
          avatar:
            img,
          nickname: this.username,
          sex: this.sex,
          birthday: this.date,
          uid: localStorage.getItem("uid"),
        })
        .then((res) => {
          // console.log(res.data);
          this.$toast(res.data.msg);
        });
    },
    nc() {
      this.showww = true;
    },
    Sex(item) {
      console.log(item);
      this.sex = item.name;
    },
    onCancel() {
      Toast("取消");
    },
  },
mounted() {
    this.axios
      .post("/user/getuserInfo", {
        token: localStorage.getItem("tokenID"),
      })
      .then((res) => {
        // console.log(res.data.userInfo.avatar);
this.fileList=res.data.userInfo.avatar
        // console.log(this.getuserInfo);
      });



},


};
</script>
<style>
.userEdit-tow img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.userEdit-tow {
  margin-bottom: 20px;
}
.userEdit-three {
  /* margin-top: 10px; */
  width: 300px;
  margin: 0 auto;
}
.userEdit {
  width: 375px;

  background-color: #f5f7f9;
}
</style>
