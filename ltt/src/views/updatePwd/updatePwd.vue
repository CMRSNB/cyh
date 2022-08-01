<template>
  <div class="forget">
    <div class="forget-top">
      <go></go>
      <van-nav-bar title="修改密码" />
    </div>
    <div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="oldPassword"
          type="password"
          name="原密码"
          label="原密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="newPassword"
          type="newPassword"        name="新密码"
          label="新密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >确认修改</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import go from "../go/go";

export default {
    components: {
    go: go,
  },
  data() {
    return {
      //   username: "",
      newPassword: "",
      oldPassword: "",
    };
  },
  methods: {
    onSubmit(values) {
      // console.log(values);
      this.axios
        .post("/user/updatePwd", {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          uid: localStorage.uid,
        })
        .then((result) => {
          // Toast("result.data.msg");
          console.log(result);
          this.$router.push("/login");
        });
    },
  },
  // mounted() {
  //   this.axios
  //     .post("/user/getuserInfo", {
  //       token: "localStorage.tokenID",
  //     })
  //     .then((res) => {
  //       Toast(result.data.msg);
  //     });
  // },
};
</script>
<style lang="less">
.forget-top {
  width: 375px;
  height: 50px;
  background-color: @color;
  text-align: center;
  line-height: 50px;
}
.forget-top a {
  color: rgb(255, 255, 255);
}
.forget-top a .logins {
  color: @color;
}
</style>
