<template>
  <div class="detail">
    <div class="detail-top"><go></go><van-nav-bar title="文章详情" /></div>
    <!-- 文章详情 -->
    <van-skeleton title avatar :row="3" :loading="loading">
      <div class="detail-tow">
        <h4>{{ wzxq.title }}</h4>
      </div>
      <!-- 文章标题 -->
      <div class="detail-three">
        <div class="detail-three-list">
          <img :src="wzxq.avatar" alt="" />
          <span>{{ wzxq.nickname }}</span>
          <h4>{{ timestampToTime(wzxq.time) }}</h4>
        </div>
        <div class="detail-three-right">
          <van-button type="primary" size="mini"
            ><van-icon name="plus" />关注</van-button
          >
        </div>
      </div>
      <!-- 作者信息 -->
      <div class="detail-for">
        <p>
          {{ wzxq.content }}
        </p>
      </div>
      <!-- 文章信息 -->
      <div class="detail-five" v-for="(v, i) in pllb" :key="i">
        <div class="detail-five-list">
          <div class="detail-five-list-list">
            <img :src="v.info.avatar" alt="" />
          </div>
          <div class="detail-five-list-right">
            <h3>{{ v.info.nickname }}</h3>

            <h4>{{ v.content }}</h4>
            <div class="detail-five-list-right-right">
              <span> {{ timestampToTime(v.create_time) }}</span>
              <em @click="ejpll(v, i)">{{ v.reply_num }}回复</em>
            </div>
            <!-- 点击回复出现二级评论 -->
          </div>
          <!-- 点击回复出现 -->
        </div>
        <div>
          <van-popup
            v-model="EJPL"
            position="bottom"
            closeable
            :style="{ height: '100%' }"
          >
            <div class="ejpl-top"><h3>回复</h3></div>
            <!-- 二级评论上面回复 -->
            <div class="ejpl ejplzz">
              <div class="ejpl-left">
                <div>
                  <img :src="pllb[ejsy].info.avatar" alt="" />
                </div>
                <div class="ejpl-three">
                  <h3>{{ pllb[ejsy].info.nickname }}</h3>

                  <h4>{{ pllb[ejsy].content }}</h4>
                  <span> {{ timestampToTime(pllb[i].create_time) }}</span>
                </div>
              </div>
              <div class="ejpl-right">
                <van-icon
                  name="good-job"
                  :style="{ color: pllb[ejsy].is_like ? 'red' : '#ccc' }"
                  @click="pldz(v, i)"
                />
                <span>{{ pllb[ejsy].like_count }}</span>
              </div>
            </div>
            <!-- 二级评论评论人详情 -->
            <div class="ejplpllb" v-if="EJPL">
              <div
                class="ejpl"
                v-for="(value, index) in ejplllb"
                @click="sanjiplun(value, index)"
                :key="index"
              >
                <div class="ejpl-left">
                  <div>
                    <img :src="value.info.avatar" alt="" />
                  </div>
                  <div class="ejpl-three">
                    <h3>{{ value.info.nickname }} <span>回复=>123</span></h3>
                    <h4>{{ value.content }}</h4>
                    <span>{{ timestampToTime(value.create_time) }}</span>
                  </div>
                </div>
                <div class="ejpl-right">
                  <van-icon
                    name="good-job"
                    @click="ejpldz(value, index)"
                    :style="{ color: value.is_like ? 'red' : '#ccc' }"
                  />
                  <span>{{ value.like_count }}</span>
                </div>
              </div>
            </div>
            <!-- 二级评论评论列表 -->
            <div class="ejpl-buttom">
              <van-field
                v-model="sms"
                center
                clearable
                :placeholder="'回复:' + sanjipinlu"
              >
                <template #button>
                  <van-button size="small" type="primary" @click="ejplplnr"
                    >评论</van-button
                  >
                </template>
              </van-field>
            </div>
            <!-- 二级评论评论内容 -->
          </van-popup>
        </div>
        <!-- 二级评论 -->
        <div class="detail-five-right">
          <div class="detail-five-right-left"></div>
          <div class="detail-five-right-right">
            <van-icon
              name="good-job"
              :style="{ color: v.is_like ? 'red' : '#ccc' }"
              @click="pldz(v, i)"
            />
            <span>{{ v.like_count }}</span>
          </div>
        </div>
      </div>
    </van-skeleton>
    <!-- 评论详情 -->
    <div class="detail-six">
      <div class="detail-six-list">
        <van-cell-group>
          <van-field v-model="value" placeholder="网络不是法外之地" autosize />
        </van-cell-group>
      </div>
      <div class="detail-six-right">
        <van-icon name="comment" @click="fbpl" />
        <van-icon
          name="star"
          @click="wzsc"
          :style="{ color: is_fav ? 'red' : '#ccc' }"
        />
        <van-icon
          name="good-job"
          @click="wzdz"
          :style="{ color: is_like ? 'red' : '#ccc' }"
        />
        <van-icon name="share" @click="showShare = true" />
      </div>
    </div>
    <!-- 最下满的内容 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
    <!-- 分享面板内容 -->
    <!-- 最下面 -->

    <div>
      <!-- <van-cell is-link @click="showPopup">展示弹出层</van-cell> -->
      <van-popup v-model="showshow">
        <div class="ewm">
          <span>扫一扫</span>
          <img :src="ewm" alt="" />
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Popup } from "vant";
Vue.use(Popup);
import { Skeleton, Lazyload, ShareSheet } from "vant";
import QRCode from "qrcode"; //生成2微码
Vue.use(ShareSheet);
Vue.use(Skeleton);
Vue.use(Lazyload);
import go from "../go/go";
export default {
  components: {
    go: go,
  },
  data() {
    return {
      showshow: false, //二维码展示
      key: 1, //key值可以监听二级评论的刷新
      loading: true,
      sms: "", //二级评论内容
      ejplhf: "",
      EJPL: false, //控制二级评论的显示与隐藏
      show: false,
      HF: "",
      message: "",
      SHOW: false,
      value: "",
      authorID: "", //文章id
      wzxq: [],
      pllb: [], //评论列表
      sttus: 1,
      reply_comment_id: "",
      erjipinglun: "",
      is_fav: false,
      is_like: false,
      ejsy: 0, //点击回复出现传出的二级评论索引
      ejplllb: [], //二级评论列表
      ejisLINK: false, //二级评论点赞
      sanjipinlu: "作者",
      showShare: false, //分享面板内容
      ewm: "", //二维码
      options: [
        { name: "qq", icon: "qq" },

        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
    };
  },

  methods: {
    onSelect({ name }) {
      console.log(name);
      let { title, imageSrc } = this.wzxq;
      let href = window.location.href;

      switch (name) {
        case "qq":
          window.location.href = `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${window.location.href}&sharesource=weibo&title=${title}&pic=${imageSrc[0]}`;
          break;
        case "微博":
          window.location.href = `
          http://service.weibo.com/share/share.php?url=${window.location.href}&sharesource=weibo&title=${title}&pic=${imageSrc[0]}`;
          break;
        case "复制链接":
          let input = document.createElement("input");
          input.value = href;
          document.body.appendChild(input);
          input.select();
          document.execCommand("Copy");
          document.body.removeChild(input);
          break;
        case "微信":
        case "二维码":
          QRCode.toDataURL(href)
            .then((url) => {
              console.log(url);
              this.ewm = url;
              this.showShare = false;
              this.showshow = true;
            })
            .catch((err) => {
              console.error(err);
            });

          break;

        case "分享海报":
          break;
      }
    },
    sanjiplun(value, index) {
      console.log(index);
      console.log(value);
      this.sanjipinlu = value.info.nickname;
    }, //三级评论
    ejpldz(value, index) {
      // value.ejisLINK = !value.ejisLINK;
      value.is_like = !value.is_like;
      if (value.is_like) {
        value.like_count++;
        this.axios
          .post("/api/comment_like", {
            user_id: localStorage.getItem("uid"),
            comment_id: value._id,
          })
          .then((res) => {
            console.log(res);
            this.$toast(res.data.msg);
          });
      } else {
        value.like_count--;
        this.axios
          .post("/api/comment_unlike", {
            user_id: localStorage.getItem("uid"),
            comment_id: value._id,
          })
          .then((res) => {
            console.log(res);
            this.$toast(res.data.msg);
          });
      }

      console.log(11);
    }, //二级评论点赞
    ejplplnr() {
      // console.log(111);
      if (localStorage.getItem("uid")) {
        this.axios
          .post("/api/add_comment", {
            user_id: localStorage.getItem("uid"),
            article_id: this.authorID,
            comment_type: 1,
            reply_comment_id: this.pllb[this.ejsy]._id, //评论的人的ID
            content: this.sms, //二级评论内容
          })
          .then((res) => {
            if (res.data.code == 0) {
              this.pllb[this.ejsy].reply_num++;
              this.sms = "";
              console.log(res.data);
              this.axios
                .post("/api/get_reply_list", {
                  article_id: this.authorID,
                  skip: 0,
                  limit: 5,
                  reply_comment_id: this.pllb[this.ejsy]._id,
                  user_id: localStorage.getItem("uid"),
                })
                .then((res) => {
                  console.log(res.data.data);
                  this.ejplllb = res.data.data;
                });
            } else {
            }
          });
      } else {
        this.$toast("请先登录");
        setTimeout(() => {
          this.$router.push("/my");
        }, 1000);
      }
    }, //二级评论评论=>评论
    ejpll(v, i) {
      this.EJPL = !this.EJPL;
      console.log(i);
      this.ejsy = i;
      console.log(this.ejsy);
      console.log(this.pllb[i]._id);
      this.axios
        .post("/api/get_reply_list", {
          skip: 0,
          limit: 5,
          comment_type: 1,
          user_id: localStorage.getItem("uid"),
          reply_comment_id: this.pllb[i]._id,
          article_id: this.authorID,
        })
        .then((res) => {
          console.log(res.data);
          this.ejplllb = res.data.data;
        });
    }, //<!-- 点击回复出现二级评论 -->
    onSubmit(values) {
      this.axios
        .post("/api/add_comment", {
          user_id: localStorage.getItem("uid"),
          article_id: this.authorID,
          comment_type: 1,
          reply_comment_id: this.reply_comment_id,
          content: this.HF,
        })
        .then((res) => {
          // console.log(res);
        });
      // console.log("submit", values);
    },
    wzsc() {
      if (localStorage.getItem("uid")) {
        this.is_fav = !this.is_fav;
        if (this.is_fav == true) {
          this.axios
            .post("/api/add_fav", {
              user_id: localStorage.getItem("uid"),
              article_id: this.authorID,
            })
            .then((res) => {
              console.log(res);
              this.$toast(res.data.msg);
            });
        } else {
          this.axios
            .post("/api/remove_fav", {
              user_id: localStorage.getItem("uid"),
              article_id: this.authorID,
            })
            .then((res) => {
              this.$toast(res.data.msg);

              // console.log(res);
            });
        }
      } else {
        this.$toast("请先登录");
        setTimeout(() => {
          this.$router.push("/my");
        }, 1000);
      }
    }, //文章收藏
    pldz(v, i) {
      if (localStorage.getItem("uid")) {
        // console.log(i);
        v.is_like = !v.is_like;
        // console.log(v.is_like);
        // console.log(v);
        if (v.is_like == true) {
          v.like_count++;
          this.axios
            .post("/api/comment_like", {
              user_id: localStorage.getItem("uid"),
              comment_id: v._id,
            })
            .then((res) => {
              // console.log(res);
            });
        } else {
          v.like_count--;
          this.axios

            .post("/api/comment_unlike", {
              user_id: localStorage.getItem("uid"),
              comment_id: v._id,
            })
            .then((res) => {
              // console.log(res);
            });
        }
      } else {
        this.$toast("请先登录");
        setTimeout(() => {
          this.$router.push("/my");
        }, 1000);
      }
    }, //评论点赞
    wzdz() {
      if (localStorage.getItem("uid")) {
        this.is_like = !this.is_like;
        if (this.is_like == true) {
          this.axios
            .post("/api/like", {
              user_id: localStorage.getItem("uid"),
              article_id: this.authorID,
            })
            .then((res) => {
              this.$toast(res.data.msg);

              // console.log(res);
            });
        } else {
          this.axios
            .post("/api/unlike", {
              user_id: localStorage.getItem("uid"),
              article_id: this.authorID,
            })
            .then((res) => {
              this.$toast(res.data.msg);

              // console.log(res);
            });
        }
      } else {
        this.$toast("请先登录");
        setTimeout(() => {
          this.$router.push("/my");
        }, 1000);
      }
    }, //文章点赞
    fbpl() {
      if (localStorage.getItem("uid")) {
        this.axios
          .post("/api/add_comment", {
            user_id: localStorage.getItem("uid"),
            article_id: this.authorID,
            comment_type: 0,
            // reply_comment_id: "",
            content: this.value,
          })
          .then((res) => {
            this.$toast(res.data.msg);
            if (res.data.code == 0) {
              this.value = "";
              this.axios
                .post("/api/get_comment_list", {
                  article_id: this.authorID,
                  skip: 0,
                  limit: 10,
                  user_id: localStorage.getItem("uid"),
                })
                .then((res) => {
                  // console.log(res);
                  this.pllb = res.data.data;
                  // console.log(this.pllb);
                  // console.log(this.pllb.info);
                });
            }
            // console.log(res.data.msg);
          });
      } else {
        this.$toast("请先登录");

        setTimeout(() => {
          this.$router.push("/my");
        }, 1000);
      }
    }, //发布评论

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
    }, // 时间戳：1637244864707
    /* 时间戳转换为时间 */
  },
  mounted() {
    this.authorID = this.$route.query.authorID;
    // console.log(this.authorID);
    this.axios
      .post("/api/get_article_detail", {
        article_id: this.authorID,
        user_id: localStorage.getItem("uid"),
      })
      .then((res) => {
        // console.log(res.data.data);
        this.is_fav = res.data.data.is_fav;
        this.is_like = res.data.data.is_like;
        this.wzxq = res.data.data;
        console.log(this.wzxq);
        this.articleID = res.data.data.article_id;
        this.loading = false;
        // console.log(res.data);
        // console.log(this.wzxq);
      });

    this.axios
      .post("/api/get_comment_list", {
        article_id: this.authorID,
        skip: 0,
        limit: 10,
        user_id: localStorage.getItem("uid"),
      })
      .then((res) => {
        this.pllb = res.data.data;
        console.log(res.data.data);
        // console.log(this.pllb);
        // console.log(this.pllb[0].info);
      }); //评论列表
  },
};
</script>
<style lang="less" scoped>
.ewm {
  text-align: center;

  span {
    font-size: 18px;
    color: #1c1c1c;
  }
} //二维码

.ejplzz {
  // height: 70px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}
.ejpl {
  display: flex;
  width: 375px;
  justify-content: space-around;
  margin-bottom: 20px;
}
.ejpl-left {
  width: 260px;

  display: flex;
  justify-content: space-between;
}
.ejpl-left img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.ejpl-right i {
  width: 20px;
  height: 20px;
  font-size: 18px;
}
.ejpl-right {
  width: 40px;
  // height: 98px;
}

.ejpl-three {
  width: 200px;
  span {
  }
}
.ejpl-buttom {
  width: 376px;
  position: fixed;
  bottom: 0;
  left: 0;
}

.ejpl-three h3 {
  font-size: 18px;
  font-style: normal;
  margin: 0;
  span {
    font-size: 12px;
  }
}
.ejpl-three h4 {
  font-size: 18px;
  margin: 0;
}
.detail-five-list-right .ejpl-right .ejpl-right span {
  font-size: 18px;
}

.ejpl-top {
  width: 375px;
  height: 50px;
}
.ejpl-top h3 {
  text-align: center;
  line-height: 50px;
}

.detail-ait-top span {
  // display: inline-block;
  float: left;
}
.detail-ait-top h3 {
  font-size: 18px;
  font-weight: bolder;
  margin: 0;
  text-align: center;
}
.detail-ait-tow h5 {
  font-size: 12px;
  margin: 0;
}
.detail-ait-tow p {
  font-size: 16px;
  margin: 0;
  padding: 10px 0;
}
.detail-ait-tow span {
  font-size: 14px;
}
.content {
  padding: 16px 16px 100px;
}

.detail {
  // width: 375px;
  border-color: #adadac;
  box-sizing: border-box;
}
.child {
  width: 40px;
  height: 40px;
  background: #f2f3f5;
  border-radius: 4px;
}
.detail-tow {
  width: 370px;
  height: 30px;
  // padding-left: 10px;
  margin: 10px 0;
}
.detail-tow h4 {
  // text-align: center;
  padding-left: 10px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 300px;
  font-size: 18px;
}
.detail-three {
  height: 40px;
  border-bottom: 1px solid #000;

  padding-bottom: 20px;
}
.detail-three-list img {
  float: left;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.detail-three-list {
  width: 150px;
  height: 30px;
  margin-left: 10px;
  float: left;
}
.detail-three-list h4 {
  width: 100px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.detail-three-list span {
  display: inline-block;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
}
.detail-three-right {
  width: 50px;
  height: 30px;
  float: right;
}

.detail-for {
  margin-top: 10px;
  width: 375px;
  word-wrap: break-word;
  word-break: break-all;
  min-height: 100px;
  overflow-y: auto;
  max-height: 370px;
  line-height: 30px;
}
.detail-for p {
  text-indent: 2em;
  margin: 0px 0px;
  width: 375px;
  font-size: 18px;
}
.detail-five {
  margin-top: 20px;
  width: 375px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 50px;
}
.detail-five-list {
  display: flex;
  justify-content: space-between;
  width: 270px;
}
.detail-five-right i {
  float: right;
  width: 80px;
}
.detail-five-list-list img {
  width: 50px;
  height: 50px;
  border-radius: 50px;
}
.detail-five-list-right h3,
h4 {
  word-break: break-all;
  font-size: 18px;
}
.detail-five-list-right h3 {
  color: #e8bcaf;
}
.detail-five-right-right {
  float: right;
}
.detail-five-list-right span {
  float: left;
}
.detail-five-list-right em {
  font-style: normal;
  height: 20px;
  display: inline-block;
  width: 50px;
  border: 1px solid #eceef1;
  border-radius: 10px;
}
.detail-five-list-right span,
em {
  font-size: 12px;
}
.detail-five-right-right i {
  width: 20px;
  height: 20px;
  font-size: 18px;
}
.detail-five-right-right span {
  font-size: 18px;
}
.detail-five-list-right h3 {
  margin: 0;
}
.detail-five-list-right h4 {
  margin: 0;
}
.detail-five-list-right {
  width: 200px;
}
.detail-five-list-list {
  width: 50px;
}
.detail-six {
  position: fixed;
  width: 375px;
  height: 40px;
  bottom: 0;
  left: 0;
  float: left;
  background-color: #ffffff;
  border-top: 1px solid #adadac;
}

.detail-six-list {
  float: left;
  width: 180px;
  height: 40px;
}
.detail-five-list-right-right {
  text-align: center;
}
.detail-six-right {
  display: flex;
  justify-content: space-around;
  width: 180px;
  height: 40px;
  float: left;
  // line-height: 40px;
  align-items: center;
  // align-content: center;
}
.detail-six-right i {
  display: inline-block;

  font-size: 25px;
  list-style: 40px;
}
</style>
