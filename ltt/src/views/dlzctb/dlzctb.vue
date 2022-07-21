<template>
  <div class="heder-top">
    <router-link to="/reg" active-class="dlzctb">注册/</router-link>
    <router-link to="/login" active-class="dlzctb">登录</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.heder-top a {
  font-size: 18px;
}
.heder-top .dlzctb {
  color: rgb(255, 0, 0);
}
</style>
