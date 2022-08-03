<template>
  <div class="home">
    <div class="home-one">
      <span @click="search"
        ><em><van-icon name="search" /></em>搜索</span
      >
    </div>
    <!-- 搜索 -->
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
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh()"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="home-three">
          <div
            v-for="(v, i) in wzlb"
            :key="i"
            class="home-three"
            @click="vixq(v)"
          >
<div class="home-three-one">
<h3>{{v.title}}</h3>
</div>
<div class="home-three-tow">
<span>作者：</span><i>{{v.author}}</i>
</div>
<div>


  
</div>
</div>
        </div>
      </van-list>
    </van-pull-refresh>
  <buttom></buttom>
  </div>
</template>
<script>
import buttom from "../index/buttom.vue";
import{getuserInfo} from'@/API/user.js'
export default {
  components: {
    buttom,
  },
  data() {
    return { 
      loading: false,
      finished: false,
      count: 0,
      isLoading: false,
      value: "",
      hqfl: [], //获取分类
      wzlb: [], //第一个文章列表
      hqflID: [], //获取id
      index: 0,
      count: 0,
      counts: 0,
    };
  },
  methods: {
    search() {
      this.$router.push("/search");
    },//搜索
    // 时间戳：1637244864707
    /* 时间戳转换为时间 */
    timestampToTime(timestamp) {
      timestamp = timestamp ? timestamp : null;
      let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      let h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      let m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D;
    },
    onLoad() {
      setTimeout(() => {
        this.count += 10;
        if (this.refreshing) {
          this.wzlb = [];
          this.refreshing = false;
        }
        for (let i = 0; i < 10; i++) {
          this.axios
            .post("/api/get_article_list", {
              cate_id: this.hqflID[this.index]._id,
              skip: this.count,
              limit: 10,
            })
            .then((res) => {
              this.wzlb.push(res.data.data[i]);
            });
          // this.wzlb.push(this.list.length + 1);
        }
        this.loading = false;
        if (this.wzlb.length >= this.counts * 10) {
          this.finished = true;
        }
      }, 1000);
    }, //底部刷新
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        this.count++;
        this.axios
          .post("/api/get_article_list", {
            cate_id: this.hqflID[this.index]._id,
            skip: "0",
            limit: "10",
          })
          .then((res) => {
            // console.log(res.data.data);
            // console.log(res.data.data[index].author_id);
            this.wzlb = res.data.data;
          });
      }, 1000);
    }, //上拉刷新
    vixq(v) {
      // console.log(v);
      this.$router.push({
        path: "/getArticleDetail",
        query: {
          authorID: v._id,
        },
      });
    }, //点击跳转详情页
    home(index) {
      this.index = index;

      this.axios
        .post("/api/get_article_list", {
          cate_id: this.hqflID[index]._id,
          skip: "0",
          limit: "10",
        })
        .then((res) => {
          // console.log(res.data);
          // console.log(res.data.data[index].author_id);
          this.wzlb = res.data.data;
          this.count = 0;
          this.counts = res.data.count - 0;
          Math.floor(this.counts);
          // console.log(Math.ceil(this.counts));
          // console.log(this.wzlb);
        });
    },
  }, //接受索引点击哪一个得到哪一个的文章列表
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
          console.log(res.data);
          // console.log(res.data.count);
          this.counts = parseInt(res.data.count / 10);
          // console.log(this.wzlb);
          // console.log(res.data.count / 10);
          // console.log(parseInt(res.data.count / 10));
          // console.log(this.counts);
        });
    });

  },

};
</script>
<style lang="less" scoped>
// 文章详情样式
.home-three{

width: 360px;
margin:  0 auto;
// background-color: aqua;
.home-three-one{
width: 360px;
h3{
  width: 360px;
  margin: 0;
  color: #131313;
  // height: 50px;
 overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
}
.home-three-tow{
  span{
    font-size: 12px;
  color: #6a6a6a;
  }
  i{
      font-size: 12px;
  color: #6a6a6a;
  }
}

}



// 文章详情样式结束








.home-tow .van-tabs__nav .van-tabs__line{
background-color: #ccc;
}
::v-deep .van-tab{
  border-bottom: 2px solid #ccc;
border-right: 2px solid #ccc;
}

::v-deep .van-tab:nth-child(7){
border-right: none
}
.home-one {
  background-color: @color;
  height: 47.89px;
  text-align: center;
  line-height: 47.89px;
  span {
    line-height: 35px;
    text-align: center;
    display: inline-block;
    width: 300px;
    height: 35px;
    background-color: rgb(6, 220, 102);
    border-radius: 20px;
    font-size: 18px;
    color: rgb(255, 255, 255);
    i {
      font-size: 20px;
    }
  }
}



</style>
