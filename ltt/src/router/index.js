import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/index/home.vue";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "home",
    component: home,
    meta: {
      needLogin: true, //需要加校检判断的路由
    },
  }, //主页面
  {
    path: "/my",
    name: "my",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/index/my.vue"),
    meta: {
      needLogin: true, //需要加校检判断的路由
    },
  }, //我的页面
  {
    path: "/publish",
    name: "publish",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/index/publish.vue"),
    meta: {
      needLogin: true, //需要加校检判断的路由
    },
  }, //发布页面

  {
    path: "/reg",
    name: "reg",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/reg/reg.vue"),
  }, //注册页面
  {
    path: "/login",
    name: "login",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login/login.vue"),
  }, //登录页面
  {
    path: "/userEdit",
    name: "userEdit",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/userEdit/userEdit.vue"),
    meta: {
      needLogin: true, //需要加校检判断的路由
    },
  }, //个人信息界面
  {
    path: "/updatePwd",
    name: "updatePwd",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/updatePwd/updatePwd.vue"
      ),
  }, //修改密码页面
  {
    path: "/search",
    name: "search",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/search/search.vue"),
    meta: {
      needLogin: true, //需要加校检判断的路由
    },
  }, //搜索页面

  {
    path: "/forget",
    name: "forget",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/forget/forget.vue"),
  }, //忘记密码
  {
    path: "/editUserInfo",
    name: "editUserInfo",

    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/editUserInfo/editUserInfo.vue"
      ),
    meta: {
      needLogin: true, //需要加校检判断的路由
    },
  },
  {
    path: "/getArticleDetail",
    name: "getArticleDetail",

    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/get_article_detail/get_article_detail.vue"
      ),
  }, //w文章详情界面
];

const router = new VueRouter({
  routes,
});

export default router;
