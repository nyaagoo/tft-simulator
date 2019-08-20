import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Pages/Champion.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/item",
      name: "item",
      component: () => import("@/components/Pages/Item.vue")
    },
    {
      path: "/table",
      name: "table",
      component: () => import("@/components/Pages/ChampionTable.vue")
    },
    {
      path: "/composition",
      name: "composition",
      component: () => import("@/components/Pages/Composition.vue")
    }
  ]
});
