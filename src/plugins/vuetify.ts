import Vue from "vue";
import Vuetify from "vuetify/lib";
Vue.use(Vuetify);

export default new Vue({
  el: "#app",
  vuetify: new Vuetify({
    dark: true,
    iconfont: "md"
  })
}).$mount("#app");
