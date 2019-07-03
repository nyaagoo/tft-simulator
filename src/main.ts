import Vue from "vue";
import "@/plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "vuetify/dist/vuetify.min.css";
import "./stylus/style.styl";
import "material-design-icons-iconfont/dist/material-design-icons.css";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
