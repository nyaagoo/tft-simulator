import Vue from "vue";
import "@/plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import Vuetify from "vuetify";
import "@/style/style.styl";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(Vuetify, {
  iconfont: "md"
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
