import Vue from "vue";
import "@/plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import Vuetify from "vuetify";
import "@/style/style.styl";

Vue.use(Vuetify, {});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
