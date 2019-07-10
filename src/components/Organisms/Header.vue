<template lang="pug">
  .tft-header
    v-toolbar(app fixed clipped-left dense)
      v-btn(icon @click.stop="toggleDrawer()")
        icon-base
          icon-menu
      v-toolbar-title.white--text TFT Simulator
      v-spacer
      v-toolbar-items
        v-menu(v-model="menu", :close-on-content-click="false", :nudge-width="200", offset-x)
          template(v-slot:activator="{ on }")
            v-btn(dark, v-on="on")
              icon-base
                icon-setting
          v-card
            v-list
              v-list-tile
                v-subheader 表示
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
              v-list-tile
                v-subheader ソート
              v-btn(color='primary' flat outline @click="sortChampionCost()") Cost
              v-btn(color='primary' flat outline @click="sortChampionName()") Name
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { setting, champion } from "@/store/index";
import IconBase from "@/components/Icon/IconBase.vue";
import IconSetting from "@/components/Icon/IconSetting.vue";
import IconMenu from "@/components/Icon/IconMenu.vue";

@Component({
  name: "tft-header",
  components: {
    "icon-base": IconBase,
    "icon-setting": IconSetting,
    "icon-menu": IconMenu
  }
})
export default class TFTHeader extends Vue {
  menu: boolean = false;
  visibleOriginIcon: boolean = setting.visibleChampionOrigin;
  visibleClassIcon: boolean = setting.visibleChampionClass;
  visibleCostIcon: boolean = setting.visibleChampionCost;

  toggleDrawer() {
    setting.toggleDrawer();
  }
  toggleVisibleOrigin() {
    setting.SET_VISIBLE_CHAMPION_ORIGIN(this.visibleOriginIcon);
  }
  toggleVisibleClass() {
    setting.SET_VISIBLE_CHAMPION_CLASS(this.visibleClassIcon);
  }
  toggleVisibleCost() {
    setting.SET_VISIBLE_CHAMPION_COST(this.visibleCostIcon);
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
