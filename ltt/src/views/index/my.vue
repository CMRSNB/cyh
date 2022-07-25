<template>
  <div class="my">
    <div class="my-top">
      <div class="my-top-top">
        <div class="my-top-top-lest">
          <!-- {{ $store.state.isLogin }} -->
          <img :src="getuserInfo.avatar" alt="" />
          <span> {{ getuserInfo.nickname }}</span>
        </div>
        <div class="my-top-top-right" @click="bjzl">
          <van-button type="primary" color="#ffffff" size="mini"
            >编辑资料</van-button
          >
        </div>
      </div>
      <div class="my-top-tow">
        <div class="my-top-tow-list">
          <i>1</i>
          <span>头条</span>
        </div>
        <div class="my-top-tow-right">
          <i>3</i>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <div class="my-tow">
      <div class="my-tow-left">
        <span><van-icon name="star-o" color="#011627" /></span>
        <h4>收藏</h4>
      </div>
      <div class="my-tow-right">
        <span><van-icon name="clock-o" color="#ffb980" /></span>
        <h4>历史</h4>
      </div>
    </div>
    <div class="my-three">
      <van-cell title="修改密码" is-link @click="xhmm" />
      <van-cell title="联系我们" is-link />
      <van-cell title="关于我么" is-link />
    </div>
    <div class="my-for">
      <van-button type="primary" size="large" @click.prevent="tcdl"
        >退出登录</van-button
      >
    </div>
    <buttom></buttom>
  </div>
</template>
<script>
import buttom from "../index/buttom.vue";
export default {
  components: {
    buttom,
  },
  data() {
    return {
      getuserInfo: [], //用户信息
    };
  },
  methods: {
    xhmm() {
      this.$router.push("/updatePwd");
    }, //跳转修改密码
    bjzl() {
      this.$router.push("/userEdit");
    },

    tcdl() {
      localStorage.setItem("username", "");
      localStorage.setItem("tokenID", "");
      localStorage.setItem("uid", "");
      this.$router.push("/login");
    },
  },
  mounted() {
    this.axios
      .post("/user/getuserInfo", {
        token: localStorage.getItem("tokenID"),
      })
      .then((res) => {
        console.log(res.data);
        this.getuserInfo = res.data.userInfo;
        console.log(this.getuserInfo);
      });
  },
};
</script>
<style lang="less">
.van-button__text {
  color: #6b6b6b;
}
.my {
  width: 375px;

  background-color: #f5f7f9;
}
.my-top {
  width: 375px;
  height: 200px;
  background-color: @color;
}
.my-top-top {
  height: 150px;
  width: 375px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.my-top-top-lest {
  width: 280px;
}
.my-top-top-lest img {
  // vertical-align: middle;
  line-height: 170px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  padding: 0 10px;
}
.my-top-top-lest span {
  display: inline-block;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 70px;
  font-size: 18px;
}
.my-top-tow {
  height: 50px;
  width: 375px;
}
.my-top-tow-list {
  float: left;
  width: 187.5px;
  height: 50px;
}
.my-top-tow i {
  text-align: center;
  display: inline-block;
  width: 187.5px;
  font-size: 18px;
}
.my-top-tow span {
  text-align: center;

  display: inline-block;
  width: 187.5px;
  font-size: 18px;
}

.my-top-tow-right {
  display: inline-block;

  width: 187.5px;
  height: 50px;
}

.my-tow {
  width: 375px;
  height: 50px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  padding: 10px 0;
}

.my-tow-left {
  float: left;
  width: 187.5px;
}
.my-tow-right {
  float: right;
  width: 187.5px;
}
.my-tow-left h4 span {
  display: inline-block;
  width: 187.5px;
  font-size: 18px;
}
.my-tow-left h4 {
  font-size: 18px;
  margin: 0;
}
.my-tow-left span i {
  font-size: 18px;
}
.my-tow-right h4 {
  font-size: 18px;
  margin: 0;
}
.my-tow-right span i {
  font-size: 18px;
}
.my-three {
  margin-top: 5px;
}
</style>
