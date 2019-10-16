<template lang="pug">
  .deck-origin-container.card-container
      .card-container-title
        h3 オリジン
      .champion-origin-container
        .champion-decks.pa-2(v-for="originItem in championListEachOrigin" :key="originItem.origin.id")
          champion-deck-group(:championList="originItem.championList" :synergy="originItem.origin", borderColor="#00B8D4", synergyType="origin")
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { ChampionOrigin, costColor } from "@/models/champion";
import { championDeck } from "@/store/index";

@Component({
  name: "deck-origin",
  components: {
    "champion-deck-group": () =>
      import("@/components/Molecules/ChampionDeckGroup.vue")
  }
})
export default class DeckOrigin extends Vue {
  costColor: Map<number, string> = costColor;

  mounted() {
    championDeck.separateChampionDeckOrigin();
  }

  get championListEachOrigin(): ChampionOrigin[] {
    return championDeck.deckOrigin;
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
