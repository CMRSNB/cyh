import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import init from"./API/init"
import store from "./store";

Vue.config.productionTip = false;//阻止生产提示
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
  PullRefresh,
  List,
  Overlay,
  Loading,
  Image as VanImage,

} from "vant";

Vue.use(VanImage);
Vue.use(Loading);
Vue.use(Overlay);
Vue.use(List);
Vue.use(PullRefresh);
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
init().then((res=>{
new Vue({
  router,
  store, 
  render: (h) => h(App),
}).$mount("#app");
})).catch(err=>{
  console.log(err);
})