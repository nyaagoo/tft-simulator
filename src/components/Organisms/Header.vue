<template lang="pug">
  .tft-header
    v-toolbar(app)
        v-toolbar-title.white--text TFT Simulator
        v-spacer
        v-toolbar-items
          v-btn(flat @click="transitPageChampion()") Champion
          v-btn(flat @click="transitPageItem()") Item
          v-menu(v-model="menu", :close-on-content-click="false", :nudge-width="200", offset-x)
            template(v-slot:activator="{ on }")
              v-btn(dark, v-on="on")
                v-icon settings
            v-card
              v-list
                v-list-tile
                  v-subheader サムネイル
                v-list-tile
                  v-list-tile-action
                    v-switch(v-model="visibleOriginIcon" @change="toggleVisibleOrigin()")
                  v-list-tile-title Origin
                v-list-tile
                  v-list-tile-action
                    v-switch(v-model="visibleClassIcon" @change="toggleVisibleClass()")
                  v-list-tile-title Class
                v-list-tile
                  v-list-tile-action
                    v-switch(v-model="visibleCostIcon" @change="toggleVisibleCost()")
                  v-list-tile-title Cost
              v-card-actions
                v-spacer
                v-btn(color='primary' flat outline @click="sortChampionCost()") Cost
                v-btn(color='primary' flat outline @click="sortChampionName()") Name
                v-btn(color='primary' flat outline @click="saveSetting()") Save

</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { setting, champion } from "@/store/index";

@Component({
  name: "tft-header",
  components: {}
})
export default class TFTHeader extends Vue {
  menu: boolean = false;
  visibleOriginIcon: boolean = setting.visibleChampionOrigin;
  visibleClassIcon: boolean = setting.visibleChampionClass;
  visibleCostIcon: boolean = setting.visibleChampionCost;

  toggleVisibleOrigin() {
    setting.SET_VISIBLE_CHAMPION_ORIGIN(this.visibleOriginIcon);
  }
  toggleVisibleClass() {
    setting.SET_VISIBLE_CHAMPION_CLASS(this.visibleClassIcon);
  }
  toggleVisibleCost() {
    setting.SET_VISIBLE_CHAMPION_COST(this.visibleCostIcon);
  }
  transitPageChampion() {
    router.push("/");
  }
  transitPageItem() {
    router.push("/item");
  }
  saveSetting() {
    setting.SET_VISIBLE_CHAMPION_COST(true);
  }
  sortChampionCost() {
    champion.sortChampionOriginCost();
    champion.sortChampionClassCost();
  }
  sortChampionName() {
    champion.sortChampionOriginName();
    champion.sortChampionClassName();
  }
}
</script>
<style lang="stylus" scoped>
.router-link
  display block
  text-decoration none
  color white
</style>
