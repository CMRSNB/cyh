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
      <div class="search-tow-one" v-for="(neirong, index) in jqss" :key="index">
        <span>{{ neirong }}</span>
        <i @click="qcmh(neirong, index)">x</i>
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
      </div>
      <!-- 点击上传文章详情 -->
    </div>
  </div>
</template>
<script>
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
    wzxq(neirong, index) {
      console.log(neirong);
      console.log(neirong.title);
      // this.jqss.unshift(1);
      localStorage.setItem("jqss", JSON.stringify(neirong.title));
      console.log(this.jqss);
      this.$router.push({
        path: "/getArticleDetail",
        query: {
          authorID: neirong._id,
        },
      });
    }, //点击文字跳转文章详情并记录搜索记录
    qcmh(value, index) {
      // console.log(index);
      this.jqss.splice(1, index);
      this.jqss.shift(value);
      localStorage.jqss = JSON.stringify(this.jqss);
    },
    input(e) {
      let qcdsq = function () {
        for (let i = 1; i < 99; i++) {
          clearInterval(i);
        }
      };
      qcdsq();
      setTimeout(() => {
        // console.log(e);
        this.axios
          .post("/api/search", {
            key_word: e,
            skip: "0",
            limit: "10",
          })
          .then((res) => {
            // console.log(res.data.data);
            this.mhpp = res.data.data;
            // console.log(this.mhpp);
            // this.$forceUpdate(this.mhpp);
          });
      }, 500);
    }, //搜索关键词
    onSearch(val) {
      console.log(val);
      this.jqss.unshift(val);
      localStorage.setItem("jqss", JSON.stringify(this.jqss));
      // localStorage.jqss = JSON.stringify(this.jqss);
    }, //点击enter键
    onCancel() {
      this.$router.push("/");
    },
  },
  mounted() {
    // console.log(123);
    if (!localStorage.getItem("jqss")) {
      return;
    } else {
      this.jqss = JSON.parse(localStorage.getItem("jqss"));
    }
  },
};
</script>

<style lang="less" scoped>
.search-tow > span {
  display: inline-block;
  margin-bottom: 20px;
  margin-left: 20px;
}
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
