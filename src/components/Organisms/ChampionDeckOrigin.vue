<template lang="pug">
  .deck-origin-container
    .deck-origin
      .card-title
        h3(style="font-size:28px") オリジン
      .champion-origin-container
        .champion-decks.pa-2(v-for="origin in championListEachOrigin" :key="origin.origin")
          champion-deck-group(:championList="origin.championList" :groupDescription="origin.origin", borderColor="#00B8D4")
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
.deck-origin-container
  margin auto
.deck-origin
  margin 0 24px
  background #424242
  border-radius 6px
  border-left 4px solid #00B8D4
.card-title
  display flex
  justify-content center
  align-items center
  background #00B8D4
  height 64px
  margin 0 24px
  border-radius 8px
  position relative
  max-width: calc(100% - 80px);
  margin auto
  top -32px
  margin-bottom -16px
.champion-origin-container
  display flex
  flex-wrap wrap
  padding 8px
</style>
