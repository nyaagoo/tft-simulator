<template lang="pug">
  .tft-header
    v-app-bar(app dark fixed clipped-left dense)
      v-btn(icon @click.stop="toggleDrawer()")
        v-icon {{ icon.mdiMenu }}
      v-toolbar-title.white--text TFT Simulator
      v-spacer
      v-toolbar-items
        v-menu(v-model="menu", :close-on-content-click="false", :nudge-width="300", offset-x)
          template(v-slot:activator="{ on }")
            v-btn(v-on="on" icon)
              v-icon {{ icon.mdiSettings }}
          v-card
            v-list
              v-subheader サイドバー
              v-switch.pl-30px(v-model="visibleSideSynergyViewer" @change="toggleVisibleSynergyViewer()" inset label="サイドシナジービュー")
              v-subheader アイコン表示
              v-switch.pl-30px(v-model="visibleOriginIcon" @change="toggleVisibleOrigin()" inset label="オリジンアイコン")
              v-switch.pl-30px(v-model="visibleClassIcon" @change="toggleVisibleClass()" inset label="クラスアイコン")
              v-switch.pl-30px(v-model="visibleCostIcon" @change="toggleVisibleCost()" inset label="コスト")
              v-divider.mx-5
              v-subheader チャンピオンソート
              v-radio-group.pl-30px(v-model="column" column)
                v-radio(@change="sortChampionCost()" label="コスト順" value="cost")
                v-radio(@change="sortChampionName()" label="名前順" value="name")
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { setting, championDeck } from "@/store/index";
import IconBase from "@/components/Icon/IconBase.vue";
import IconSetting from "@/components/Icon/IconSetting.vue";
import IconMenu from "@/components/Icon/IconMenu.vue";
import { mdiMenu, mdiSettings } from "@mdi/js";

@Component({
  name: "tft-header",
  components: {
    "icon-base": IconBase,
    "icon-setting": IconSetting,
    "icon-menu": IconMenu
  }
})
export default class TFTHeader extends Vue {
  icon = { mdiMenu, mdiSettings };
  column = "cost";
  menu: boolean = false;
  visibleSideSynergyViewer: boolean = setting.visibleSideSynergyViewer;
  visibleOriginIcon: boolean = setting.visibleChampionOrigin;
  visibleClassIcon: boolean = setting.visibleChampionClass;
  visibleCostIcon: boolean = setting.visibleChampionCost;

  toggleDrawer() {
    setting.toggleDrawer();
  }

  toggleVisibleSynergyViewer() {
    setting.SET_VISIBLE_SIDE_SYNERGY_VIEWER(this.visibleSideSynergyViewer);
    setting.saveSetting();
  }
  toggleVisibleOrigin() {
    setting.SET_VISIBLE_CHAMPION_ORIGIN(this.visibleOriginIcon);
    setting.saveSetting();
  }
  toggleVisibleClass() {
    setting.SET_VISIBLE_CHAMPION_CLASS(this.visibleClassIcon);
    setting.saveSetting();
  }
  toggleVisibleCost() {
    setting.SET_VISIBLE_CHAMPION_COST(this.visibleCostIcon);
    setting.saveSetting();
  }
  sortChampionCost() {
    championDeck.sortChampionOriginCost();
    championDeck.sortChampionClassCost();
  }
  sortChampionName() {
    championDeck.sortChampionOriginName();
    championDeck.sortChampionClassName();
  }
}
</script>
<style lang="stylus" scoped>
.router-link
  display block
  text-decoration none
  color white
.pl-30px
  padding-left 30px
</style>
