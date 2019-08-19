<template lang="pug">
  .deck-origin-container.card-container
      .card-container-title
        h3 オリジン
      .champion-origin-container
        .champion-decks.pa-2(v-for="origin in championListEachOrigin" :key="origin.origin")
          champion-deck-group(:championList="origin.championList" :synergy="origin.origin", borderColor="#00B8D4", synergyType="origin")
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { ChampionOrigin, costColor } from "@/models/champion";
import { champion } from "@/store/index";
import ChampionDeckGroup from "@/components/Molecules/ChampionDeckGroup.vue";

@Component({
  name: "deck-origin",
  components: {
    "champion-deck-group": ChampionDeckGroup
  }
})
export default class DeckOrigin extends Vue {
  costColor: Map<number, string> = costColor;

  mounted() {
    champion.SeparateChampionDeckOrigin();
  }

  get championListEachOrigin(): ChampionOrigin[] {
    return champion.deckOrigin;
  }
}
</script>
<style lang="stylus" scoped>
.card-container-title
  background #00B8D4
.card-container
  border-left 4px solid #00B8D4
.champion-origin-container
  display flex
  flex-wrap wrap
  padding 8px
</style>
