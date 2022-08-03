<template>
  <div class="my">
    <div class="my-top" v-if="isLogin">
      <div class="my-top-top">
        <div class="my-top-top-lest">
          <!-- {{ $store.state.isLogin }} -->
          <!-- {{userInfo}} -->
          <img :src="userInfo.avatar" alt="" />
          <span> {{ userInfo.nickname }}</span>
        </div>
        <div class="my-top-top-right" @click="bjzl">
          <van-button type="default" size="mini"
            >编辑资料</van-button
          >
      
        </div>
      </div>
      <div class="my-top-tow">
        <div class="my-top-tow-list">
          <i>{{ fbhz.liked_num }}</i>
          <span>头条</span>
        </div>
        <div class="my-top-tow-right">
          <i>{{ fbhz.publish_num }}</i>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <div class="my-wdl" v-else>
      <div class="my-wdl-max">
        <div class="my-wdl-one">
          <img src="../../assets/效果图/article.png" alt="" />
        </div>
        <div class="my-wdl-tow">
          <router-link to="/reg" active-class="dlzctb">注册/</router-link>
          <router-link to="/login" active-class="dlzctb">登录</router-link>
        </div>
      </div>
    </div>

    <div class="my-tow">
      <div class="my-tow-left" @click="sc">
        <span><van-icon name="star-o" color="#011627" /></span>
        <h4>收藏</h4>
      </div>
      <div class="my-tow-right" @click="ls">
        <span><van-icon name="clock-o" color="#ffb980" /></span>
        <h4>历史</h4>
      </div>
    </div>
    <div class="my-three">
      <van-cell title="我的发布" is-link @click="wdfb" />

      <van-cell title="修改密码" is-link @click="xhmm" />
      <van-cell title="联系我们" is-link @click="lxwm" />
      <van-cell title="关于我么" is-link @click="gywm"/>
    </div>
    <div class="my-for">
      <van-button type="default" size="large" @click.prevent="tcdl"
   
        >退出登录</van-button
      >
    </div>
    <!-- 退出登录 -->
    <buttom></buttom>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {mapMutations} from 'vuex'
import {getuserInfo}from'../../API/user'
import buttom from "../index/buttom.vue";
export default {
  components: {
    buttom,

  },
  data() {
    return { 
      sfdl: "false",
      fbhz: [],
      uid: "",
    };username
  },
computed:{
...mapState(['userInfo','username','isLogin']),

 ...mapState(['token'])

},
  methods: {
    wdfb(){

      this.$router.push("/wdfb");

    },//我的发布
    lxwm(){
      this.$router.push("/lxwm");
    },//联系我们
    gywm(){
      this.$router.push("/gywm");
    },//关于我们
    sc(){
      this.$router.push("/sc");
    },//文章收藏
    ls(){
      this.$router.push("/ls");

    },//文章历史
    ...mapMutations(['clear']), 
    xhmm() {
      this.$router.push("/updatePwd");

    }, //跳转修改密码
    bjzl() {
      this.$router.push("/userEdit");
    },

    tcdl() {
 
      localStorage.clear();

      this.$router.go(0);
    },
  },
  mounted() {
    console.log(this.userInfo.nickname);
    let token=this.token
getuserInfo({token}).then((res)=>{
console.log(res);
this.fbhz=res
// console.log(this.fbhz);
})


    if (localStorage.getItem("uid")) {
      this.sfdl = true;
    } else {
      this.sfdl = false;
    }
  },
};
</script> 
<style lang="less">
.van-button__content{
  span{
    color: @gread;
  }
}
.van-button__text {
  color: #6b6b6b;
}
.my {
  width: 375px;

  background-color: #f5f7f9;
}
.my-wdl-max {
  width: 80px;
  height: 100px;
  margin: 0 auto;
  padding-top: 50px;
  .my-wdl-tow {
    text-align: center;
  }
}
.my-wdl {
  height: 200px;
  background: url('../../components/banner.jpg');
background-size:cover;
  .my-wdl-one {
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
  .my-wdl-tow {
    a {
      font-size: 14px;
      color: rgb(255, 255, 255);
    }
  }
}
.my-top {
  height: 200px;
  // background-color: @color;
  background: url('../../components/banner.jpg');
background-size:cover;
  // display: none;
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
  span {
    display: inline-block;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 70px;
    font-size: 18px;
  }
}
.my-top-top-lest img {
  // vertical-align: middle;
  line-height: 170px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  padding: 0 10px;
  
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
