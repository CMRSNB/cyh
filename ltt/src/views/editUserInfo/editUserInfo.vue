<template>
  <h2>00188E7F.png</h2>
</template>
<script>
export default {
  mounted() {
    // this.axios
    //   .post("/user/editUserInfo", {
    //     avatar: "https://obohe.com/i/2022/07/14/e5re7m.jpeg",
    //     nickname: "陈某",
    //     sex: "男",
    //     birthday: "0000-00-00",
    //     uid: "62ce24b3d5771c00014ec6c2",
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   });

    this.axios
      .post("/user/getuserInfo", {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MmNlMjRiM2Q1NzcxYzAwMDE0ZWM2YzIiLCJyb2xlIjpbXSwicGVybWlzc2lvbiI6W10sImlhdCI6MTY1Nzc2MDI3MiwiZXhwIjoxNjU4MDE5NDcyfQ.aaD9zHVNv0i2JSDAmLFJuktQOLPJGbeY4uXPUu0m19E",
      })
      .then((res) => {
        console.log(res);
      });
  },
};
</script>

<style></style>
