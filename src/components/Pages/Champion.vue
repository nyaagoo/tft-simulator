<template lang="pug">
  .champion-page
    tft-header
    tft-drawer
    .content(:class="[{'ml-1': !visibleSynegyViewer || windowSize < 960}]")
      .champion-side-pick-container.hidden-sm-and-down(v-if="visibleSynegyViewer")
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

@Component({
  components: {
    "champion-deck-origin": () =>
      import("@/components/Organisms/ChampionDeckOrigin.vue"),
    "champion-deck-class": () =>
      import("@/components/Organisms/ChampionDeckClass.vue"),
    "champion-deck-favorite": () =>
      import("@/components/Organisms/ChampionDeckFavorite.vue"),
    "tft-header": () => import("@/components/Organisms/Header.vue"),
    "tft-drawer": () => import("@/components/Organisms/Drawer.vue"),
    "champion-footer": () =>
      import("@/components/Organisms/ChampionFooter.vue"),
    "champion-side-pick": () =>
      import("@/components/Organisms/ChampionSidePick.vue")
  }
})
export default class ChampionPage extends Vue {
  windowSize = 0;
  created() {
    setting.loadSetting();
  }
  get visibleSynegyViewer(): boolean {
    return setting.visibleSideSynergyViewer;
  }
  beforeDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize, true);
    }
  }
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  }
  onResize() {
    this.windowSize = window.innerWidth;
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
