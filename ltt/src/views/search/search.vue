<template>
  <div class="search">
    <div class="search-top">
      <form action="/">
        <van-search
          v-model="value"
          show-action
          :placeholder="this.reci"
          @search="onSearch"
          @cancel="onCancel"
          @input="input"
        />
      </form>
    </div>
    <div class="search-tow">
      <span>近期搜索：</span>
      <div class="search-tow-one" v-for="(value, index) in jqss" :key="index">
        <span>{{ value }}</span
        ><i @click="qcmh(value, index)">x</i>
      </div>
    </div>
    <div class="search-three">
      <div
        class="search-three-one"
        v-for="(value, index) in mhpp"
        :key="index"
        @click="wzxq(value)"
      >
        <span>{{ value.title }}</span>
        <!-- <i>x</i> -->
      </div>
      <!-- 点击上传文章详情 -->
    </div>
  </div>
</template>
<script>
// function bbb(fn, t = 500) {
//   let time = null;
//   return function (...arg) {
//     clearTimeout(time);
//     time = setTimeout((v) => {
//       fn.apply(this, arg);
//       // fn();
//     }, t);
//   };
// }
import { Toast } from "vant";
export default {
  data() {
    return {
      reci: "搜索",
      value: "",
      jqss: [], //近期搜索
      mhpp: [], //模糊匹配
      // time: 0,
    };
  },
  methods: {
    wzxq(value) {
      this.jqss.unshift(value.title);
      localStorage.jqss = JSON.stringify(this.jqss);
      this.$router.push({
        path: "/getArticleDetail",
        query: {
          authorID: value._id,
        },
      });
    }, //点击跳转文章详情
    qcmh(value, index) {
      console.log(index);
      this.jqss.splice(1, index);
      this.jqss.shift(value);
      localStorage.jqss = JSON.stringify(this.jqss);
    },

    input(e) {
      // console.log(e);
      // let timer = null;
      // clearTimeout(timer);
      // timer = setTimeout((v) => {
      //   console.log(111);
      // }, 1000);
      this.axios
        .post("/api/search", {
          key_word: e,
          skip: "0",
          limit: "10",
        })
        .then((res) => {
          console.log(res.data.data);
          this.mhpp = res.data.data;
        });
    }, //搜索关键词
    onSearch(val) {
      this.jqss.unshift(val);
      localStorage.jqss = JSON.stringify(this.jqss);
    }, //点击enter键
    onCancel() {
      this.$router.push("/");
    },
  },
  mounted() {
    console.log(123);

    this.jqss = JSON.parse(localStorage.getItem("jqss"));
  },
};
</script>

<style lang="less" scoped>
.search-tow {
  .search-tow-one {
    height: 50px;
    span {
      display: inline-block;
      width: 200px;
      height: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      float: left;
      margin-left: 30px;
    }
    i {
      display: inline-block;
      width: 50px;
      height: 50px;
      float: right;
      text-align: center;
    }
  }
}
.search-three {
  position: fixed;
  top: 50px;
  left: 0;
  background-color: rgb(154, 165, 162);
  .search-three-one {
    width: 375px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #000;
    span {
      display: inline-block;
      width: 200px;
      height: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      float: left;
      margin-left: 30px;
    }
  }
}
</style>
