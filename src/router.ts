import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Pages/Champion.vue";
import Item from "@/components/Pages/Item.vue";
import Table from "@/components/Pages/ChampionTable.vue";

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
      component: Item
    },
    {
      path: "/table",
      name: "table",
      component: Table
    }
  ]
});
