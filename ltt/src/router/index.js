import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/index/home.vue";
import button from "../views/index/buttom.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "button",
    component: button,
    meta: {
      needLogin: true, //需要加校检判断的路由
    },
    children: [
      {
        path: "/",
        name: "home",
        component: home,
        meta: {
          needLogin: true, //需要加校检判断的路由
        },
      },
      {
        path: "/my",
        name: "my",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/index/my.vue"),
        meta: {
          needLogin: true, //需要加校检判断的路由
        },
      },
      {
        path: "/publish",
        name: "publish",

        component: () =>
          import(/* webpackChunkName: "about" */ "../views/index/publish.vue"),
        meta: {
          needLogin: true, //需要加校检判断的路由
        },
      },
    ],
  },
  {
    path: "/reg",
    name: "reg",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/reg/reg.vue"),
  },
  {
    path: "/login",
    name: "login",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login/login.vue"),
  },
  {
    path: "/userEdit",
    name: "userEdit",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/userEdit/userEdit.vue"),
    meta: {
      needLogin: true, //需要加校检判断的路由
    },
  },
  {
    path: "/updatePwd",
    name: "updatePwd",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/updatePwd/updatePwd.vue"
      ),
    meta: {
      needLogin: true, //需要加校检判断的路由
    },
  },
  {
    path: "/search",
    name: "search",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/search/search.vue"),
    meta: {
      needLogin: true, //需要加校检判断的路由
    },
  },

  {
    path: "/forget",
    name: "forget",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/forget/forget.vue"),
    meta: {
      needLogin: true, //需要加校检判断的路由
    },
  },
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
    meta: {
      needLogin: true, //需要加校检判断的路由
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
