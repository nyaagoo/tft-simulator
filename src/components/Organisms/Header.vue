<template lang="pug">
  .tft-header
    v-app-bar(app dark fixed clipped-left dense)
      v-btn(icon @click.stop="toggleDrawer()")
        v-icon mdi-menu
      v-toolbar-title.white--text TFT Simulator
      v-spacer
      v-toolbar-items
        v-menu(v-model="menu", :close-on-content-click="false", :nudge-width="300", offset-x)
          template(v-slot:activator="{ on }")
            v-btn(v-on="on" outline icon)
              v-icon mdi-settings
          v-card
            v-list
              v-list-tile
                v-subheader 表示
              v-list-tile
                v-switch.pl-30px(v-model="visibleOriginIcon" @change="toggleVisibleOrigin()" inset label="オリジン表示")
              v-list-tile
                v-switch.pl-30px(v-model="visibleClassIcon" @change="toggleVisibleClass()" inset label="クラス表示")
              v-list-tile
                v-switch.pl-30px(v-model="visibleCostIcon" @change="toggleVisibleCost()" inset label="コスト表示")
              v-list-tile
                v-subheader チャンピオンソート
                v-radio-group.pl-30px(v-model="column" column)
                  v-radio(@change="sortChampionCost()" label="コスト順" value="cost")
                  v-radio(@change="sortChampionName()" label="名前順" value="name")
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
  column = "cost";
  menu: boolean = false;
  visibleOriginIcon: boolean = setting.visibleChampionOrigin;
  visibleClassIcon: boolean = setting.visibleChampionClass;
  visibleCostIcon: boolean = setting.visibleChampionCost;

  toggleDrawer() {
    setting.toggleDrawer();
  }
  toggleVisibleOrigin() {
    setting.SET_VISIBLE_CHAMPION_ORIGIN(this.visibleOriginIcon);
    setting.SaveSetting();
  }
  toggleVisibleClass() {
    setting.SET_VISIBLE_CHAMPION_CLASS(this.visibleClassIcon);
    setting.SaveSetting();
  }
  toggleVisibleCost() {
    setting.SET_VISIBLE_CHAMPION_COST(this.visibleCostIcon);
    setting.SaveSetting();
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
.pl-30px
  padding-left 30px
</style>
