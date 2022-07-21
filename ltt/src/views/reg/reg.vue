<template>
  <div class="heder">
    <div class="heder-top">
      <router-link to="/reg">注册/</router-link>
      <router-link to="/login">登录</router-link>
    </div>
    <div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="vercode"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button
              size="small"
              type="primary"
              @click="fsyzm"
              native-type="button"
              :disabled="YZMjy"
              >{{ YZM }}</van-button
            >
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      username: "",
      vercode: "",
      password: "",
      YZM: "发送验证码",
      YZMjy: false,
    };
  },
  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },

    onSubmit(values) {
      console.log("submit", values);
      this.axios
        .post("/user/reg", {
          username: this.username,
          password: this.password,
          vercode: this.vercode,
        })
        .then((result) => {
          Toast(result.data.msg);
          if (result.data.code == 0) {
            this.router.push("/login");
          }
        });
    },
    fsyzm() {
      // console.log(111);
      this.YZMjy = true;

      setInterval(function () {
        if (this.YZM == 0) {
          this.YZM = "再次发送";
          this.YZM = 60;
        }
      }, 1000);
      this.axios
        .post("/user/sendSms", { mobile: this.username, type: "register" })
        .then((res) => {
          console.log(res);
        });
    },
  },
};
</script>
<style lang="less">
.heder-top {
  width: 375px;
  height: 50px;
  background-color: @color;
  text-align: center;
  line-height: 50px;
}
</style>
