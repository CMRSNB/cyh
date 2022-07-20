<template>
  <div class="userEdit">
    <div><go></go> <van-nav-bar title="个人信息" /></div>
    <div class="userEdit-tow">
      <van-cell title="头像" is-link />
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
    };
  },
  components: {
    go: go,
  },
  methods: {
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
      console.log(this.formatDate(date));
      console.log(this.date);
    },
    qd() {
      this.axios
        .post("/user/editUserInfo", {
          avatar: "https://obohe.com/i/2022/07/18/j5ncvq.jpg",
          nickname: this.username,
          sex: this.sex,
          birthday: this.date,
          uid: localStorage.getItem("uid"),
        })
        .then((res) => {
          console.log(res);
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
};
</script>
<style>
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
