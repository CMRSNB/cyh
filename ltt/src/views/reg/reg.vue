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
          <van-button round block type="info" native-type="submit">
            {{ this.ZC }}
            <!-- <van-loading type="spinner"  /> -->
          </van-button>
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
      vercode: "",
      password: "",
      YZM: "发送验证码",
      YZMjy: false,
      ZC: "注册",
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
      // this.ZC = <van-loading type="spinner" />;
      this.axios
        .post("/user/sendSms", { mobile: this.username, type: "register" })
        .then((res) => {
          Toast(res.data.msg);
          // this.$toast(res.data.msg);
          console.log(res.data.msg);
          this.YZMjy = true;
          this.YZM = 60;
          let dsq = setInterval(() => {
            if (this.YZM == 0) {
              this.YZM = "再次发送";
              clearInterval(dsq);
              this.YZMjy = false;
            } else {
              this.YZM--;
            }
          }, 1000);
          console.log(res);
        })
        .catch((err) => {
          // console.log(err);
          this.$toast(err.msg);
        });
    }, //注册
  },
};
</script>
<style lang="less">
.heder-top .logins {
  color: @color;
}
.heder-top {
  width: 375px;
  height: 50px;
  background-color: @color;
  text-align: center;
  line-height: 50px;
}
</style>
