<template>
  <div class="buttom">
    <van-tabbar route  active-color="#51bea1">
      <van-tabbar-item to="/" icon="home-o" >首页</van-tabbar-item>
      <van-tabbar-item to="/publish" ><van-icon name="add" color="#51bea1"/></van-tabbar-item>
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
.van-tabbar-item__text{

i{
  font-size: 50px;
}
margin-bottom: 30px;
}

.van-hairline--top-bottom {
  border-top: 1px solid #000;
}
</style>
