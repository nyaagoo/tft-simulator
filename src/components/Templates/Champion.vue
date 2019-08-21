<template lang="pug">
  .champion-template
    tft-header
    tft-drawer
    champion-deck-favorite
    champion-deck-origin
    champion-deck-class
    .champion-space
    .champion-pick
      champion-footer.pa-2

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import DeckOrigin from "@/components/Organisms/ChampionDeckOrigin.vue";
import DeckClass from "@/components/Organisms/ChampionDeckClass.vue";
import Header from "@/components/Organisms/Header.vue";
import Drawer from "@/components/Organisms/Drawer.vue";
import ChampionFooter from "@/components/Organisms/ChampionFooter.vue";
import DeckFavorite from "@/components/Organisms/ChampionDeckFavorite.vue";

@Component({
  name: "champion-template",
  components: {
    "champion-deck-origin": DeckOrigin,
    "champion-deck-class": DeckClass,
    "champion-deck-favorite": DeckFavorite,
    "tft-header": Header,
    "tft-drawer": Drawer,
    "champion-footer": ChampionFooter
  }
})
export default class ChampionTemplate extends Vue {}
</script>
<style lang="stylus" scoped>
.champion-template
  margin auto
  height calc(100vh - 48px)
  display flex
  flex-wrap wrap
  align-items flex-start
  overflow-y auto
  overflow-x hidden
.champion-space
  height 320px
.champion-pick
  position absolute
  width 100%
  bottom 0
</style>
