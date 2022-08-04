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
        <div class="home-nr">
          <div
            v-for="(v, i) in wzlb"
            :key="i"
            class="home-three"
            @click="vixq(v)"
          >
            <div class="home-index">
              <div>
                <div class="home-three-top">
                  <h3>{{ v.title }}</h3>
                </div>
              </div>
              <div
                :class="{
                  img2: v.poster_type == 2,
                  img3: v.poster_type == 3,
                }"
              >
                <van-image
                  v-for="(value, index) in v.imageSrc"
                  lazy-load
                  :src="value"
                  :key="index"
                >
                  <template v-slot:error>加载失败</template>
                </van-image>
              </div>
            </div>
            <div class="home-three-for">
              <span> 日期：{{ timestampToTime(v.time) }} </span>

              <em>作者：{{ v.author }}</em>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <buttom></buttom>
  </div>
</template>
<script>
import { wzlb } from "@/API/user.js";
import buttom from "../index/buttom.vue";
import Vue from "vue";
import { Image as VanImage } from "vant";
Vue.use(VanImage);
import { Lazyload } from "vant";
Vue.use(Lazyload);
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
    }, //搜索
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
        this.axios
          .post("/api/get_article_list", {
            cate_id: this.hqflID[this.index]._id,
            skip: this.count,
            limit: 10,
          })
          .then((res) => {
            res.data.data.forEach((v, i) => {
              if (v.poster_type == 1) {
                res.data.data.splice(i, 1);
              } else {
                this.wzlb.push(res.data.data[i]);
              }
            });

            // this.wzlb.push(...res.data.data);
          });
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
            res.data.data.forEach((v, i) => {
              if (v.poster_type == 1) {
                res.data.data.splice(i, 1);
              } else {
                this.wzlb.push(res.data.data[i]);
              }
            });

            // console.log(res.data.data);
            // console.log(res.data.data[index].author_id);
            // this.wzlb = res.data.data;
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
    // function bbb(aaa){
    //           aaa.forEach((v,i) => {

    //       if(v.poster_type==1){
    //       aaa.splice(i,1)
    //       }else{
    //     this.wzlb.push(aaa[i])
    //       }
    //       });
    // }
    wzlb();
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
          res.data.data.forEach((v, i) => {
            if (v.poster_type == 1) {
              res.data.data.splice(i, 1);
            } else {
              this.wzlb.push(res.data.data[i]);
            }
          });

          this.counts = parseInt(res.data.count / 10);
        });
    });
  },
};
</script>
<style lang="less" scoped>
.home-tow .van-tabs__nav .van-tabs__line {
  background-color: #ccc;
}
::v-deep .van-tab {
  border-bottom: 2px solid #ccc;
  border-right: 2px solid #ccc;
}

::v-deep .van-tab:nth-child(7) {
  border-right: none;
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
    background-color: #72e0ac;
    border-radius: 20px;
    font-size: 18px;
    color: rgb(255, 255, 255);
    i {
      font-size: 20px;
    }
  }
}
.home-nr {
  width: 375px;
  margin-bottom: 50px;
  margin-top: 20px;
}
.van-image__img {
  width: none;
  height: none;
}
.img3 {
  display: flex;
  justify-content: space-around;
}
.img3 .van-image {
  width: 30%;
  height: 100px;
  float: right;
}

.img2 {
  width: 375px;
  display: flex;
  justify-content: flex-end;
}
::v-deep .van-image__img {
  border-radius: 10px;
} //图片设值
.img2 .van-image {
  width: 100px;
  height: 100px;
  margin-right: 10px;
}
.home-three {
  width: 375px;
  background-color: #fff;
  // display: flex;
  margin-bottom: 10px;
}
.home-three-top h3 {
  margin: 0;
  font-size: 18px;
  color: #343434;
  font-style: normal;
  padding-left: 10px;
}
.home-three-tow {
  width: 250px;

  margin: 4px 10px;
}
.home-three-tow span {
  display: inline-block;
  font-size: 12px;
}
.home-three-for {
  margin: 4px 0;
  span {
    font-size: 12px;
    padding-left: 10px;
    color: #8c8c8d;
  }
  em {
    padding-left: 10px;

    font-size: 12px;
    color: #ffffff;
    font-style: normal;
  }
}
</style>
