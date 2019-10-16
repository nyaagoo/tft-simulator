import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () =>
        import(/* webpackChunkName: "home" */ "@/components/Pages/Champion.vue")
    },
    {
      path: "/item",
      name: "item",
      component: () =>
        import(/* webpackChunkName: "item" */ "@/components/Pages/Item.vue")
    },
    {
      path: "/table",
      name: "table",
      component: () =>
        import(
          /* webpackChunkName: "table" */ "@/components/Pages/ChampionTable.vue"
        )
    }
  ]
});
