import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Axios from "axios";
router.beforeEach(function (to, from, next) {
  if (to.meta.needlogin) {
    //页面是否需要登录
    if (localStorage.getItem(tokenID)) {
      // 本地储存是否有tokenID数据;
      next(); //表示已经登录
    } else {
      next({ name: "login" });
    }
  } else {
    //表示不需要登录
    next(); //继续往后走
  }
});
Vue.config.productionTip = false;
axios.defaults.baseURL =
  "https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http";
import {
  Tabbar,
  TabbarItem,
  Search,
  Tab,
  Tabs,
  NavBar,
  Field,
  Button,
  Form,
  Dialog,
  Toast,
  Icon,
  Cell,
  CellGroup,
  Calendar,
  Uploader,
  Picker,
  DropdownMenu,
  DropdownItem,
  ActionSheet,
  Badge,
  Popup,
} from "vant";

Vue.use(Popup);
Vue.use(Badge);
Vue.use(ActionSheet);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Picker);
Vue.use(Uploader);
Vue.use(Calendar);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Icon);
Vue.use(Toast);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Search);
Vue.use(Tabbar);
Vue.use(NavBar);
Vue.use(TabbarItem);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
