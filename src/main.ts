import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import Vuetify from "vuetify/lib";
import "@/style/style.styl";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false;

/*
Vue.use(Vuetify, {
  iconfont: "md"
});
*/
const opts = {
  dark: true,
  iconfont: "md"
};

Vue.use(Vuetify);

new Vue({
  router,
  store,
  vuetify: new Vuetify(opts),
  render: h => h(App)
}).$mount("#app");
