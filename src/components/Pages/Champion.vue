<template lang="pug">
  .champion-page
    tft-header
    tft-drawer
    .content(:class="[{'ml-0': !visibleSynegyViewer}]")
      .champion-side-pick-container(v-if="visibleSynegyViewer")
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
    setting.loadSetting();
  }

  get visibleSynegyViewer(): boolean {
    return setting.visibleSideSynergyViewer;
  }
}
</script>
<style lang="stylus" scoped>
.champion-page
  margin 0 auto
  height calc(100vh - 48px)
  overflow-y auto
  padding-bottom 300px
.champion-pick
  position absolute
  width 98%
  bottom 0
  z-index 10
.champion-side-pick-container
  position absolute
  height calc(90vh - 48px - 40px)
  overflow-y auto
  top 40px
  left 0px
.champion-side-pick-container::-webkit-scrollbar
  display none
.content
  margin-left 200px
</style>
