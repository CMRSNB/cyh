<template>
  <div class="go" @click="GO">
    <van-icon name="arrow-left" />
  </div>
</template>
<script>
export default {
  methods: {
    GO() {
      this.$router.go(-1);
      // history.go(-1);
    },
  },
};
</script>

<style lang="less">
.go {
  float: left;
}
.go i {
  font-size: 30px;
  color: #96e5bb;
  margin: 10px 0px 0px 10px;
  z-index: 100;
}
</style>
