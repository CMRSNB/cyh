<template>
  <div class="heder">
    <div class="heder-top">
      <go></go>
      <van-nav-bar title="忘记密码" />
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
          name="新密码"
          label="新密码"
          placeholder="新密码"
          :rules="[{ required: true, message: '请填写新密码' }]"
        />
        <van-field
          v-model="vercode"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <template #button @click.self="fsyzm">
            <van-button size="small" type="primary">发送验证码</van-button>
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import go from "../go/go";

export default {
  components: {
    go,
  },

  data() {
    return {
      username: "",
      vercode: "",
      password: "",
    };
  },
  methods: {
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
          console.log(result.data);
          if (result.data.code == 0) {
            // this.router.push("/login");
            console.log(result.data);
          }
        });
    },
    fsyzm() {
      console.log(111);
      this.axios
        .post("/user/sendSms", { mobile: this.username, type: "login" })
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
