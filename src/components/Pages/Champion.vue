<template lang="pug">
  .champion-page
    tft-header
    tft-drawer
    .champion-side-pick
      champion-side-pick
    champion-deck-favorite
    champion-deck-origin
    champion-deck-class
    .champion-pick
      champion-footer.pa-2
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { setting } from "@/store/index";
import DeckOrigin from "@/components/Organisms/ChampionDeckOrigin.vue";
import DeckClass from "@/components/Organisms/ChampionDeckClass.vue";
import Header from "@/components/Organisms/Header.vue";
import Drawer from "@/components/Organisms/Drawer.vue";
import ChampionFooter from "@/components/Organisms/ChampionFooter.vue";
import DeckFavorite from "@/components/Organisms/ChampionDeckFavorite.vue";
import ChampionSidePick from "@/components/Organisms/ChampionSidePick.vue";

@Component({
  components: {
    "champion-deck-origin": DeckOrigin,
    "champion-deck-class": DeckClass,
    "champion-deck-favorite": DeckFavorite,
    "tft-header": Header,
    "tft-drawer": Drawer,
    "champion-footer": ChampionFooter,
    "champion-side-pick": ChampionSidePick
  }
})
export default class ChampionPage extends Vue {
  created() {
    setting.LoadSetting();
  }
}
</script>
<style lang="stylus" scoped>
.champion-page
  margin 0 auto
  margin-left 200px
  height calc(100vh - 48px)
  overflow-y auto
  padding-bottom 300px
.champion-pick
  position absolute
  width 98%
  bottom 0
.champion-side-pick
  position absolute
  top 200px
  left 0px
</style>
