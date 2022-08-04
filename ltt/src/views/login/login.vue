<template>
  <div class="heder">
    <dlzctb></dlzctb>
    <div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="login-three">
          <router-link to="/forget">忘记密码</router-link>
        </div>

        <div style="margin: 16px">
          <van-button round block type="default" native-type="submit"
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
import { login } from "@/API/user";
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
      console.log("submit", values);
      login(values).then((result) => {
        Toast(result.msg);
        console.log(result);
        if (result.code == "0") {
          this.$router.push("/");
          let { username, token, uid, userInfo, tokenExpired } = result;
          localStorage.userInfo = JSON.stringify(userInfo);
          console.log(userInfo);
          localStorage.setItem("tokenExpired", tokenExpired);
          localStorage.username = username;
          localStorage.token = token;
          localStorage.uid = uid;
          this.$store.commit("change", {
            key: "userInfo",
            value: userInfo,
          });
          this.$store.commit("change", {
            key: "token",
            value: token,
          });
          this.$store.commit("change", {
            key: "uid",
            value: uid,
          });
          this.$store.commit("change", {
            key: "username",
            value: username,
          });
          this.$store.commit("change", {
            key: "isLogin",
            value: true,
          });
        }
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
  color: rgb(77, 70, 70);
  font-size: 14px;
}
</style>
