<template>
  <div class="home">
    <div>
      <van-search
        v-model="value"
        shape="round"
        background="#4fc08d"
        placeholder="请输入搜索关键词"
      />
    </div>
    <div class="home-tow">
      <van-tabs @click="home">
        <van-tab
          v-for="(value, index) in hqfl"
          :title="value.name"
          :key="index"
        >
        </van-tab>
      </van-tabs>
    </div>
    <div class="home-three">
      <div
        v-for="(v, i) in wzlb"
        :key="i"
        class="home-three-min"
        @click="vixq(v)"
      >
        <p>{{ v.author }}:</p>
        <h3>{{ v.title }}</h3>
        <img :src="v.imageSrc[0]" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      hqfl: [], //获取分类
      wzlb: [], //第一个文章列表
      hqflID: [], //获取id
    };
  },
  methods: {
    vixq(v) {
      // console.log(v);
      this.$router.push({
        name: "getArticleDetail",
        params: {
          authorID: v._id,
        },
      });
    },
    home(index) {
      // console.log(index);
      this.axios
        .post("/api/get_article_list", {
          cate_id: this.hqflID[index]._id,
          skip: "0",
          limit: "10",
        })
        .then((res) => {
          // console.log(res.data.data);
          // console.log(res.data.data[index].author_id);
          this.wzlb = res.data.data;
          // console.log(this.wzlb);
        });
    },
  },
  mounted() {
    this.axios.post("/api/get_cate_list").then((res) => {
      // console.log(res.data.data);
      this.hqfl = res.data.data;
      // console.log(this.hqfl[3]._id);
      this.hqflID = res.data.data;
      // console.log(this.hqflID);
      this.axios
        .post("/api/get_article_list", {
          cate_id: this.hqfl[0]._id,
          skip: "0",
          limit: "10",
        })
        .then((res) => {
          this.wzlb = res.data.data;
        });
    });
  },
  destroyed() {
    console.log(111);
  },
};
</script>
<style lang="less" scoped>
.home-three {
  width: 375px;
  display: flex;
  justify-content: space-around;
  flex-flow: wrap;
}

.home-three-min {
  width: 170px;
  height: 100px;
  margin-bottom: 30px;
}
.home-three-min img {
  width: 165px;
  height: 80px;
}
.home-three-min p {
  display: inline-block;
  font-size: 12px;
  color: black;
  font-weight: bold;
  width: 170px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.home-three-min h3 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 170px;
  height: 20px;
  font-size: 12px;
  color: black;
  margin: 0;
  // display: block;
  overflow: hidden;
}
</style>
