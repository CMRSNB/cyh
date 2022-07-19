<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    if (localStorage.username == "" || localStorage.tokenID == "") {
      // this.$route.push("/login");
    }
  },
};
</script>
<style lang="less">
left {
  float: left;
}
right {
  float: right;
}
</style>
