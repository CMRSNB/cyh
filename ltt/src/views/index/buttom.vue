<template>
  <div class="buttom">
    <van-tabbar route  active-color='#07c160'>
      <van-tabbar-item to="/" icon="home-o" >首页</van-tabbar-item>
      <van-tabbar-item to="/publish" icon="search">发布</van-tabbar-item>
      <van-tabbar-item to="/my" icon="friends-o">我的</van-tabbar-item>
</van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
