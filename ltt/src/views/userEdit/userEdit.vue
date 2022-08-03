<template>
  <div class="userEdit">
    <div><go></go> <van-nav-bar title="个人信息" /></div>
    <div class="userEdit-tow">
      <van-cell title="头像" is-link value="内容">
        <label for="tx"
          >
          <img :src="userInfo.avatar" alt="" />
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
        <van-field v-model="username" label="昵称:" placeholder="请输入用户名" />
      </van-cell-group>
      <van-cell title="生日:" :value="date" @click="show = true" is-link />
      <van-calendar
        v-model="show"
        color="#07c160"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
      />
      <van-cell title="性别:" :value="sex" @click="showw = true" is-link />
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
import {mapActions,mapState} from 'vuex'
import {editUserInfo,getuserInfo} from '@/API/user.js'
export default {
  data() {
    return {
      username:'',
      showww: false,
      showw: false,
      actions: [{ name: "男" }, { name: "女" }],
      date: "",
      show: false,
      sex: "男",
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2093, 0, 31),
      userInfo:[]
    };
  },
  components: {
    go: go,
  },
computed:{
...mapState(['uid'])
},
   watch: {
    //  数据无污染  刷新后也能拿到
    "$store.state.userInfo": {
      immediate: true, //  初始化后立刻进行监听
      handler(n, o) {
        this.userInfo = JSON.parse(JSON.stringify(n));
        // console.log(this.userInfo);
      },
    },
  },
  methods: {
...mapActions(['upload']),
   async change(e) {
      let file = e.target.files[0]; //  二进制
let fileReader = new FileReader();
      this.userInfo.file = file;
fileReader.readAsDataURL(file)
    fileReader.onload = (e) => {
      // console.log(e.target.result);
      this.userInfo.avatar= e.target.result;
      // console.log(this.userInfo.avatar);
      };
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
      // console.log(this.date);
    },
   async qd() {
// console.log(this.userInfo.avatar);
// console.log(this.userInfo);
let {file}=this.userInfo
if(file){
  console.log(111);
   let fileList = [
          {
            file,
          },
        ];
          let res = await this.upload(fileList);
       let avatar = res[0];
let {sex,uid}=this
        editUserInfo({
         avatar,
  nickname: this.username,
 sex,
      birthday: this.date,
       uid
        }).then((res)=>{
          console.log(111);
          console.log(res);
          this.$toast(res.msg);
if(res.code==0){
this.userInfo.nickname= this.username
// 本地修改
       this.$store.commit("change", {
              key: "userInfo",
              value: this.userInfo,
            });
console.log(this.userInfo);
this.$router.push('/my')
}
        })
}
    },
    nc() {
      this.showww = true;
    },
    Sex(item) {
      // console.log(item);
      this.sex = item.name;
    },
    onCancel() {
      Toast("取消");
    },
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
