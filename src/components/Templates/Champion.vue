<template lang="pug">
  .champion-template
    tft-header
    champion-deck-origin.ma-1
    champion-deck-class.ma-1
    .champion-space
    .champion-pick
      champion-footer

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  ChampionOrigin,
  ChampionClass,
  costColor,
  originSynergy,
  classSynergy
} from "@/models/champion";
import router from "@/router";
import { champion } from "@/store/index";
import DeckOrigin from "@/components/Organisms/ChampionDeckOrigin.vue";
import DeckClass from "@/components/Organisms/ChampionDeckClass.vue";
import TFTHeader from "@/components/Organisms/Header.vue";
import ChampionFooter from "@/components/Organisms/ChampionFooter.vue";

@Component({
  name: "champion-template",
  components: {
    "champion-deck-origin": DeckOrigin,
    "champion-deck-class": DeckClass,
    "tft-header": TFTHeader,
    "champion-footer": ChampionFooter
  }
})
export default class ChampionTemplate extends Vue {
  championListEachClass: ChampionClass[] = [];
  costColor: Map<number, string> = costColor;

  mounted() {
    champion.SeparateChampionDeckClass();
    this.championListEachClass = champion.deckClass;
  }
}
</script>
<style lang="stylus" scoped>
.champion-template
  margin auto
  height calc(100vh - 64px)
  width 100vw
  display flex
  flex-wrap wrap
  align-items flex-start
  overflow-y auto
.champion-space
  height 320px
.champion-pick
  position absolute
  bottom 0px
</style>
