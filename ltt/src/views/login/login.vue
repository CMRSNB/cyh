<template>
  <div class="heder">
    <dlzctb></dlzctb>
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
        <div class="login-three">
          <router-link to="/forget">忘记密码</router-link>
        </div>

        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import dlzctb from "../dlzctb/dlzctb";

export default {
  components: {
    dlzctb,
  },
  data() {
    return {
      username: "",

      password: "",
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
      // console.log(values);
      this.axios
        .post("/user/login", {
          username: this.username,
          password: this.password,
        })
        .then((result) => {
          Toast(result.data.msg);
          console.log(result);
          console.log(result.data);
          if (result.data.code == "0") {
            this.$router.push("/");
            let { username, token, uid } = result.data;
            localStorage.username = username;
            localStorage.tokenID = token;
            localStorage.uid = result.data.uid;
            this.$store.commit("change", { key: "uid", value: uid });
            this.$store.commit("change", {
              key: "username",
              value: username,
            });
            this.$store.commit("change", { key: "token", value: token });
            this.$store.commit("change", {
              key: "isLogin",
              value: true,
            });
          }
        });
    },
  },
  mounted() {},
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
.heder-top a {
  color: rgb(255, 255, 255);
}
.heder-top .logins {
  color: @color;
}
.login-three {
  margin: 10px 10px;
}
.login-three a {
  font-size: 14px;
}
</style>
