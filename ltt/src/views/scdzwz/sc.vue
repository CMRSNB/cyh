<template>
<div class="dz">
    <div><go></go> <van-nav-bar title="文章收藏" /></div>
    <div>
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
            @click="vixq(v,i)"
          >
            <div class="home-three-top">
              <h3>{{ wzlb[i].title }}</h3>
            </div>
            <div class="home-three-tow">
              <span>作者：{{  wzlb[i].author }}</span>
            </div>
            <div
              :class="{
                img2: v.poster_type == 2,
                img3: v.poster_type == 3,
              }"
            >
              <van-image
                v-for="(value, index) in v.imageSrc"
                :src="value"
                :key="index"
              >
                <template v-slot:error>加载失败</template>
              </van-image>
            </div>
            <div class="home-three-for">
              <span> 日期：{{ timestampToTime(v.time) }} </span>
            </div>
          </div>
        </div>
      </van-list>
   
</div>


</div>
   
</template>

<script>
import go from'../go/go.vue'
import {scwz} from '@/API/user'
import { mapState } from 'vuex'

export default {
    data() {
        return {
       loading: false,
      finished: false,
      isLoading: false,
      value: "",
      
      wzlb: [], //第一个文章列表
      hqflID: [], //获取id
      index: 0,
      counts: 0,
      count: 0,

        }
    },
components:{
    go
}
,
computed:{
...mapState(['uid'])
},
methods: {
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
    onLoad(flag) {
      console.log(flag);
      let{uid}=this
          scwz({uid,limit: 10,}).then((res)=>{
    console.log(res.data)

})
      setTimeout(() => {
let {uid}=this
      this.count += 10;
      console.log(this.count);
        if (this.refreshing) {
          this.wzlb = [];
          this.refreshing = false;
        }   
       

          scwz({user_id:uid,limit: 10,skip:this.count}).then((res)=>{  
            // console.log( this.count);
            // console.log(res.count);           
                // console.log(res.data);
 this.wzlb.push(...res.data);
}) 
        this.loading = false;
        if (this.wzlb.length >= this.counts) {
          this.finished = true;
        }
      }, 1000);
    }, //底部刷新
         vixq(v) {
      // console.log(v);
      this.$router.push({
        path: "/getArticleDetail",
        query: {
          authorID: v._id,
        },
      });
    }, //点击跳转详情页     
},

mounted() {

let {uid}=this
scwz({user_id:uid}).then((res)=>{
    // console.log(res.data.title)
    console.log(res);
    this.counts=res.count
   this.wzlb= res.data
})
 
},

}
</script>

<style lang="less" scoped>
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
}

.img2 {
  width: 375px;
  height: 250px;
  // text-align: center;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
}
.img2 .van-image {
  width: 350px;
  height: 250px;
}

.home-three {
  width: 375px;
  margin-bottom: 20px;
}
.home-three h3 {
  margin: 0;
  width: 200px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-style: normal;
  padding-left: 10px;
}

.home-three-tow span {
  font-size: 12px;
  padding-left: 10px;
}

.home-three-for span {
  font-size: 12px;
  padding-left: 10px;
}
</style>
