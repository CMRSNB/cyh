<template>
  <div class="buttom">
    <van-tabbar v-model="active">
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/publish" icon="search">发布</van-tabbar-item>
      <van-tabbar-item to="my" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: "home",
    };
  },
};
</script>
<style lang="less" scoped>
.buttom {
  height: 50px;
  display: flex;
  bottom: 0;
  left: 0;
}
</style>
