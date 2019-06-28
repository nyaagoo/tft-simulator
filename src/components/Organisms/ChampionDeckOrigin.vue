<template lang="pug">
  .deck-origin
    h1 Origin
    .champion-origin-container
      .origin-deck(v-for="origin in championListEachOrigin" :key="origin.origin")
        champion-deck-group(:championList="origin.championList" :name="origin.origin" borderColor="#00C853")

</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { ChampionOrigin, costColor } from "@/models/champion";
import { champion } from "@/store/index";
import ChampionDeck from "@/components/Molecules/ChampionDeck.vue";
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

  get championListEachOrigin() {
    return champion.deckOrigin;
  }
}
</script>
<style lang="stylus" scoped>
.deck-origin
  margin auto
  width 100vw
.champion-origin-container
  display flex
  flex-wrap wrap
  padding 8px
  margin 8px
</style>
